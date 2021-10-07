const mongoose = require("mongoose")

const mailSchema = new mongoose.Schema({
	mail: String,
    password: String,
    mailRecovery: String,
    type: String,
    nation: String,
    import_by: mongoose.Schema.Types.ObjectId,
    buyer: mongoose.Schema.Types.ObjectId,
    date_import: Date,
    date_edit: Date,
    status: Number,
    isdelete: Boolean,
    ischeck: Boolean,
    // modified_by: mongoose.Schema.Types.ObjectId,
    // sale_name: String,
    // date_sale: Date,
})

module.exports = mongoose.model("mails", mailSchema)