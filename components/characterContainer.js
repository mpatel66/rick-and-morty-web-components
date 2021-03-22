import { fetchCharactersByPage } from '../services/apiService.js';
import { CharacterCard } from './characterCard/characterCard.js';

class CharacterContainer extends HTMLElement {
  constructor () {
    super();
    this.page = 1;
    this.characterName = '';
    this.attachShadow({mode: 'open'});
  }

  static getObservedAttributes () { return ['characters']; }

  async connectedCallback () {
    try {
      this.characters = await fetchCharactersByPage(this.page);
      this.renderCharacters(this.characters);
      this.createButton();
      
      const submitButton = document.getElementById('filter-character');
      submitButton.addEventListener('click', async () => await this.filterCharacters()
      );

    } catch (e) {
      console.log(e);
    } 
  }

  createButton () {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.setAttribute('id','load-more-button');
    loadMoreButton.innerText = 'Load More';
    loadMoreButton.addEventListener('click', async () => await this.getNextPage());
    document.body.appendChild(loadMoreButton);
  }

  toggleButton () {
    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.toggleAttribute('disabled');
  }

  async filterCharacters () {
    this.characterName = document.querySelector('input').value;
    this.page = 1; // reset page number
    this.characters = await fetchCharactersByPage(this.page, this.characterName);
    this.renderCharacters(this.characters);
  }

  async getNextPage () {
    try {
      this.toggleButton();
      this.page +=1;
      const nextCharacters = await fetchCharactersByPage(this.page, this.characterName);
      if (nextCharacters) {
        this.characters = [...this.characters, ...nextCharacters];
        this.renderCharacters(this.characters);
        window.scrollTo(0, document.body.scrollHeight);
      }
      this.toggleButton();
      
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