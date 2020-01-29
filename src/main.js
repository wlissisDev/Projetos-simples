import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEL = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');


        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    //evita que o form recarregue a pagina 
    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEL.value;

        if (repoInput.length === 0)
            return;

        const response = await api.get(`/repos/${repoInput}`);

        const { name, description, html_url, owner: { avatar_url }} = response.data;

        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url,
        })

        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        })
    }

}

new App(); 