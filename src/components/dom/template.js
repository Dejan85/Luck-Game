// template za ticket
export const ticketTemplate = (counter, tiket, quota) => {
  return ` <div class="game__ticket--container">
        <div class="game__ticket--header">
          <p class="game__ticket--p"> Tiket: ${tiket}</p>
          <p class="game__ticket--p"> Quota: ${quota}</p>
        </div>
        <ul class="game__list">
          <li class="game__item">
        ${counter}
          </li>
          <li class="game__item">
          ${counter}
          </li>
          <li class="game__item">
          ${counter}
          </li>
          <li class="game__item">
          ${counter}
          </li>
          <li class="game__item">
          ${counter}
          </li>
        </ul>
      </div>`;
};

// template za item u listi u "popunite tiket"
export const gameItem = counter => {
  return `<li class="game__item">
    ${counter}
  </li>`;
};

// template za ball
export const ball = counter => {
  return `<div class="game__header--ball">
          <p>${counter}</p>
        </div>`;
};
