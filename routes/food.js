const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/showRecipes', (req, res, next) => {
  Recipe.showRecipes({}, (err, recipes) =>{
    if(err){
      res.json({success:false, msg:'Failed to load recipes', err:err});
    }else{
      res.json({success:true, recipes:recipes});
    }
  });
});

router.get('/randomRecipe', (req, res, next) =>{
  Recipe.getOneRecipe({}, (err, recipe) =>{
    if(err){
      res.json({success:false, msg:'Failed to load randomRecipe', err:err});
    }else{
      res.json({success:true, recipe:recipe});
    }
  });
});

router.post('/addRecipe', (req, res, next) => {
  let newRecipe = new Recipe({
    name: req.body.name,
    foodType: req.body.foodType,
    enoughFor: req.body.enoughFor,
    rating: req.body.rating,
    ingredients: req.body.ingredients,
    description: req.body.description,
    image: req.body.image
  });

  Recipe.createRecipe(newRecipe, (err, recipe) => {
    if(err){
      res.json({success: false, msg:'Faild to add new recipe'});
    }else{
      res.json({success: true, msg:'Success when adding recipe'});
    }
  });
});

module.exports = router;
