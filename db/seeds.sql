INSERT INTO department (name)
VALUES
('Finance'),
('Legal'),
('HR'),
('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager', '20000', (select id from department where name = 'Finance')),
('Software Engineer', '10000', (select id from department where name = 'Engineering')),
('Intern', '4000', (select id from department where name = 'Engineering'));
 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
('Tatiana', 'Bertazoli', (select id from role where title = 'Manager'), NULL),
('Arthur', 'Bertazoli', (select id from role where title = 'Intern'), (select e.id from employee as e join role on (e.role_id = role.id) where role.title = 'Manager')),
('Nicholas', 'Bertazoli', (select id from role where title = 'Intern'), (select e.id from employee as e join role on (e.role_id = role.id) where role.title = 'Manager'));
