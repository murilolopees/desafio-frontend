'use strict';

class AboutComponent {
    #bio = '';
    #aboutGithubSkeletonId = 'about-github-skeleton';
    #aboutGithubSkeleton = null;

    $elementNode = null;

    constructor(bio) {
        this.#bio = bio;
        this.#aboutGithubSkeleton = document.getElementById(this.#aboutGithubSkeletonId);
    }

    async renderIn(parent) {
        let template = this.getTemplate({
            bio: this.#bio,
        });

        this.$elementNode = parent.appendChild(template);
        this.hideSkeleton();
    };

    getTemplate(data) {
        const content = `<p>${data.bio}</p>`

        const template = document.createElement('template');
        template.innerHTML = content;

        return template.content.firstChild;
    }

    hideSkeleton() {
        if (!(this.#aboutGithubSkeleton))
            return;

        (this.#aboutGithubSkeleton).classList.add('hidden');
    }
}

export default AboutComponent;