"use strict";
$(document).ready(function(){
  $("#generateRecipe").click(function(){
    $.ajax({
      url: "http://localhost:4000/food/showRecipes",
      cache: false,
      dataType: "json",
    }).done(function(data){
      console.log(data.recipes);
      if (data.success) {
        $("#generateRecipe").hide();
        let randomRecipe = Math.floor((Math.random() * data.recipes.length));
        let name = showName(data.recipes[randomRecipe].name);
        let ingredients = showIngredients(data.recipes[randomRecipe].ingredients, data.recipes[randomRecipe].enoughFor, data.recipes[randomRecipe].rating);
        let image = showHowTo(data.recipes[randomRecipe].image, data.recipes[randomRecipe].description);

        let list = `
        <div class=list-group-item>
          <strong>${name}</strong><br>
          ${ingredients}<br>
          ${image}
        </div>`;

        $("#recipe-list").html(list);
      }else{
        console.log('FAAAAILED');
      }
    });
  });
});

function showName(name){
  let nameRow = `<div class=text-center>${name}</div>`;
  return nameRow;
}

function showIngredients(ingredients, enoughFor, rating){
  let ingredientsRow = `
  <div class=list-group-item container>
    <div class=row>
      <div class=col-xs-6 col-md-12 text-center>Rating: ${rating} / 5 </div>
      <div class=col-xs-6 col-md-12 text-center>Enough food for ${enoughFor} people </div>
    </div>
    <div class=row>
      <div class=col-xs-6 col-md-12><strong>Ingredients</strong>`;
        for(let i = 0; i < ingredients.length; i++){
          ingredientsRow += `
          <ul>
            <li>${ingredients[i].name} - ${ingredients[i].amount}</li>
          </ul>`;
        }
  ingredientsRow += `</div></div></div>`;
  return ingredientsRow;
}

function showHowTo(image, howTo){
  let imageRow = `
  <div class=list-group-item>
    <div class=row>
      <div class=col-xs-12 col-md-12>
        <strong>How to cook the food:</strong> ${howTo}
      </div>
    </div>
    <br>
    <div class=row>
      <div class=col-xs-12 col-md-12>
        <img id="image" src="${image}" alt="img">
      </div>
    </div>
  </div>`;

  return imageRow;
}
