const inquirer = require('inquirer');
const fs = require('fs');
const engineer = require('./lib/engineer'); // Classes needed for emplyee list
const intern = require('./lib/intern');
const manager = require('./lib/manager');
let role = "manager"; // Needed to select the correct questions for each employee type
let employees = []; // Holds answers to questions
let employeeObjects = []; // Holds employee objects
const htmlStart =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style.css">
    <title>Employees</title>
</head>
<body>
    <section class="jumbotron jumbotron-fluid bg-danger text-white">
        <h1 class="display-4 text-center">My Team</h1>
    </section>
    <main class="container">
        <div class="row align-items-center justify-content-center">
            <div class="card-deck">`
const htmlCard1 = `
                <div class="card text-center">
                    <h2 class="card-header">`
const htmlCard2 = `</h2>
                    <div class="card-body">
                        <h5 class="card-title">`
                        
const htmlCard3 =       `</h5>
                        <ul class="list-group">
                            <li class="list-group-item">ID: `
                            
const htmlCard4 =           `</li >
                            <li class="list-group-item">Email: <a href = "mailto: `
const htmlCard5 =           `">`
const htmlCard6 =           `</a></li>
                            <li class="list-group-item">`
const htmlCard7 =        `</li >
                        </ul>
                    </div>
                </div>`
const htmlEnd = 
`           
            </div>
        </div>
    </main>
</body>
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

/* Once the user exits the prompt of questions handleInput first runs a for loop to fix a flaw in the way
the program saves roles to the employee list. When the user picks a role it is saved to that current answer
array, not the next. So, if the user picks "engineer", for example, this loop pushes it to the next answer array
so that the correct employee has role "engineer". The first role is always a manager. The next for loop
destructures each array in the employees array and uses that info to create the correct object, which is then
pushed to the employeeObjects array. */
const handleInput = () => {
    for (let i = employees.length - 1; i > 0; i--) {
        employees[i].role = employees[i - 1].role;
    }
    employees[0].role = "manager";
    
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

    createPage();
};

/* Here questions are presented to the user and the answers are saved in the employees array. 
role is then updated and ask() runs again. */
const prompt = (questions) => {
    inquirer.prompt(questions).then((answers) => {
        employees.push(answers);
        role = answers.role;
        ask();
    })
}
 
/* role variable keeps track of employee type which is then used to present the correct questions
for that employee type. The function repeats until role is "exit". */
const ask = () => {
    let questions = [];
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

/* This function creates an index.html page in the dist folder using info from the employeeObjects array. */
const createPage = () => {
    let htmlCards = ""; // will hold html for cards
    let specialGet; // will hold values not shared by all objects
    let pagebreak = ""; // will hold html for a page break after every three employee entries
    
    // This for loop creates a card for each employee
    for (let i = 0; i < employeeObjects.length; i++) {
        if ((i > 0) && (i % 3 == 0)) {
            pagebreak = `
            <div class="w-100"></div>`;
        }
        else {
            pagebreak = "";
        }

        if (employeeObjects[i].constructor.name == 'Manager') {
            specialGet = `Office number: ${employeeObjects[i].officeNumber}`;
        }
        else if (employeeObjects[i].constructor.name == 'Engineer') {
            specialGet = `GitHub:<a href = "https://github.com/${employeeObjects[i].getGithub()}"> ${employeeObjects[i].getGithub()}</a>`;
        }
        else {
            specialGet = `School: ${employeeObjects[i].getSchool()}`;
        }

        htmlCards = htmlCards.concat(pagebreak, htmlCard1, `${employeeObjects[i].name}`, htmlCard2,
            `${employeeObjects[i].getRole()}`, htmlCard3, `${employeeObjects[i].getId()}`,
            htmlCard4, `${employeeObjects[i].getEmail()}`, htmlCard5, `${employeeObjects[i].getEmail()}`,
            htmlCard6, specialGet, htmlCard7);
    }

    let html = htmlStart.concat(htmlCards, htmlEnd);

    fs.writeFile('./dist/index.html', html, (err) =>
        err ? console.error(err) : console.log('html page created!')
    )
}

// Starts program
const init = () => {
    ask();
};

init();