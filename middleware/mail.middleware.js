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
        if (req.body.start_date || req.body.stop_date) {
            let startDate = req.body.start_date + " 7:00"
            let stopDate = req.body.stop_date + " 7:00"
            let day_startDate = new Date(startDate)
            let day_stopDate = new Date(stopDate)
            if(day_startDate.getTime() > day_stopDate.getTime()){
                res.status(400).json({
                    message: "Ngày bắt đầu không được lớn hơn ngày kết thúc!"
                });
                return;
            }
        }
        next();

    },
    deleteMails: function (req, res, next) {
        if (!req.body.token) {
            res.status(400).json({
                message: "Thiếu trường dữ liệu token"
            });
            return;
        }
        if (!req.body.id_mails) {
            res.status(400).json({
                message: "Thiếu trường id_mails"
            });
            return;
        }
        next();
    },
}