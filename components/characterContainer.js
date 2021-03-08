import { fetchCharacters } from '../services/apiService.js';
import { CharacterCard } from './characterCard/characterCard.js';

class CharacterContainer extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
  }

  static getObservedAttributes () { return ['characters']; }

  async connectedCallback () {
    try {
      this.characters = await fetchCharacters(1);
      this.renderCharacters(this.characters);
      this.createButton();
    } catch (e) {
      console.log(e);
    } 
  }

  createButton () {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.setAttribute('id','load-more-button');
    loadMoreButton.innerText = 'Load More';
    loadMoreButton.addEventListener('click', async () => await this.getNextCharacters());
    document.body.appendChild(loadMoreButton);
  }

  toggleButton () {
    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.toggleAttribute('disabled');
  }

  async getNextCharacters () {
    try {
      const startId = parseInt(this.characters[this.characters.length -1].id);
      if (startId) {
        this.toggleButton();
        const nextCharacters = await fetchCharacters(startId + 1);
        this.characters = [...this.characters, ...nextCharacters];
        this.renderCharacters(this.characters);

        window.scrollTo(0, document.body.scrollHeight);
        this.toggleButton();
      }
      else throw new Error ('Invalid id. Cannot fetch more.');
    } catch (e) {
      console.log(e);
    }
  }

  renderCharacters (characters) {
    const characterCards = characters.map(char => `<character-card id="${char.id}"></character-card>`);
    
    this.shadowRoot.innerHTML = `
      ${characterCards.join(' ')}
    `;
    
    characters.forEach(char => {
      const charElement = this.shadowRoot.getElementById(char.id);
      charElement.character = char;
    });
    
  }

}

window.customElements.define('character-container', CharacterContainer);