require("dotenv/config")
const express = require("express")
const app = express()

const plaid = require('plaid')

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // convert into jsonn when responce comes


app.get("/", function (req, res) {
  res.send("Hello World!");
});


app.get('/auth', (req, res) => {
  try {
    const plaidClient = new plaid.Client({
      clientID: '60c1b22d232f32000f863e0b',
      secret: '67facb496511d425015c103855dcf3',
      env: plaid.environments.sandbox,
      options: {
        version: '2020-09-14', // '2020-09-14' | '2019-05-29' | '2018-05-22' | '2017-03-08'
      },
    });
    const publicToken = plaidClient.
      res.send(publicToken)
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
})

app.get('/oauth2redirect', (req, res) => {
  console.log('In redirect',);
  console.log('request', req);
  console.log("responce", res);
  try {
    res.status(200).json('Redirecting')
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

app.get('*', (req, res) => {
  res.status(404).send('Page not found!')
})

const port = process.env.PORT || 9393;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
