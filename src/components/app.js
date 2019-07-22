// elements
import { btn } from './dom/elements/panel';
import { selected__numbers, game__ticket } from './dom/elements/body';

// functions
import { showFillTicket, switchMessage } from './dom/functions';

// templates
import { ticketTemplate } from './dom/templates/template';

// messages
import { btnText, btnText2, btnText3 } from './messages';

//
// ─── MAIN FUN ───────────────────────────────────────────────────────────────────
//

const app = function () {
  // Pojedinacni tiket array
  let ticket = [];
  // Glavni array gde smestamo sve tikete
  let allTickets = [];
  // Prikazuje pocetnu poruku dole na panelu
  let combinations = [];
  switchMessage();
  // Dodeljuje glavnom dugmetu text
  btn.textContent = btnText;

  const ticketHandler = function () {
    // Ogranicili smo koliko tiketa je maksimalno za popunjavanje
    if (allTickets.length !== 5) {
      // Ogranicili smo koliko brojeva je max za izvlacenje
      if (ticket.length < 5) {
        // proveravamo prazno polje, ako je kliknuto na prazno polje nece ubaciti broj
        if (this.textContent !== ' ') ticket.push(this.textContent);

        // brisemo broj sa table kada kliknem na njega
        this.textContent = ' ';

        // menjamo text na glavnom dugmetu
        btn.textContent = btnText2;

        // ubacujemo klinuti broj u izabrani brojevi
        [...selected__numbers.children].map((item, index) => {
          item.textContent = ticket[index];
        });
      }
    }
  };

  //
  // ─── POTVRDJUEMO TIKET ──────────────────────────────────────────────────────────
  //

  const addTicketHandler = function () {
    // Proveravamo da li je svih 5 tiketa popunjeno
    if (allTickets.length !== 5) {
      // Prikzuje svaki tiket pojedinacno
      showTicketHandler();

      // Krece izvlacenje brojeva
      rollingGame();

      // resetujemo brojeve na tabli
      showFillTicket(ticketHandler);

      // ubacujemo sve tikete u glavni array
      allTickets.push(ticket);

      // praznimo array posle potvrdjivanja tiketa
      ticket = [];

      // brisemo brojeve iz  tabele izabrani brojevi posle potvrdjivanja tiekta
      [...selected__numbers.children].map(item => {
        item.textContent = '';
      });
    }
  };

  //
  // ─── PRIKAZUJEMO TIKET NA EKRANU ────────────────────────────────────────────────
  //

  const showTicketHandler = function () {
    // Ubacujemo tiket u html
    game__ticket.innerHTML += ticketTemplate(ticket);
  };

  //
  // ─── IZVLACENJE TIKETA ──────────────────────────────────────────────────────────
  //

  const rollingGame = function () {
    // Vrsimo proveru da li su svi tiketi popunjeni
    if (allTickets.length === 4) {
      // Menjamo text glavnog dugmea
      btn.textContent = btnText3;
      // Smanjujemo font-size da bi text u glavnom dugmetu bio lepo prikazan
      btn.style.fontSize = '2.3rem';
      // Dodeljujemo glavnom dugmetu novi event
      btn.onclick = playGameHandler;
    }
  };

  // Funkcija koja upravlja izvlacenjem brojeva
  const playGameHandler = function () {
    // Kreiramo arr sa 30 brojeva koji ce nam sluziti kao brojcanik
    const arr = Array.apply(this, Array(30)).map((item, index) => index + 1);

    // Interval koji ce nam izvlaciti na svake 2 sekunde po jedan broj
    const interval = setInterval(getRandomNum, 500);
    // Counter koji nam sluzi da interval zna kada da se zaustavi
    let counter = 0;

    // Funkcija koja vraca random broj
    function getRandomNum () {
      // Counter se povecava za 1 i kada dodje do 12 interval ce prestati da radi
      counter++;

      if (counter <= 12) {
        // Ovde generesimo random broj funkcijom random()
        let num = random();
        // Ovde ubacujemo generisan broj u glavni array
        combinations.push(num);
      } else {
        // Kada je izvuceno 12 brojeva interval prestaje sa radom
        window.clearInterval(interval);
      }

      // Funkcija koja nam vraca random broj
      function random () {
        // Generisemo random broj tako sto arr-u dodajemo kao index random broj i tako dobijamo element iz ovog array-a
        let randNum = arr[Math.floor(Math.random() * arr.length)];
        // Ovde brisemo dobijeni element iz arr-a iz razloga da ga u sledecem krugu nebi dobili kao duplikat
        arr.splice(arr.indexOf(randNum), 1);

        return randNum;
      }
    }
  };

  //
  // ─── GLAVNO DUGME NA KOJE KLIKCEMO ──────────────────────────────────────────────
  //

  btn.onclick = function () {
    // Prikazuje tablu sa koje briramo brojeve
    if (btn.textContent === btnText) showFillTicket(ticketHandler);
    // Pokrece funkciju koja sluzi za popunjavanje i cekiranje tiketa
    if (btn.textContent === btnText2) addTicketHandler();
    // Pokrece funkciju koja sluzi za izvlacenje brojeva
    if (btn.textContent === btnText3) rollingGame();
  };
};

export default app;
