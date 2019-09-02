const itemName = document.querySelector("input[type='text']");
const searchItems = document.querySelector(".searchItems"); //form class="searchItems"
const hintBody = document.querySelector("#listHints"); //ul id="listHints"
const itemsBody = document.querySelector("#listItems"); //ul id="listItems"

const items = [];
const hints = [];

searchItems.addEventListener('submit', searchItem);
hintBody.addEventListener('click', addItem);

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

function addItem(e) {
    //items.push(item); //item, czyli wybrany hint
    const html = items.map(item => {
        return `
        <li>${item.name} <span>${item.calories}</span></li>` //
    });
    document.querySelector("#listHints").innerHTML = ""; 
    hints.length = 0; //czyszczenie hints
 }