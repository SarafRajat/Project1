const mongoose=require('mongoose')
  
const InstituteSchema = new mongoose.Schema({
    id:String,
    web_url:String,
})
  
module.exports = mongoose.model('Institute', InstituteSchema);