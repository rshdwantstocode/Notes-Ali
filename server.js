import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app  = express();
const port = 3000;

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Notes',
    password: 'alipostgres',
    port: 5432,// default PostgreSQL port
});

db.connect()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/addNotes", (req, res) => {
    res.render('Add-Notes');
});

app.post("/postNotes", async (req,res) => {
    const {title, content} = req.body;
    try {
        const result = await db.query(
            "INSERT INTO notes (Title, Content) VALUES ($1, $2)",
            [title, content]
        );
        console.log("Successfully Added");
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
});