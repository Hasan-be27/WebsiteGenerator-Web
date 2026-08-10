export default class GitHubService {

    constructor(baseURL = "http://localhost:3000") {

        this.baseURL =
            baseURL.replace(/\/$/, "");

    }

    async deploy({ folderName, files }) {

        const response =
            await fetch(
                `${this.baseURL}/github/deploy`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        folderName,
                        files
                    })
                }
            );

        const result =
            await response.json();

        if (!response.ok || !result.ok) {

            throw new Error(
                result.error ||
                "GitHub deployment failed."
            );

        }

        return result.deployment;

    }

}
