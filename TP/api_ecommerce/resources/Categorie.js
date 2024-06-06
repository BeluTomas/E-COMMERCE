export default {
  categorie_list: (categorie) => {
    return {
      _id:categorie.id,
      tittle: categorie.tittle,
      imagen:categorie.imagen,
      state: categorie.state,
    }
  }
}