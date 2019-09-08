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
 
 #### Implementation
 
 Implementation of calorie calculator is based on <b>Revised Harris-Benedict Equation</b> :
 For men: BMR = 13.397W + 4.799H - 5.677A + 88.362
 For women: BMR = 9.247W + 3.098H - 4.330A + 447.593
 Where :
 <ul>
  <li>W is body weight in kg</li>
  <li>H is body height in cm</li>
  <li>A is age</li>
  <li>F is body fat in percentage</li>
  </ul>
  
   ```javascript
 calculator: function(weight, height, age, gender, activityLevel = 0, bodyFat = 0){
        let bmr;
        if(bodyFat == 0) {
            bmr = gender === 'female' ? 
            9.247 * weight + 3.098 * height - 4.330 * age + 447.593 : 
            13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
        } else {
            bmr = 370 + 21.6 * (1 - bodyFat) * weight;
        }
        
        switch (parseInt(activityLevel)) {
            case 1: // Sedentary: little or no exercise
                return this.Calories = Math.floor(bmr * 1.2);
            case 2: // Light: exercise 1-3 times/week
                return this.Calories = Math.floor(bmr * 1.375);
            case 3: // Moderate: exercise 4-5 times/week
                return this.Calories = Math.floor(bmr * 1.465);
            case 4: // Active: daily exercise or intense exercise 3-4 times/week
                return this.Calories = Math.floor(bmr * 1.55);
            case 5: // Very Active: intense exercise 6-7 times/week
                return this.Calories = Math.floor(bmr * 1.725);
            case 6: // Extra Active: very intense exercise daily, or physical job
                return this.Calories = Math.floor(bmr * 1.9);
            default: // case 0 - Basal Metabolic Rate (BMR)
                return this.Calories = Math.floor(bmr);
            /*
            Exercise: 15-30 minutes of elevated heart rate activity.
            Intense exercise: 45-120 minutes of elevated heart rate activity.
            Very intense exercise: 2+ hours of elevated heart rate activity.
            +- 500 cal ~= +- 0.5 kg per week
            max 1 kg per week
            src: https://www.calculator.net/calorie-calculator.html
            */
        }
```
 
 
