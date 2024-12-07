CREATE TABLE IF NOT EXISTS Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN('Expense', 'Income'))
);

CREATE TABLE IF NOT EXISTS Transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    amount REAL NOT NULL,
    date INTEGER NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN('Expense', 'Income')),
    FOREIGN KEY (category_id) REFERENCES Categories (id)
);

INSERT INTO Categories (name,type) VALUES ('Electronics', 'Expense');
INSERT INTO Categories (name,type) VALUES ('Dining Out', 'Expense');
INSERT INTO Categories (name,type) VALUES ('Breakfast Supplies', 'Expense');
INSERT INTO Categories (name,type) VALUES ('Household Items', 'Expense');
INSERT INTO Categories (name,type) VALUES ('Christmas Gifts', 'Expense');
INSERT INTO Categories (name,type) VALUES ('New Year Party Supplies', 'Expense');
INSERT INTO Categories (name,type) VALUES ('Thanksgiving Groceries', 'Expense');
INSERT INTO Categories (name,type) VALUES ('Bonus', 'Income');
INSERT INTO Categories (name,type) VALUES ('Consulting Work', 'Income');
INSERT INTO Categories (name,type) VALUES ('Part-time Job', 'Income');
INSERT INTO Categories (name,type) VALUES ('Online Sales', 'Income');
INSERT INTO Categories (name,type) VALUES ('Freelance Writing', 'Income');
INSERT INTO Categories (name,type) VALUES ('End of Year Bonus', 'Income');
INSERT INTO Categories (name,type) VALUES ('Thanksgiving Freelance', 'Income');

INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 100.50, 1709814000, 'Weekly groceries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 75.25, 1709900400, 'More groceries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 1200, 1707740400, 'Monthly rent', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 45.99, 1710082800, 'Snacks and drinks', 'Expense');


INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 60, 1707154800, 'Breakfast supplies', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 110.75, 1707241200, 'Household items', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 50.25, 1707327600, 'Utilities bill', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 200.5, 1707414000, 'Electronics', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 15.99, 1707500400, 'Dining out', 'Expense');
-- December 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 90, 1704562800, 'Christmas Gifts', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 120.75, 1704649200, 'New Year Party Supplies', 'Expense');

-- November 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 85.5, 1701970800, 'Thanksgiving Grocerries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 900.0, 1702057200, 'Rent November', 'Expense');

-- Feruary 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3000.0, 1709914800, 'Monthly Salary', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 500.0, 1710001200, 'Freelance Project', 'Income');

-- January 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3200.0, 1707266800, 'Bonus', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 450.0, 1707353200, 'Consulting Work', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 2800.0, 1707439600, 'Part-time job', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 600.0, 1707526000, 'Online Sales', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 1500.0, 1707612400, 'Freelance Writing', 'Income');

-- December 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3100.0, 1704675600, 'End of Year Bonus', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 700.0, 1702083600, 'Thanksgiving Freelance', 'Income');

-- December 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 700.0, 1733568112, 'Monthly Salary', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 15.0, 1735011710, 'Christmas Gifts', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 50.0, 1733024510, 'Coffee', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 60.0, 1733024510, 'Lunch', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 40.0, 1733024510, 'Shopee Order', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 200.0, 1733024510, 'Dating', 'Expense');



