const inquirer = require('inquirer');





function init() {
    console.log(`
    ============================
    Welcome to Employee Tracker
    ============================
    `);
    return inquirer.prompt([   
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: ['Add Employee','View all employees', 'Update Employee Role', 'View All Roles', 'Add new Role', 'View all departments', 'Add new Department']
        },

    ]).then((menuChoice) => {
        switch (menuChoice.menu) {
            case 'Add Employee':
                return 
            case 'View all employees':
                return
            case 'Update Employee Role':
                return
            case 'View All Roles':
                return
            case 'Add new Role':
                return
            case 'View all departments':
                return
            case 'Add new Department':
                return
            
        }
    })      
        }


    init()
    
    //  function promptDepartment
    
//     promptRoles
// promptEmployees
// addDepartment
//     add 



// module.exports = 