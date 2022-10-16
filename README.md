# 10-employee-entry

## Description

This app helps the user create a web page that displays the names of employees along with basic information about those employee on individual cards. It is perfect for
small companies that want to see a visual representation of their workforce. It solves the problem of having to read employee information from boring and hard to read
database lists. While creating this project, I learned how to better use custom classes and how to dynamically create html code and write it to a file.

## Installation

To install this program simply download the code and run it from a terminal. You will need to have npm installed, then once you are in the directory you created for this program,
run npm i in a terminal to install all the dependencies.

## Usage

You need to run this app from a terminal. Entering "node index" will begin the program. You will be asked several basic questions about the employees you are entering into the site.
Some questions will differ depending on the employee type. After every series of employee questions, you will be asked if you wish to add another employee through a list of employee types.
If you choose the exit option, the terminal program will end and an html page (index.html) will be created in the dist directory that you can open with any web browser. On the web page you will
see individual cards for each employee that you entered into the questionaire and their information. Email and GitHub links are clickable and will link you to the appropriate site/email program. 

Here is a video of the site running (with tests at the begining): https://drive.google.com/file/d/1ZbvivNdtQP1TQeH0mtOvGwjV5hlzXfJr/view

## License

MIT License

---

## Tests

This app also comes with a series of tests. To run them, go to the directory, open a terminal and enter npm test. The tests check each method that is used by the classes in this program.