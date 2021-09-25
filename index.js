const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require("./src/config/database");
const UserAPI = require("./src/api/user.api");
const RouteAPI = require("./src/api/route.api");
const BusAPI = require("./src/api/bus.api");
const TimeTableAPI = require("./src/api/timeTable.api");
const CardAPI = require("./src/api/card.api");
const TravelLogAPI = require("./src/api/travelLog.api");

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Hello Node!");
});

app.use("/user", UserAPI());
app.use("/route", RouteAPI());
app.use("/bus", BusAPI());
app.use("/timeTable", TimeTableAPI());
app.use("/card", CardAPI());
app.use("/travelLog", TravelLogAPI());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});