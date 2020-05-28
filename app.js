const express = require('express');
const data = require('./data.json');

//console.log(data);

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/projects/:id", (req, res) => {
    const projectId = req.params.id;
    
    const projectObject = data.projects[projectId];

    res.render("project", {project: projectObject});
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});