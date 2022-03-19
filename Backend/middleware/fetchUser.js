var jwt = require("jsonwebtoken");

JWT_SECRET = "ALLAH WILL PROTECT IT FROM EVIL";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Send the Correct Token" });
  }
};

module.exports=fetchuser;