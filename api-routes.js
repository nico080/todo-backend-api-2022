// api-routes.js
// Initialize express router
let router = require('express').Router();

const userController = require('./src/controller/user/userController');
const taskControllers = require('./src/controller/tasks/tasksController');

//AUTHENTICATE
router.route('/auth').post(userController.auth)

//USERS ROUTES
router.route('/users').post(userController.addUser)


//TASKS ROUTES
router.route('/tasks')
  .get(taskControllers.getTask)
  .post(taskControllers.createTask)
  .delete(taskControllers.deleteTaskComp)

router.route('/tasks/:id')
  .get(taskControllers.getTaskItem)
  .patch(taskControllers.updateTaskItem)
  .delete(taskControllers.deleteTaskItem)

// Export API routes
module.exports = router