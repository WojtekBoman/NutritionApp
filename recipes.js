class Recipe
{
    constructor(name, calories)
    {
        this.name = name;
        this.calories = calories;
    }
}

var recipes = [];

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
    var calories = document.getElementById("calories");
    var input = {calories: calories.value}
    var recipes = await FoodAPI.fetchRecipes(input);

    if(recipes.length == 0)
    {
        alert("Recipes not found!");
        form.reset();
        document.getElementById("submit").disabled = false;
        return;
    }
}

async function calculateCalories(e)
{
    e.preventDefault();
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("male").checked ? document.getElementById("male").value : document.getElementById("female").value;
    var activityLevel = document.getElementById("activityLevel").value;
    var bodyFat = document.getElementById("bodyFat").value==="" ? 0 : document.getElementById("bodyFat").value;
    console.log(weight, height, age, male, female, gender, activityLevel, bodyFat);
    //var caloriesCalc = await calories.calculator(weight, height, age, gender, activityLevel, bodyFat);

    //document.getElementById("calories").value = caloriesCalc;


}