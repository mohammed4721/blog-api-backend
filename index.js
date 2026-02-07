const express = require('express');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// DB connect
const dbConnect = require("./config/database");
dbConnect();

// routes
const blog = require("./routes/blog.routes");
app.use("/api/v1", blog);

// default route
app.get("/", (req, res) => {
    res.send("<h1>This is home page</h1>");
});

// start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT} successfully`);
});
