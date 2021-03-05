import {fetchCharacters} from '../services/apiService.js';


class CharacterCard extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});

  }

  async connectedCallback () {
    const characters = await this.getCharacters();
    this.renderCharacters(characters);
  }

  getCharacters () {
    return fetchCharacters();
  }

  renderCharacters (characters) {
    this.shadowRoot.innerHTML = `
      ${characters.map(char => `<h2>${char.name}</h2>`).join(' ')}
    `;
  }
}

window.customElements.define('character-card', CharacterCard);