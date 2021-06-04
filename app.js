require("dotenv/config")
const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // convert into jsonn when responce comes

const OAuthClient = require('intuit-oauth');
const QuickBooks = require('node-quickbooks')

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const oauthClient = new OAuthClient({
  clientId: 'ABk31jpYYZuG92bK3rrJ33jMKy3ZikI6wEsKjNfMJksjTPf6j1',
  clientSecret: 'Ss5dT6RXMv6ri8hlUJOiKaIOyZtNyc67ahGFme0R',
  environment: 'sandbox' || 'production',
  redirectUri: 'http://localhost:9393/oauth2redirect',
})

app.get('/auth', (req, res) => {
  try {
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
      state: 'testState',
    }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
    // Redirect the authUri which we have also saved in our sand box portal
    res.redirect(authUri);
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
})

app.get('/oauth2redirect', async (req, res) => {
  const parseRedirect = req.url;
  try {
    const authResponce = await oauthClient.createToken(parseRedirect)
    // const tokenString = JSON.stringify(authResponce.getJson());
    //res.status(200).json(tokenString);
    res.redirect('/getInfo')
  } catch (err) {
    console.log((err));
    res.status(400).json(err)
  }
})

app.get('/getInfo', async (req, res) => {
  try {
    const companyID = oauthClient.getToken().realmId;
    const url = oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

    // console.log(oauthClient.token);
    // console.log(oauthClient.token.access_token);

    //This is wroking. Here we are getting company info after authentication and sending it back.
    const authResponce = await oauthClient.makeApiCall({
      //method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      //body: JSON.stringify(body), 
      url: `${url}v3/company/${companyID}/companyinfo/${companyID}`
    })

    // This is using the quickbooks api
    var qbo = new QuickBooks(
      oauthClient.clientId,
      oauthClient.clientSecret,
      oauthClient.token.access_token,
      false, // no token secret for oAuth 2.0
      oauthClient.token.realmId,
      true, // use the sandbox?
      true, // enable debugging?
      null, // set minorversion, or null for the latest version
      '2.0', //oAuth version
      oauthClient.token.refresh_token
    );

    // Error occurs here
    qbo.getAccount()

    res.status(200).json(authResponce.json)
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Page not found!')
})

const port = process.env.PORT || 9393;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
