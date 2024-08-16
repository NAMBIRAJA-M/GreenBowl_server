import express from "express";
import bodyparser from "body-parser";
import pg from "pg";
import fs from 'fs';


const app = express();
const port = 3000;
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

app.get("/", (req, res) => {


    res.render("index.ejs");

});


app.get("/menu", async (req, res) => {
   /*  let message = {};
    if (req.query.message) {
        message = JSON.parse(decodeURIComponent(req.query.message));
    } */
        const result = await db.query("SELECT * FROM cartinfo");
        const recipeJSON = result.rows;
        res.render("menupage.ejs", { recipes: recipeJSON/* ,message:message  */});
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
            
        res.redirect("/menu");
       /*  const message = { news: "already added" };
        res.redirect(`/menu?message=${encodeURIComponent(JSON.stringify(message))}`);

 */
    }

});


app.get("/cart", async (req, res) => {
    const result = await db.query("SELECT * FROM cartitems");
    const cartItem = result.rows;
    res.render("cart.ejs", { orders: cartItem });
});

app.get("/cart/delete/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    console.log("delete id ",id);
    const result= await db.query("DELETE FROM cartitems WHERE id=$1",[id]);
    res.redirect("/cart");
});
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});