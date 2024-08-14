const express = require("express");
const path = require("path");
const { mongoose } = require("mongoose");
const app = express();
const userRouter = require("./routes/user.routes")

//dotEnv.....
require('dotenv').config()
PORT = process.env.PORT || 6000

//MongoDbConection.....
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Detabase is Conected!"))
.catch((error) => console.log("Detabase is not Conected!", error));

//middleware
app.use(express.urlencoded({extended: false}));  //For passing the form deta:

//front-end Conection.....
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Routes....
app.use("/user",userRouter)

app.get("/",(req, res) => {
    return res.render("home");
})


app.listen(PORT, () => console.log(`Server has stated in PORT: ${PORT}`))
