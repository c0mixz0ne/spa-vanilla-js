import appConstants from '../common/constants'
import {goTo} from '../router'

class LinkComponent extends HTMLElement {
     constructor(){
        super()
        const shadow = this.attachShadow({mode: 'open'})
        const link = document.createElement('a')
        const style = document.createElement('style')
        this.selected = false;
        style.textContent = `
            a{
                padding:5px;
                margin: 5px 5px 5px 0;
                background-color: #ddd;
                color:#333;
            }
            a:hover{
                background-color:#666;
                color:#eee;
                text-decoration: none;
            }
        `

        shadow.appendChild(style);
        shadow.appendChild(link)
     }

     connectedCallback(){
        const shadow = this.shadowRoot;
        const childNones = shadow.childNodes;

        const href = this.getAttribute('href')
        const link = shadow.querySelector('a')

        link.href = href;
        link.textContent = this.getAttribute('text')
        link.addEventListener('click', this.onClick)
     }

     onClick =(e) => {
        e.preventDefault()
        if(!this.selected){
            const {pathname:path} = new URL(e.target.href)
            goTo(path)
        }
     }

     static get observedAttributes(){
        return ['selected']
     }

     attributeChangedCallback(name, oldValue, newValue){
        if(name === 'selected') {
            this.updateStyle(JSON.parse(newValue))
        }
     }

     updateStyle(selected){
        if(selected){
            const shadow = this.shadowRoot
            const style = shadow.querySelector('style')
            this.selected = true
            style.textContent = `
                a{
                    padding:5px;
                    margin: 5px 5px 5px 0;
                    background-color: #333;
                    text-decoration:none;
                    color:#fff;
                    cursor:default;
                }
            `
        }
     }
}

customElements.define('nav-link', LinkComponent)