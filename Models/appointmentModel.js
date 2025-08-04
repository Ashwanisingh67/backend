const mongoose=require('mongoose')
const appointmentSchema= new mongoose.Schema({
    date:{
        type:String,
        required:[true,"select any date"],
        trim:true
    },
    time:{
        type:String,
        required:[true,"select a time slot"],
        trim:true
    },
    appointmentfor:{
        type:String,    
        required:[true,"select a appointment type"],
        trim:true,      
        lowercase:true,
    },
    patientname:{
        type:String,
        required:[true,"patient name is required"],
        trim:true,
        lowercase:true, 

    },
    patientphone:{
        type:String,
        required:[true,"patient phone is required"],
        trim:true,
        match: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number',
    },
    patientemail:{
        type:String,
        trim:true,
        lowercase:true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email address'],
    },
    patients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Patient"
        }
    ]
})
const appointmentModel=mongoose.Schema("Appointment",appointmentSchema)
module.exports=appointmentModel;