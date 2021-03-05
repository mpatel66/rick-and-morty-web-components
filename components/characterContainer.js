import { fetchCharacters } from '../services/apiService.js';
import { CharacterCard } from './characterCard.js';

class CharacterContainer extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
  }

  static getObservedAttributes () { return ['characters']; }

  async connectedCallback () {
    console.log('connected');
    this.characters = await this.getCharacters(1);
    this.renderCharacters(this.characters);

    const loadMoreButton = document.getElementById('loadMoreButton');
    loadMoreButton.addEventListener('click', async () => await this.getNextCharacters());

  }

  async getCharacters (startId) {
    try {
      return await fetchCharacters(startId);
    } catch (e) {
      console.log(e);
    }
  }

  async getNextCharacters () {
    try {
      const startId = parseInt(this.characters[this.characters.length -1].id);
      if (startId) {
        this.characters = await this.getCharacters(startId + 1);
        this.renderCharacters(this.characters);
        window.scroll(0, window.innerHeight);
      }
      else throw new Error ('Invalid id. Cannot fetch more.');
    } catch (e) {
      console.log(e);
    }
  }

  renderCharacters (characters) {
    this.shadowRoot.innerHTML += `
      ${characters.map(char => `<character-card name="${char.name}"></character-card>`).join(' ')}
    `;
  }

}

window.customElements.define('character-container', CharacterContainer);