const mongo = require('./mongo')
const instituteSchema = require('./institue_schema')
const program_Schema = require('./program_schema')
const programrun_schema = require('./programrun_schema')
const axios = require('axios');
const { parseString } = require("xml2js");
const url = "https://feeds.edudex.nl/institutes/ksd/feed/?key=b93696f96493a723da06948304d41cca";
const url2= "https://feeds.edudex.nl/institutes/ksd/feed/?key=b93696f96493a723da06948304d41cca&org=tias&program=50";

const connectToMongoDb = async() => {
    await mongo().then(async (mongoose) => {
        {
            console.log("connected to db!");          
        }
    })
}
//save institute 
const saveData = async(id,url) => {
    const Institute = {
        id: id,
        web_url: url,
    }
    await new instituteSchema(Institute).save()
}
//save program
const saveData2 = async(inPublication,includeInExternalCatalog,
                app_open,app_type,paymentDue,startDateDetermination,studyChoiceCheck) => {                
    const Program = {
        inPublication:inPublication,
        includeInExternalCatalog:includeInExternalCatalog,
        app_open:app_open,
        app_type:app_type,
        paymentDue:paymentDue,
        startDateDetermination:startDateDetermination,
        studyChoiceCheck:studyChoiceCheck,
    }
    await new program_Schema(Program).save()
}
//save program run
const saveData3 = async(id,status,startDate,endDate) => {
    const programrun = {
        id:id,
        status:status,
        startDate:startDate,
        endDate:endDate,
    }
    await new programrun_schema(programrun).save()
}


const script= async () => {
    const response = await axios.get(url);
    connectToMongoDb()
    if (response) {        
        // parsing xml data
        parseString(response.data, function (err, results) {
            // parsing to json
            let data = results["edudexDirectory"]["subDirectory"]
            data.forEach(element => {
                let SdUrl = element["directoryUrl"][0]
                let SdId = element["orgUnitId"][0]            
                saveData(SdId,SdUrl);
            });
        });
    }
    console.log("Data Saved To DB successfully!");    
}

const script2= async () => {
    const response2 = await axios.get(url2);
    connectToMongoDb()
    if (response2) {        
        // parsing xml data        
        parseString(response2.data, function (err, results) {
            // parsing to json
            let data = results["program"]["programAdmission"]
            let inPublication = results["program"]["inPublication"][0]
            let includeInExternalCatalog = results["program"]["includeInExternalCatalog"][0]
            data.forEach(element => {
                let app_open = element["applicationOpen"][0]
                let app_type = element["applicationType"][0]
                let paymentDue = element["paymentDue"][0]
                let startDateDetermination = element["startDateDetermination"][0]
                let studyChoiceCheck = element["studyChoiceCheck"][0]
                saveData2(
                    inPublication,includeInExternalCatalog,
                    app_open,app_type,paymentDue,startDateDetermination,
                    studyChoiceCheck
                );
            }
                                
            );            
        });
    }
    console.log("Data2 Saved To DB successfully!");    
}

const script3= async () => {
    const response3 = await axios.get(url2);
    connectToMongoDb()
    if (response3) {        
        // parsing xml data        
        parseString(response3.data, function (err, results) {
            // parsing to json
            let data = results["program"]["programSchedule"]
                data.forEach(element => {
                let data2 = element["programRun"]
                data2.forEach(element2 => {
                    let id = element2["id"][0]
                    let status = element2["status"][0]
                    let startDate = element2["startDate"][0]
                    let endDate  = element2["endDate"][0]
                    saveData3(
                        id,status,startDate,endDate,
                    );  
                });                             
            });
        });
    }
    console.log("Data3 Saved To DB successfully!");    
}


script();
script2();
script3();
