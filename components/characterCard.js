
export class CharacterCard extends HTMLElement {
  constructor () {
    super();
    const name = document.createElement('h2');
    name.innerText = this.getAttribute('name');
    const shadow = this.attachShadow({mode: 'open'});

    shadow.appendChild(name);



  }
}

window.customElements.define('character-card', CharacterCard);
