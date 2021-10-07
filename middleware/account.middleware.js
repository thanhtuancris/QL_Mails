module.exports = {
    login: function(req, res, next) {
        if(!req.body.username){
            res.status(400).json({
                message: "Thiếu trường thông tin tài khoản"
            });
            return;
        }
        if(!req.body.password){
            res.status(400).json({
                message: "Mật khẩu không được để trống"
            });
            return;
        }
        next();
    },

    changePassword: function(req, res, next) {
        if(!req.body.password){
            res.status(400).json({
                message: "Mật khẩu không được để trống"
            });
            return;
        }
        if(!req.body.newpassword){
            res.status(400).json({
                message: "Mật khẩu không được để trống"
            });
            return;
        }
        if(req.body.newpassword){
            let a = req.body.newpassword;
            if(a.length < 6 || a.length > 50){
                res.status(400).json({
                    message: "Mật khẩu tối thiểu là 6 ký tự và tối đa là 50 ký tự"
                });
                return;
            }
        }
        next();
    },

    reg: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        if(!req.body.username){
            res.status(400).json({
                message: "Tài khoản không được để trống"
            });
            return;
        }
        if(!req.body.password){
            res.status(400).json({
                message: "Mật khẩu không được để trống!"
            });
            return;
        }
        if(!req.body.permission){
            res.status(400).json({
                message: "Vui lòng chọn quyền cho tài khoản!"
            });
            return;
        }
        if(parseInt(req.body.permission) != 1 && parseInt(req.body.permission) != 2 && parseInt(req.body.permission) != 3){
            res.status(400).json({
                message: "Không có quyền như thế này :))"
            });
            return;
        }
        if(!req.body.number_phone){
            res.status(400).json({
                message: "Vui lòng điền số điện thoại!"
            });
            return;
        }
        if(!req.body.email){
            res.status(400).json({
                message: "Vui lòng điền email!"
            });
            return;
        }
        if(req.body.password){
            let a = req.body.password;
            if(a.length < 6 || a.length > 50){
                res.status(400).json({
                    message: "Mật khẩu tối thiểu là 6 ký tự và tối đa là 50 ký tự"
                });
                return;
            }
        }
        next();
    },
    getaccbyper:function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        next();
    },
    editaccount:function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        next();
    },
    deleteacc:function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        if(!req.body._id){
            res.status(400).json({
                message: "Thiếu id tài khoản muốn xoá"
            });
            return;
        }
        next();
    },
    adminchapass:function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        if(!req.body._id){
            res.status(400).json({
                message: "Thiếu id tài khoản muốn xoá"
            });
            return;
        }
        if(!req.body.newpassword){
            res.status(400).json({
                message: "Điền mật khẩu bạn muốn đổi"
            });
            return;
        }
        next();
    },
    getinfo:function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: "Xác thực thất bại!"
            });
            return;
        }
        next();
    },
}