const mongoose=require('mongoose')
  
const programrun_schema = new mongoose.Schema({
    id :String,
    status:String,
    startDate :Object,
    endDate :Object,
})
  
module.exports = mongoose.model('ProgramRun', programrun_schema);