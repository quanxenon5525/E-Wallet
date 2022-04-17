var express = require('express');

var router = express.Router();
const passport = require("passport");

const homeController =  require('../controller/homeController');
const initializePassport = require("../passport-config");

const {
    checkAuthenticated,
    checkNotAuthenticated,
    checkreset,
    isAdmin,
} = require("../middlewares/auth");
initializePassport(
    passport,
    async(username) => {
        const userFound = await User.findOne({ username });
        return userFound;

    },
    async(id) => {
        const userFound = await User.findOne({ _id: id });
        return userFound;
    }

);
router.get('/', checkAuthenticated, homeController.getHome)
router.get('/', checkAuthenticated, homeController.getChangePass)

router.get('/credit-Card', checkAuthenticated, homeController.getCreditCard)
router.post('/credit-card', checkAuthenticated, homeController.postCreditCard)
router.get('/edit-credit-card', checkAuthenticated, homeController.geteditCreditCard)
router.post('/edit-credit-card', checkAuthenticated, homeController.posteditCreditCard)
router.get('/payment', checkAuthenticated, homeController.getPayment)
router.post('/payment', checkAuthenticated, homeController.postPayment)
router.get('/history-trade', checkAuthenticated, homeController.getHistoryTrade)
router.get('/history-trade/:id', checkAuthenticated, homeController.getHistoryTradeDetail)
router.get('/withdraw-money',checkAuthenticated, homeController.getWithDraw)
router.post('/withdraw-money', checkAuthenticated, homeController.postWithDraw)
router.get('/sendMoney', checkAuthenticated, homeController.getSendMoney)
router.post('/sendMoney', checkAuthenticated, homeController.postSendMoney)
router.get('/otp', checkAuthenticated, homeController.getotp)
router.post('/otp', checkAuthenticated, homeController.postotp)
router.get('/buy-card', checkAuthenticated, homeController.getBuyCard)
router.post('/buy-card', checkAuthenticated, homeController.postBuyCard)
router.get('/otp/resend', checkAuthenticated, homeController.getresendOTP)
router.post('/otp/resend', checkAuthenticated, homeController.postresendOTP)

module.exports = router;

