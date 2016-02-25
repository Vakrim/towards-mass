const render = require('./render');
const paper = require('./paper');
const state = require('./state');
const symbolsLibrary = require('./symbols-library');

class TowardsMass {

  constructor() {
    this.step = this.step.bind(this);
  }

  start() {
    this.prepareDocument();
    this.state = state;
    this.render = render;

    this.render.init(this.canvas);
    symbolsLibrary.init();
    this.state.init();

    paper.view.on('frame', this.step);
  }

  step() {
    state.step(1/60);
    render.render(this.state);
  }

  prepareDocument() {
    document.body.setAttribute('style', 'margin: 0px; background-color: #000');
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute('resize', true);
    this.canvas.setAttribute('style', 'width: 100%; height: 100%;');
    document.body.appendChild(this.canvas);
  }
}

const game = new TowardsMass();
game.start();
