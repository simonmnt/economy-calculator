import {debounce} from "./utilities/debounce.js";

const SPPrice = document.getElementById('sp_price');
let SPPriceValue = SPPrice.value;
const E85Price = document.getElementById('e85_price');
let E85PriceValue = E85Price.value;
const averageConsumption = document.getElementById('consommation');
let averageConsumptionValue = averageConsumption.value;
const SP95Column = document.querySelector('.sp95-column');
const E85Column = document.querySelector('.e85-column');
const economyColumn = document.querySelector('.economy-column');

const kilometers = [100, 500, 1000, 5000, 10000, 15000, 20000, 25000, 30000];

function buildUIArray() {
    // Create SP column
    const SPValues = kilometers.map((kilo) => {
        const SPCell = document.createElement('li');

        const priceReference = averageConsumptionValue * SPPriceValue;
        const finalPrice = ((priceReference * kilo) / 100).toFixed(2);

        SPCell.innerText = `${finalPrice}€`
        SP95Column.append(SPCell)

        return finalPrice;
    });

    // Create E85 column
    const E85Values = kilometers.map((kilo) => {
        const E85Cell = document.createElement('li');

        const priceReference = (averageConsumptionValue * 1.2) * E85PriceValue;
        const finalPrice = ((priceReference * kilo) / 100).toFixed(2);

        E85Cell.innerText = `${finalPrice}€`;
        E85Column.append(E85Cell);

        return finalPrice;
    });

    // Create economy column
    SPValues.map((value, i) => {
        const economyCell = document.createElement('li');
        economyCell.innerText = `${(value - E85Values[i]).toFixed(2)}€`;

        economyColumn.append(economyCell)

        return value - E85Values[i];
    });
}

function clearData() {
    SP95Column.innerHTML = '';
    E85Column.innerHTML = '';
    economyColumn.innerHTML = '';
}

function handlerEvents() {
    SPPrice.addEventListener('keydown', debounce((evt) => {
        evt.preventDefault();

        if (isFinite(evt.key) || evt.key === ',' || evt.key === '.' || evt.key === 'Backspace') {
            SPPriceValue = evt.target.value;
            clearData();
            buildUIArray();
        }
    }, 500));

    E85Price.addEventListener('keydown', debounce((evt) => {
        evt.preventDefault();

        if (isFinite(evt.key) || evt.key === ',' || evt.key === '.' || evt.key === 'Backspace') {
            E85PriceValue = evt.target.value;
            clearData();
            buildUIArray();
        }
    }, 500));

    averageConsumption.addEventListener('keydown', debounce((evt) => {
        evt.preventDefault();

        if (isFinite(evt.key) || evt.key === ',' || evt.key === '.' || evt.key === 'Backspace') {
            averageConsumptionValue = evt.target.value
            clearData();
            buildUIArray();
        }
    }, 500));
}

function init() {
    handlerEvents();
    buildUIArray();
}

init();
