const taskModel = require("../../data/tasks/taskModel");
const cfg = require("../../../configs.json");
const jwt = require("jsonwebtoken");

function verifyToken(req) {
  if (null == req.headers.authorization || "" == req.headers.authorization) {
    return { message: "Auth Headers must not be empty" };
  }
  const token = req.headers.authorization.split(" ")[1];
  return jwt.verify(token, cfg.SECRET, function (err) {
    if (err) return err;
  });
}

exports.getTask = async function (req, res) {
  const verified = verifyToken(req);
  if (typeof verified == "object") {
    return res.status(401).json(verified);
  }

  try {
    const limit = req.query.limit != null ? parseInt(req.query.limit) : 0;
    const skips = req.query.skips != null ? parseInt(parsereq.query.skips) : 0;

    const getTaskList = await taskModel
      .find(req.query.done != null ? { done: req.query.done } : {})
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skips);

    return res.status(200).json({
      totalNum: getTaskList.length,
      totalPages: Math.ceil(getTaskList.length / limit),
      limit,
      skips,
      data: getTaskList,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      message: "Failed to retrieve task",
      error: e,
    });
  }
};

exports.createTask = async function (req, res) {
  const verified = verifyToken(req);
  if (typeof verified == "object") {
    return res.status(401).json(verified);
  }

  try {
    let taskCreate = await taskModel.create(req.body);
    taskCreate = taskCreate.toObject();
    return res.status(200).json({
      data: taskCreate,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      message: "Failed to create Task",
      error: e,
    });
  }
};

exports.deleteTaskComp = async function (req, res) {
  const verified = verifyToken(req);
  if (typeof verified == "object") {
    return res.status(401).json(verified);
  }

  try {
    taskModel.deleteMany({ done: true }, async () => {
      const tasks = await taskModel.find({}).sort({ _id: -1 }).limit(5);
      return res.status(200).json({
        tasks,
        message: "Successfully deleted all completed task",
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      message: "Failed to delete task",
      error: e,
    });
  }
};

exports.getTaskItem = async function (req, res) {
  const verified = verifyToken(req);
  if (typeof verified == "object") {
    return res.status(401).json(verified);
  }
  try {
    const result = await taskModel.findById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: e });
    console.log(error);
  }
};

exports.updateTaskItem = async function (req, res) {
  const verified = verifyToken(req);
  if (typeof verified == "object") {
    return res.status(401).json(verified);
  }
  try {
    const result = await taskModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: e });
    console.log(error);
  }
};

exports.deleteTaskItem = async function (req, res) {
  const verified = verifyToken(req);
  if (typeof verified == "object") {
    return res.status(401).json(verified);
  }
  try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      message: "Failed to Delete",
      error: e,
    });
  }
};
