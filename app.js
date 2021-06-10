require("dotenv/config")
const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // convert into jsonn when responce comes

var yodlee = require('yodlee');

app.get("/", function (req, res) {
  res.send("Hello World!");
});


app.get('/auth', async (req, res) => {
  try {

    await yodlee.use({
      username: 'YodTest.site16441.2',
      password: 'site16441.2#123',
      sandbox: true
    })

    const token = await yodlee.getAccessToken({
      username: 'YodTest.site16441.2',
      password: 'site16441.2#123'
    })
  }
  catch (err) {
    console.log(err);
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
