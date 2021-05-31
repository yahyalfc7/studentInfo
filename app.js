require("dotenv/config")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
// Routes
const authRoute = require('./routes/auth')
const studentRoute = require('./routes/student')
//Middlewares
const verifyToken = require('./middlewares/verifyToken')

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // convert into jsonn when responce comes

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/auth', authRoute)
app.use('/student', verifyToken, studentRoute)

app.get('*', (req, res) => {
  res.status(404).send('Page not found!')
})

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB')
})

// running the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
