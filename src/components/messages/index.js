// playing msg
export const msg = param => {
  if (param === 1) {
    return 'Dobro dosli u igre na srecu!';
  } else if (param === 2) {
    return 'Popunite tiket. Treba da popunite 5 tiketa. Mozete izabrati minimalno 1 a maksimalno 5 brojeva. Svaki tiket kosta 100$. Takodje mozete uloziti dodatni novac.';
  } else if (param === 3) {
    return 'Pocinje izvlacenje. Srecno!';
  } else if (param === 4) {
    return 'Izvlacenje je zavrseno. Imate 2 dobitna tiketa. Ukupno ste osvojili 400$. Mozete igrati ponovo sa istim tiketima, ili mozete popuniti nove. Vise srece na sledecem izvlacenju!';
  }
};

// btns
export const btnText = 'IGRAJ!';
export const btnText2 = 'DODAJ!';
export const btnText3 = 'POCNI IZVLACENJE!';
