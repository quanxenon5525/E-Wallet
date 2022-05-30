const mongoose = require("mongoose");
require("dotenv").config();

mongoose

    .connect(process.env.DATABASE_URL || "mongodb://localhost:27017/auth", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
    )
    module.exports = mongoose.connection;