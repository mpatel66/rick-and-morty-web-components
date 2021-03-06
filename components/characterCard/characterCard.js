import {styles} from './styles.js';

export class CharacterCard extends HTMLElement {
  constructor () {
    super();
    this._character = {};
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
    `;
  }

  static getObservedAttributes () { return ['character']; }

  set character (char) {
    this._character = char;
    this.renderCharacter(this._character);
  }

  get character () {
    return this._character;
  }

  renderCharacter (character) {
    this.shadowRoot.innerHTML += `
      <div class=character-card> 
        <img class=character-image src=${character.image} />
        <div class=character-details>
          <h3>${character.name}</h3>
          <p>Status: ${character.status}</p>
          <p>Species: ${character.species}</p>
          <p>${character.type ? 'Type: ' + character.type : ''}</p>
        </div>
      </div>
    `;
  }

}

window.customElements.define('character-card', CharacterCard);
