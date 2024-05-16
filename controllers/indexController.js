const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = "76da10f49b95d55f07a29b292a8dcd1e5781c9265403c0e0e9b2a1cefde610c6dae703";

const Admin = require("../models/admin");
const Data = require("../models/data");
const Settings = require("../models/settings");

exports.add_admin_get = function(req, res) {
  res.render("add_admin_form", {
    title: "Add new Admin",
  });
};
exports.add_admin_post = async(req, res) => {
  const {username, password} = req.body;
  
  try {
    const user_exists = await Admin.findOne({username: username});

    if(user_exists) {
      res.send("Admin already exists");
      return;
    }

    const salt_rounds = 10;
    bcrypt.hash(password, salt_rounds, (err, hash) => {
      if(err) {
        throw new Error("Internal server error");
      }
      let user = new Admin({
        username: username,
        password: hash,
      });
      user.save((err) => {
        res.render("normal_result_page", {
          title: "Admin created successfully",
        })
      })
    });
  }
  catch(error) {
    return res.status(401).send(error.message);
  }
};
exports.store_data = async (req, res) => {
  try {
    let auxAngle = req.params.aux;
    let aggAngle = req.params.agg;

    console.log(`new data: aux: ${auxAngle}, agg: ${aggAngle}`);
    const newData = new Data({
      auxilliary: auxAngle,
      aggregate: aggAngle,
    });

    await newData.save();

    res.send("success");
  }
  catch (err) {
    console.log(`store data error ${err.message}`);
  }
};
exports.make_angle = async function(req, res) {
  try {
    const new_settings = new Settings({
      minAngle: 10,
    });

    await new_settings.save();
    res.send("angle created");
  }
  catch (err) {
    console.log(`make angle error ${err.message}`);
    res.send("failed");
  }
};

