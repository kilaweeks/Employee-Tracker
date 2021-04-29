use employee_db;

insert into department (name)
values ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Human Resources");

insert into role (title, salary, department_id)
values ("Sales Lead", 100000, 1), ("Marketing Specialist", 90000, 2), ("Business Analyst", 120000, 3), ("Sales Representative", 70000, 1), ("Human Resource Personnel", 75000, 4);

insert into employee (first_name, last_name, role_id, manager_id)
values ("John", "Clark", 1, null), ("Jim", "Adams", 2, 1), ("Katie", "Jones", 3, 1), ("Mia", "Lopez", 4, 1); 


select * from department; 
select * from role; 
select * from employee; 