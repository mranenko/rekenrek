import Dom from './dom.js';


/**
 *  Bead attributes
 */

const BEAD = {
  COLOR: {
    RED: 'red',
    WHITE: 'white',
  },

  POSITION: {
    LEFT: 'left',
    RIGHT: 'right',
  },

  TOTAL: 10,
};


/**
 *  Bead class
 */

export default class Bead {
  static initialize() {
    const beadStrings = document.querySelectorAll('.bead-string');

    beadStrings.forEach((beadString) => {
      /* add beads */
      for (let b = 1; b <= BEAD.TOTAL; b++) {
        const bead = Dom.createElement('span', {
          'class': 'bead',
          'data-order': b,
          'data-color': (b <= BEAD.TOTAL/2) ? BEAD.COLOR.RED : BEAD.COLOR.WHITE,
          'data-position': BEAD.POSITION.RIGHT,
        });

        /* initialize bead events */
        this._initializeEvents(bead);

        /* append bead to bead string */
        beadString.append(bead);
      }
    });
  }


  static _initializeEvents(bead) {
    bead.addEventListener('click', () => {
      const beadString = bead.parentNode;
      const isBeadPositionRight = (bead.dataset.position === BEAD.POSITION.RIGHT);

      if (isBeadPositionRight) {
        for (let b = 1; b <= bead.dataset.order; b++) {
          beadString.querySelector(`[data-order="${b}"]`).dataset.position = BEAD.POSITION.LEFT;
        }
      }
      else {
        for (let b = bead.dataset.order; b <= BEAD.TOTAL; b++) {
          beadString.querySelector(`[data-order="${b}"]`).dataset.position = BEAD.POSITION.RIGHT;
        }
      }

      beadString.querySelectorAll('.hover').forEach((bead) => {
        bead.classList.remove('hover')
      });
    });


    bead.addEventListener('mouseover', () => {
      const beadString = bead.parentNode;
      const isBeadPositionRight = (bead.dataset.position === BEAD.POSITION.RIGHT);

      if (isBeadPositionRight) {
        /* highlight all beads that can be moved left */
        for (let b = 1; b <= bead.dataset.order; b++) {
          const nextBead = beadString.querySelector(`[data-order="${b}"]`);

          if (nextBead.dataset.position === BEAD.POSITION.RIGHT) {
            nextBead.classList.add('hover');
          }
        }
      }
      else {
        /* highlight all beads that can be moved right */
        for (let b = bead.dataset.order; b <= BEAD.TOTAL; b++) {
          const nextBead = beadString.querySelector(`[data-order="${b}"]`);

          if (nextBead.dataset.position === BEAD.POSITION.LEFT) {
            nextBead.classList.add('hover');
          }
        }
      }
    });


    bead.addEventListener('mouseout', () => {
      const beadString = bead.parentNode;

      beadString.querySelectorAll('.hover').forEach((bead) => {
        bead.classList.remove('hover')
      });
    });
  }
}
