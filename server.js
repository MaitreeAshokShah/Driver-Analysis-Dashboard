//Lets require import the FS module
var fs = require('fs');
// Canned is used for getting data from the file system,
// like from a folder and serve it to the user that calls
// the api of the server to get data
var canned = require('canned')
    ,   http = require('http')
    ,   opts = { cors: true, logger: process.stdout };

var nodestatic = require('node-static');

var randopeep = require('randopeep');
/*
* randopeep is for generating stuff that we can include in our fake data.
* */

can = canned('./', opts);

var file = new nodestatic.Server('./app');

fs.writeFileSync("./app/index.get.json", '[]');

//Generate 10 objects to work with in the backend for the front end

genobj(); genobj(); genobj(); genobj(); genobj();
genobj(); genobj(); genobj(); genobj(); genobj();
genobj(); genobj(); genobj(); genobj(); genobj();
genobj(); genobj(); genobj(); genobj(); genobj();

function genobj() {
    var o = JSON.parse(fs.readFileSync('./app/index.get.json', 'utf8'));
    var d = {
        driverName: randopeep.name(),
        driverCityOrigin: randopeep.address.city(),
        "driverLanguage": ['de', 'en', 'nl', 'fr', 'es', 'ar'][Math.floor(Math.random()*7)],
        driverPhone: randopeep.address.phone(),
        "driverGender": ['male', 'female'][Math.floor(Math.random()*2)],
        driverInfo: randopeep.corporate.catchPhrase(0),
        carMake: randopeep.corporate.name('large', 0),
        "kmDriven": Math.floor(Math.random() * 100000),
        'location': randopeep.address.geo()
    };
    o.push(d);
    fs.writeFileSync("./app/index.get.json", JSON.stringify(o));
}

// Here we generate data for the api that can be used in the front end
//TODO: Move object location random every 5 seconds
// Below is the implementation of the task

// Interval function is created for creating the new index.get.json file at
// location '/cars' with new random location every 5 seconds

var i = setInterval(function () {
    fs.writeFileSync("./cars/index.get.json", '[]');

    // 20 object generated with all the object properties same except location
    newlocation();newlocation();newlocation();newlocation();newlocation();
    newlocation();newlocation();newlocation();newlocation();newlocation();
    newlocation();newlocation();newlocation();newlocation();newlocation();
    newlocation();newlocation();newlocation();newlocation();newlocation();

    // Function created to generate new random location for object
    function newlocation() {
        var jsonData = JSON.parse(fs.readFileSync('./app/index.get.json', 'utf8'));
        var n = JSON.parse(fs.readFileSync('./cars/index.get.json', 'utf8'));

        jsonData.forEach(function(item, index) {
            jsonData[index].location = randopeep.address.geo();
            var nd = {
                driverName: jsonData[index].driverName,
                driverCityOrigin: jsonData[index].driverCityOrigin,
                "driverLanguage": jsonData[index].driverLanguage,
                driverPhone: jsonData[index].driverPhone,
                "driverGender": jsonData[index].driverGender,
                driverInfo: jsonData[index].driverInfo,
                carMake: jsonData[index].carMake,
                "kmDriven": jsonData[index].kmDriven,
                'location': randopeep.address.geo()
            };
            n.push(nd);
            fs.writeFileSync("./cars/index.get.json", JSON.stringify(n));
        });

    }
}, 5000);

// Uncomment below function when you want to stop the iteration after particular time
// setTimeout(function () {
//     clearInterval(i);
// },30000);

function cf() {fs.writeFile("./app/index.get.json", '[]');}

// Create the REST API server
http.createServer(can).listen(3000);

// Create the server for serving static files (html, css etc.)
http.createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);
