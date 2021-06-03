require("dotenv/config")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
// Routes
const authRoute = require('./routes/auth')
const studentRoute = require('./routes/student')
//Middlewares
const verifyToken = require('./middlewares/verifyToken')
const User = require("./models/User")

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // convert into jsonn when responce comes

//Specify the Amazon DocumentDB cert
//var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

app.get("/", function (req, res) {
  res.send("Hello World!");
});


mongoose.connect("mongodb://ec2-18-234-107-209.compute-1.amazonaws.com:27017/test", { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) {
    console.log(err)
    throw err
  }
  console.log('connected');
  // console.log('connected', db);
})

app.get("/user", (req, res) => {
  res.send('helloss')
})

app.get("/users", async (req, res) => {
  try {
    console.log(User);
    const users = await User.find()
    console.log('USERS', users);
    res.status(200).json(users)
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
});

app.post('/add-user', async (req, res) => {
  const { name, rollno } = req.body;

  try {
    const user = User({
      name, rollno
    })
    const result = await user.save()
    console.log(result);
    res.status(200).json(result)

  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
})

app.get('*', (req, res) => {
  res.status(404).send('Page not found!')
})



// running the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
