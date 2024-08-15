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

/* const recipeJSON = [
    {
        "id": "1",
        "type": "protein bowl",
        "name": "THE PERUVIAN RICE BOWL",
        "price": 219,
        "image": "Assets/peruvianbowl.jpg",
        "veg": "Assets/veg_icon (1).png",
        "nonveg": "Assets/non-veg_icon (1).png",
        "ingredients": ["Mint", "Coriander", "Jalapeno", "Mayo", "Olive Oil", "Salt", "Ginger", "Red Chilli", "Rice"],
        "nutrients": {
            "kcal": 248,
            "protein": "23g",
            "Carbs": "32g",
            "Fat": "34g",
            "Fiber": "24g"
        }
    },
    {
        "id": "2",
        "type": "protein bowl",
        "name": "THE KERALA BOWL",
        "price": 229,
        "image": "Assets/The_Kerala_Bowl.jpg",
        "veg": "Assets/veg_icon (1).png",
        "nonveg": "Assets/non-veg_icon (1).png",
        "ingredients": ["Herb Brown Rice", "Sauteed Veggies", "Zoodle Salad", "Pickled Onion", "Tomato Relish", "Coconut Milk"],
        "nutrients": {
            "kcal": 673,
            "protein": "27g",
            "Carbs": "80g",
            "Fat": "25g",
            "Fiber": "6.5g"
        }
    }
]; */

/* app.get("/datas",async (req,res) => {
    const result= await db.query("SELECT * FROM cartinfo");
   result.rows.forEach((recidata)=>{
      console.log(recidata.name);
   })
  console.log(typeof result.rows);
     const recipesdata=result.rows;
     const jsondata=JSON.stringify(recipesdata);
     console.log(jsondata.name);
     console.log(typeof jsondata);


}) */



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
   /*  res.render("cart.ejs", { orders: cartItem }); */
});
app.get("/cart", (req, res) => {
    res.render("cart.ejs");
});
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});