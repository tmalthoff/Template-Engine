const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");




const teamArray = []

function makeTeam() {

    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Please choose if you are a manager, intern, or engineer.",
            choices: ["Manager", "Intern", "Engineer", "Done"],
        }
    ])
        .then(userAnsw => {

            switch (userAnsw.role) {

                case "Manager":
                    putManager();
                    break;

                case "Intern":
                    putIntern();
                    break;

                case "Engineer":
                    putEngineer();
                    break;

                case "Done":
                    putDone();
                    break;


            }
        })
}

function putManager() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your full name?",
                name: "name",
                validate: function(answer) {
                    if(answer !== "") {
                        return true;

                    }
                    return "Please enter your name"
                }
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "email",
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    console.log(pass)
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input",
                message: "What is your id number?",
                name: "id",
                validate: (answer) => {
                    const pass = answer.match(/^SW\d{4}$/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter your four digit code"
                }

            },
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber",
            },

        ])
        .then(userAnsw => {
            console.log(userAnsw)


            const manager = new Manager(userAnsw.name, userAnsw.email, userAnsw.id, userAnsw.officeNumber)

            teamArray.push(manager)

            makeTeam();
        })

}
function putIntern() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your full name?",
                name: "name",
                validate: function(answer) {
                    if(answer !== "") {
                        return true;

                    }
                    return "Please enter your name"
                }
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your id number?",
                name: "id",
                validate: (answer) => {
                    const pass = answer.match(/^SW\d{4}$/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter your four digit code"
                }

            },
            {
                type: "input",
                message: "What school did you attend?",
                name: "school",
                validate: function(answer) {
                    if(answer !== "") {
                        return true;

                    }
                    return "Please enter your name"
                }
            },

        ])
        .then(userAnsw => {
            console.log(userAnsw)


            const intern = new Intern(userAnsw.name, userAnsw.email, userAnsw.id, userAnsw.school)

            teamArray.push(intern)

            makeTeam();
        })

}
function putEngineer() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your full name?",
                name: "name",
                validate: function(answer) {
                    if(answer !== "") {
                        return true;

                    }
                    return "Please enter your name"
                }
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your id number?",
                name: "id",
                validate: (answer) => {
                    const pass = answer.match(/^SW\d{4}$/);
                    if (pass === true) {
                        return true;
                    }
                    return "Please enter your four digit code"
                }

            },
            {
                type: "input",
                message: "What is your github username?",
                name: "userName",
                validate: function(answer) {
                    if(answer !== "") {
                        return true;

                    }
                    return "Please enter your name"
                }
            },

        ])
        .then(userAnsw => {
            console.log(userAnsw)


            const engineer = new Engineer(userAnsw.name, userAnsw.email, userAnsw.id, userAnsw.userName)

            teamArray.push(engineer)

            makeTeam();
        })



}

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function putDone() {

if (!fs.existsSync(OUTPUT_DIR)) {
fs.mkdirSync(OUTPUT_DIR)
}
fs.writeFileSync(outputPath, render(teamArray))
}
















module.exports = teamArray

makeTeam();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (Intern, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Intern, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
