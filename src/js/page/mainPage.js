'use strict';

import GithubCardComponent from "../component/githubCardComponent";
import Page from "./page.es6.js";
import AboutComponent from "../component/aboutComponent";

class MainPage extends Page {
    static #challengeSectionId = 'challenge';
    static #challengeSection = document.getElementById(this.#challengeSectionId);

    static #aboutSectionId = 'about';
    static #aboutSection = document.getElementById(this.#aboutSectionId);

    static async init() {
        const githubCardComponent = new GithubCardComponent('murilolopees');
        await this.renderComponent(githubCardComponent, (this.#challengeSection).querySelector('.container'));

        const aboutComponent = new AboutComponent(githubCardComponent.bio);
        await this.renderComponent(aboutComponent, (this.#aboutSection).querySelector('.container'));
    };
}

document.addEventListener("DOMContentLoaded", function() {
    MainPage.init();
});

