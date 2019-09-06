class Recipe
{
    constructor(name, calories)
    {
        this.label = label;
        this.calories = calories;
    }
}

var form = document.querySelector(".searchForm");
form.addEventListener("submit", findRecipes);

var calculatorForm = document.querySelector(".calculatorForm");
calculatorForm.addEventListener("submit", calculateCalories);
calculatorForm.style.display = "none";

function showCalc()
{
    if (calculatorForm.style.display == "none") {
        calculatorForm.style.display = "flex";
        getStorage();
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
    var input = {q: query.value, calories: calories.value};
    var recipes = await RecipeAPI.fetchRecipes(input);

    if(recipes.length == 0)
    {
        alert("Recipes not found!");
        query.reset();
        document.getElementById("submit").disabled = false;
        return;
    }
    displayRecipes(recipes);
}

function displayRecipes(recipes)
{
    for(var x = 0; x < recipes.length; x++)
    {
        var link = document.createElement('a');
        link.setAttribute('href', recipes[x].url);
        link.setAttribute('target', "_blank");
        var recipeElement = document.createElement("li");
        recipeElement.innerHTML = `<h3>${recipes[x].label}<br>${Math.floor(recipes[x].calories)}kcal</h3>`;
        link.appendChild(recipeElement);
        document.getElementById("recipes").appendChild(link);
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
    var bodyFat = document.getElementById("bodyFat").value==="" ? 0 : document.getElementById("bodyFat").value/100;
    var caloriesCalc = await calories.calculator(weight, height, age, gender, activityLevel, bodyFat);

    document.getElementById("calories").value = caloriesCalc;
    showCalc();
    setStorage(weight, height, age, gender, activityLevel, bodyFat);
}

function setStorage(weight, height, age, gender, activityLevel, bodyFat)
{
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('age', age);
    localStorage.setItem('gender', gender);
    localStorage.setItem('activityLevel', activityLevel);
    localStorage.setItem('bodyFat', bodyFat);
}

function getStorage()
{
    document.getElementById("weight").value = parseInt(localStorage.getItem('weight'));
    document.getElementById("height").value = parseInt(localStorage.getItem('height'));
    document.getElementById("age").value = parseInt(localStorage.getItem('age'));
    if(localStorage.getItem('gender') == "male")
    {
        document.getElementById("male").checked = true;
    }
    else if(localStorage.getItem('gender') == "female")
    {
        document.getElementById("female").checked = true;
    }
    document.getElementById("activityLevel").value = parseInt(localStorage.getItem('activityLevel'));
    document.getElementById("bodyFat").value = parseInt(localStorage.getItem('bodyFat'));
}