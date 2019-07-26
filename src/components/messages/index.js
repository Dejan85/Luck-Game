// playing msg
export const msg = (param, param2) => {
  if (param === 1) {
    return 'Dobro dosli u igre na srecu!';
  } else if (param === 2) {
    return 'Popunite tiket. Treba da popunite 5 tiketa. Mozete izabrati minimalno 1 a maksimalno 5 brojeva. Svaki tiket kosta 100$. Takodje mozete uloziti dodatni novac.';
  } else if (param === 3) {
    return 'Pocinje izvlacenje. Srecno!';
  } else if (param === 4) {
    // return `Izvlacenje je zavrseno. Osvojili ste ukupno ${param2} $. Mozete igrati ponovo sa istim tiketima, ili mozete popuniti nove. Vise srece na sledecem izvlacenju!`;
    return `Osvojili ste ukupno ${param2} $`;
  } else if (param === 5) {
    return 'Unesite ulog i pritisnite enter.';
  } else if (param === 6) {
    return `Ulozili ste ${param2} $`;
  } else if (param === 7) {
    return 'Nemate toliko novca';
  }
};

// btns
export const btnText = 'IGRAJ!';
export const btnText2 = 'DODAJ!';
export const btnText3 = 'POCNI IZVLACENJE!';
export const btnText4 = 'IZVLACI PONOVO';
