// class Employee {
//     constructor(id, first_name) {
//         this.id = id;
//         this.name = first_name;
            
//     }
//     getAllemployee() {
//         const sql = `SELECT e.id, e.first_name, e.last_name, 
//         r.title, d.name, r.salary, m.first_name as manager
//         FROM employee e
//         JOIN role r on e.role_id = r.id
//         JOIN department d on r.department_id = d.id
//         LEFT JOIN employee m on e.manager_id = m.id`;
//         db.query(sql, (err, results) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log('\n');
//                 console.table(results);
//                 console.log('\n\n\n\n\n\n\n\n');
//             }
//             return
//         });
//  }
// }