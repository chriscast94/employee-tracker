INSERT INTO department (department_name)
VALUES 
("HR"),
("ACCOUNTING"),
("TECH DEVELOPMENT");

INSERT INTO position (title, salary, department_id)
VALUES 
("HR Representative", 65000, 1),
("Junior Accountant", 60000, 2),
("Full Stack Developer", 90000, 3);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES
("Ash", "Ketchum", 1, null),
("Alice", "Lidell", 2, null),
("Lyra", "Silvertongue", 3, 3);