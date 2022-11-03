const inquirer = require('inquirer');
const db = require('../db/connection');
const mysql = require('mysql2/promise');
const cTable = require('console.table')
const express = require('express');




function init() {
       console.log(`
    ============================
    Welcome to Employee Tracker
    ============================
    `);
}

promptMenu()
    // .then(promptMenu());


function promptMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: ['Add an Employee', 'View all employees', 'Update an Employee Role', 'View All Roles', 'Add a Role', 'View all departments', 'Add a Department', 'Quit']
        },
    ]).then((menuChoice) => {
        switch (menuChoice.menu) {
            case 'Add an Employee':
                return true;
            case 'View all employees':
                viewAllEmployees()
                return true;
            case 'Update an Employee Role':
                return true;
            case 'View All Roles':
                viewAllRoles()
                return true;
            case 'Add a Role':
                return true
            case 'View all departments':
                viewAllDepartments()
                return true
            case 'Add a Department':
                addDepartment()
                return true;
            case 'Quit':
                return false;
        }

    })
}

function viewAllEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, m.first_name as manager
    FROM employee e
    JOIN role r on e.role_id = r.id
    JOIN department d on r.department_id = d.id
    LEFT JOIN employee m on e.manager_id = m.id`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.table(results)
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
            console.table(results)
        }
    });
}

function viewAllDepartments() {
    const sql = `SELECT d.id, d.name
    FROM department d`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.table(results)
        }
    });
}

function addDepartment() {
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
        console.log(results);
        const sql = `INSERT INTO department (name)
        VALUES=(?)`;
        const params = [body.name]
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            results.json({
                message: "added Service to the Database",
                data: body
            });

        });
    });
}



module.exports = {
    init
}