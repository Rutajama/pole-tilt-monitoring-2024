const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = "76da10f49b95d55f07a29b292a8dcd1e5781c9265403c0e0e9b2a1cefde610c6dae703";

const Admin = require("../models/admin");
const Data = require("../models/data");
const Settings = require("../models/settings");

exports.logout = function(req, res) {
  res.cookie("jwt", "", {maxAge: "1"});
  res.redirect("/");
};
exports.login_get = function(req, res) {
  res.render("admin_login", {
    title: "Admin Login",
  })
};
exports.login_post = function(req, res) {
  try{
    const { username, password } = req.body;
    
    Admin.findOne( {username: username}, (err, user) => {
      if(err) {
        return res.status(401).send(err.message);
      }
      if(user == null) {
        res.send('failed to login');
        return;
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            {id: user._id, username, role: user.role},
            jwtSecret,
            { expiresIn: maxAge },
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });
          res.redirect("/admin");
          return;
        }
        else {
          return res.status(401).send("couldnt login");
        }
      });
    });
  }
  catch(error) {
    return res.status(401).send(error.message);
  }
};
exports.start_index = function(req, res) {
  res.redirect("/admin");
};
exports.index = function(req, res) {
  res.render("admin_index", {
    title: "Pole Tilt Monitoring",
  });
};
exports.show_data = async (req, res) => {
  try {
    let dataResult = await Data.find({});
    let settingsResult = await Settings.findOne();
    
    if(dataResult.length == 0) {
      res.render("result_page", {
        title: "No data to show.",
      });
      return;
    }

    res.render("all_data", {
      data: dataResult,
      title: "All data",
      minAngle: settingsResult.minAngle,
    });
  }
  catch(err) {
    console.log(`show data error: ${err.message}`);
  }
};
exports.settings_get = function (req, res) {
  res.render("settings_form", {
    title: "Update minimum title angle",
  });
};
exports.settings_post = async (req, res) => {
  try {
    let setAngle = req.body.angle;

    await Settings.findOneAndUpdate({}, {minAngle: setAngle});
    res.render("result_page", {
      title: "Settings saved!",
    });
  }
  catch (err) {
    console.log(`settings error ${err.message}`);
  }
};
exports.clear_data = async (req, res) => {
  try {
    await Data.deleteMany();

    res.render("result_page", {
      title: "Data deleted successfully",
    });
  }
  catch (err) {
    console.log(`clear data error ${err.message}`);
  }
};

