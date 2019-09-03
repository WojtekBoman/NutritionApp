const itemName = document.querySelector("input[type='text']");
const amount = document.querySelector("input[type='number']");
const searchItems = document.querySelector(".searchItems"); //form class="searchItems"
const hintBody = document.querySelector("#listHints"); //ul id="listHints"
const itemsBody = document.querySelector("#listItems"); //ul id="listItems"
const caloriesBody = document.querySelector("#caloriesSum"); //div id="caloriesSum"

const items = [];
const hints = [];
let caloriesSum = "";

searchItems.addEventListener('submit', searchItem);
hintBody.addEventListener('click', addItem); //tu trzeba dodać, żeby wiedział który element listy został naciśnięty



function searchItem(e) {
    e.preventDefault();

    cos=[1,2,3,4,5]; //przykładowa lista z hintami

    cos.map(item => {
        hints.push(item); //lista z 5 hintami
    });

    const html = hints.map(hint => { //wczytywanie hintów do html
        return `
        <li>${hint} <span>${hint}</span></li>` //tu trzeba wprowadzić nazwę produktu ew. zdjęcie i kalorie
    });

    hintBody.innerHTML=html.join('');
    this.reset();
}

function addItem(e) { //dodawanie wybranego hinta do listy itemów
    //items.push(e); //e, czyli wybrany hint
    let amountVar = toNumber(amount)/100; //dzielimy przez 100 zakładając, że kalorie w API są podane na 100g produktu
    const html = items.map(item => {
        return `
        <li>${item.name} <span>${toNumber(item.calories)*amountVar}</span></li>` //
    });
    updateCalories();
    hintBody.innerHTML = "";
    hints.length = 0; //czyszczenie hints

}

function updateCalories() {
    const addedItemsCal = document.querySelectorAll("#itemsbody > li > span") //robię to w ten sposób by liczyć kalorie wraz biorąc po uwagę amount
        caloriesSum = items.map(item => {
        caloriesSum += item.calories;
    })
    caloriesBody.innerHtml = caloriesSum;
}