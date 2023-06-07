const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  // split the second item from the authorization, which is the token

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    // grab id from the token, needs secret to verify signature

    req.user = await User.findOne({ _id }).select("_id");
    // returns just the id property
    next();
    // fires the next handler function
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
