// elements
import { btn } from './dom/elements/panel';
import { selected__numbers, game__ticket } from './dom/elements/body';

// functions
import { showFillTicket, switchMessage } from './dom/functions';

// templates
import { ticketTemplate } from './dom/templates/template';

//
// ─── MAIN FUN ───────────────────────────────────────────────────────────────────
//

const app = function () {
  let ticket = [];
  switchMessage();
  btn.textContent = 'IGRAJ!';

  const ticketHandler = function () {
    if (ticket.length < 5) {
      ticket.push(this.textContent);
      btn.textContent = 'Potvrdi!';

      // ubacujemo klinuti broj u izabrani brojevi
      [...selected__numbers.children].map((item, index) => {
        item.textContent = ticket[index];
      });
    }
  };

  //
  // ─── POTVRDJUEMO TIKET ──────────────────────────────────────────────────────────
  //

  const addTicketHandler = function () {
    showTicketHandler();
    ticket = [];
    [...selected__numbers.children].map((item, index) => {
      item.textContent = '';
    });
  };

  //
  // ─── PRIKAZUJEMO TIKET NA EKRANU ────────────────────────────────────────────────
  //

  const showTicketHandler = function () {
    game__ticket.innerHTML += ticketTemplate(ticket);
  };

  btn.onclick = function () {
    if (btn.textContent === 'IGRAJ!') showFillTicket(ticketHandler);
    if (btn.textContent === 'Potvrdi!') addTicketHandler();
  };
};

export default app;
