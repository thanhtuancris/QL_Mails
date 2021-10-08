module.exports = {
    editMail: function (req, res, next) {
        if (!req.body.token) {
            res.status(400).json({
                message: "Thiếu trường dữ liệu token"
            });
            return;
        }
        if (!req.body.id_mail) {
            res.status(400).json({
                message: "Thiếu trường id_mail"
            });
            return;
        }
        next();
    },
    getMail: function (req, res, next) {
        if (!req.body.token) {
            res.status(400).json({
                message: "Thiếu trường dữ liệu token"
            });
            return;
        }
        next();
    },
}