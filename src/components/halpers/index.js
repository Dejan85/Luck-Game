import gameEngine from '../game/gameEngine';

const { addNum, state } = gameEngine();

export const observer = (ele1, ele2) => {
  const config = { attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type == 'childList') {
        let game__item = [...document.querySelector('#game__item').children];
        let selected__numbers = document.querySelector('#selected__numbers');

        let xad = [...selected__numbers.children];

        game__item.forEach(item => {
          state.btn = 'DODAJ TIKET';
          item.onclick = function () {
            addNum.apply(this);
            state.num.forEach((item, index) => {
              xad[index].innerHTML = item;
            });
          };
        });
      }
    }
  };

  const observer = new MutationObserver(callback);

  return observer.observe(ele1, config);
};
