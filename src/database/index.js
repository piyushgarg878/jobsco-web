const { default: mongoose } = require("mongoose");

const connecttoDb=async()=>{
    const connectionUrl="mongodb+srv://piyushgarg878:JOBSCO@cluster0.vhhcu8v.mongodb.net/";
    mongoose.connect(connectionUrl).then(()=>{
        console.log('Connected to JOBSCO database');
    }).catch((err)=>{
        console.log('Error connecting to JOBSCO database',err);
    })
}

export default connecttoDb;