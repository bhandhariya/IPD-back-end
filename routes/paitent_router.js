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

router.post('/allServiceDetails',PatientController.getAllSevuceofPateient);

router.post('/billingdetails',PatientController.billingdetails);

router.post('/addServiceToPatient',PatientController.addServiceToPatient);

router.post('/deleteserviceFromPatient',PatientController.deleteserviceFromPatient)

router.post('/findbynameall',PatientController.findbynameall);

router.post('/findbynumberall',PatientController.findbynumber)


router.post('/billinggg',PatientController.billinggg)

router.post('/getpatientdata',PatientController.getpatientdata)

module.exports = router;
