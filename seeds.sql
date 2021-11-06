--Prepopulate the database
INSERT INTO department (name)
VALUE ('Marketing');
INSERT INTO position (title, salary, department_id)
VALUE ('Outreach', 55000, 1)
INSERT INTO worker (first_name, last_name)
VALUE (John, Smithwick)
INSERT INTO department (name)
VALUE ('Accounting');
INSERT INTO position (title, salary, department_id)
VALUE ('Tax Person', 70000, 2)
INSERT INTO worker (first_name, last_name)
VALUE (Sally, Ragdoll)