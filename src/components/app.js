// dom elements
import { btn } from './dom/elements/panel';
import { selected__numbers, game__ticket } from './dom/elements/body';
import {
  game__panel__money,
  game__panel__bet,
  score
} from './dom/elements/panel';

// functions
import { showFillTicket, switchMessage } from './dom/functions';

// templates
import { ticketTemplate, ball } from './dom/templates/template';

// messages
import { btnText, btnText2, btnText3, msg } from './messages';

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
  // Pocetni novac koji imamo
  let money = 5000;
  // Novac koji smo osvojili
  let incMoney = 0;
  // Ulozeni novac
  let betMoney = 0;
  // Dodeljujemo pocetni novac
  game__panel__money.children[1].textContent = money;
  // Prikazuje pocetnu poruku dole na panelu
  switchMessage(1, msg(1));
  // Dodeljuje glavnom dugmetu text
  btn.textContent = btnText;

  //
  // ─── DODELJUJEMO HANDLER FUNKCIJU INPUTU ZA UNOS ULOGA ──────────────────────────
  //

  game__panel__bet.children[0].onclick = function () {
    // Ispisuje petu poruku
    switchMessage(5, msg(5));
  };

  game__panel__bet.children[0].onkeyup = function (e) {
    // Ako smo pritisnuli enter radi sledece...
    if (e.keyCode === 13) {
      // Ovde pravimo error handler. Ako korisnik upise vise novca nego sto ima
      // ispisace mu u panelu da nema toliko novca
      if (parseInt(e.target.value) > money) {
        return switchMessage(7, msg(7));
      }
      // Dodeljuje vrednost ili ulozen broj
      // Takodje ga parsujemo u broj posto sa e.target.value dobijamo string
      betMoney = parseInt(e.target.value);
      // Oduzima ulozeno od ukupnog novca
      money = money - e.target.value;
      // Ispisujemo promenu u html-u
      game__panel__money.children[1].textContent = money;
      // Ispisujemo promenu takodje u html u score prikaz
      score[0].textContent = betMoney + '$';
      // Ispisujemo poruku
      switchMessage(6, msg(6, betMoney));
    }
  };

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
    // Na svaki ubaceni tiket ovde skidamo od ukupnog novca po 100$
    money = money - 100;
    // Promenu upisujemo u HTML
    game__panel__money.children[1].textContent = money;

    // Proveravamo da li je svih 5 tiketa popunjeno
    // Takodje proveravamo da li je ticket popunjen da nebi mogli da ubacimo prazan tiket
    if (allTickets.length !== 5 && ticket.length >= 1) {
      // Prikzuje svaki tiket pojedinacno
      showTicketHandler();
      // Krece izvlacenje brojeva
      rollingGame();
      // prikazujemo brojeve na "Popunite tiket"
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
    switchMessage(3, msg(3));
    // Blokiramo klik kako nebi korisnik mogao da klikne vise puta i tako napravi bug
    btn.onclick = null;
    // Kreiramo arr sa 30 brojeva koji ce nam sluziti kao brojcanik
    const arr = Array.apply(this, Array(30)).map((item, index) => index + 1);

    // Interval koji ce nam izvlaciti na svake 2 sekunde po jedan broj
    const interval = setInterval(getRandomNum, 10);
    // Counter koji nam sluzi da interval zna kada da se zaustavi
    let counter = 0;
    // Coutner koji nam sluzi da bi uticali na css variablu
    let cssVars = 124.5;
    // funkcija koja nam vraca random broj
    function getRandomNum () {
      // setuje random color koji nam sluzi dole da prosledimo
      // funkciji za bojenje svake kugle pojedinacno
      let color = `#${Math.random().toString(16).substring(2, 8)}`;
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
          // Proveravamo vrednost u tiketu da li je string (ako je string
          // znaci da je ostao broj koji nismo pogodili)
          // Ako je true imamo pogodjen broj

          if (typeof item2 === 'string') {
            // Na osnovu gore dobijenog resultata, ako imamo da je item2 === string,
            // znaci da tiket nije dobijen i bojimo ga u crveno
            [...select__ticket[index].children].forEach(item => {
              item.setAttribute('style', 'color: white; background: #ff0000;');
            });

            // Ovde postavljamo ceo arra-y koji predstavlja ticket u false
            // Ovo nam treba da bi znali koliko dobitnih tiketa imamo
            allTickets[index] = false;
          }
        });
      });

      // funkcija koja proverava dobitnne tikete
      winingTicketHandler();
    }
  };

  //
  // ─── FUNKCIJA KOJA PROFERAVA KOLIKO TIKETA SMO DOBILI ───────────────────────────
  //

  const winingTicketHandler = function () {
    const winingTickets = [];
    let winingMoney = 0;

    allTickets.forEach(item => {
      if (typeof item === 'object') {
        winingTickets.push(item);
      }
    });

    winingTickets.forEach(item => {
      if (item.length === 1) {
        calc(15);
      } else if (item.length === 2) {
        calc(25);
      } else if (item.length === 3) {
        calc(35);
      } else if (item.length === 4) {
        calc(60);
      } else if (item.length === 5) {
        calc(100);
      }
    });

    // Ukoliko nismo pogodili nijedan tiket, winingMoney ce biti 0
    // i samim tim na dobijeni novac necemo moci da dodelimo ulozeni novac.
    if (winingMoney != 0) {
      // Pare koje smo dobili dobijamo tako sto saberemo dobijene pare i ulozene pare
      winingMoney = winingMoney + betMoney * 2;
    }
    // Ukupne pare dobijamo ovde tako sto saberemo ukupne pare i dobijene pare
    money = money + winingMoney;
    // Ovde ukupne pare upisujemo u html
    game__panel__money.children[1].textContent = money;

    // Funkcija koja nam racuna dobijene kombinacije
    function calc (num) {
      // Vraca nam 10 * broj za koliko uvecavamo dobitak u zavisnosti od quota
      // pa plus ponovo dobijene pare zbog da bi se sabirali svi zbirovi
      return (winingMoney = 10 * num + winingMoney);
    }

    // Prikazujemo na panelu poruku
    switchMessage(4, msg(4, winingMoney));
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
