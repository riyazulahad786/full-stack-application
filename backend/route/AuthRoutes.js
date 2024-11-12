const router = require('express').Router();
const {signupValidation,loginValidation} = require('../middleware/AuthValidation');
const {signUp,login} = require('../controllers/Authcontroller')
router.post("/login",loginValidation,login)
router.post("/signup",signupValidation,signUp);
module.exports = router;