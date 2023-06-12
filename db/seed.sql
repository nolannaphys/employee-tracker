USE employees_db

INSERT INTO department (name)
VALUES
("engineering"),
("marketing"),
("hr"),
("sanitation");

INSERT INTO role (title, salary, department_id)
VALUES
("manager", 60000, 1),
("engineer", 50000, 2),
("wizard", 45000, 3),
("alchemist", 55000, 4),
("janitor", 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("nolan", "naphys", 1, NULL),
("cole", "phelps", 2, 1),
("arthur", "morgan", 3, 2),
("geralt", "rivia", 4, 3);