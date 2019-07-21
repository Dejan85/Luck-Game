import { game__panel__input } from '../elements/panel';
import { welcome, welcome2 } from '../../messages/index';

const switchMessage = () => {
  let i = 0;
  const interval = setInterval(msg, 2000);

  function msg () {
    i++;
    if (i <= 1) {
      game__panel__input.children[0].textContent = welcome;
    } else if (i === 2) {
      game__panel__input.children[0].classList.add('textAnimate');
      game__panel__input.children[0].textContent = welcome2;
    } else if (i >= 2) {
      window.clearInterval(interval);
    }
  }
};

export default switchMessage;
