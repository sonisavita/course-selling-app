const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD }  = require("../config");

const userRouter = Router();

    userRouter.post("/signup", async function(req,res){

        const { email, password, firstName, lastName } = req.body;

        await userModel.create({
            email,
            password,
            firstName,
            lastName
        })

        res.json({
            message: "signup succeded"
        })
    })

    userRouter.post("/signin", async function(req,res) {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email,
            password
        });

        if (user) {
            const token = jwt.sign({
                id: user._id
            }, JWT_USER_PASSWORD);
        

        //try cookie logic

        res.json({
            token: token
        })
        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }

    })

    userRouter.get("/purchases", function(req,res){
        res.json({
            message: "signup endpoint"
        })
    })



module.exports = {
    userRouter: userRouter
}