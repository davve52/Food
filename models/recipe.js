const mongoose = require('mongoose');
const config = require('../config/database');

const RecipeSchema = mongoose.Schema({
  name:{
     type: String,
     required: true
   },
   foodType: {
     type: String,
     required: true
   },
   enoughFor: {
     type: Number,
     required: true
   },
  rating: {
     type: Number,
     required: true
   },
   ingredients:[{
     name:{
       type: String,
       required: true
     },
     amount:{
       type: String,
       required: true
     }
   }],
   description: {
     type: String,
     required: true
   },
   image:{
     type:String,
     required: true
   }
});

const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

module.exports.getOneRecipe = function({}, callback){
  //Recipe.findById({_id:id}, callback);
}

module.exports.showRecipes = function({}, callback){
  Recipe.find({}, callback);
}

module.exports.createRecipe = function(newRecipe, callback){
  newRecipe.save(callback);
}
