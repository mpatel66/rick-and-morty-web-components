import {fetchCharacters} from '../services/apiService.js';


class CharacterCard extends HTMLElement {
  constructor () {
    super();
    //create enclosing div that holds info on character
    const card = document.createElement('div');
    card.setAttribute('class','card');

    // get name attribute and add the text to the paragraph tag
    const name = document.createElement('h3');
    name.textContent = this.getAttribute('name');

    // append p to the card div
    card.appendChild(name);


    const style = document.createElement('style');
    style.textContent = `
      .card {
        width: 90%;
        border: 1px solid black;
        padding: 1rem;
      }
    `;
    // create a shadow dom. Add the style and card div to the shadow dom.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(style);
    shadow.appendChild(card);

  }

  connectedCallback () {
    this.getCharacters();
  }

  getCharacters () {
    return fetchCharacters();
  }
}

window.customElements.define('character-card', CharacterCard);