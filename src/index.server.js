const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser=  require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const path = require('path');
const cors = require('cors');
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
app.use(cors());
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname,"uploads")));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use("/api", initialDataRoutes);
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