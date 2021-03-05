import { fetchCharacters } from '../services/apiService.js';
import { CharacterCard } from './characterCard.js';

class CharacterContainer extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
  }

  async connectedCallback () {
    const characters = await this.getCharacters(1);
    this.renderCharacters(characters);
  }

  getCharacters (startId) {
    return fetchCharacters(startId);
  }

  
  renderCharacters (characters) {
    this.shadowRoot.innerHTML = `
      ${characters.map(char => `<character-card name="${char.name}"></character-card>`).join(' ')}
    `;
  }

}

window.customElements.define('character-container', CharacterContainer);