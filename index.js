const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(methodOverride("_method"));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Data
let posts = [
    
];

// Route

app.get("/", (req, res) => {
    console.log("start");
    res.render("enter.ejs");
});

app.get("/posts", (req, res) => {
    console.log("Rendering posts page...");
    res.render("index.ejs", { posts }); 
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
})

app.patch("/posts/:id" ,(req,res) => {
    let {id} = req.params;
    let post = posts.find((post) => post.id === id);
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit" , (req,res) => {
    let {id} = req.params;
    let post = posts.find((post) => post.id === id);
    res.render("edit.ejs",{post});

});

app.post("/posts",(req,res) => {
    let{ username ,content} = req.body;
    let id = uuidv4();
    posts.push({username,content,id});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});

});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((post) => post.id !== id);
    res.redirect("/posts");
});


// Start Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
