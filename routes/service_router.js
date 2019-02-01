var express = require('express');
var router = express.Router();
var ServiceController=require('../controller/service_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is service get request')
});

router.post('/createService',ServiceController.createService);

router.post('/findall',ServiceController.getAllServicesDetails)

router.post('/deletebyid',ServiceController.delete)

router.post('/addServiceToPatient',ServiceController.addServicestoPatient)

router.post('/update',ServiceController.update)

module.exports = router;
