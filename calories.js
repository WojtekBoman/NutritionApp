class Product
{
    constructor(name, calories, amount)
    {
        this.name = name;
        this.calories = calories;
        this.amount = amount;
        this.totalCalories = Math.floor((calories / 100) * amount);
    }
}

var products = [];

async function findProduct()
{
    document.getElementById("submit").disabled = true;
    var name = document.getElementById("product");
    var amount = document.getElementById("amount");

    if(name.value == "" || amount.value == "")
    {
        alert("Don't leave empty spaces!");
        return;
    }

    var input = {ingr: name.value}
    var hints = await FoodAPI.fetchFood(input);

    if(hints.length == 0)
    {
        alert("Product not found!");
        name.value = "";
        amount.value = "";
        document.getElementById("submit").disabled = false;
        return;
    }

    var temporaryProducts = [];

    for(var x = 0; x < 5; x++)
    {
        temporaryProducts.push(new Product(hints[x].label, Math.floor(hints[x].nutrients.ENERC_KCAL), amount.value));
    }
    displayHints(temporaryProducts);
    name.value = "";
    amount.value = "";
    document.getElementById("submit").disabled = true;
}

function displayHints(temporaryProducts)
{
    for(var x = 0; x < temporaryProducts.length; x++)
    {
        var hintElement = document.createElement("li");       
        hintElement.innerHTML = "<h3>" + temporaryProducts[x].name + "<br>" + temporaryProducts[x].totalCalories + " kcal</h3>"
        document.getElementById("hints").appendChild(hintElement);
        hintElement.addEventListener("click", function(event)
        {
            chooseProduct(event, temporaryProducts);
        });
    }

    document.getElementById("hints").style.display = "flex";
}

function closeHints()
{
    var parent = document.getElementById("hints");
    while(parent.children.length >= 2)
    {
        parent.removeChild(parent.children[1]);
    }
    parent.style.display = "none";
    document.getElementById("submit").disabled = false;
}

function chooseProduct(event, temporaryProducts)
{   
    var target = event.target;
    var list = document.getElementById("hints");
    if(target.parentNode != list)
    {
        target = target.parentNode;
    }
    var index = Array.prototype.indexOf.call(list.children, target);
    
    addProduct(temporaryProducts[index - 1]);

    var parent = document.getElementById("hints");
    while(parent.children.length >= 2)
    {
        parent.removeChild(parent.children[1]);
    }
    parent.style.display = "none";
    document.getElementById("submit").disabled = false;
}

function addProduct(product)
{
    products.push(product);
    document.getElementById("number").innerHTML = parseInt(document.getElementById("number").innerHTML, 10) + product.totalCalories;
    var productElement = document.createElement("li");       
    productElement.innerHTML = "<h3>" + product.name + "<br>" + product.totalCalories + " kcal</h3><div style='width: 40px; height: 40px; border: 1px solid; border-radius: 50%; background-image: url(https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-round-512.png); background-size: contain;'></div>";
    document.getElementById("products").appendChild(productElement);
    productElement.children[1].addEventListener("click", removeItem)
}

function removeItem(event)
{
    var parent = event.target.parentNode;
    var index = Array.prototype.indexOf.call(parent.parentNode.children, parent);
    document.getElementById("number").innerHTML = (parseInt(document.getElementById("number").innerHTML, 10) - products[index].totalCalories);
    products.splice(index, 1);
    parent.parentNode.removeChild(parent);
}