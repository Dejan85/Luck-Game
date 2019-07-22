// message
import { welcome, welcome2 } from '../../messages/index';

// elements
import { fill__ticket, game__list, selected__numbers } from '../elements/body';
import { game__panel__input } from '../elements/panel';

//
// ─── PRIKAZUJE KOMPLETNU TABELU SA KOJE BIRAMO BROJEVE ZA TIKET ─────────────────
//

export const showFillTicket = fun => {
  fill__ticket.style.display = 'block';

  let str = ``;
  for (let i = 1; i <= 30; i++) {
    str += `<li class="game__item">${i}</li>`;
  }

  game__list.innerHTML = str;

  showSelectNumbersList();

  [...game__list.children].map(item => {
    item.onclick = fun;
  });
};

//
// ─── POPUNJAVA LISTE U TABELI IZABRANI BROJEVI ──────────────────────────────────
//

export const showSelectNumbersList = function () {
  let str = ``;
  for (let i = 1; i <= 5; i++) {
    str += `<li class="game__item"></li>`;
  }

  selected__numbers.innerHTML = str;
};

//
// ─── MENJA PORUKU KOJA SE PRIKAZUJE DOLE U PANELU ───────────────────────────────
//

export const switchMessage = () => {
  let i = 0;
  const interval = setInterval(msg, 2000);

  function msg () {
    i++;
    if (i <= 1) {
      game__panel__input.children[0].textContent = welcome;
    } else if (i === 2) {
      game__panel__input.children[0].classList.add('textAnimate');
      game__panel__input.children[0].textContent = welcome2;
    } else if (i >= 2) {
      window.clearInterval(interval);
    }
  }
};
