// elements
import { btn } from './dom/elements/panel';
import { selected__numbers, game__ticket } from './dom/elements/body';
import { game__header } from './dom/elements/header';

// functions
import { showFillTicket, switchMessage } from './dom/functions';

// templates
import { ticketTemplate, ball } from './dom/templates/template';

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
  // Izvucene kombinacije
  let combinations = [];
  // Prikazuje pocetnu poruku dole na panelu
  switchMessage();
  // Dodeljuje glavnom dugmetu text
  btn.textContent = btnText;

  //
  // ─── POPUNJAVANJE TIKETA ────────────────────────────────────────────────────────
  //

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
      // Menjamo text glavnog dugmeta
      btn.textContent = btnText3;
      // Smanjujemo font-size da bi text u glavnom dugmetu bio lepo prikazan
      btn.style.fontSize = '2.3rem';
      // Dodeljujemo glavnom dugmetu novi event
      btn.onclick = playGameHandler;
    }
  };

  //
  // ─── FUNKCIJA KOJA UPRAVLJA IZVLACENJEM BROJEVA ─────────────────────────────────
  //

  const playGameHandler = function () {
    // Blokiramo klik kako nebi korisnik mogao da klikne vise puta i tako napravi bug
    btn.onclick = null;
    // Kreiramo arr sa 30 brojeva koji ce nam sluziti kao brojcanik
    const arr = Array.apply(this, Array(30)).map((item, index) => index + 1);

    // Interval koji ce nam izvlaciti na svake 2 sekunde po jedan broj
    const interval = setInterval(getRandomNum, 2000);
    // Counter koji nam sluzi da interval zna kada da se zaustavi
    let counter = 0;
    // Coutner koji nam sluzi da bi uticali na css variablu
    let cssVars = 124.5;
    // Boje koje sve random swicuju po svakoj izucenoj kugli
    const colors = ['#0cc42e', '#f80001', '#ffcc0c', '#0e07f3'];

    // funkcija koja nam vraca random broj
    function getRandomNum () {
      // setuje random color koji nam sluzi dole da prosledimo
      // funkciji za bojenje svake kugle pojedinacno
      let color = colors[Math.floor(Math.random() * colors.length)];
      // Counter se povecava za 1 i kada dodje do 12 interval ce prestati da radi
      counter++;
      if (counter <= 12) {
        // Ovde generesimo random broj funkcijom random()
        let num = random();
        // Ovde ubacujemo generisan broj u glavni array
        combinations.push(num);

        winningCombinationHandler(num, counter);

        // Pozivamo fuknciju koja nam kreira kugle sa brojevima
        ball(num, color, cssVars);
        // Smanjuje vrednost css varijable za 10rema
        cssVars = cssVars - 10;
      } else {
        // Kada je izvuceno 12 brojeva interval prestaje sa radom
        window.clearInterval(interval);
        // Vracamo klick kako bi mogao korisnik ponovo mogao da pokrene izvlacenje
        btn.onclick = playGameHandler;
        // Praznimo array combinations kako bi mogli da izvlacimo nove brojeve
        combinations = [];
      }

      // Funkcija koja nam generise random broj
      function random () {
        // Generisemo random broj tako sto arr-u dodajemo kao index random
        // broj i tako dobijamo element iz ovog array-a
        let randNum = arr[Math.floor(Math.random() * arr.length)];

        // Ovde brisemo dobijeni element iz arr-a iz razloga
        // da ga u sledecem krugu nebi dobili kao duplikat
        arr.splice(arr.indexOf(randNum), 1);

        return randNum;
      }
    }
  };

  // funkcija koja proverava dobitne kombinacije
  const winningCombinationHandler = function (num, counter) {
    // Selektujemo liste, i koristimo spred operator da bi dobili array umesto node list.
    const select__ticket = [...document.querySelectorAll('#select__ticket')];
    // Ovde prolazimo kroz sve kombinacije
    allTickets.forEach(function (ele, ticket) {
      // Ovde prolazimo kroz svaku kombinaciju posebno.
      // Ticket nam je koji je tiket.
      ele.forEach((item, numInTicket) => {
        // Proveravamo da li je element u pojedinacnom array-u jednak izvucenom broju.
        // numInTicket nam je broj u tiketu koji smo pogodili
        if (item == num) {
          // Prolazimo kroz html elemente. Svaki je u formi <ul>5x<li>u</ul>.
          // Ticket-om dobijamno koja lista je dobijena,
          // a numInTicket-tom u listi koji je broj izvucen.
          // Dobijenom rezultatu dodajemo css style
          select__ticket[ticket].children[numInTicket].setAttribute(
            'style',
            'color: white; background:#81c405'
          );
        }
      });
    });

    // Kada su svi brojevi izvuceni
    if (counter === 12) {
      // Ovde proalzimo kroz sve tiketa
      for (let i = 0; i < allTickets.length; i++) {
        // Ovde prolazimo kroz sve izvucene brojeve
        for (let x = 0; x < combinations.length; x++) {
          // Ovde prolazimo kroz svaki tiket pojedinacno
          for (let y = 0; y < allTickets[i].length; y++) {
            // Proveravamo izvuceni brojeve sa brojevima iz tiketa
            if (combinations[x] == allTickets[i][y]) {
              // Ako smo pogodili broj, u taj tiket (array) umesto broja postavljamo vrednost true
              allTickets[i][y] = true;
            }
          }
        }
      }

      // Prolazimo kroz sve tikete
      allTickets.forEach((item, index) => {
        // Prolazimo kroz svaki tiket posebno
        item.forEach(item2 => {
          // Proveravamo vrednost u tiketu da li je string (ako je string znaci da je ostao broj koji nismo pogodili)
          // Ako je true imamo pogodjen broj
          if (typeof item2 === 'string') {
            // Na osnovu gore dobijenog resultata, ako imamo da je item2 === string,
            // znaci da tiket nije dobijen i bojimo ga u crveno
            [...select__ticket[index].children].forEach(item => {
              item.setAttribute('style', 'color: white; background: #ff0000;');
            });
          }
        });
      });
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
