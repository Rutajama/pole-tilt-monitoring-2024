const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

const cookieParser = require('cookie-parser');
const {admin_auth} = require('./middleware/auth');

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/adminRoutes");

const admin_controller = require("./controllers/adminController");;
const index_controller = require("./controllers/indexController");

const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());

var urlencodedParser = bodyParser.urlencoded( {extended: false});

app.get("/", admin_auth, admin_controller.start_index);
app.get("/admin", admin_auth, admin_controller.index);
app.get("/admin/data", admin_auth, admin_controller.show_data);
app.get("/admin/clear-data", admin_auth, admin_controller.clear_data);
app.get("/admin/settings", admin_auth, admin_controller.settings_get);
app.get("/admin/logout", admin_auth, admin_controller.logout);

app.post("/admin/settings", admin_auth, urlencodedParser, admin_controller.settings_post);
app.post("/add-admin", urlencodedParser, index_controller.add_admin_post);
app.post("/admin/login", urlencodedParser, admin_controller.login_post);


mongoDB = "mongodb+srv://Geofrey:Geofrey1234@cluster0.wn8iyom.mongodb.net/poleTilt2024DB?retryWrites=true&w=majority";
// mongoDB = "mongodb://127.0.0.1:27017/poleTilt2024";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use("/", indexRouter);
app.use("/admin", adminRouter);

module.exports = app;
