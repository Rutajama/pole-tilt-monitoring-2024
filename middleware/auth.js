const jwt = require('jsonwebtoken');

const jwtSecret = "76da10f49b95d55f07a29b292a8dcd1e5781c9265403c0e0e9b2a1cefde610c6dae703";

exports.admin_auth = function(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if(token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if(decodedToken != null) {
          next();
        }
      });
    }
    else {
      res.redirect("/admin/login");
    }
  }
  catch(err) {
    console.log(`adin auth error ${err.message}`);
    return res.status(401).send(err.message);
  }
};
