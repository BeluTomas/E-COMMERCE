import jwt from 'jsonwebtoken'
// import { models } from 'mongoose';
import models from '../models'
export default {
  encode: async(_id,rol,email) => {
    const token =jwt.sign ({_id: _id, rol:rol, email:email}, 'ecommerce', {expiresIn:'1d'});
    return token;
  },
  //descodificar token 
  decode: async(token) => { 
    try {
      const {_id} = await jwt.verify(token,'ecommerce');
      const user = models.user.findOne({_id:_id, state:1});
      if(user){
        return user;
      }
      return false;
    } catch (error) {
      console.log(error);
    }

  }

}