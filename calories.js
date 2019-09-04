class Product
{
    constructor(name, calories)
    {
        this.name = name;
        this.calories = calories;
    }
}

var products = [];

async function findProduct()
{
    var name = document.getElementById("product");
    var amount = document.getElementById("amount");

    if(name.value == "" || amount.value == "")
    {
        alert("Don't leave empty spaces!");
        return;
    }

    var input = {ingr: name.value}
    var hints = await FoodAPI.fetchFood(input);

    var temporaryProducts = [];

    for(var x = 0; x < 5; x++)
    {
        temporaryProducts.push(new Product(hints[x].label, Math.floor(hints[x].nutrients.ENERC_KCAL)));
    }
    displayHints(temporaryProducts);  
}

function displayHints(temporaryProducts)
{
    for(var x = 0; x < temporaryProducts.length; x++)
    {
        var hintElement = document.createElement("li");       
        hintElement.innerHTML = "<h3>" + temporaryProducts[x].name + "<br>" + temporaryProducts[x].calories + " kcal</h3>"
        document.getElementById("hints").appendChild(hintElement);
        hintElement.addEventListener("click", chooseProduct);
    }

    document.getElementById("hints").style.display = "flex";
}

function chooseProduct(event)
{   
    var target = event.target;
    var list = document.getElementById("hints");
    if(target.parentNode != list)
    {
        target = target.parentNode;
    }
    var index = Array.prototype.indexOf.call(list.children, target);
    console.log(index);
}