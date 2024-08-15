import express from "express";
import bodyparser from "body-parser";
import pg from "pg";



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




async function checkcart(id) {
    let cartdata = [];
    const value = id[0]; 
    const result = await db.query("SELECT * FROM cartinfo WHERE id=($1)", [value]);
    result.rows.forEach((res) => {
        cartdata.push(res);
    });
    return cartdata;
}




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


app.post("/cart", async (req, res) => {
    const items = req.body.recipes;
    let itemid = [];
    items.forEach((item) => {
        var data = JSON.parse(item);
        const id = data.id;
        itemid.push(id);
    });
   const cartItem = await checkcart(itemid);
    console.log(typeof cartItem);
    console.log("cartitems",cartItem);
    res.render("cart.ejs", { orders: cartItem });
});


app.get("/cart", async(req, res) => {
    const result = await db.query("SELECT * FROM cartinfo");
    const cartItem = result.rows;
    res.render("cart.ejs",{ orders: cartItem });
});
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});