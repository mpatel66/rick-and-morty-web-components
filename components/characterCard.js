

export class CharacterCard extends HTMLElement {
  constructor () {
    super();
    this._character = {};
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: sans-serif;
          text-align: center;
        }
        h3 {
          color: red;
          margin: 0;
          padding: 5px 0px 5px 0px;
        }
        p {
          margin: 0;
          padding: 5px 0px 5px 0px;
        }
        .character-card {
          display: flex;
          flex-direction: column;
          width: 210px;
          height: 370px;
          padding: 10px;
          margin: 20px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

        }
        .character-image {
          margin-bottom: 15px;
        }
        .character-details {
          display:flex;
          flex-direction: column;
          align-items: center;
        }
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
