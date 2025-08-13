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
import twilio from 'twilio';
import cors from 'cors';
/* import http from 'http';

import { WebSocket, WebSocketServer } from 'ws';
import { type } from 'os';
 */




dotenv.config();

const app = express();
const port = 4000;
const wsport = 8080;
const SaltRounds = 10;
/* const wss = new WebSocketServer({ port: wsport }); */

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 //24 hours
    },
    rolling: true
}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});


db.connect();



const rawData = fs.readFileSync('recipe.json', 'utf8');

const jsonData = JSON.parse(rawData);



/* inster data from menu to cart  */

async function insertItem(ids, currentUserId) {
    try {
        for (const id of ids) {
            console.log(`Processing item with id: ${id}`);

            const result = await db.query("SELECT * FROM cartinfo WHERE id = $1", [id]);
            ids.length = 0;


            console.log("Current user id:", currentUserId)
            if (result.rows.length > 0) {
                const cres = await db.query("SELECT * FROM cartitems JOIN users ON users.id= user_id WHERE user_id=$1", [currentUserId]);
                const checkitem = cres.rows;
                const { id, type, name, price, image } = result.rows[0];
                console.log("data from menupage:", id, type, name);
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
                    [id, type, name, price, image, currentUserId]
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
            // Handle different field names in the JSON data
            const type = item.type || key; // Use item.type if exists, otherwise use the category key
            const name = item.name || item.title; // Use item.name if exists, otherwise use item.title
            const price = item.price;
            const image = item.image;
            const veg = item.veg || item.vegicon; // Use item.veg if exists, otherwise use item.vegicon
            const nonveg = item.nonveg || item.nonvegicon; // Use item.nonveg if exists, otherwise use item.nonvegicon
            const ingredients = item.ingredients;
            const kcal = item.kcal;
            const protein = item.protein;
            const carbs = item.carbs;
            const fat = item.fat;
            const fiber = item.fiber;

            // Skip items that don't have required fields
            if (!name || !price || !image) {
                console.log(`Skipping item with missing required fields:`, item);
                continue;
            }

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
/* insertData(); */




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
            console.log("maxresukt", maxIdResult, " ", maxId);


            const hashedPassword = await bcrypt.hash(password, SaltRounds);


            const result = await db.query(
                "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
                [maxId + 1, name, email, hashedPassword]
            );
            console.log("User registered successfully");


            const user = result.rows[0];
            req.login(user, (err) => {
                if (err) {
                    console.error("Error logging in after signup:", err);
                    res.redirect('/menu?error=Login%20failed');
                } else {
                    console.log("User logged in successfully:", user.name);
                    res.redirect(`/menu?message=You%20have%20successfully%20Signed%20Up!&name=${user.name}`);
                }
            });
        }
    } catch (e) {
        console.error("Error handling signup:", e);
        res.redirect('/menu?error=Signup%20failed');
    }
});

app.post('/login',
    passport.authenticate("local", {
        successRedirect: `/menu?message=You%20have%20successfully%20logged%20in!`,
        failureRedirect: "/menu?error=Invalid%20credentials",
    })

);

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.log("error from logout", err)
            return next(err);
        }
        res.redirect('/menu?warning=You%20have%20successfully%20Logged%20Out!');
    });

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
    if (req.isAuthenticated()) {

        res.json({ loginName: req.user });
    }

})
let clientMobile;
app.post("/orders", async (req, res) => {
    const data = req.body;
    /*  console.log("data from delivery page:", data); */
    for (const orderItem of data) {
        console.log("data from server form /orders:", orderItem);
        const { itemid, userid, usermobile, useraddress, itemPrice, itemquantity, totalamount, paymentmethod } = orderItem;
        clientMobile = "+" + parseInt("91" + usermobile, 10);
        console.log(clientMobile);
        try {
            const maxIdResult = await db.query("SELECT MAX(id) FROM orders");
            const maxId = maxIdResult.rows[0].max || 0;
            await db.query(
                "INSERT INTO orders (id,itemid,user_id,mobile_number,address,price,quantity,payableamount,paymentmethod) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9)",
                [maxId + 1, itemid, userid, usermobile, useraddress, itemPrice, itemquantity, totalamount, paymentmethod]
            );
            console.log("inserted orders successfully");
        } catch (err) {
            console.log("Error from inserting values in orders:", err);
        }

    }
})

app.get("/orders", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const result = await db.query("SELECT cartinfo.name,cartinfo.price AS originalprice,cartinfo.image,DATE(created_at) AS order_date,orders.* FROM orders JOIN cartinfo ON cartinfo.id =itemid WHERE user_id=$1", [req.user.id]);
            const orderedItems = result.rows;
            res.json({ orderedDatabases: orderedItems });
        } catch (err) {
            console.log("Error from getting values from orders:", err);
        }
    } else {
        res.json({ orderedDatabases: 0 });
    }
})

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/menu', async (req, res) => {
    if (req.isAuthenticated()) {
        console.log("from requser da mavane", req.user, ",", req.user.id)
    }
    const results=await db.query("SELECT * FROM cartinfo");
    const recipes=results.rows;
    res.render('menupage.ejs', {
        recipes: recipes


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
    } else {
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

        const response = await insertItem(itemid, req.user.id);

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

app.get('/cartpage', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const result = await db.query(
                "SELECT cartitems.id AS item_id, cartitems.*, users.* FROM cartitems JOIN users ON users.id = user_id WHERE user_id = $1 ORDER BY cartitems.id ASC",
                [req.user.id]
            );
            const cartItems = result.rows;
            try {
                res.render('cart.ejs', { orders: cartItems });
            }
            catch (e) {
                console.log("Error from cartpage", e);
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        res.redirect('/menu?info=Log%20in%20to%20access%20your%20cart%20and%20complete%20your%20order..');
    }

});
app.get("/cart/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("DELETE FROM cartitems WHERE id=$1", [id]);

        if (result.rowCount > 0) {
            console.log("Item deleted successfully.");
            res.redirect("/cartpage?message=Item%20Deleted%20successfully");
        } else {
            res.redirect("/cartpage?error=Item%20not%20found.");
        }
    } catch (err) {
        console.error("Error deleting item:", err);
    }
});
/* TWILIO SMS SERVICE */
app.get("/twilio/sms", async (req, res) => {
    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        console.log(clientMobile);
        function sendSms(to, message) {
            client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: to
            })
                .then(message => console.log('Message SID:', message.sid))
                .catch(error => console.error('Error sending SMS:', error));
        }

        sendSms(clientMobile, 'Hello from GREEN BOWL..!, Yours Order Has Been Placed :)  ')

    } catch (err) {
        console.log("Error from sending SMS:", err);

    }
    res.json({ message: "SMS SENT SUCCESSFULLY" });

})



/* TWILIO */





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



                bcrypt.compare(password, registerPassword, (err, valid) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return cb(err);
                    }

                    if (valid) {
                        console.log("Authentication successful for user:", user);


                        return cb(null, { id: user.id, name: user.name });

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

                const email = profile.emails[0].value;

                const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

                if (result.rows.length === 0) {
                    const maxIdResult = await db.query("SELECT MAX(id) FROM users");
                    const maxId = maxIdResult.rows[0].max || 0;


                    console.log("current_username from google signup:", profile.name.givenName);

                    const newUser = await db.query(
                        "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
                        [maxId + 1, profile.name.givenName, email, "google"]
                    );


                    return cb(null, newUser.rows[0]);
                } else {

                    console.log("current_username from google login:", profile.name.givenName);

                    const userProfile = result.rows[0];
                    return cb(null, userProfile);
                }
            } catch (err) {

                console.error("Error during Google authentication:", err);
                return cb("error from signup google", err);
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
        cb("error from desereliazer", err);
    }
});





/* 
 HANDLING REQUEST FROM REACT APP  */

app.get("/sample", (req, res) => {
    res.json("hello from server");
})


app.get("/order", async (req, res) => {
    const result = await db.query("SELECT cartinfo.name,cartinfo.price AS originalprice,cartinfo.image,address,DATE(created_at) AS order_date,orders.* FROM orders JOIN cartinfo ON cartinfo.id =itemid ");
    const orderedItems = result.rows;
    res.json({ orderedItems });
})

app.get("/user", async (req, res) => {
    const result = await db.query("SELECT orders.address AS address ,orders.mobile_number AS mobile,users.* FROM users JOIN orders ON users.id = CAST(orders.user_id AS INTEGER)");
    const users = result.rows;
    res.json({ users });
})







/* web socket server  


/* const ClientMessage={
    id:1,
    type: "server",
    action: "chats",
    content:"Thank You for Interacting..!",

} 


try {

    var adminWs = null;
    var clients = new Map();
    wss.on('connection', function connection(ws) {
        console.log('A New Client Connected');
        console.log("Active users:", wss.clients.size);
        setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send('Hi buddy! Welcome! Greetings from server');
            }
        }, 100);


        ws.on('message', function (message) {



            console.log('Received message', message.toString());

            const source = JSON.parse(message);
            console.log("source message", source);

            const { type } = source;

            switch (type) {
                case 'client':
                    handleClient(source, ws)
                    break;
                case 'admin':
                    handleAdmin(source, ws)
            }


        });

        ws.on('close', function close() {
            console.log('Client disconnected');
        });
    });
} catch (e) {
    console.log("error from ws", e)
}






function handleClient(source, ws) {
    const { action, id, content } = source;
    console.log("from handleclient", action, id, content);
    if (action === "chat") {

        clients.set(id, ws);
        console.log(`Message from Client (${id}):`, content);
        if (adminWs && adminWs.readyState === WebSocket.OPEN) {

            adminWs.send(JSON.stringify({ type: "admin", id, content }));
            console.log("**!!! Client message is sent to  ADMIN successfully..!!!")

        } else {
            console.log("** ADMIN is not in ready state **");
        }
    }

}
function handleAdmin(source, ws) {
    if (!adminWs) {
        adminWs = ws;
        console.log("Admin is connected");
    }

    const { id, content } = source;
    console.log("content:", content)
    const clientWs = clients.get(id);
    /*     console.log("id:",clientWs) 
    if (clientWs && clientWs.readyState === WebSocket.OPEN) {
        console.log("** ADMIN message is sent to Client  successfully..!!!")
        clientWs.send(JSON.stringify({ content }));
    } else {
        console.log(`Client (${id}) is not connected.`);
    }

}

console.log(`Websocket server is running on the ${wsport}`)




 */






app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
