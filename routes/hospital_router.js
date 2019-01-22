var express = require('express');
var router = express.Router();
var HospitalController=require('../controller/hospital_cotroller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is hospital get request')
});

router.post('/register',HospitalController.register)

router.post('/login',HospitalController.login)

module.exports = router;
