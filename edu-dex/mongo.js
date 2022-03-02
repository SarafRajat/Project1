const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://devcorps:rachit3985@edu-dex-db.eva1r.mongodb.net/EDU_DEX?authSource=admin&replicaSet=atlas-oqyqya-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

module.exports = async()=>{
    await mongoose.connect(dbUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })    

    return mongoose
}