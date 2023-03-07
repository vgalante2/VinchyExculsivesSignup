const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
require("dotenv").config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
     {
      email_address: email,
      status: "subscribed",
      merge_fields: {
      FNAME: firstName,
      LNAME: lastName
      }

     }

   ]

  };

  const jsonData = JSON.stringify(data)

  const url = "https://us17.api.mailchimp.com/3.0/lists/22aad55be6";
  const options = {
    method: "POST",
    auth: process.env.API_KEY;
  }

 const request = https.request(url, options, function(response){


    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {res.sendFile(__dirname + "/failure.html")};

   response.on("data", function(data){
     console.log(JSON.parse(data));
   })
 })

request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");

  window.addEventListener("scroll", function() {
    window.scrollTo(0, window.pageYOffset);
});
});


app.listen(3000, function(req, res){
  console.log("Youre the fuckin goat, Vin ");
});


// 22aad55be6
