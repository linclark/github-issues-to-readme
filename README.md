## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

1. Install the package globally.
    ```sh
    npm install github-issues-to-readme --global
    ```

1. Create an [OAuth token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) on GitHub
1. Create a config file named `~/.config/github-issue-flattener`. You'll probably want to change permissions, e.g. `sudo chmod 0600 ~/.config/github-issue-flattener`.
1. In the config file, fill in values:
    ```yaml
    token: <your GitHub auth token here>
    ```
1. Add a `repository` field in your `package.json`
1. Add a header `# Issues` at the end of your README.md file
1. Run `github-issues-to-readme` from the root of the project
