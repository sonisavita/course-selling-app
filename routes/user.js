const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
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

    userRouter.get("/purchases", async function(req,res){
        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId,
        });

        const coursesData =  await courseModel.find({
            _id: { $in: purchases.map(x => x.courseId) }
        })

        res.json({
            purchases,
            coursesData
        })
    })



module.exports = {
    userRouter: userRouter
}