# Nutrition App

The application is used to search for products and their ingredients and to create a diet.

## Used API

  <ul>
        <li>
          <a href="https://developer.edamam.com/edamam-docs-recipe-api" target="_blank">Recipe API</a>
        </li>
        <li>
          <a href="https://developer.edamam.com/food-database-api-docs" target="_blank">Food Datebase API</a>
        </li>
  </ul>
  
 ## Usage API
 
 Object-oriented representation of Recipe Api
 
 ```javascript
const RecipeAPI = {
    _connectionLinks: [
        "https://api.edamam.com/search?app_id=<app_id>&app_key=<app_key>",
        "https://api.edamam.com/search?app_id=<app_id>&app_key=<app_key>",
        "https://api.edamam.com/search?app_id=<app_id>&app_key=<app_key>",
        "https://api.edamam.com/search?app_id=<app_id>&app_key=<app_key>"
    ],
    _lastConnectionLink: 0,

    getConnectionLinkFromInput: function(input={}) {
        if(++this._lastConnectionLink >= this._connectionLinks.length) 
            this._lastConnectionLink = 0 ;

        return this._connectionLinks[this._lastConnectionLink] + 
            (input.q == undefined ? '&q=' : '&q=' + input.q) +
            (input.from === undefined ? '' : '&from=' + input.from) +
            (input.to === undefined ? '' : '&to=' + input.to) +
            (input.ingr === undefined ? '' : '&ingr=' + input.ingr) +
            (input.diet === undefined ? '' : '&diet=' + input.diet) +
            (input.health === undefined ? '' : '&health=' + input.health) +
            (input.cuisineType === undefined ? '' : '&cuisineType=' + input.cuisineType) +
            (input.mealType === undefined ? '' : '&mealType=' + input.mealType) +
            (input.dishType === undefined ? '' : '&dishType=' + input.dishType) +
            (input.calories === undefined ? '' : '&calories=' + input.calories) +
            (input.time === undefined ? '' : '&time=' + input.time) +
            (input.excluded === undefined ? '' : '&excluded=' + input.excluded);
    },
    fetchRecipes: async function(input) {
        let conn = this.getConnectionLinkFromInput(input)
        let recipes = await fetch(conn)
            .then(response => response.json())
            .then(data => data.hits.map( d => d.recipe))
            .catch(err => console.log(err));
        return recipes;
    }
}
```

This object allows to get recipes matched to input.


## Calorie Calculator

Nutrition App is ideal for people starting a healthy lifestyle. The application has a calorie calculator that can calculate the optimal number of calories that we should eat during the day. 
The calculator requires the following parameters:
<ul>
      <li>Weight</li>
      <li>Height</li>
      <li>Age</li>
      <li>Gender</li>
      <li>Activity Level
        <ul>
          <li>Sedentary: little or no exercise</li>
          <li>Light: exercise 1-3 times/week</li>
          <li>Moderate: exercise 4-5 times/week</li>
          <li>Active: daily exercise or intense exercise 3-4 times/week</li>
          <li>Very Active: intense exercise 6-7 times/week</li>
          <li>Extra Active: very intense exercise daily, or physical job</li>
          <li>Basal Metabolic Rate (BMR)</li>
        </ul>
      </li>
      <li>Gender</li>
      <li>Body fat</li>
 </ul> 
 
 
