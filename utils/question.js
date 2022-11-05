const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table')
const express = require('express');
let isPrompting = true;

const allEmployeesQuery = `SELECT e.id, e.first_name, e.last_name, 
r.title, d.name, r.salary, m.first_name as manager
FROM employee e
JOIN role r on e.role_id = r.id
JOIN department d on r.department_id = d.id
LEFT JOIN employee m on e.manager_id = m.id`;

const allRolesQuery = `SELECT r.id, r.title, d.name as department, r.salary
FROM role r
JOIN department d on r.department_id = d.id`;

const allDepartmnentsQuery = `SELECT d.id, d.name
FROM department d`;

const selectRolesQuery = `SELECT r.id, r.title FROM role r`;

const selectEmployeeQuery = `SELECT e.id, e.first_name, e.last_name FROM employee e`;


async function initMessage() {
    console.log(`
    ============================
    Welcome to Employee Tracker
    ============================
    `)
}

function promptMenu() {
    console.log('\n\n');

    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: ['Add an Employee', 'View all employees', 'Update an Employee Role', 'View All Roles', 'Add a Role', 'View all departments', 'Add a Department', 'Quit']
        },
    ]).then(async (menuChoice) => {
        switch (menuChoice.menu) {
            case 'Add an Employee':
                return await addEmployee();
            case 'View all employees':
                viewAllEmployees()
                return true
            case 'Update an Employee Role':
                return true;
            case 'View All Roles':
                viewAllRoles()
                return true;
            case 'Add a Role':
                return await addRole();
            case 'View all departments':
                await viewAllDepartments();
                return true;
            case 'Add a Department':
                return await addDepartment();
            case 'Quit':
                return false;
        }
    });
}

async function viewAllEmployees() {
    db.query(allEmployeesQuery, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log('\n');
            console.table(results);
            console.log('\n\n\n\n\n\n\n\n');
        }
    });
}

function viewAllRoles() {
    db.query(allRolesQuery, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log('\n');
            console.table(results);
            console.log('\n\n\n\n\n\n\n\n\n');
        }
    });
}

async function viewAllDepartments() {
    const departments = await getDepartments();
    console.table(departments);
}

async function getRoles() {
    return new Promise((resolve, reject) => {
        db.query(selectRolesQuery, (err, departments) => {
            return err ? reject(err) : resolve(departments);
        });
    });
}

async function getEmployees() {
    return new Promise((resolve, reject) => {
        db.query(selectEmployeeQuery, (err, departments) => {
            return err ? reject(err) : resolve(departments);
        });
    });
}


async function addEmployee() {
    const roles = (await getRoles()).map(r => {
        return {
            name: r.title,
            value: r
        }
    });
    const manager = (await getEmployees()).map(e => {
        return {
            name: `${e.first_name} ${e.last_name}`,
            value: e
        }
    });
    manager.push({
        name: 'None',
        value: {
            id: null
        }
    });
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: "What is the first name? (Required)",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('You need to enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastname',
            message: "What is the last name? (Required)",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('You need to enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee role? (Required)",
            choices: roles,
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('You need to enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee manager?",
            choices: manager
        }
    ]).then((r) => {
        console.log(r);
        const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?) `;
        db.execute(sql, [r.firstname,r.lastname,r.role.id,r.manager.id], (err, department) => {
            if (err) {
                console.err("Error adding the department");
            } else {
                console.log("Department added.");
            }
        });
        return true;
    });
}

async function getDepartments() {
    return new Promise((resolve, reject) => {
        db.query(allDepartmnentsQuery, (err, departments) => {
            return err ? reject(err) : resolve(departments);
        });
    });
}

async function addRole() {
    const departments = (await getDepartments()).map(d => {
        return {
            name: d.name,
            value: d
        }
    });
    return inquirer.prompt([
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
            choices: departments
        }
    ]).then((results) => {
        const sql = `INSERT INTO role (title,salary,department_id) VALUES (?, ?, ?)`;
        console.log([results.rolename, results.salary, results.choosedepartment.id]);
        db.execute(sql, [results.rolename, results.salary, results.choosedepartment.id], (err, department) => {
            if (err) {
                console.err("Error adding the department");
            } else {
                console.log("Department added.");
            }
        });
        return true;
    });
}

async function addDepartment() {
    return inquirer.prompt([
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
        return true;
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