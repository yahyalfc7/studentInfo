require("dotenv/config")
const fetch = require("node-fetch");
const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // convert into jsonn when responce comes

const fs = require('fs');

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const accessToken = 'esA1vboCcJr2QjGH6r6dfIMJvMX3'

app.get('/auth', async (req, res) => {
  try {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Api-Version", "1.1");
    myHeaders.append("loginName", "sbMem60c0e25d5ef743");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("clientId", "dlZ1gSkzf5J9ECuIouhI3lbjgXN9Jk6z");
    urlencoded.append("secret", "G16STi2NeEFm1AgK");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const tokenResponse = await fetch("https://sandbox.api.yodlee.com/ysl/auth/token", requestOptions)
    let jsonResponse = await tokenResponse.json()

    // we get the access token and now we append it to our request
    //res.send(token)

    var newHeaders = new fetch.Headers();
    newHeaders.append("Api-Version", "1.1");
    newHeaders.append("Content-Type", "application/json");
    newHeaders.append("Authorization", `Bearer ${jsonResponse.token.accessToken}`); // access token

    var secondRequestOptions = {
      method: 'GET',
      headers: newHeaders,
      body: "",
      redirect: 'follow'
    };

    const response = await fetch("https://sandbox.api.yodlee.com/ysl/transactions?fromDate=2013-01-01", secondRequestOptions)
    jsonResponse = await response.json()
    const data = JSON.stringify(jsonResponse)

    res.send(jsonResponse)

  } catch (err) {
    res.status(404).json(err)
  }
})

app.get('/getinfo', async (req, res) => {


})



app.get('*', (req, res) => {
  res.status(404).send('Page not found!')
})

const port = process.env.PORT || 9393;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
