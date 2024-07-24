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

app.get("/", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM notes"
        );
        // console.log(result.rows);
        res.render("index", {
            notes: result.rows
        });
    } catch (error) {
        console.log(error);
    }

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

app.post("/editNotes", async (req, res) => {
    const {id, title, content} = req.body;
    try {
        const result = await db.query(
            "SELECT * FROM notes WHERE notesid = ($1)", [id]
        );
        res.render("edit", {
            editnotes: result.rows
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/editedNotes", async (req, res) => {
    const {id, title, content} = req.body;
    try {
        const result = await db.query(
            "UPDATE notes SET Title = $1, Content = $2 WHERE notesid = $3",
            [title, content, id]
        );
        console.log("Successfully Edited");
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
});