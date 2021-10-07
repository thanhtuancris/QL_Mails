const mongoose = require("mongoose")

const typemailSchema = new mongoose.Schema({
    name: String,
    isdelete: Boolean,
})

module.exports = mongoose.model("type_mail", typemailSchema)