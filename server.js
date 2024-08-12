import express from "express";


const app = express();
const port = 3000;
app.use(express.static("public"));


const recipeJSON = [
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
];


app.get("/", (req, res) => {
    res.render("index.ejs");

});
console.log(Array.isArray(recipeJSON));

app.get("/menu", (req, res) => {
    res.render("menupage.ejs", { recipes: recipeJSON });
});

app.get("/about", (req, res) => {

    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});