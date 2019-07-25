// message
import { welcome, welcome2, msg3 } from '../../messages/index';

// elements
import { fill__ticket, game__list, selected__numbers } from '../elements/body';
import { game__panel__input } from '../elements/panel';

//
// ─── PRIKAZUJE KOMPLETNU TABELU SA KOJE BIRAMO BROJEVE ZA TIKET ─────────────────
//

export const showFillTicket = fun => {
  // Pozivamo funckiju za ispivanje poruke u panel
  switchMessage('msg2');
  // Postavljamo ticket u block kako bi bio vidljiv
  fill__ticket.style.display = 'block';
  // Kreiramo prazan string
  let str = ``;
  // Ovde kreiramo 30 brojeva iz kojih cemo praviti kombinaciju tiketa
  for (let i = 1; i <= 30; i++) {
    str += `<li class="game__item">${i}</li>`;
  }
  // Ubacujemo kreiran template u html
  game__list.innerHTML = str;
  // Takodje prikazujemo tabelu izabranih brojeva
  showSelectNumbersList();
  // Prolazimo kroz svih 30 brojeva i svakom dodeljujemo event koji nam sluzi
  // za odabir zeljenog broja
  [...game__list.children].map(item => {
    item.onclick = fun;
  });
};

//
// ─── POPUNJAVA LISTE U TABELI IZABRANI BROJEVI ──────────────────────────────────
//

export const showSelectNumbersList = function () {
  // Kreiramo prazan string
  let str = ``;
  // Ubacujemo u str 5 puta template koji smo dole kreirali
  for (let i = 1; i <= 5; i++) {
    str += `<li class="game__item"></li>`;
  }
  // Ubacujemo sve to u html
  selected__numbers.innerHTML = str;
};

//
// ─── MENJA PORUKU KOJA SE PRIKAZUJE DOLE U PANELU ───────────────────────────────
//

export const switchMessage = msg => {
  // Proverava koji poruku treba da prikaze
  if (msg === 'welcome') {
    // Priakzuje poruku
    game__panel__input.children[0].textContent = welcome;
    // Proverava koji poruku treba da prikaze
  } else if (msg === 'msg2') {
    // Dodaje css klasu koja nam daje animaciju
    game__panel__input.children[0].classList.add('textAnimate');
    // Ispisuje poruku
    game__panel__input.children[0].textContent = welcome2;
    // Proverava koji poruku treba da prikaze
  } else if (msg === 'msg3') {
    // Brise css clasu za animaciju posto nam ovde ne treba animacija
    game__panel__input.children[0].classList.remove('textAnimate');
    // Ispisuje poruku
    game__panel__input.children[0].textContent = msg3(1);
  }
};
