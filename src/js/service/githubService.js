class GithubService {
    static url = 'https://api.github.com';

    static async getData(username) {
        return await this.fetch(`users/${username}`, "Error getting user's data");
    }

    static async getRepositories(username) {
        return await this.fetch(`users/${username}/repos`, "Error getting user's repositories list");
    }

    static async getStarred(username) {
        return await this.fetch(`users/${username}/starred`, "Error getting user's starred repositories");
    }

    static async fetch(endpoint, errorMsg) {
        let response = await fetch(`${this.url}/${endpoint}`);

        if (response.status !== 200) {
            throw new Error(errorMsg);
        }

        return await response.json();
    }
}

export default GithubService;