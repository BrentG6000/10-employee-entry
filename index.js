const inquirer = require('inquirer');
const fs = require('fs');
const employee = require('./lib/employee');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');
const manager = require('./lib/manager');
let role = "manager";
let employees = [];
let questions = [];
const htmlStart =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/style.css">
    <title>Employees</title>
</head>
<body>
    <div class="jumbotron jumbotron-fluid bg-danger text-white">
        <h1 class="display-4 text-center">My Team</h1>
    </div>`
const htmlEnd = 
`</body>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</html>`
const menu = [
    {
        type: "list",
        message: "Would you like to add another employee?:",
        name: "role",
        choices: ["engineer", "intern", "exit"]
    }
];
const managerQuestions = [
    {
        type: "input",
        message: "Enter the manager's name:",
        name: "name",
    },
    {
        type: "number",
        message: "Enter the manager's id number:",
        name: "id",
    },
    {
        type: "input",
        message: "Enter the manager's email:",
        name: "email",
    },
    {
        type: "number",
        message: "Enter the manager's office number:",
        name: "office",
    },
];
const engineerQuestions = [
    {
        type: "input",
        message: "Enter the engineer's name:",
        name: "name",
    },
    {
        type: "number",
        message: "Enter the engineer's id number:",
        name: "id",
    },
    {
        type: "input",
        message: "Enter the engineer's email:",
        name: "email",
    },
    {
        type: "input",
        message: "Enter the engineer's GitHub username:",
        name: "github",
    },
];
const internQuestions = [
    {
        type: "input",
        message: "Enter the intern's name:",
        name: "name",
    },
    {
        type: "number",
        message: "Enter the intern's id number:",
        name: "id",
    },
    {
        type: "input",
        message: "Enter the intern's email:",
        name: "email",
    },
    {
        type: "input",
        message: "Enter the intern's school:",
        name: "school",
    },
];

const handleInput = () => {
    for (let i = employees.length - 1; i > 0; i--) {
        employees[i].role = employees[i - 1].role;
    }
    employees[0].role = "manager";

    // May want to change arrays to const
    let employeeObjects = [];
    let temp;

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].role == "manager") {
            const [name, id, email, office] = Object.values(employees[i]);
            temp = new manager(name, id, email, office);
            employeeObjects.push(temp);
        }
        else if (employees[i].role == "engineer") {
            const [ name, id, email, github ] = Object.values(employees[i]);
            temp = new engineer(name, id, email, github);
            employeeObjects.push(temp);
        }
        else {
            const [ name, id, email, school ] = Object.values(employees[i]);
            temp = new intern(name, id, email, school)
            employeeObjects.push(temp);
        }
    }
    console.log(employeeObjects);
};

const prompt = (questions) => {
    inquirer.prompt(questions).then((answers) => {
        employees.push(answers);
        role = answers.role;
        ask();
    })
}
 
const ask = () => {
    switch (role) {
        case "manager":
            questions = [...managerQuestions, ...menu]
            prompt(questions)
            break;
        case "engineer":
            questions = [...engineerQuestions, ...menu]
            prompt(questions)
            break;
        case "intern":
            questions = [...internQuestions, ...menu]
            prompt(questions)
            break;
        default:
            handleInput();
    }
}

const createPage = () => {
    // appendFile() takes in 3 arguments: path, data, and callback function
    fs.writeFile('index.html', htmlStart, (err) =>
        err ? console.error(err) : console.log('html added!')
    );
    fs.appendFile('index.html', htmlEnd, (err) =>
        err ? console.error(err) : console.log('html added!')
    );
}

const init = () => {
    //ask();
    createPage();
};

init();

// Need to style index.html with bootstrap if possible
// Need to get object info into index.html