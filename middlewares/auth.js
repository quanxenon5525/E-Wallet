const { session } = require("passport");

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {

        return res.redirect("/");
    }
    next();
}


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {

        return next();
    }
    res.redirect("/users/login");
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "admin") {
      return next();
    }
    return res.send("Bạn không có quyền truy cập hehe")
}


module.exports = {
    checkNotAuthenticated,
    checkAuthenticated,
    isAdmin,
};