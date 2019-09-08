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


