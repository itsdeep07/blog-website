//This is basic code for out node js files which is prity obvious 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = ["web dev", "DSA", "OS"];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    let today = new Date();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    let day = today.toLocaleDateString('en-US', options);

    // switch (currentDay) {
    //     case 0:
    //         dayName = "Sunday";
    //         break;
    //     case 1:
    //         dayName = "Monday";
    //         break;

    //     case 2:
    //         dayName = "Tueday";
    //         break;

    //     case 3:
    //         dayName = "Wednesday";
    //         break;

    //     case 4:
    //         dayName = "Thursday";
    //         break;

    //     case 5:
    //         dayName = "Friday";
    //         break;

    //     case 6:
    //         dayName = "Saturday";
    //         break;
    //     default:
    //         console.log("Error: current day is equal to: " + currentDay);
    // }


    // if (currentDay === 6 || currentDay === 0) {
    //     day = dayName
    //     // res.render("list", { kindOfDay: day });
    // }
    // else {
    //     day = dayName;
    //     // res.render("list", { kindOfDay: day });
    // }
    res.render("list", { listTitle: day, newListItem: items });
});

app.post('/', function (req, res) {

    let item = req.body.task;

    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work')
    }
    else {
        items.push(item);
        res.redirect('/');
    }


    items.push(item);
    res.redirect('/');
})

app.get("/work", function (req, res) {

    res.render("list", { listTitle: "Work List", newListItem: workItems })
})

app.post('/work', function (req, res) {
    let item = req.body.newListItem;
    workItems.push(item);
    res.redirect('/work');
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

