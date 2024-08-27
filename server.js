import express from "express";
import bodyparser from "body-parser";
import pg from "pg";
import fs from 'fs';
import bcrypt from 'bcrypt';
import toastr from "toastr";

const app = express();
const port = 3000;
const SaltRounds = 10;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "cartdata",
    password: "2021",
    port: "5432",
});
db.connect();


app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

let currentUserId = 0;


const jsonData = JSON.parse(fs.readFileSync('recipe.json', 'utf8'));



async function insertItem(ids) {
    try {
        for (const id of ids) {
            console.log(`Processing item with id: ${id}`);
            if (currentUserId === 0) {

                return 'notlogined';
            }
            else {
                const result = await db.query("SELECT * FROM cartinfo WHERE id = $1", [id]);
                ids.length = 0;
        
                if (result.rows.length > 0) {

                    const cres = await db.query("SELECT * FROM cartitems JOIN users ON users.id= user_id WHERE user_id=$1", [currentUserId]);
                    const checkitem = cres.rows;

    
                    const { type, name, price, image } = result.rows[0];

                    if (checkitem.length > 0) {

                        let itemFound = false;


                        for (const item of checkitem) {
                    
                            if (item.item_name === name && item.user_id === currentUserId) {
                                itemFound = true;
                                break;
                            }
                        }

                        if (itemFound) {
                           
                            return 'duplicate';
                        }
                    }

                    await db.query(
                        "INSERT INTO cartitems (type, item_name, price, image, user_id) VALUES ($1, $2, $3, $4, $5)",
                        [type, name, price, image, currentUserId]
                    );

                    return 'Cart check completed successfully.';

                }

            }

        }
    } catch (err) {
        console.error('Error processing cart:', err);
        return err;
    }

}

const insertData = async () => {

    for (const item of jsonData) {

        const { type, name, price, image, veg, nonveg, ingredients, kcal, protein, carbs, fat, fiber } = item;

        const formattedIngredients = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;
       
        try {

            await db.query("INSERT INTO cartinfo (type, name, price, image, veg, nonveg, ingredients, kcal, protein, carbs, fat, fiber)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) ON CONFLICT (name) DO NOTHING;", [type, name, price, image, veg, nonveg, formattedIngredients, kcal, protein, carbs, fat, fiber]);
           

        } catch (err) {
            console.error('Error inserting data:', err);


        }
    }


};
insertData();



app.post("/signup", async (req, res) => {
    const name = req.body.fname;
    const email = req.body.email;
    const password = req.body.password;


    try {

        const Checkresult = await db.query("SELECT * FROM users WHERE email=$1", [email]);
        if (Checkresult.rows.length > 0) {
            res.redirect('/menu?error=Email%20Already%20Exists');
        }
        else {

            bcrypt.hash(password, SaltRounds, async (err, hash) => {
                if (err) {
                    console, log("errors from hasing the password", err)
                } else {
                    const result = await db.query(
                        "INSERT INTO users (name,email,password) VALUES ($1, $2, $3)",
                        [name, email, hash]
                    );
                    console.log("user registered details inserted  successfully")
                    res.redirect(`/menu?message=You%20have%20successfully%20Signed%20Up!&name=${name}`);
                }
            })

        }
    } catch (e) {
        console.log("errors from users ", e)
    }
})

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const loginpassword = req.body.password;


    const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length > 0) {
        const users = result.rows[0];
        const registerpassword = users.password;
        currentUserId = users.id

        bcrypt.compare(loginpassword, registerpassword, (err, result) => {
            if (result) {
                res.redirect(`/menu?message=You%20have%20successfully%20logged%20in!&name=${users.name}`);
            } else {
                res.redirect('/menu?error=Invalid%20credentials');
            }

        })



    } else {
        res.redirect('/menu?error=Invalid%20credentials');
    }

})

app.get("/logout", (req, res) => {
    res.redirect("/menu?warning=You%20have%20successfully%20Logged%20Out!");
    currentUserId = 0;
})

app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.get("/menu", async (req, res) => {
    const result = await db.query("SELECT * FROM cartinfo");
    const recipeJSON = result.rows;
    res.render("menupage.ejs", { recipes: recipeJSON });
    /*   console.log(Array.isArray(recipeJSON)); */
});


app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});



let itemid = [];
app.post("/cart", async (req, res) => {
    const items = req.body.recipes;

    items.forEach((item) => {
        var data = JSON.parse(item);
        const id = data.id;
        itemid.push(id);
    });

    const response = await insertItem(itemid);

    console.log("response from function", response);

    if (response === 'Cart check completed successfully.') {

        res.redirect("/menu?added=Item%20Added%20Into%20The%20Cart..");

    }
    else if (response === 'notlogined') {
        res.redirect("/menu?info=Login%20To%20Add%20Items..");
    }
    else if(response === 'duplicate') {
        res.redirect("/menu?already=Already%20Added..");
    }
    else {
        res.redirect("/menu?error=Something%20went%20wrong..");
    }

});




app.get("/cart", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT cartitems.id AS item_id, cartitems.*, users.* FROM cartitems JOIN users ON users.id = user_id WHERE user_id = $1 ORDER BY cartitems.id ASC",
            [currentUserId]
        );

        const cartItems = result.rows;
        console.log(cartItems);
        res.render("cart.ejs", { orders: cartItems });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});



app.listen(port, () => {
    console.log(`listening on port ${port}`)
});