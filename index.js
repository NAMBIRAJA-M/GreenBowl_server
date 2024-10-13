import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import fs, { access } from 'fs';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GoogleStrategy from 'passport-google-oauth2';
import dotenv from 'dotenv';
/* import getCartItems from "./public/src/cart.js";
 */

dotenv.config();

const app = express();
const port = 3000;
const SaltRounds = 10;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 //24 hours
    },
    rolling: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

let currentUserId = 0;
let LoginName = "";
const rawData = fs.readFileSync('recipe.json', 'utf8');

const jsonData = JSON.parse(rawData);




/* inster data from menu to cart  */

async function insertItem(ids) {
    try {
        for (const id of ids) {
            console.log(`Processing item with id: ${id}`);

            const result = await db.query("SELECT * FROM cartinfo WHERE id = $1", [id]);
            ids.length = 0;


            console.log("Current user id:", currentUserId)
            if (result.rows.length > 0) {
                const cres = await db.query("SELECT * FROM cartitems JOIN users ON users.id= user_id WHERE user_id=$1", [currentUserId]);
                const checkitem = cres.rows;
                const { id,type, name, price, image } = result.rows[0];
              console.log("data from menupage:",id,type,name);
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
                    "INSERT INTO cartitems (id,type, item_name, price, image, user_id) VALUES ($1, $2, $3, $4, $5,$6)",
                    [id,type, name, price, image, currentUserId]
                );

                return 'Cart check completed successfully.';
            }

        }
    } catch (err) {
        console.error('Error processing cart:', err);
        return err;
    }
}
const insertData = async () => {
    for (const key of Object.keys(jsonData)) {
        const array = jsonData[key];

        for (const item of array) {
            const { type, name, price, image, veg, nonveg, ingredients, kcal, protein, carbs, fat, fiber } = item;

            const formattedIngredients = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;

            try {
                await db.query(
                    "INSERT INTO cartinfo (type, name, price, image, veg, nonveg, ingredients, kcal, protein, carbs, fat, fiber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT (name) DO NOTHING;",
                    [type, name, price, image, veg, nonveg, formattedIngredients, kcal, protein, carbs, fat, fiber]
                );
            } catch (err) {
                console.error('Error inserting data:', err);
            }
        }
    }
};
/* insertData();
 */


/* LOCAL AUTHENTICATION  */

app.post('/signup', async (req, res) => {
    const name = req.body.fname;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const Checkresult = await db.query("SELECT * FROM users WHERE email=$1", [email]);
        if (Checkresult.rows.length > 0) {
            res.redirect('/menu?error=Email%20Already%20Exists');
        } else {
            const maxIdResult = await db.query("SELECT MAX(id) FROM users");
            const maxId = maxIdResult.rows[0].max || 0;
            console.log("maxresukt",maxIdResult ," ",maxId);
            bcrypt.hash(password, SaltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing the password", err);
                } else {
                    const result = await db.query(
                        "INSERT INTO users (id,name,email,password) VALUES ($1, $2, $3,$4) RETURNING *",
                        [maxId+1,name, email, hash]
                    );
                    console.log("User registered successfully");

                    const user = result.rows[0];
                    req.login(user, (err) => {
                        currentUserId = user.id;
                        LoginName = user.name;
                        console.log("current_user from local signup", LoginName);
                        res.redirect(`/menu?message=You%20have%20successfully%20Signed%20Up!&name=${user.name}`)
                    });
                }
            });
        }
    } catch (e) {
        console.error("Error handling signup:", e);
    }
});
app.post('/login',
    passport.authenticate("local", {
        successRedirect: `/menu?message=You%20have%20successfully%20logged%20in!`,
        failureRedirect: "/menu?error=Invalid%20credentials",
    })

);
app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next("error from logout", err);
        }
        res.redirect('/menu?warning=You%20have%20successfully%20Logged%20Out!');
    });
    currentUserId = 0;
    LoginName = "";

});


/* GOOGLE AUTHENTICATION */
app.get("/auth/google",
    passport.authenticate("Google", {
        scope: ["profile", "email"],
    })
);
app.get("/auth/google/menu",
    passport.authenticate("Google", {
        successRedirect: "/menu?message=You%20have%20successfully%20logged%20in!",
        failureRedirect: "/",
    })

)

/* routes to pages */

app.get("/api/user", (req, res) => {
    /*  if (!req.session.user) {
         return res.status(401).send('Session expired, please login again');
       } */
    res.json({ loginName: LoginName });
})

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/menu', async (req, res) => {
    const proteinbowl = await db.query("SELECT * FROM cartinfo WHERE type='protein bowl' ");
    const recipePB = proteinbowl.rows;
    const vegsalad = await db.query("SELECT * FROM cartinfo WHERE type='veg salad' ");
    const recipeVS = vegsalad.rows;
    res.render('menupage.ejs', {
        recipesPB: recipePB,
        recipesVS: recipeVS


    });
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.get("/deliveryService", (req, res) => {

   if (req.isAuthenticated()) { 
    res.render('checkoutPage.ejs')
    }else{
    res.render('sessionexpired.ejs')
    } 
});

let itemid = [];
app.post('/cart', async (req, res) => {

    if (req.isAuthenticated()) {
        const items = req.body.recipes;
        items.forEach((item) => {
            const data = JSON.parse(item);
            const id = data.id;
            itemid.push(id);
        });

        const response = await insertItem(itemid);

        console.log("Response from function", response);


        if (response === 'Cart check completed successfully.') {
            res.redirect('/menu?added=Item%20Added%20Into%20The%20Cart..');
        }
        else if (response === 'duplicate') {
            res.redirect('/menu?already=Already%20Added..');
        } else {
            res.redirect('/menu?error=Something%20went%20wrong..');
        }
    } else {
        res.redirect('/menu?info=Login%20To%20Add%20Items..');
    }

});

app.get('/cart', async (req, res) => {
/*   if (!req.session.user) {
    res.render('sessionexpired.ejs');

        } 
        else{ */
    try {
        const result = await db.query(
            "SELECT cartitems.id AS item_id, cartitems.*, users.* FROM cartitems JOIN users ON users.id = user_id WHERE user_id = $1 ORDER BY cartitems.id ASC",
            [currentUserId]
        );
        const cartItems = result.rows;
        res.render('cart.ejs', { orders: cartItems });
    } catch (err) {
        console.error(err);
    }
/* } */
});
app.get("/cart/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("DELETE FROM cartitems WHERE id=$1", [id]);

        if (result.rowCount > 0) {
            console.log("Item deleted successfully.");
            res.redirect("/cart?message=Item%20Deleted%20successfully");
        } else {
            res.redirect("/cart?error=Item%20not%20found.");
        }
    } catch (err) {
        console.error("Error deleting item:", err);
    }
});





/* strategies to authentication */

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, cb) => {
        try {
            console.log("Verifying user:", email);
            const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);

            if (result.rows.length > 0) {
                const user = result.rows[0];
                const registerPassword = user.password;
                currentUserId = user.id;


                bcrypt.compare(password, registerPassword, (err, valid) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return cb(err);
                    }

                    if (valid) {
                        console.log("Authentication successful for user:", user);
                        LoginName = user.name;
                        console.log("current_username from local:", LoginName);

                        return cb(null, user);
                    } else {
                        console.log("Invalid credentials: Password mismatch");
                        return cb(null, false, { message: 'Invalid credentials' });
                    }

                });
            } else {
                console.log("Invalid credentials: User not found");
                return cb(null, false, { message: 'Invalid credentials' });
            }
        } catch (err) {
            console.error("Error in authentication strategy:", err);
            return cb(err);
        }
    }));

passport.use(
    "Google",
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://greenbowl.onrender.com/auth/google/menu",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const result = await db.query("SELECT * FROM users WHERE email = $1", [
                    profile.email,
                ]);
                LoginName = profile.name.givenName;
                console.log("current_username from google:", LoginName);

                const userProfile = result.rows[0];
                currentUserId = userProfile.id;
                const maxIdResult = await db.query("SELECT MAX(id) FROM users");
                const maxId = maxIdResult.rows[0].max || 0;
                if (result.rows.length === 0) {
                    const newUser = await db.query(
                        "INSERT INTO users (id,name,email, password) VALUES ($1,$2,$3,$4)",
                        [maxId+1,profile.name.givenName, profile.email, "google"]
                    );
                    return cb(null, newUser.rows[0]);
                } else {
                    return cb(null, result.rows[0]);
                }
            } catch (err) {
                return cb(err);
            }
        }));



passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id=$1", [id]);
        if (result.rows.length > 0) {
            cb(null, result.rows[0]);
        } else {
            cb(new Error('User not found'));
        }
    } catch (err) {
        cb(err);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
