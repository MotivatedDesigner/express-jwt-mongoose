const mongoose = require('mongoose');



const connectDB = async () => {
    
        try {
          
          
         await mongoose.connect('mongodb+srv://hamza:qsdf123456@cluster0.nxkva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
           useNewUrlParser:true,
           useUnifiedTopology:true
         });
           console.log('connected to mongodb');
        } catch (err) {
          console.log(err)
        }
     
     }
     
     

module.exports = connectDB