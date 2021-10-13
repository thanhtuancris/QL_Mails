let Account = require('../model/account')
let Nation = require('../model/nationMail')

module.exports = {
    addNation: async function (req, res) {
        let check = await Account.findOne({
            token: req.body.token,
            isdelete: false,
            status: true,
            role: 2
        })
        let newNation = new Nation({
            name: req.body.name.trim(),
            date: new Date(),
            isdelete: false,
        })
        if(check){
            let checkExists = await Nation.findOne({name: req.body.name.trim()})
            if(checkExists){
                res.status(400).json({
                    message: 'Đã tồn tại quốc gia!',
                });
            }else{
                let saveNation = await newNation.save()
                if(saveNation){
                    res.status(200).json({
                        message: 'Thêm quốc gia thành công!',
                    });
                }else{
                    res.status(400).json({
                        message: 'Thêm quốc gia thất bại!',
                    });
                }
            }
        }else{
            res.status(400).json({
                message: 'Không có quyền thực thi!',
            });
        }
    },
    getNation: async function (req, res){
        let check = await Account.findOne({
            token: req.body.token,
            isdelete: false,
            status: true,
            role: 2
        })
        if(check){
            let getNation = await Nation.find()
            if(getNation){
                res.status(200).json({
                    message: 'Lấy dữ liệu thành công!',
                    data: getNation
                });
            }else{
                res.status(400).json({
                    message: 'Lấy dữ liệu thất bại!',
                });
            }
        }else{
            res.status(400).json({
                message: 'Không có quyền thực thi!',
            });
        }
    },
    editNation: async function (req, res){
        let check = await Account.findOne({
            token: req.body.token,
            isdelete: false,
            status: true,
            role: 2
        })
        if(check){
            let filter = {
                _id: req.body.id_Nation,
                isdelete: false
            }
            let findNation = await Nation.findOne(filter)
            let update = {
                name: req.body.name ? req.body.name.trim(): findNation.name
            }
            let updateNation = await Nation.findOneAndUpdate(filter, update, {new: true})
            if(updateNation){
                res.status(200).json({
                    message: 'Sửa quốc gia thành công!',
                });
            }else{
                res.status(400).json({
                    message: 'Sửa quốc gia thất bại!',
                });
            }
        }else{
            res.status(400).json({
                message: 'Không có quyền thực thi!',
            });
        }
    },
    deleteNation: async function (req, res){
        let check = await Account.findOne({
            token: req.body.token,
            isdelete: false,
            status: true,
            role: 2
        })
        if(check){
            let filter = {
                _id: req.body.id_Nation,
                isdelete: false
            }
            let update = {
                isdelete: true,
            }
            let updateNation = await Nation.findOneAndUpdate(filter, update, {new: true})
            if(updateNation){
                res.status(200).json({
                    message: 'Xóa quốc gia thành công!',
                });
            }else{
                res.status(400).json({
                    message: 'Xóa quốc gia thất bại!',
                });
            }
        }else{
            res.status(400).json({
                message: 'Không có quyền thực thi!',
            });
        }
    },
}