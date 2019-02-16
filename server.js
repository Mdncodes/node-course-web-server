const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
let app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  let time = new Date().toString();
  let log = `${time}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append file");
    }
  });
  next();
});

/*app.use((req, res, next) => {
  res.render("maintainance.hbs");
});*/

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  //res.send("<h1>Hello Express!</h1>");
  res.render("home.hbs", {
    pageTitle: "Home",
    welcomeMessage: "Welcome to my homepage!"
  });
});

app.get("/mylove", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "My Love"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorCode: 404,
    errorMessage: "Unable to fulfill your request"
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
