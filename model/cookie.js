const mongoose = require("mongoose")

const CookiesSchema = new mongoose.Schema({
    name: String,
	cookie: String,
    Xtoken: String,
})

module.exports = mongoose.model("cookies", CookiesSchema)