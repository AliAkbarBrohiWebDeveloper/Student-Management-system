#! /usr/bin/env node
// Define the Student class 
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue.bold('\n\t Welcome to Ali Akbar Brohi Student Management system\n\t'));
// Define the Student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view student balance
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.green.bold(`\n\t$${amount} fees paid successfully for ${this.name}\n\t`));
        console.log(chalk.green.bold(`\n\tRemainig Balance is $${this.balance}\n\t`));
    }
    // Method to display student status
    show_status() {
        console.log(chalk.green.bold("******STATUS******"));
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: $${this.balance}`);
    }
}
;
// Define the Student_manager class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green.bold(`\n\tStudent ${name} added successfully with ID: ${student.id}\n\t`));
        return student.id; // Return the generated student ID
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.green.bold(`\n\t${student.name} enrolled in ${course} successfully\n\t`));
        }
    }
    // Method to view student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log('Student not found. Please provide a valid student ID.');
        }
    }
    // Method to pay student fees
    student_pay_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log('Student not found. Please provide a valid student ID.');
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log('Student not found. Please provide a valid student ID.');
        }
    }
    // Method to find student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    let student_manager = new Student_manager();
    // While loop to keep the program running
    while (true) {
        let choice = await inquirer.prompt({
            name: "choice",
            type: "list",
            message: "Select an option",
            choices: ["Add student", "Enroll student", "View student balance", "Pay fees", "Show status", "Exit"]
        });
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Enter student name",
                });
                student_manager.add_student(name_input.name);
                break;
            case "Enroll student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID"
                    },
                    {
                        name: "course",
                        type: 'input',
                        message: "Enter course name"
                    }
                ]);
                student_manager.enroll_student(enroll_input.student_id, enroll_input.course);
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt({
                    name: "student_id",
                    type: "number",
                    message: "Enter student ID"
                });
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to pay"
                    }
                ]);
                student_manager.student_pay_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt({
                    name: "student_id",
                    type: "number",
                    message: "Enter student ID"
                });
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Call the main function to start the program
main();
