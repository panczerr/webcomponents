class Modal extends HTMLElement {
    constructor() {
        super();
        this.isVisible = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                #modal {
                    position: fixed;
                    top: 20vh;
                    left: 30vw;
                    z-index: 11;
                    background: white;
                    width: 40vw;
                    border-radius: 20px;
                    box-shadow: 0 2px 20px rgba(0,0,0,0.40);
                    display: flex;
                    opacity: 0;
                    pointer-events: none;
                    flex-flow: column;
                    justify-content: space-between;
                }
                
                :host([opened]) #modal,
                :host([opened]) #backdrop {
                    opacity: 1;
                    pointer-events: all;
                }
                header {
                    padding: 1rem;
                    font-weight: bold;
                    font-size: 22px;
                    background: greenyellow;
                    border-radius: 20px 20px 0 0;
                }
                
                section {
                    padding: 1rem;
                }
                
                footer {
                    padding: 0.25rem;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: flex-end;
                }
                footer button {
                    margin: 0.5rem;
                    cursor: pointer;
                }
                footer button.cancel {
                    background: red;
                    border-radius: 3px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.20)
                }
                footer button.approve {
                    background: greenyellow;
                    height: 25px;
                    width: 50px;
                    border-width: 1px;
                    border-radius: 6px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.20)
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>Confirmation dialog</header>
                <section id="main-section">
                    <slot>
                        Here is a place for a question, do you like it? <br/>2<br/>3<br/>4<br/>something
                    </slot>
                </section>
                <footer>
                    <button class="cancel">Cancel</button>
                    <button class="approve">Ok</button>
                </footer>
            </div>
        `;
        this.shadowRoot.querySelector('button.cancel').addEventListener('click', this.closeModal.bind(this));
    }

    connectedCallback() {
        if(this.hasAttribute('opened')) {
            this.isVisible = true;
        }
    }

    openModal() {
        this.isVisible = true;
        this.setAttribute('opened', '');
    }

    closeModal() {
        this.isVisible = false;
        this.removeAttribute('opened');
    }
}

customElements.define('wc-modal', Modal);