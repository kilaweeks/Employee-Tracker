drop database if exists employee_db; 
create database employee_db; 
use employee_db; 

create table department (
	id int auto_increment not null, 
    name varchar(30), 
    primary key (id)
);
    
create table role (
	id int auto_increment not null,
    title varchar(30), 
    salary decimal(10, 2), 
    department_id int,  
    primary key (id)
); 

create table employee (
	id int auto_increment not null,
    first_name varchar(30), 
    last_name varchar(30), 
    role_id int, 
    manager_id int, 
    primary key (id)
); 