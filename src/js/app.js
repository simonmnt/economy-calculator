import {debounce} from "./utilities/debounce.js";

const SPPrice = document.getElementById('sp_price');
let SPPriceValue = SPPrice.value;
const E85Price = document.getElementById('e85_price');
let E85PriceValue = E85Price.value;
const averageConsumption = document.getElementById('consommation');
let averageConsumptionValue = averageConsumption.value;
const economyContainer = document.querySelector('.economy-container');

const kilometers = [100, 500, 1000, 5000, 10000, 15000, 20000, 25000, 30000];

function buildUIArray() {
    const kilometersColumn = document.createElement('div');
    kilometersColumn.innerHTML = `<div class="header-column">km</div>`
    kilometersColumn.className = 'column kilometer-column';

    const SP95Column = document.createElement('div');
    SP95Column.innerHTML = `<div class="header-column">Coût SP</div>`
    SP95Column.className = 'column sp95-column';

    const E85Column = document.createElement('div');
    E85Column.innerHTML = `<div class="header-column">Coût E85 (+20%)</div>`
    E85Column.className = 'column e85-column';

    const economyColumn = document.createElement('div');
    economyColumn.innerHTML = `<div class="header-column">Économie</div>`
    economyColumn.className = 'column economy-column';

    // Create kilometer column
    kilometers.forEach((kilometer, index) => {
        const kilometerCell = document.createElement('div');

        kilometerCell.innerText = kilometer;
        kilometerCell.dataset.kilometer = kilometer;

        kilometersColumn.append(kilometerCell);
    });

    // Create SP column
    const SPValues = kilometers.map((kilo) => {
        const SPCell = document.createElement('div');

        const priceReference = averageConsumptionValue * SPPriceValue;
        const finalPrice = ((priceReference * kilo) / 100).toFixed(2);

        SPCell.innerText = `${finalPrice}€`
        SP95Column.append(SPCell)

        return finalPrice;
    });

    // Create E85 column
    const E85Values = kilometers.map((kilo) => {
        const E85Cell = document.createElement('div');

        const priceReference = (averageConsumptionValue * 1.2) * E85PriceValue;
        const finalPrice = ((priceReference * kilo) / 100).toFixed(2);

        E85Cell.innerText = `${finalPrice}€`;
        E85Column.append(E85Cell);

        return finalPrice;
    });

    // Create economy column
    SPValues.map((value, i) => {
        const economyCell = document.createElement('div');
        economyCell.innerText = `${(value - E85Values[i]).toFixed(2)}€`;

        economyColumn.append(economyCell)

        return value - E85Values[i];
    });

    economyContainer.append(kilometersColumn);
    economyContainer.append(SP95Column);
    economyContainer.append(E85Column);
    economyContainer.append(economyColumn);
}

function clearData() {
    economyContainer.innerHTML = '';
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
