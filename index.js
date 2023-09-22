const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts') ;
const userRoute = require("./routes/userRoute")
const homeController = require("./controllers/homeController.js");
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set( 'view engine' , 'ejs' ) ;
app.set( 'views' , './views' ) ;


app.get("/", homeController.Renderhome);

app.use("/api", userRoute);

app.listen(3000, () => {
    console.log("App is listening at port 3000");
})