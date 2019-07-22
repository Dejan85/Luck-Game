const state = {
  num: []
};

const gameEngine = function () {
  // fun koja puni tiket izabranim brojevima
  const addNum = function () {
    if (state.num.length < 5) {
      state.num.push(this.textContent);
    }
  };

  const observer = ele1 => {
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type == 'childList') {
          const game__item = [
            ...document.querySelector('#game__item').children
          ];
          const selected__numbers = [
            ...document.querySelector('#selected__numbers').children
          ];

          game__item.forEach(item => {
            item.onclick = function () {
              addNum.apply(this);
              state.num.forEach((item, index) => {
                selected__numbers[index].innerHTML = item;
              });
            };
          });
        }
      }
    };

    const observer = new MutationObserver(callback);

    return observer.observe(ele1, config);
  };

  return {
    state,
    addNum,
    observer
  };
};

export default gameEngine;
