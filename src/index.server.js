const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser=  require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
env.config();
//mongodb+srv://root:<password>@flipkart-clone.lugjm.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@flipkart-clone.lugjm.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true
    }
).then(()=>{
    console.log("Database Connected");
}).catch(err=>{
    console.log(err);
})
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.post('/data',(req,res,next)=>{
    res.status(200).json({
        message:req.body
    });
});
app.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'hello from mohamed'
    });
});
app.listen(process.env.PORT,()=>{
    console.log(`server is running in ${process.env.PORT}`);
})