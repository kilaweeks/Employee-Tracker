use employee_db;

insert into department (name)
values ("Sales"), ("Engineering"), ("Finance"), ("Legal");

insert into role (title, salary, department_id)
values ("Sales Lead", 100000, 1); 

insert into employee (first_name, last_name, role_id, manager_id)
values ("Kila", "Weeks", 1, null), ("Second", "Person", 2, 1); 
