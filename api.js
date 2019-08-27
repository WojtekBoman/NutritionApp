const RecipeAPI = {
    _connectionLink: "https://api.edamam.com/search?app_id=ca1ac17c&app_key=055822c03f44a06cf5a82223df807b1b",
    getConnectionLinkFromInput: function(q = '', input = {}) {
        console.log(input);
        return this._connectionLink + 
            (q == undefined ? '&q=' : '&q=' + q) +
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
    fetchRecipes: async function(q, input) {
        let conn = this.getConnectionLinkFromInput(q, input)
        let recipes = await fetch(conn)
            .then(response => response.json())
            .then(data => data.hits.map( d => d.recipe))
            .catch(err => console.log(err));
        // console.table(recipes);
        console.log(recipes);
        return recipes;
    }
}

const calorieCalculator = (weight, height, age, gender, activityLevel = 0, bodyFat) => {
    let bmr;
    if(bodyFat === undefined) {
        bmr = gender === 'female' ? 
        9.247 * weight + 3.098 * height - 4.330 * age + 447.593 : 
        13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    } else {
        bmr = 370 + 21.6 * (1 - bodyFat) * weight;
    }
    switch (activityLevel) {
        case 1: // Sedentary: little or no exercise
            return bmr * 1.2;
        case 2: // Light: exercise 1-3 times/week
            return bmr * 1.375;
        case 3: // Moderate: exercise 4-5 times/week
            return bmr * 1.465;
        case 4: // Active: daily exercise or intense exercise 3-4 times/week
            return bmr * 1.55;
        case 5: // Very Active: intense exercise 6-7 times/week
            return bmr * 1.725;
        case 6: // Extra Active: very intense exercise daily, or physical job
            return bmr * 1.9;
        default: // case 0 - Basal Metabolic Rate (BMR)
            return bmr;
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