import { game__header } from '../elements/header';

// template za ticket
export const ticketTemplate = ticket => {
  let str = '';

  for (let i = 0; i < 5; i++) {
    if (ticket[i]) {
      str += `<li class="game__item">${ticket[i]}</li>`;
    } else {
      str += `<li class="game__item"></li>`;
    }
  }

  return `<div class="game__ticket--container">
        <div class="game__ticket--header">
          <p class="game__ticket--p"> Tiket: </p>
          <p class="game__ticket--p"> Quota: </p>
        </div>
        <ul class="game__list">
            ${str}
        </ul>
      </div>`;
};

// template za ball
export const ball = (num, color) => {
  // Kreiramo div
  let div = document.createElement('div');
  // Kreiramo p
  let p = document.createElement('p');
  // Dodeljujemo div-u class-u
  div.classList.add('game__header--ball');
  // Dodeljujemo p tagu text
  p.textContent = '10';
  // Ubacujemo P u div
  div.appendChild(p);
  // Sve to ubacujemo u game__header div
  return game__header.appendChild(div);
};
