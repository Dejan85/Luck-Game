import { game__header } from '../elements/header';

// template za ticket
export const ticketTemplate = ticket => {
  // Kreiramo prazan string
  let str = '';

  // Ubacujemo 5 template-a u string
  for (let i = 0; i < 5; i++) {
    // Ovde kazemo ako imamo odabran broj, kreiracemo "li" sa tim brojem,
    if (ticket[i]) {
      str += `<li class="game__item">${ticket[i]}</li>`;
    } else {
      // Inace, kreiramo prazan "li"
      str += `<li class="game__item"></li>`;
    }
  }

  // Ovo nam je template za ticket, dodeljujemo mu gore vec definisan str
  // ili template i sve to zajedno ubacujemo u HTML
  return `<div class="game__ticket--container ">
        <div class="game__ticket--header">
          <p class="game__ticket--p"> Tiket: </p>
          <p class="game__ticket--p"> Quota: <span id="quote">${ticket.length}</span></p>
        </div>
        <ul class="game__list" id="select__ticket">
            ${str}
        </ul>
      </div>`;
};

// Kreiramo kuglu koja nam prikazuje broj
export const ball = (num, color, cssVars) => {
  // Kreiramo div
  let div = document.createElement('div');
  // Kreiramo p tag
  let p = document.createElement('p');
  // Dodeljujemo p tagu dinamicno boju
  // Inace ovaj p tag nam je deo koji je obojen na kugli
  p.style.background = `${color}`;
  // Dodeljujemo div-u class-u
  div.classList.add('game__header--ball');
  // Dodeljujemo p tagu text
  p.textContent = `${num}`;
  // Ubacujemo P u div
  div.appendChild(p);
  // U css-u imamo kreiranu css variablu. Ovde tu css variblu dinamicno menjamo na svaki interval tick
  div.style.setProperty(`--test`, `${cssVars}rem`);
  // Sve to ubacujemo u game__header div
  game__header.appendChild(div);
};
