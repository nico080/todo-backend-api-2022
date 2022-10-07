const userModel = require("../../data/user/userModel");
const cfg = require("../../../configs.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.auth = async function (req, res) {
  const uname = req.body.uname;
  const pwd = req.body.password;
  const isEmptybody = Object.keys(req.body).length === 0;

  if (isEmptybody || null == uname || null == pwd)
    return res.status(400).json({ ok: false, message: "Invalid Request Body" });

  try {
    const user = await userModel.findOne({ uname });
    if (null === user)
      return res
        .status(404)
        .json({ ok: false, message: "User not found!" });
    else {
      if (!bcrypt.compareSync(pwd, user.password))
        return res
          .status(401)
          .json({ ok: false, message: "Wrong Credentials!" });
      else
        return res
          .status(200)
          .json({
            uname,
            token: jwt.sign({ user }, cfg.SECRET, { expiresIn: "1h" }),
          });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      message: "Failed to Generate Token. Invalid User.",
      error: e,
    });
  }
};

exports.addUser = async function (req, res) {
  const uname = req.body.uname;
  const pwd = req.body.password;

  const isEmptybody = Object.keys(req.body).length === 0;
  if (isEmptybody || null == pwd)
    return res.status(400).json({ ok: false, message: "Invalid Body Params" });

  try {
    const userExistsCnt = await userModel.find({ uname });
    if (userExistsCnt.length >= 1)
      return res
        .status(409)
        .json({ ok: false, message: "User Already Exists!" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(pwd, salt, 10);
    let userCreate = await userModel.create({ uname, password: hashedPwd });
    userCreate = userCreate.toObject();
    return res.status(200).json({
      user: userCreate,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      message: "Failed to create User",
      error: e,
    });
  }
};
