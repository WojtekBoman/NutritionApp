const FoodAPI = {
    _connectionLink: "https://api.edamam.com/api/food-database/parser?app_id=92765610&app_key=106f940d8c4fe8ff994334bd0090abb7",
    getConnectionLinkFromInput: function(input) {
        return this._connectionLink + 
            ('&ingr=' + (input.ingr || '*')) +
            (input.from === undefined ? '' : '&from=' + input.from) +
            (input.to === undefined ? '' : '&to=' + input.to) +
            (input.health === undefined ? '' : '&health=' + input.health) +
            (input.calories === undefined ? '' : '&calories=' + input.calories) +
            (input.page === undefined ? '' : '&page=' + input.page) +
            (input.category === undefined ? '' : '&category=' + input.category) +
            (input.categoryLabel === undefined ? '' : '&categoryLabel=' + input.categoryLabel);
    },
    fetchFood: async function(input = {}) {
        if(typeof input != 'object') return [];
        let conn = this.getConnectionLinkFromInput(input)
        let food = fetch(conn)
            .then(response => response.json())
            .then(data => data.hints.map( d => d.food))
            .catch(err => {console.log(err);});
        return await food || [];
    }
}

const RecipeAPI = {
    _connectionLinks: [
        "https://api.edamam.com/search?app_id=9ea284a6&app_key=34e7f4da7fdd4031c53bd924d6f02417",
        "https://api.edamam.com/search?app_id=c2f53b41&app_key=af3198639e5b4ed7971b4d80702329cf",
        "https://api.edamam.com/search?app_id=731a0df4&app_key=0502c4eb98b6b02b6a2f0fee7ae96f99",
        "https://api.edamam.com/search?app_id=26ae3e57&app_key=5713bfd876b05823c70f1ef1b2fb1287",
        "https://api.edamam.com/search?app_id=c28a6c19&app_key=6017b4e205da5f82a125c901703793d8",
        "https://api.edamam.com/search?app_id=271f06d0&app_key=35220018a054de2fb816c339f29f2c6c"
    ],
    _lastConnectionLink: 0,

    getConnectionLinkFromInput: function(input) {
        if(++this._lastConnectionLink >= this._connectionLinks.length) 
            this._lastConnectionLink = 0 ;

        return this._connectionLinks[this._lastConnectionLink] + 
            ('&q=' + (input.q || '')) +
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
    fetchRecipes: async function(input={}) {
        if(typeof input != 'object') return [];
        let conn = this.getConnectionLinkFromInput(input)
        let recipes = fetch(conn)
            .then(response => response.json())
            .then(data => data.hits.map( d => d.recipe))
            .catch(err => {console.log(err)});
        return await recipes || [];
    }
}

const calories = {
    calculator: function(weight, height, age, gender, activityLevel = 0, bodyFat = 0){
        if(!weight || !height || !age || !gender) {
            console.log( 'Calories calculator: Crucial components not specified!');
            return null;
        }
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
    },
    get Calories(){
        this._calories =  parseInt(localStorage.getItem('calories')) || null;
        return this._calories;
    },
    set Calories(calories){
        if(typeof calories === 'number'){
            localStorage.setItem('calories', ''+calories);
            this._calories = calories;
        }
    }
}
