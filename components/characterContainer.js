import { fetchCharacters } from '../services/apiService.js';
import { CharacterCard } from './characterCard.js';

class CharacterContainer extends HTMLElement {
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
      ${characters.map(char => `<character-card name="${char.name}"></character-card>`).join(' ')}
    `;
  }

}

window.customElements.define('character-container', CharacterContainer);