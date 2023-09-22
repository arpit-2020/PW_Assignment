const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController.js");
const middlewares = require("../middlewares/userAuth.js");

userRoute.post("/signin", middlewares.Validate, userController.CreateSession);

userRoute.get("/signin", userController.RenderSignIn);

userRoute.get("/list", middlewares.validateToken, userController.RenderList);

userRoute.get('/add', middlewares.validateToken, userController.RenderAddDetails);

userRoute.post('/add', middlewares.validateToken, userController.addData);

userRoute.get('/delete', middlewares.validateToken, userController.RenderDeletePage);

userRoute.post('/delete', middlewares.validateToken, userController.deletePage);

userRoute.get('/entire-dataset', middlewares.validateToken, userController.queryEntireDataset);

userRoute.get('/eachDept', middlewares.validateToken, userController.queryEachDept);

userRoute.get('/onSubdept', middlewares.validateToken, userController.querySubDept);

userRoute.get('/onContract', middlewares.validateToken, userController.queryOnContract);


// userRoute.get('/', middlewares.validateToken, userController)

module.exports = userRoute;
