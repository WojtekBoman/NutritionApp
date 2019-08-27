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

// RecipeAPI.fetchRecipes({
//     q: "fish"
// })
