var PatientSequence=require('../model/patient_sequence_modal');



var generatedCustomerSequence = function(gccallback) {
    var customersSequenceObj = new PatientSequence();
    customersSequenceObj.save(function(err) {
        if (err) {
            gccallback(err, null);
        } else {
            PatientSequence.findById({ "_id": customersSequenceObj["_id"] }).exec(function(err, incDoc) {
                if (err) {
                    gccallback(err, null);
                } else {
                    var customerSequence = ("AKCC").concat(pad(10, incDoc["CustomerSequence"], "0"));
                    gccallback(null, customerSequence)
                }
            })
            /*customersSequenceObj.nextCount(function (err, count) {
            	if (err) {
            		gccallback(err, null);
            	}
            	else {
            		var customerSequence = ("AKCC").concat(pad(10, count, "0"));
            		gccallback(null, customerSequence)
            	}
            })*/
        }
    })
}