// template za ticket
export const ticketTemplate = ticket => {
  let str = '';

  for (let i = 0; i < 5; i++) {
    console.log(ticket[i]);
    if (ticket[i]) {
      str += `<li class="game__item">${ticket[i]}</li>`;
    } else {
      str += `<li class="game__item"></li>`;
    }
  }

  return `<div class="game__ticket--container">
        <div class="game__ticket--header">
          <p class="game__ticket--p"> Tiket: </p>
          <p class="game__ticket--p"> Quota: </p>
        </div>
        <ul class="game__list">
            ${str}
        </ul>
      </div>`;
};

// template za ball
export const ball = counter => {
  return `<div class="game__header--ball">
          <p>${counter}</p>
        </div>`;
};
