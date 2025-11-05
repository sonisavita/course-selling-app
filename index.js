const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("api/v1/user", userRouter);
app.use("api/v1/admin", adminRouter);
app.use("api/v1/course", courseRouter);

async function main() {
    await mongoose.connect("");
    app.listen(3000);
    console.log("listenig on port 3000");
}

main()


// use this cmd to get rid of port in used error 
//kill -9 $(lsof -ti:3000) || true
//node index.js