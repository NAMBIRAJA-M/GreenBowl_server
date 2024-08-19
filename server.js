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


const jsonData = JSON.parse(fs.readFileSync('recipe.json', 'utf8'));


async function checkcart(ids) {
    try {
        for (const id of ids) {
            console.log(`Processing item with id: ${id}`);

            const result = await db.query("SELECT * FROM cartinfo WHERE id = $1", [id]);
            ids.length = 0;
            console.log(ids);
            if (result.rows.length > 0) {
                const { id, type, name, price, image } = result.rows[0];
                await db.query(
                    "INSERT INTO cartitems (id, type, name, price, image) VALUES ($1, $2, $3, $4, $5)",
                    [id, type, name, price, image]
                );

            }

        }
        return 'Cart check completed successfully.';
    } catch (err) {
        console.error('Error processing cart:', err);
        return err.code;
    }
}



const insertData = async () => {

    for (const item of jsonData) {

        const { type, name, price, image, veg, nonveg, ingredients, kcal, protein, carbs, fat, fiber } = item;

        const formattedIngredients = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;
        /* console.log( formattedIngredients ) */
        try {

            await db.query("INSERT INTO cartinfo (type, name, price, image, veg, nonveg, ingredients, kcal, protein, carbs, fat, fiber)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) ON CONFLICT (name) DO NOTHING;", [type, name, price, image, veg, nonveg, formattedIngredients, kcal, protein, carbs, fat, fiber]);
            console.log('Data inserted');

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

        bcrypt.compare(loginpassword, registerpassword, (err, result) => {
                if(result){
                    res.redirect(`/menu?message=You%20have%20successfully%20logged%20in!&name=${users.name}`);
                }else{
                    res.redirect('/menu?error=Invalid%20credentials');
                }
        
        })



    }else{
        res.redirect('/menu?error=Invalid%20credentials');
    }

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

    const response = await checkcart(itemid);

    console.log("response from function", response);
    if (response === 'Cart check completed successfully.') {
        const result = await db.query("SELECT * FROM cartitems");
        const cartItem = result.rows;
        /*console.log(typeof cartItem);
          console.log("cartitems", cartItem); */
        res.render("cart.ejs", { orders: cartItem });
    }
    else {

        res.redirect("/menu?error=Already%20Added..");
       

    }

});


app.get("/cart", async (req, res) => {
    const result = await db.query("SELECT * FROM cartitems ORDER by id ASC;");
    const cartItem = result.rows;
    res.render("cart.ejs", { orders: cartItem });
});

app.get("/cart/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("delete id ", id);
    const result = await db.query("DELETE FROM cartitems WHERE id=$1", [id]);
    res.redirect("/cart");
});
/* app.get("/cart/price/:actualprice/:id",async (req,res)=>{
    const id = parseInt(req.params.id);
    const price = parseInt(req.params.actualprice);
    console.log("pricechangeid",id);
    console.log("pricechangeid",price);
    try{
    const result= await db.query("UPDATE cartitems  SET  price=$1 WHERE id=$2",[price,id]);
    res.redirect("/cart");
    console.log("cartitem updated successfully..!")
    }catch(e){
  console.log("error from cartitem update",e)
    }
}) */

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});