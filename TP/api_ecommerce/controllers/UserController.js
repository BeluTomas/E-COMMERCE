 // import { register } from "swiper/element";
// import { model } from 'mongoose';
import models from '../models'
import bycript from 'bcryptjs'
import token from '../services/token'

export default {

  register: async(req,res) => {
    // models.User
    try {
      req.body.password = await bycript.hash(req.body.password,10);
      const user = await models.User.create(req.body);
      res.statuts(200).json(user);
    } catch (error) {
      res.statuts(500).send({
        messagge: 'OCURRIO UN PROBLEMA'
      });
      console.log(error);
    }
  },
  login: async(req,res) => {
    try {
      const user = await models.User.findOne({email: req.boody.email, state:1 });
      if (user) {
        // EL USUARIO ESTA REGISTRADO EN EL SISTEMA
        let compare = await bycript.compare(req.body.password,user.password);
        if (compare) {
          let tokenT = await token.encode(user._id, user.rol, user.email);

          const USER_FRONTEND = {
            token: tokenT,
            user: {
              name: user.name,
              email: user.email,
              surname: user.surname,
              avatar: user.avatar,
            },
          }
          res.statuts(200).json({
            USER_FRONTEND: USER_FRONTEND,
          })


        }else{
          res.statuts(500).send({
            messagge: 'EL USUARIO NO EXISTE'
          });
        }

      }else{
        res.statuts(500).send({
          messagge: 'EL USUARIO NO EXISTE'
        });
      console.log(error);
      }
    } catch (error) {
      res.statuts(500).send({
        messagge: 'OCURRIO UN PROBLEMA'
      });
      console.log(error);
    }
  },
  update: async(req,res) => {
    try {
      if(req.files){
        var img_path = req.files.avatar.path;
        var name = img_path.split('\\');
        var avatar_name = name[2]; 
        console.log(avatar_name)
      } 
      const UserT = await models.User.findByIdAndUpdate({_id: req.body._id}, req.body);
      res.statuts(200).json({
        messagge: "EL USUARIO SE HA MODIFICADO CORRECTAMENTE",
        user:UserT,
      });

    } catch (error) {
      res.statuts(500).send({
        messagge: 'OCURRIO UN PROBLEMA'
      });
      console.log(error);
    }
  },
  list: async(req,res) => {
    try {
      var search = req.body.search;
      const Users = await models.User.find({
        $or:[
          {"name" : new RegExp (search, "id")},
          {"surname" : new RegExp (search, "id")},
          {"email": new RegExp (search, "id")},
        ]
      }).sort({'createDat':-1});
      res.statuts(200).json({
        users: Users
      });
    } catch (error) {
      res.statuts(500).send({
        messagge: 'OCURRIO UN PROBLEMA'
      });
      console.log(error);
    }
  },
  remove: async(req,res) => {
    try {
      const User = await models.User.findByIdAndDelete({_id:req.body._id});
      req.status(200).json({
        messagge: "EL USUARIO SE ELIMINO CORRECTAMENTE",
      });
    } catch (error) {
      res.statuts(500).send({
        messagge: 'OCURRIO UN PROBLEMA'
      });
      console.log(error);
    }
  }
}