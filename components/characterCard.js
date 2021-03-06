
export class CharacterCard extends HTMLElement {
  constructor () {
    super();
    this._character = {};
    this.attachShadow({mode: 'open'});

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
    this.shadowRoot.innerHTML = `
      <div>
        <h2>${character.name}</h2>
        <p>${character.status}</p>
        <p>${character.species}</p>
        <p>${character.type}</p>
      </div>
      <img src=${character.image} />
    `;
  }

}

window.customElements.define('character-card', CharacterCard);
