const inquirer = require('inquirer');
const db = require('../db/connection');
const mysql = require('mysql2');
const cTable = require('console.table')
const express = require('express');
let isPrompting = true;

async function initMessage() {
    console.log(`
    ============================
    Welcome to Employee Tracker
    ============================
    `)
}

async function promptMenu() {
    console.log('\n\n\n\n\n');
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: ['Add an Employee', 'View all employees', 'Update an Employee Role', 'View All Roles', 'Add a Role', 'View all departments', 'Add a Department', 'Quit']
        },
    ]).then(async (menuChoice) => {
        switch (menuChoice.menu) {
            case 'Add an Employee':
                await addEmployee();
                return true;
            case 'View all employees':
                viewAllEmployees()
                return true
            case 'Update an Employee Role':
                return true;
            case 'View All Roles':
                viewAllRoles()
                return true;
            case 'Add a Role':
                await addRole();
                return true;
            case 'View all departments':
                const departments = viewAllDepartments();
                console.log("\n");
                console.log(departments);
                return true;
            case 'Add a Department':
                await addDepartment();
                return true;
            case 'Quit':
                return false;
        }
    });
}

async function viewAllEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, 
    r.title, d.name, r.salary, m.first_name as manager
    FROM employee e
    JOIN role r on e.role_id = r.id
    JOIN department d on r.department_id = d.id
    LEFT JOIN employee m on e.manager_id = m.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log('\n');
            console.table(results)
            console.log('\n\n\n\n\n');
        }

    });
}

function viewAllRoles() {
    const sql = `SELECT r.id, r.title, d.name as department, r.salary
    FROM role r
    JOIN department d on r.department_id = d.id`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log('\n');
            console.table(results)
        }
    });
}

function viewAllDepartments() {
    const sql = `SELECT d.id, d.name
    FROM department d`;

    db.execute(sql, (err, res) => {
        return res;
    });
}

async function addEmployee() {
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentname',
            message: "What is the name of the Department? (Required)",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('You need to enter a department name!');
                    return false;
                }
            }
        }
    ]).then((results) => {
        const sql = `INSERT INTO department (name) VALUES (?) `;
        db.execute(sql, [results.departmentname], (err, department) => {
            if (err) {
                console.err("Error adding the department");
            } else {
                console.log("Department added.");
            }
        });
    });
}

async function addRole() {
    const sql = 'SELECT * FROM departments';

    return await inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: "What is the name of the role? (Required)",
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('You need to enter a role name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of the role?"        
            
        },
        {
            type: 'list',
            name: 'choosedepartment',
            message: "Which department does the role belong to?",
            choices: []
        },
    ]).then((results) => {
        const sql = `INSERT INTO role ('title', ) VALUES (?) `;
        db.execute(sql, [results.departmentname], (err, department) => {
            if (err) {
                console.err("Error adding the department");
            } else {
                console.log("Department added.");
            }
        });
    });
}

async function addDepartment() {
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentname',
            message: "What is the name of the Department? (Required)",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('You need to enter a department name!');
                    return false;
                }
            }
        }
    ]).then((results) => {
        const sql = `INSERT INTO department (name) VALUES (?) `;
        db.execute(sql, [results.departmentname], (err, department) => {
            if (err) {
                console.err("Error adding the department");
            } else {
                console.log("Department added.");
            }
        });
    });
}

async function init() {
    initMessage()
    while (isPrompting) {
        isPrompting = await promptMenu();
    }
    console.log('exiting');
    process.exit(1);
}

init()

module.exports = {
    init
}