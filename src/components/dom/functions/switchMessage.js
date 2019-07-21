import { game__panel__input } from '../elements/panel';
import { welcome, welcome2 } from '../../messages/index';
import { clearInterval } from 'timers';

const switchMessage = () => {
  let i = 0;
  const interval = setInterval(msg, 1500);

  function msg () {
    i++;
    if (i <= 1) {
      game__panel__input.textContent = welcome;
    } else if (i === 2) {
      game__panel__input.textContent = welcome2;
    } else if (i >= 2) {
      window.clearInterval(interval);
    }
  }
};

export default switchMessage;
