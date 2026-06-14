const Patient = require("./models/Patient");

async function testPatient() {
try {

const patient = new Patient({

fullName: "Rahul Kumar",

dateOfBirth: "2002-05-10",

gender: "Male",

bloodGroup: "O+",

phone: "9876543210",

address: "Hyderabad",

emergencyContact: "9876543211",

insuranceInformation: "Star Health"

});

await patient.validate();

console.log("Validation Passed");

}
catch(error){

console.log(
"Validation Error:"
);

console.log(
error.message
);

}
}

testPatient();