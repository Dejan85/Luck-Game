//
// ─── ELEMENTS ────────────────────────────────────────────────────────────────────
//

// panel
import {
  btn,
  score,
  game__panel__input,
  game__panel__money,
  game__panel__bet
} from './dom/elements/panel';

import { game__header } from './dom/elements/header';

// tickets
import { ticket, selected__numbers } from './dom/elements/tickets';

//
// ─── TEMPLATES ───────────────────────────────────────────────────────────────────
//

import { ticketTemplate, gameItem } from './dom/templates/template';

//
// ─── MAIN APP ───────────────────────────────────────────────────────────────────
//

const app = () => {
  btn.onclick = () => {};
};

export default app;
