const TaskServices = require('../../services/tasks/taskServices');

exports.getTask = (req, res) => { return TaskServices.getTask(req, res) } 

exports.createTask = (req, res) => { return TaskServices.createTask(req, res) } 

exports.deleteTaskComp = (req, res) => { return TaskServices.deleteTaskComp(req, res) } 


exports.getTaskItem = (req, res) => { return TaskServices.getTaskItem(req, res) } 

exports.updateTaskItem = (req, res) => { return TaskServices.updateTaskItem(req, res) } 

exports.deleteTaskItem = (req, res) => { return TaskServices.deleteTaskItem(req, res) } 