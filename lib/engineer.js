const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, githubName) {
        super(name, id, email);
        this.githubName = githubName;
    }

    getGithub() {
        return this.githubName;
    }

    getRole() {
        return 'Engineer';
    }
}
module.exports = Engineer;