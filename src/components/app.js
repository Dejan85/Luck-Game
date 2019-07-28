// dom elements
import {
  selected__numbers,
  game__ticket,
  fill__ticket,
  game__gameOver,
  start
} from './dom/elements/body';
import {
  btn,
  game__panel__money,
  game__panel__bet,
  score,
  game__newTicket,
  game__resetBtn
} from './dom/elements/panel';

// functions
import { showFillTicket, switchMessage, restAllBalls } from './dom/functions';

// templates
import { ticketTemplate, ball } from './dom/templates/template';

// messages
import { btnText, btnText2, btnText3, btnText4, msg } from './messages';

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
  // Ulozeni novac
  let betMoney = 0;
  // Ovo nam sluzi da izracunamo ulozen novac sa quotama
  let betMoneyWithQuote = 0;
  // Pocetni novac upisujemo u html
  game__panel__money.children[1].textContent = money;
  // Prikazuje pocetnu poruku dole na panelu
  switchMessage(1, msg(1));
  // Dodeljuje glavnom dugmetu text
  btn.textContent = btnText;
  // Kreiramo variablu za interval ovde da bi kasnije mogli da ga zaustavimo
  // na dugme reset
  let interval;

  //
  // ─── START GAME ─────────────────────────────────────────────────────────────────
  //

  start.onclick = function () {
    // Resetujemo sve parametre igre na poetak
    resetGameHandler();
    start.parentElement.style.display = 'none';
  };

  //
  // ─── DODELJUJEMO HANDLER FUNKCIJU INPUTU ZA UNOS ULOGA ──────────────────────────
  //

  // Ispisuje petu poruku
  game__panel__bet.children[0].onclick = function () {
    switchMessage(5, msg(5));
  };

  game__panel__bet.children[0].onkeyup = function (e) {
    // Ako smo pritisnuli enter radi sledece...
    if (e.keyCode === 13) {
      // Ovde pravimo error handler. Ako korisnik upise vise novca nego sto ima
      // ispisace mu u panelu da nema toliko novca
      // 500 smo stavili da bi ostavili tih 500 za tikete u slucaju da hocemo sve da ulozimo odjednom
      const dolar = parseInt(e.target.value) + 500;
      if (dolar > money) {
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
      e.target.value = '';
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
  // ─── U TOKU IGRE IZMEDJU IZVLACENJA BROJEVA MENJA TIKETE ──────────────────
  //

  const newTicketsHandler = function () {
    // Brisemo stare tikete iz html-a
    game__ticket.innerHTML = '';
    // Brisemo stare tickete iz allTickets
    allTickets = [];
    // Brisemo sve kugle iz dom-a
    restAllBalls();
  };

  //
  // ─── INICIJALIZOVANJE FUNKCIJE ZA POCETAK IGRE TIKETA ──────────────────────────────────────────────────────────
  //

  const rollingGame = function () {
    // Vrsimo proveru da li su svi tiketi popunjeni
    if (allTickets.length === 4) {
      /* Menjamo text dugmeta */
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
    // Blokiramo klik kako nebi korisnik mogao da klikne vise puta i tako napravi bug duplog izvlacenja
    btn.onclick = null;
    // Kreiramo arr sa 30 brojeva koji ce nam sluziti kao brojcanik
    const arr = Array.apply(this, Array(30)).map((item, index) => index + 1);

    // Interval koji ce nam izvlaciti na svake 2 sekunde po jedan broj
    interval = setInterval(getRandomNum, 2000);

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
        // Postavljamo input za ulog novca da bude readonly
        // Ovo smo uradili da nebi mogli da u toku izvlacenje ulazemo novac
        game__panel__bet.children[0].setAttribute('readonly', true);
        // Ovde generesimo random broj funkcijom random()
        let num = random();
        // Ovde ubacujemo generisan broj u glavni array
        combinations.push(num);
        // Pozivamo funkciju koja nam racuna dobijemo izgubljeno
        winningCombinationHandler(num, counter);

        // Pozivamo fuknciju koja nam kreira kugle sa brojevima
        ball(num, color, cssVars);
        // Smanjuje vrednost css varijable za 10rema
        cssVars = cssVars - 10;
        // Skidamo event onclick da nebi korisnik mogao da u toku izvlacenja
        // menja tikete
        game__newTicket.onclick = false;
      } else {
        // Kada je izvuceno 12 brojeva interval prestaje sa radom
        window.clearInterval(interval);
        // Praznimo array combinations kako bi mogli da izvlacimo nove brojeve
        combinations = [];
        // Upisujemo ga u html
        score[0].textContent = 0 + '$';
        // Resetujemo ukupno izracunate dobijene pare od ulozenog + quote
        betMoneyWithQuote = 0;
        // Prikazujemo dugme koje sluzi da u toku igre izaberemo neke druge tikete
        game__newTicket.style.visibility = 'visible';
        // Dodeljujemo mu event handler
        game__newTicket.onclick = newTicketsHandler;
        // Menjamo text btn-u
        btn.textContent = btnText4;
        // Dodeljujemo btn-u ponovo handler
        btn.onclick = btnHandler;
        // funkcija koja proverava dobitnne tikete
        winingTicketHandler();
        // Takodje praznimo ulog kako bi mogli ponovo da ulazemo
        betMoney = 0;
        // Ovde vracamo input za unos uloga u normalu
        game__panel__bet.children[0].removeAttribute('readonly');
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

  //
  // ─── FUNKCIJA KOJA PROVERAVA DOBITNE KOMBINACIJE ────────────────────────────────
  //

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
    }
  };

  //
  // ─── FUNKCIJA KOJA PROFERAVA KOLIKO TIKETA SMO DOBILI ───────────────────────────
  //

  const winingTicketHandler = function () {
    // Pobednicki tiketi
    const winingTickets = [];
    // Koliko smo dobili novca
    let winingMoney = 0;

    // Prolazimo kroz sve tikete
    allTickets.forEach(item => {
      // i proveravamo da li je ticket true
      if (typeof item === 'object') {
        // ako jeste prebacujemo ga u arr gde drzimo sve pobednicke tikete
        winingTickets.push(item);
      }
    });

    // Prolazimo kroz pobednicke tikete
    winingTickets.forEach((item, index) => {
      if (item.length === 1) {
        // Ako tiket ima jedan broj vrednost mu je 15
        calc(15, 0.5);
      } else if (item.length === 2) {
        // Ako tiket ima dva broja vrednost mu je 25
        calc(25, 2);
      } else if (item.length === 3) {
        // Ako tiket ima tri broja vrednost mu je 35
        calc(35, 3);
      } else if (item.length === 4) {
        // Ako tiket ima cetiri broja vrednost mu je 60
        calc(60, 4);
      } else if (item.length === 5) {
        // Ako tiket ima pet brojeva vrednost mu je 100
        // I to nam je ujedno i bingo
        calc(100, 5);
      }
    });

    // Ukoliko nismo pogodili nijedan tiket, winingMoney ce biti 0
    // i samim tim na dobijeni novac necemo moci da dodelimo ulozeni novac.
    if (winingMoney != 0) {
      // Pare koje smo dobili dobijamo tako sto saberemo dobijene pare i ulozene pare
      winingMoney = winingMoney + betMoneyWithQuote;
    }
    // Ukupne pare dobijamo ovde tako sto saberemo ukupne pare i dobijene pare
    money = money + winingMoney;
    // Ovde ukupne pare upisujemo u html
    game__panel__money.children[1].textContent = money;

    // Funkcija koja nam racuna dobijene kombinacije
    function calc (num, quote) {
      // Ovde racunamo ulozene pare sa quotom na svakom obijenom tiketu i na kraju dodajemo vec postojece rezultat
      betMoneyWithQuote = betMoney * quote + betMoneyWithQuote;
      // Vraca nam 10 * broj za koliko uvecavamo dobitak u zavisnosti od quote
      // pa plus ponovo dobijene pare zbog da bi se sabirali svi zbirovi
      return (winingMoney = 10 * num + winingMoney);
    }

    // Prikazujemo na panelu poruku
    switchMessage(4, msg(4, winingMoney));

    // Ako izgubimo sav novac, igra je gotova
    if (money <= 0) {
      game__gameOver.style.display = 'flex';

      setTimeout(() => {
        game__gameOver.style.display = 'none';
        start.parentElement.style.display = 'flex';
        window.clearTimeout();
      }, 3000);
    }
  };

  //
  // ─── FUNKCIJA KOJA PONOVO IZVLACI BROJEVE ───────────────────────
  //

  const playAgainHandler = function () {
    // Brisemo sve kugle iz dom-a
    restAllBalls();

    // Oduzimamo od ukupnog novca onih 100$ po uplacenom tiketu
    money = money - 500;

    // Upisujemo promenu u html
    game__panel__money.children[1].textContent = money;

    // slektujemo sve ticket-e
    const select__ticket = [...document.querySelectorAll('#select__ticket')];

    // Vracamo allTikets na pocetno stanje
    allTickets = [];
    // Prolazimo kroz svaki posebno
    select__ticket.forEach((item, index) => {
      // Vracamo allTikets na pocetno stanje
      allTickets.push([]);
      // Prolazimo kroz svaki broj posebno
      [...item.children].forEach((item2, index2) => {
        // Vracamo style na pocetno stanje
        item2.setAttribute(
          'style',
          'color: #4C4C4C; background: white; transition: none;'
        );
        // Ako ima broj, vraticemo broj
        // Ovde treba da pazis, nikako nesmes da uradis parseInt zato
        // sto na pocetku brojevi koje punis u tickete su typeof string.
        // String su iz razloga sto kasnije pogodjen broj prebacujes u true i
        // pogodjene brojeve trazis tako sto obacujes brojeve koji su typeof string
        if (item2.textContent != '') {
          allTickets[index].push(item2.textContent);
        }
      });
    });

    // Ponovo izvlacimo brojeve
    playGameHandler();
  };

  //
  // ─── FUNCKFIJA KOJA RESETUJE CELU IGRU NA PCOETNO STANJE ────────────────────────
  //

  function resetGameHandler () {
    // Pojedinacni tiket array
    ticket = [];
    // Glavni array gde smestamo sve tikete
    allTickets = [];
    // Izvucene kombinacije
    combinations = [];
    // Pocetni novac koji imamo
    money = 5000;
    // Ulozeni novac
    betMoney = 0;
    // Ovo nam sluzi da izracunamo ulozen novac sa quotama
    betMoneyWithQuote = 0;
    // Pocetni novac upisujemo u html
    game__panel__money.children[1].textContent = money;
    // Prikazuje pocetnu poruku dole na panelu
    switchMessage(1, msg(1));
    // Dodeljuje glavnom dugmetu text
    btn.textContent = btnText;
    // Resetujemo sve kugle
    restAllBalls();
    // Resetujemo tikete
    game__ticket.innerHTML = '';
    // Dugme za nove tikete
    game__newTicket.style.visibility = 'hidden';
    // Brisemo iz html-a kompletnu tablu za biranje brojeva
    fill__ticket.style.display = 'none';
    // Prekidamo interval, tacnije prekidamo izvlacenje brojeva
    window.clearInterval(interval);
    // Vracamo glavnom dugmetu onclick event
    btn.onclick = btnHandler;
    // Resetujemo inputu value ako ga imamo
    game__panel__bet.children[0].value = '';
    // Vracamo inputu mogucnost upisa, tj unos uloga
    game__panel__bet.children[0].removeAttribute('readonly');
    // Takodje brisemo iz html-a ulog koji smo upisali
    score[0].textContent = 0 + '$';
  }

  game__resetBtn.onclick = resetGameHandler;

  //
  // ─── FUNKCIJA KOJA UPRAVLLJA KLIKOVIMA GLAVNOG DUGMETA──────────────────────────────────────────────
  //

  const btnHandler = function () {
    // Prikazuje tablu sa koje briramo brojeve
    if (btn.textContent === btnText) showFillTicket(ticketHandler);
    // Pokrece funkciju koja sluzi za popunjavanje i cekiranje tiketa
    if (btn.textContent === btnText2) addTicketHandler();
    // Pokrece funkciju koja sluzi za izvlacenje brojeva
    if (btn.textContent === btnText3) rollingGame();
    // Pokrece funkciju koja sluzi za ponovo izvlacenje brojeva
    if (btn.textContent === btnText4) playAgainHandler();
  };

  btn.onclick = btnHandler;
};

export default app;
