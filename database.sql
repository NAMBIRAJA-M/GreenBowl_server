/* //CREATING TABLE CARTINFO  */
CREATE TABLE cartinfo (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(200) NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    image VARCHAR(200) NOT NULL,
    veg VARCHAR(100),
    nonveg VARCHAR(100),
    ingredients JSONB,
    kcal INTEGER,
    protein VARCHAR(10),
    carbs VARCHAR(10),
    fat VARCHAR(10),
    fiber VARCHAR(10)
);

/* INSERTING DATA INTO cartinfo */
INSERT INTO cartinfo (type, name, price, image, veg, nonveg, ingredients, kcal, protein, carbs, fat, fiber)
VALUES (
    'Protein Bowl',
    'THE PERUVIAN RICE BOWL',
    219,
    'Assets/peruvianbowl.jpg',
    'Assets/veg_icon (1).png',
    'Assets/non-veg_icon (1).png',
    '["Mint", "Coriander", "Jalapeno", "Mayo", "Olive Oil", "Salt", "Ginger", "Red Chilli", "Rice"]',
    248,
    '23g',
    '32g',
    '34g',
    '24g'
);

/* deleting the records */
TRUNCATE TABLE cartinfo RESTART IDENTITY;
ALTER SEQUENCE cartinfo_id_seq RESTART WITH 1;

/* display the records */
SELECT * FROM cartinfo;


/* //CREATING TABLE CARTINFO  */
CREATE TABLE cartitems (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(200) NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    image VARCHAR(200) NOT NULL,
);

/* deleting the records */
TRUNCATE TABLE cartitems RESTART IDENTITY;
ALTER SEQUENCE cartitems_id_seq RESTART WITH 1;

/* display the records */
SELECT * FROM cartitems;







/* ORDERS */


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    Mobile_Number VARCHAR(20) NOT NULL,
	Address VARCHAR(200) NOT NULL,
	Price INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    PayableAmount INTEGER NOT NULL,
    PaymentMethod VARCHAR(200) NOT NULL
);

/* NEW COLUMN  */
ALTER TABLE orders
    ADD itemid  INTEGER NOT NULL