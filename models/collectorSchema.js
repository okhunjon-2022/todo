const mongoose= require("mongoose")
const Joi =require("joi")

const collectorSchema=new mongoose.Schema({
    izoh:{
        type:String,
        required:true
    },
    select:{
        type:String,
        required:true
    },
    summa:{
        type:Number,
        required:true
    }
})

const Collectors=mongoose.model("collector",collectorSchema)

const validateCollector=(body)=>{
    const schema=Joi.object({
        izoh:Joi.string().required(),
        select:Joi.string().required(),
        summa:Joi.number().required()
    })

    return schema.validate(body)
}

module.exports={Collectors,validateCollector}