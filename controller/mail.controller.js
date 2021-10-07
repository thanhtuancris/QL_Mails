const Mail = require('../model/mails');
let Account = require('../model/account')
const sanitizer = require('sanitizer');
const fs = require('fs');
function validateEmail(email){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
         return (true)
     }
        return (false)
 }
module.exports = {
    addMail: async function (req, res){
        let check = await Account.findOne({
            token: req.body.token,
            isdelete: false,
            status: true,
            role: 1
            // $or: [{role:1}, {role:2}]
        });
        if(check){
            try {
                let arr = req.body.mail;
                // res.status(200).json({
                //     message: 'success',
                //     data: arr.length
                // });
                for (let i = 0; i < arr.length; i++) {
                    let arrMail = arr[i].split("|");
                    if (arrMail[0] && arrMail[1] && arrMail[2]) {
                        let checkMails = await Mail.findOne({
                            mail: arrMail[0],
                            isdelete: false,
                        });
                        console.log(checkMails);
                        if(checkMails == null){
                            if(validateEmail(arrMail[0]) == true){
                                let newMails = new Mail({
                                    mail: sanitizer.escape(arrMail[0].trim()),
                                    password: sanitizer.escape(arrMail[1].trim()),
                                    mailRecovery: sanitizer.escape(arrMail[2].trim()),
                                    type: sanitizer.escape(req.body.type),
                                    nation: sanitizer.escape(req.body.nation),
                                    import_by: check._id,
                                    buyer: sanitizer.escape(req.body.buyer),
                                    date_import: new Date(),
                                    date_edit: new Date(),
                                    status: 1,
                                    isdelete: false,
                                    ischeck: false,
                                });
                                    let importMail = await newMails.save();
                                    if(i+1 == arr.length){
                                        return res.status(200).json({
                                            message: 'Thêm mail thành công!',
                                            data: arr.length
                                        });
                                    }
                            }else{
                                return res.status(404).json({
                                    message: 'Sai định dạng mail!'
                                });
                            }
                        }else{
                            let mail = (arrMail[0]) ? arrMail[0] : "null";
                            let password = (arrMail[1]) ? arrMail[1] : "null";
                            let recovered = (arrMail[2]) ? arrMail[2] : "null";
                            let logs = mail + " | " + password + " | " + recovered + " | " + check.username + "|" + " Đã tồn tại Mail " + "\n";
                            fs.appendFile('logs.txt', logs, function (err) {
                                if (err) throw err;
                                console.log('Export log done!');
                            });
                            return res.status(400).json({
                                message: 'Mail bị trùng, Hãy thử lại!'
                            });
                        }

                    }
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            res.status(400).json({
                message: "Không có quyền thực thi!"
            })
        }
    },
    // getMailByAdmin: async (req, res) => {
    //     var checkBody = ["type", "nation"];
    //     let token = req.body.token;
    //     let filter = {
    //         isdelete: false,
    //         status: {
    //             $ne: 0
    //         }
    //     };
    //     let totalLive = 0;
    //     let totalDisabled = 0;
    //     let totalVerified = 0;
    //     let totalSale = 0;

    //     let check = await Account.findOne({
    //         token: token,
    //         isdelete: false,
    //         status: true,
    //         role: 1
    //     });
    //     if (check) {
    //         for (var k in req.body) {
    //             if (checkBody.indexOf(k) != -1 && req.body[k]) {
    //                 filter[k] = new RegExp(req.body[k].trim(), 'i')
    //             }
    //         }
    //         if (req.body.ischeck) {
    //             filter.ischeck = req.body.ischeck;
    //         }
    //         if (req.body.mail) {
    //             filter.mail = new RegExp(req.body.mail.trim(), 'i');
    //         }
    //     //    if (req.body.start_date && req.body.stop_date) {
    //     //         let date = new Date();
    //     //         console.log("date= " + date);
    //     //         var d = new Date(date),
    //     //             month = '' + (d.getMonth() + 1),
    //     //             day = '' + d.getDate(),
    //     //             year = d.getFullYear();
    //     //         let dateNow = year + "-" + month + "-" + day + " 00:00";
    //     //         console.log("dateNow= " + dateNow);
    //     //         let start_date = new Date(dateNow);
    //     //         start_date.setDate(start_date.getDate() - req.body.start_date);
    //     //         console.log("startDate= " + start_date);
    //     //         let stop_date = new Date(dateNow);
    //     //         stop_date.setDate(stop_date.getDate() - req.body.stop_date);
    //     //         console.log("stopDate= " + stop_date);
    //     //         filter.date_reg = {
    //     //             "$gte": stop_date.toISOString(),
    //     //             "$lte": start_date.toISOString()
    //     //         };
    //     //     } 
    //         if (req.body.status) {
    //             filter.status = req.body.status.trim();
    //             let a = req.body.status;
    //             if (a == 1) {
    //                 totalLive = await Mail.countDocuments(filter);
    //             }
    //             if (a == 5) {
    //                 totalDisabled = await Mail.countDocuments(filter);
    //             }
    //             if (a == 10) {
    //                 totalVerified = await Mail.countDocuments(filter);
    //             }
    //             if (a == 15) {
    //                 totalSale = await Mail.countDocuments(filter);
    //             }
    //         }
    //         const perPage = parseInt(req.body.limit);
    //         const page = parseInt(req.body.page || 1);
    //         const skip = (perPage * page) - perPage;
    //         console.log(filter)
    //         const result = await Mail.find(filter).skip(skip).limit(perPage);
    //         const totalDocuments = await Mail.countDocuments(filter);
    //         const totalPage = Math.ceil(totalDocuments / perPage);
    //         if (!req.body.status) {
    //             filter.status = 1;
    //             totalLive = await Mail.countDocuments(filter);
    //             filter.status = 5;
    //             totalDisabled = await Mail.countDocuments(filter);
    //             filter.status = 10;
    //             totalVerified = await Mail.countDocuments(filter);
    //             filter.status = 15;
    //             totalSale = await Mail.countDocuments(filter);
    //         }
    //         res.status(200).json({
    //             message: "Lấy dữ liệu thành công!",
    //             data: result,
    //             page: page,
    //             totalDocuments: totalDocuments,
    //             totalPage: totalPage,
    //             totalLive: totalLive,
    //             totalDisabled: totalDisabled,
    //             totalVerified: totalVerified,
    //             totalSale: totalSale,
             
    //         });
    //     } else {
    //         res.status(400).json({
    //             message: "Không có quyền thực thi!",
    //         });
    //     }
    // },
    getMailByUser: async function(req, res){
        try{
            var checkBody = ["type", "nation"];
            let token = req.body.token
            // let buyer = req.body.buyer
            let filterUser = {
                token: token,
                isdelete: false,
                status: true,
                role: 2
                // $or: [{role:1}, {role:2}]
            }
            let totalLive = 0;
            let totalDisabled = 0;
            let totalVerified = 0;
            let totalSale = 0;
            let checkUser = await Account.findOne(filterUser)
            let filter = {
                isdelete: false,
                buyer: checkUser._id
            }
            if(checkUser){
                for (var k in req.body) {
                    if (checkBody.indexOf(k) != -1 && req.body[k]) {
                        filter[k] = new RegExp(req.body[k].trim(), 'i')
                    }
                }
                if (req.body.ischeck) {
                    filter.ischeck = req.body.ischeck;
                }
                if (req.body.mail) {
                    filter.mail = new RegExp(req.body.mail.trim(), 'i');
                }
                if (req.body.status) {
                    filter.status = req.body.status.trim();
                    let a = req.body.status;
                    if (a == 1) {
                        totalLive = await Mail.countDocuments(filter);
                    }
                    if (a == 5) {
                        totalDisabled = await Mail.countDocuments(filter);
                    }
                    if (a == 10) {
                        totalVerified = await Mail.countDocuments(filter);
                    }
                    if (a == 15) {
                        totalSale = await Mail.countDocuments(filter);
                    }
                }
                const perPage = parseInt(req.body.limit);
                const page = parseInt(req.body.page || 1);
                const skip = (perPage * page) - perPage;
                console.log(filter)
                const result = await Mail.find(filter).skip(skip).limit(perPage);
                const totalDocuments = await Mail.countDocuments(filter);
                const totalPage = Math.ceil(totalDocuments / perPage);
                if (!req.body.status) {
                    filter.status = 1;
                    totalLive = await Mail.countDocuments(filter);
                    filter.status = 5;
                    totalDisabled = await Mail.countDocuments(filter);
                    filter.status = 10;
                    totalVerified = await Mail.countDocuments(filter);
                    filter.status = 15;
                    totalSale = await Mail.countDocuments(filter);
                }
                res.status(200).json({
                    message: "Lấy dữ liệu thành công!",
                    data: result,
                    page: page,
                    totalDocuments: totalDocuments,
                    totalPage: totalPage,
                    totalLive: totalLive,
                    totalDisabled: totalDisabled,
                    totalVerified: totalVerified,
                    totalSale: totalSale,
                
                });
            }else{
                res.status(400).json({
                    message: "Không có quyền thực thi!"
                })
            }
        }catch(ex){
            res.status(400).json({
                message: "Không có quyền thực thi!"
            })
        }
        
    },
    editMail: async function(req, res){
        
    }
}