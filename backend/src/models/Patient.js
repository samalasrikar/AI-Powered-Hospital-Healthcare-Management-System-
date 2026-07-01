const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const patientSchema = new mongoose.Schema(
{
patientId:{
type:String,
unique:true,
default:()=>`PAT-${uuidv4().slice(0,8)}`
},

fullName:{
type:String,
required:true,
trim:true
},

dateOfBirth:{
type:Date,
required:true
},

gender:{
type:String,
required:true,
enum:["Male","Female","Other"]
},

bloodGroup:{
type:String,
required:true,
enum:[
"A+","A-",
"B+","B-",
"AB+","AB-",
"O+","O-"
]
},

phone:{
type:String,
required:true,
match:/^[0-9]{10}$/
},

address:{
type:String,
required:true
},

emergencyContact:{
type:String,
required:true,
match:/^[0-9]{10}$/
},

insuranceInformation:{
type:String
}

},
{
timestamps:true
}
);

module.exports =
mongoose.model(
"Patient",
patientSchema
);