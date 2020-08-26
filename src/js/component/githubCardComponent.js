'use strict';

import GithubService from "../service/githubService";

class GithubCardComponent {
    #loadedGitHubCard = false;
    #cardGithubSkeletonId = 'card-github-skeleton';
    #cardGithubSkeleton = null;
    #username = '';
    bio = '';

    $elementNode = null;

    constructor(username) {
        this.#username = username;
        this.#cardGithubSkeleton = document.getElementById(this.#cardGithubSkeletonId);
    }

    async renderIn(parent) {
        let template = '';

        try {
            const userInfo = await GithubService.getData(this.#username);
            this.bio = userInfo.bio;

            const repositoriesList =  await GithubService.getRepositories(this.#username);
            const starredList =  await GithubService.getStarred(this.#username);

            template = this.getTemplate({
                userInfo: userInfo,
                repositoriesList: repositoriesList,
                starredList: starredList
            });
        } catch (err) {
            this.bio = 'Ops! não foi possível carregar as informações de biografia do desenvolvedor.';
            template = this.getTemplateError();
        }

        this.$elementNode = parent.appendChild(template);
        this.hideSkeleton();
        this.initEventClickRepositories();
        this.initEventClickStarred();
    };

    initEventClickRepositories() {
        const btn = (this.$elementNode).querySelector("#view-repositories-btn");
        if (!btn) {
            return;
        }

        btn.addEventListener("click", () => {
            (this.$elementNode).querySelector('#repositories-list').classList.remove('hidden');
        });
    }

    initEventClickStarred() {
        const btn = (this.$elementNode).querySelector("#view-starred-btn");
        if (!btn) {
            return;
        }

        btn.addEventListener("click", () => {
            (this.$elementNode).querySelector('#starred-list').classList.remove('hidden');
        });
    }

    hideSkeleton() {
        if (!(this.#cardGithubSkeleton))
            return;

        (this.#cardGithubSkeleton).classList.add('hidden');
    }

    getTemplate(data) {
        this.#loadedGitHubCard = true;

        const repositoriesListContent = data.repositoriesList.length ? `<table>
                    <tr><td>${data.repositoriesList.map((el) => el.name).join('</td></tr><tr><td>')}</td></tr>
                </table>` : '<span class="no-results">Nenhum repositório foi encontrado.</span>';

        const starredListContent = data.starredList.length ? `<table>
                    <tr><td>${data.starredList.map((el) => el.name).join('</td></tr><tr><td>')}</td></tr>
                </table>` : '<span class="no-results">Nenhum repositório foi favoritado.</span>';

        const content = `<div id="card-github" class="flex">
            <div class="img-container flex flex-column align-center justify-content-center">
                <img src="${data.userInfo.avatar_url}" alt="profile-img">
                <a target="_blank" href="${data.userInfo.html_url}" id="github-link" class="text-uppercase">Visitar perfil</a>
            </div>
            <div class="info-container">
                <h2 class="text-uppercase info-text">Repositórios: <span id="repository-count">${data.userInfo.public_repos}</span></h2>
                <h2 class="text-uppercase info-text">Seguidores: <span id="followers-count">${data.userInfo.followers}</span></h2>
                <h2 class="text-uppercase info-text">Seguindo: <span id="following-count">${data.userInfo.following}</span></h2>
                <div class="actions flex">
                    <button id="view-repositories-btn" class="button"><span class="text-uppercase">Ver repositórios</span></button>
                    <button id="view-starred-btn" class="button"><span class="text-uppercase">Ver favoritos</span></button>
                </div>
            </div>
            <div id="repositories-list" class="hidden">
                <h3 class="text-uppercase info-text">Lista dos repositórios</h3>
                ${repositoriesListContent}
            </div>
            <div id="starred-list" class="hidden">
                <h3 class="text-uppercase info-text">Lista dos repositórios favoritados</h3>
                ${starredListContent}
            </div>
        </div>`;

        const template = document.createElement('template');
        template.innerHTML = content;

        return template.content.firstChild;
    }

    getTemplateError() {
        const content = `<div id="card-github" class="flex">
            <div class="flex flex-column align-center">
                <img src="assets/img/sad.png" alt="sad" width="96">
                <h1 class="text-center">Ops! Ocorreu um erro ao carregar as informações do desenvolvedor.</h1>
            </div>
        </div>`;

        const template = document.createElement('template');
        template.innerHTML = content;

        return template.content.firstChild;
    }
}

export default GithubCardComponent;