// playing msg
export const msg = (param, param2) => {
  if (param === 1) {
    return 'Dobro došli u igre na sreću!';
  } else if (param === 2) {
    return 'Popunite tiket. Treba da popunite 5 tiketa. Možete izabrati minimalno 1 a maksimalno 5 brojeva. Svaki tiket košta 100$. Takođe možete uložiti dodatni novac.';
  } else if (param === 3) {
    return 'Počinje izvlačenje. Srećno!';
  } else if (param === 4) {
    return `Osvojili ste ukupno ${param2} $`;
  } else if (param === 5) {
    return 'Unesite ulog i pritisnite enter.';
  } else if (param === 6) {
    return `Uložili ste ${param2} $`;
  } else if (param === 7) {
    return 'Nemate toliko novca';
  }
};

// btns
export const btnText = 'IGRAJ!';
export const btnText2 = 'DODAJ!';
export const btnText3 = 'POČNI IZVLAČENJE!';
export const btnText4 = 'IZVLAČI PONOVO';
