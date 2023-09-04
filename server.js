const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth",authRouter)
connectDB();
const PORT = process.env.PORT || 5050;

app.listen(PORT , (err)=>
err ? console.log(err):
    console.log(`server is running on port ${PORT}`)
)