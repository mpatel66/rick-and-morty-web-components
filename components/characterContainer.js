import { fetchCharacters } from '../services/apiService.js';
import { CharacterCard } from './characterCard.js';

class CharacterContainer extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
  }

  static getObservedAttributes () { return ['characters']; }

  async connectedCallback () {
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
        const nextCharacters = await this.getCharacters(startId + 1);
        this.characters = [...this.characters, ...nextCharacters];
        this.renderCharacters(this.characters);
        window.scrollTo(0, document.body.scrollHeight);
      }
      else throw new Error ('Invalid id. Cannot fetch more.');
    } catch (e) {
      console.log(e);
    }
  }

  renderCharacters (characters) {
    const characterCards = characters.map(char => `<character-card id="${char.id}"></character-card>`);

    this.shadowRoot.innerHTML += `
      ${characterCards.join(' ')}
    `;

    characters.forEach(char => {
      const charElement = this.shadowRoot.getElementById(char.id);
      charElement.character = char;
    });

  }

}

window.customElements.define('character-container', CharacterContainer);