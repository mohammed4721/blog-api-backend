const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = async () => {
     await mongoose.connect(process.env.DATABASE_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
        .then(console.log("db connected successfully"))
        .catch((err) => {
            console.log(err.message)

            //process.exit(1) immediately stops your Node.js program and tells the OS:
            //“The program ended because of an error.”
            process.exit(1)
        })
}

module.exports = dbConnect;