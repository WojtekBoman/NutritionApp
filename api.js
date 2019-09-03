const FoodAPI = {
    _connectionLink: "https://api.edamam.com/api/food-database/parser?app_id=92765610&app_key=106f940d8c4fe8ff994334bd0090abb7",
    getConnectionLinkFromInput: function(ingr, input={}) {
        return this._connectionLink + 
            (ingr == undefined ? '&ingr=' : '&ingr=' + ingr) +
            (input.from === undefined ? '' : '&from=' + input.from) +
            (input.to === undefined ? '' : '&to=' + input.to) +
            (input.health === undefined ? '' : '&health=' + input.health) +
            (input.calories === undefined ? '' : '&calories=' + input.calories) +
            (input.page === undefined ? '' : '&page=' + input.page) +
            (input.calories === undefined ? '' : '&calories=' + input.calories) +
            (input.category === undefined ? '' : '&category=' + input.category) +
            (input.categoryLabel === undefined ? '' : '&categoryLabel=' + input.categoryLabel);
    },
    fetchFood: async function(ingr, input) {
        let conn = this.getConnectionLinkFromInput(ingr, input)
        let food = await fetch(conn)
            .then(response => response.json())
            .then(data => data.hints.map( d => d.food))
            .catch(err => console.log(err));
        return food;
    }
}

const RecipeAPI = {
    _connectionLinks: [
        "https://api.edamam.com/search?app_id=ca1ac17c&app_key=055822c03f44a06cf5a82223df807b1b",
        "https://api.edamam.com/search?app_id=215a5b95&app_key=7d9525f9296cf6f78a6ce91a397e1eb1",
        "https://api.edamam.com/search?app_id=54efdf2f&app_key=6979cacf2f7c5af6cd8e28a74a6bf35d",
        "https://api.edamam.com/search?app_id=22a1b92d&app_key=e939ba8dc28ac9e412bbca210ea258c3",
        "https://api.edamam.com/search?app_id=2e04c106&app_key=a9c3321a95172c0b818b7508539a35b3"
    ],
    _lastConnectionLink: 0,

    getConnectionLinkFromInput: function(input={}) {
        if(++this._lastConnectionLink >= this._connectionLinks.length) this._lastConnectionLink = 0 ;
        console.log('num: ' + this._lastConnectionLink + ' conn: ' + this._connectionLinks[this._lastConnectionLink]);
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

const calorieCalculator = (weight, height, age, gender, activityLevel = 0, bodyFat = 0) => {
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
            return Math.floor(bmr * 1.2);
        case 2: // Light: exercise 1-3 times/week
            return Math.floor(bmr * 1.375);
        case 3: // Moderate: exercise 4-5 times/week
            return Math.floor(bmr * 1.465);
        case 4: // Active: daily exercise or intense exercise 3-4 times/week
            return Math.floor(bmr * 1.55);
        case 5: // Very Active: intense exercise 6-7 times/week
            return Math.floor(bmr * 1.725);
        case 6: // Extra Active: very intense exercise daily, or physical job
            return Math.floor(bmr * 1.9);
        default: // case 0 - Basal Metabolic Rate (BMR)
            return Math.floor(bmr);
        /*
        Exercise: 15-30 minutes of elevated heart rate activity.
        Intense exercise: 45-120 minutes of elevated heart rate activity.
        Very intense exercise: 2+ hours of elevated heart rate activity.
        +- 500 cal ~= +- 0.5 kg per week
        max 1 kg per week
        src: https://www.calculator.net/calorie-calculator.html
        */
    }
}

const caloriesLocal = calories => {
    if(calories != undefined){
        localStorage.setItem('calories', ''+calories);
        return calories;
    }
    
    return parseInt(localStorage.getItem('calories')) || 2800;
} 


let input = {
    q: "", // Query
    from:0, 
    to:10,  
    ingr: 10, // count of ingredients
    diet: "balanced",
    //calories: ""
    //mealType
    //dishType
}

function reset() {
    input.q = "";
    Query.value = "";
}



let Query = document.querySelector("#query");

Query.addEventListener('input',(e)=>{
    input.q = e.target.value; 
});

let submitButton = document.querySelector("#form-query input[type=submit]");

submitButton.addEventListener('click',async (e) => {
    e.preventDefault();
    let recipes = await RecipeAPI.fetchRecipes(input);
    reset();
    // Tutaj będzie odbywać się dodawanie przepisów na stronkę;
    // Wybrałem najpotrzebniejsze informacje które powinniśmy umieścić
    recipes.forEach(recipe => {
        console.log(recipe);
        console.log("Label :", recipe.label);
        console.log("Calories :",recipe.calories);
        console.log("Health labels :", recipe.healthLabels);
        console.log("Diet labels :",recipe.dietLabels)
        console.log("Image :",recipe.image)
        console.log("Ingredients :");
        recipe.ingredients.forEach(ing => console.log(ing));
        console.log("Total weight" , recipe.totalWeight);
    })
    
});

