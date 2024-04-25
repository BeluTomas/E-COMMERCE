import express from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './router'


//CONEXION A LA BASE DE DATOS


mongoose.Promise = global.Promise;
const dbUrl = "mongodb://127.0.0.1:27017/ecommerce"; //nombre de la BD

mongoose.connect(  //conexion con MongoDb
    dbUrl , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
). then(mongoose => console.log("CONECTADO A LA BD EN PUERTO 27017") )  //En caso de exito
.catch(err=> console.log(err)); //En caso de error


const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/api/',router)


app.set('port',process.env.PORT ||3000); //variable del puerto


app.listen(app.get('port'), () => {
    console.log("EL SERVIDOR SE EJECUTO PERFECTAMENTE EN EL PUERTO 3000");
})
