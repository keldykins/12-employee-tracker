USE employee_tracker;

INSERT INTO departments
    (name)
VALUES
    ("ADMINISTRATION"),
    ("ACCOUNTING"),
    ("SALES"),
    ("LEGAL"),
    ("ENGINEERING");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("SOFTWARE ENGINEER", 150000.00, 5),
    ("WEB DEVELOPER", 100000.00, 5),
    ("SENIOR SOFTWARE ENGINEER", 250000.00, 5),
    ("LAWYER", 250000.00, 4),
    ("SALES MANAGER", 150000.00, 3),
    ("SALES PERSON", 60000.00, 3),
    ("ACCOUNTANT", 90000.00, 2),
    ("FINANCIAL ANALYST", 150000.00, 2),
    ("ACCOUNTANT INTERN", 30000.00, 2),
    ("CEO", 1000000.00, 1),
    ("VP", 500000.00, 1);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Nancy", "Drew", 2, null),
    ("Carrigan", "Wexler", 7, null),
    ("Amy", "Sue", 8, null),
    ("Bob", "Smith", 5, null),
    ("Todd", "West", 1, null),
    ("Morgan", "Taylor", 3, null),
    ("Mandy", "Candy", 4, null),
    ("Andrew", "Douglas", 11, null),
    ("Ann", "Sarnoff", 10, null),
    ("Bill", "White", 6, null),
    ("Reece", "Wexler", 9, null);

UPDATE employees SET manager_id = 6  WHERE id = 1;
UPDATE employees SET manager_id = 5  WHERE id = 8;
UPDATE employees SET manager_id = 1  WHERE id = 7;
UPDATE employees SET manager_id = 3  WHERE id = 6;
UPDATE employees SET manager_id = 2  WHERE id = 5;
UPDATE employees SET manager_id = 7  WHERE id = 4;