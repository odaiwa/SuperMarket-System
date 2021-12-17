const mongoose = require("mongoose");

mongoose.connect(config.mongodb.connectionString)
    .then(db => console.log("DB connected"))
    .catch(err => console.log(err));
