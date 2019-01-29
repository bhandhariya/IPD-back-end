var express = require('express');
var router = express.Router();
var PatientController=require('../controller/patient_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is Patient  get request')
});

router.post('/addPatient',PatientController.savePatient);

router.post('/getAllPat',PatientController.getAllPatientsDetails)

router.post('/getonePatientDetail',PatientController.getonePatdetils)

router.post('/addService',PatientController.addService);

router.post('/allServiceDetails',PatientController.getAllSevuceofPateient)

router.post('/deleteserviceFromPatient',PatientController.deleteserviceFromPatient)

module.exports = router;
