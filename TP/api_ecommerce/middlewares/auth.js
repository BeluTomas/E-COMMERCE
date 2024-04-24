import token from "../service/token"

export default {
  verifyClient: async(req,res,next) => {
    if (!req.headers.token){
      res.status(404).send({
          message: 'NO SE ENVIO EL TOKEN'
        });
    }
    const response = await token.decode (req.headers.token);
    if (response){

    } else {res.status(403).send({
          message: 'EL TOKEN NO ES VALIDO'
        });
      } 
  },
  verifyAdmin: async(req,res,next) => {

  }
}