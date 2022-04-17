var db =  require('../../config/db')
const mongoose = require("mongoose");
const User =  require('../../models/user');
exports.getHome = async(req, res)=>{
        db.collection('users').find({"role": "user"}).toArray((err, result)=>{
            res.render('../views/admin/index', {user: result.length});

        })

    
}
exports.getWaitingLine =  async(req, res)=>{
    db.collection('users').find({ $and: [{ 'active': 0 }, { 'role': 'user' }] }).toArray(async(err, result) => {
        res.render('../views/admin/listActive/index', { user: result })
    })

}
exports.getAceptWaitingline =  async(req, res)=>{
        const id = mongoose.Types.ObjectId(req.params.id)
        if (id) {
            const user = await User.findOne({ _id: id })
            db.collection('users').updateOne({
                _id: user._id
            }, {
                $set: {
                    "announcement": 0,
                    "active": 1
                }
            }, {
                upsert: true
            })
            return res.redirect('/admin/listActive/waiting-line')
        } else {
            res.send("User không tồn tại")
        }
}
exports.getDisableWaitingLine =  async(req, res)=>{
        const id = mongoose.Types.ObjectId(req.params.id)
        if (id) {
            const user = await User.findOne({ _id: id })
            db.collection('users').updateOne({
                _id: user._id
            }, {
                $set: {
                    "active": 2
                }
            }, { upsert: true })
        }
        return res.redirect('/admin/listActive/disable')
}
exports.getSupplyIdCard =  async(req, res)=>{
    const id_user = mongoose.Types.ObjectId(req.params.id)
    if (id_user) {
        const user = await User.findOne({ _id: id_user })
        db.collection('users').updateOne({
            _id: user._id
        }, {
            $set: {
                "announcement": 1,
            }
        }, {
            upsert: true
        })
        return res.redirect('/admin/listActive/waiting-line')
    } else {
        res.send("Nguời dùng không tồn tại")
    }
}
exports.getListActiveDone =  async(req, res)=>{
    db.collection('users').find({ 'active': 1 }).toArray(async(err, result) => {
        res.render("../views/admin/listActive/done", { user: result })

    })
}
exports.getListDisable = async(req, res)=>{
    db.collection('users').find({ "active": 2 }).toArray(async(err, result) => {
        res.render('../views/admin/listActive/disable', { user: result })

    })
}
exports.getListBlock = async(req, res)=>{
    db.collection('users').find({ 'loginfail': 8 }).toArray(async(err, result) => {
        res.render('../views/admin/listActive/block', { user: result })

    })
}
