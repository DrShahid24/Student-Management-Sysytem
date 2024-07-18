#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Defining a student class.
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
    // Method to view a student balance.
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    // Method to pay student fee.
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`The $${amount} Fee paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    // Method to Display Student Status.
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Defining a Student Manager Class to Manage Student.
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student.
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    // Method to Enroll a Student in a Course.
    enroll_student(student_id, course) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} Successfully`);
        }
    }
    // Method to View a Student Balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. please enter a correct student ID.");
        }
    }
    // Me thod to pay Studetn fees.
    pay_studetn_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found, please enter a correct student ID.");
        }
    }
    // Method to Display Student Status.
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student_id
    find_student(studetn_id) {
        return this.students.find(std => std.id === studetn_id);
    }
}
// Main function to run the programme.
async function main() {
    console.log(chalk.bgMagenta("Wellcome To -Code With Dr. Shahid - Student Management Sysytem."));
    console.log(chalk.blue("-".repeat(60)));
    let student_manager = new Student_manager();
    // while loop to keep programme running.
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using Switch case to handle User Choice.
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.green("Enter a Student Name"),
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a Student ID"),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.green("Enter a Course Name"),
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a Student ID"),
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Student Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a Student ID"),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.green("Enter the Amount to Pay"),
                    }
                ]);
                student_manager.pay_studetn_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a Student ID"),
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.red("Exiting..."));
                process.exit();
        }
    }
}
// Calling a main function
main();
