const mongoose=require('mongoose')
  
const program_schema = new mongoose.Schema({
    inPublication:Number,
    includeInExternalCatalog:Object,
    app_open:Number,
    app_type:String,
    paymentDue:String,
    startDateDetermination:String,
    studyChoiceCheck:String,
})
  
module.exports = mongoose.model('Program', program_schema);