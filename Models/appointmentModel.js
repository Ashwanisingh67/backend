const mongoose=require('mongoose')
const appointmentSchema= new mongoose.Schema({
    time:{
        type:String,
        required:[true,"select a time slot"],
        trim:true
    },
    date:{
        type:String,
        required:[true,"select any date"],
        trim:true
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