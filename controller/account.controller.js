const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
let Account = require('../model/account')
module.exports = {
    login: async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let account = {
            username: username,
            password: md5(password)
        }
        let check = await Account.findOne(account);
        if(check !== null) {
            let newToken = jwt.sign({
                username: username,
                password: password
            }, fs.readFileSync('primary.key'));
            let filter = {
                username: username,
                password: md5(password),
                isdelete: false,
                status: true,
                $or: [{role:1}, {role:2}]
            }
            let update = {
                token: newToken
            }
            let result = await Account.findOneAndUpdate(filter, update, {new:true})
            if (result != null) {
                res.status(200).json({
                    message: "Đăng nhập thành công!",
                    data: result.token
                });
            } else {
                res.status(400).json({
                    message: "Đăng nhập thất bại, vui lòng liên hệ admin!"
                });
            }
        }else{
            res.status(400).json({
                message: "Sai tài khoản hoặc mật khẩu!"
            })
        }
        
    },
    logout: async (req, res) => {
        let token = req.body.token;
        try {
            let filter = {
                token: token
            }
            let update = {
                token: ""
            }
            let result = await Account.findOneAndUpdate(filter, update, {
                new: true
            });
            if (result != null) {
                res.status(200).json({
                    message: "Đăng xuất thành công!"
                });
            } else {
                res.status(400).json({
                    message: "Đăng xuất thất bại!"
                });
            }

        } catch (ex) {
            res.status(401).json({
                message: "Token lỗi vui lòng thử lại"
            });
        }
    },
    changePassword: async (req, res) => {
        let check = await Account.findOne({
            token: req.body.token
        });
        try {
            if (check.username) {
                let username = check.username;
                let password = req.body.password;
                let newpassword = req.body.newpassword;
                try {
                    let newToken = jwt.sign({
                        username: username,
                        password: md5(newpassword)
                    }, fs.readFileSync('primary.key'));
                    let filter = {
                        username: username,
                        password: md5(password)
                    }
                    let update = {
                        token: newToken,
                        date_edit: Date.now(),
                        // modified_by: check._id,
                        password: md5(newpassword),
                    }
                    let result1 = await Account.findOneAndUpdate(filter, update, {
                        new: true
                    });
                    if (result1 != null) {
                        result1.token = newToken;
                        res.status(200).json({
                            message: "Thay đổi mật khẩu thành công!",
                        });
                    } else {
                        res.status(400).json({
                            message: "Mật khẩu cũ sai, vui lòng thử lại"
                        });
                    }
                } catch (ex) {
                    res.status(400).json({
                        message: "Mật khẩu cũ sai, vui lòng thử lại"
                    });
                }
            } else {
                res.status(401).json({
                    message: "Token lỗi, vui lòng thử lại"
                });
            }
        } catch (ex) {
            res.status(401).json({
                message: "Token lỗi, vui lòng thử lại"
            });
        }
    },
    getUser: async function (req, res) {
        let token = req.body.token;
        let filterAdmin = {
            token: token,
            isdelete: false,
            status: true,
            role: 1
        }
        let filterUser = {
            isdelete: false,
            status: true,
            role: 2
        }
        let checkAdmin = await Account.findOne(filterAdmin)
        if(checkAdmin){
            let getUser = await Account.find(filterUser)
            res.status(200).json({
                message: "Lấy dữ liệu thành công!",
                data: getUser
            })
        }else{
            res.status(400).json({
                message: "Không có quyền thực thi"
            })
        }
        
    },
    getInfo: async function (req, res) {
        let token = req.body.token;
        let filterAccount = {
            token: token,
            isdelete: false,
            status: true,
            $or: [{role:1}, {role:2}]
        }
        let check = await Account.findOne(filterAccount)
        if(check){
            let getInfo = await Account.findOne({_id: check._id})
            if(getInfo){
                let rs_info = {
                    username: getInfo.username,
                    full_name: getInfo.full_name,
                    email: getInfo.email,
                    birth_day: getInfo.birth_day,
                    phone: getInfo.phone,
                    team: getInfo.team,
                    role: getInfo.role,
                    status: getInfo.status,
                    date_reg: getInfo.date_reg,
                    date_edit: getInfo.date_edit
                }
                res.status(200).json({
                    message: "Lấy dữ liệu thành công!",
                    data: rs_info
                })
            }else{
                res.status(400).json({
                    message: "Lấy dữ liệu thất bại!"
                })
            }
            
        }else{
            res.status(400).json({
                message: "Không có quyền thực thi!"
            })
        }
    }, 
    updateInfo: async function(req, res){
        try{
            let token = req.body.token;
            let filterAccount = {
                token: token,
                isdelete: false,
                status: true,
                $or: [{role:1}, {role:2}]
            }
            let check = await Account.findOne(filterAccount)
            if(check){
                let filter = {
                    _id: check._id,
                }
                let update = {
                    email: req.body.email ? req.body.email.trim() : check.email,
                    full_name: req.body.full_name ? req.body.full_name.trim() : check.full_name,
                    birth_day: req.body.birth_day ? req.body.birth_day.trim() : check.birth_day,
                    phone: req.body.phone ? req.body.phone.trim() : check.phone,
                }
                let rsUpdate = await Account.findOneAndUpdate(filter, update, {new: true})
                if(rsUpdate){
                    res.status(200).json({
                        message: "Cập nhật thành công!"
                    })
                }else{
                    res.status(400).json({
                        message: "Cập nhật thất bại!"
                    })
                }

            }else{
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        }catch(e){
            res.status(400).json({
                message: e.message
            })
        }
        
    }
}