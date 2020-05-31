//Define our data object variable and require express.
const express = require("express");
const data = require("./data.json");
//Create a new express app
const app = express();
//Define the port number so it can be changed easily
const port = 3000;

app.set("view engine", "pug"); //Set the view engine for our pug files
app.use("/static", express.static("public")); //Map /static to the public folder for images, css and js

app.get("/", (req, res) => {
  //Setup index route
  res.render("index", { projects: data.projects }); //Render the homepage and pass it project data so the homepage can show these dynamically
});

app.get("/about", (req, res) => {
  //Setup about route to render about template
  res.render("about");
});

app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id; //get the project id from the dynamic route
  const projectObject = data.projects[projectId]; //get the correct project from data object
  res.render("project", { project: projectObject }); //render the project template and pass the project object
});

//I am setting the favicon like this as you get an error in the console otherwise
app.get("/favicon.ico", (req, res) => {
  res.sendFile("./G.ico", { root: __dirname }); //You can just send some text here but I would rather have a nice looking favicon that I made
});

//If we get this far without finding a route, we can't find the page
app.use((req, res, next) => {
  const err = new Error("Four Oh Four! Page not found"); //Define a error object
  err.status = 404; //Set the status code
  console.log("A page cannot be found!"); //Log a message to the console
  next(err); //Pass it to our next middleware
});

//This function is used to render the error. We set the error to be 500 if not defined and pass it to the error template for rendering
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", { err });
});

//Start the app listening on the port defined at the top of the file. We also log it out to the console.
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
