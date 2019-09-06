class Recipe
{
    constructor(name, calories)
    {
        this.name = name;
        this.calories = calories;
    }
}

var form = document.querySelector(".searchForm");
form.addEventListener("submit", findRecipes);

var calculatorForm = document.querySelector(".calculatorForm");
calculatorForm.addEventListener("submit", calculateCalories);

function showCalc()
{
    if (calculatorForm.style.display === "none") {
        calculatorForm.style.display = "flex";
    } else {
        calculatorForm.style.display = "none";
    }
}

async function findRecipes(e)
{
    e.preventDefault();
    document.getElementById("recipes").innerHTML="";
    var calories = document.getElementById("calories");
    var query = document.getElementById("query");
    var input = {ingr: query.value, calories: calories.value};
    var recipes = await RecipeAPI.fetchRecipes(input);

    if(recipes.length == 0)
    {
        alert("Recipes not found!");
        form.reset();
        document.getElementById("submit").disabled = false;
        return;
    }
    displayRecipes(recipes);
}

function displayRecipes(recipes)
{
    for(var x = 0; x < recipes.length; x++)
    {
        var recipeElement = document.createElement("li");       
        recipeElement.innerHTML = `<h3>${recipes[x].label}<br>${Math.floor(recipes[x].calories)}kcal</h3>`;
        document.getElementById("recipes").appendChild(recipeElement);
    }
}

async function calculateCalories(e)
{
    e.preventDefault();
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("male").checked ? "male" : "female";
    var activityLevel = document.getElementById("activityLevel").value;
    var bodyFat = document.getElementById("bodyFat").value==="" ? 0 : document.getElementById("bodyFat").value;
    var caloriesCalc = await calories.calculator(weight, height, age, gender, activityLevel, bodyFat);

    document.getElementById("calories").value = caloriesCalc;
    showCalc();
}

