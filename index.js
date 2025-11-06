require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());

app.use("api/v1/user", userRouter);
app.use("api/v1/admin", adminRouter);
app.use("api/v1/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("listenig on port 3000");
}

main()


// use this cmd to get rid of port in used error 
//kill -9 $(lsof -ti:3000) || true
//node index.js - run -  npm run dev 

//added nodemon to package if any file got change the backend server will automatically restart
//when to start application in production - npm run start 
//when running the application locally then run - npm run dev
//so run - npm run dev  
