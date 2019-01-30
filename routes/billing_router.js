var express = require('express');
var router = express.Router();
var BillingController=require('../controller/billing_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is Billing get request')
});

// router.post('/billforpat',BillingController.bill);

router.post('/billforPatientt',BillingController.billforpat);

router.post('/billingAtDayEnd',BillingController.dayEndBilling);



module.exports = router;
