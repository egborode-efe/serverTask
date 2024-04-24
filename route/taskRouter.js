const express = require("express");
const {
  allTasks,
  singleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const methodNotAllowed = require("../utils/methodNotAllowed");
const auth = require("../middlewears/auth");
const router = express.Router();

router
  .route("/")
  .get(auth, allTasks)
  .post(auth, createTask)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(auth, singleTask)
  .patch(auth, updateTask)
  .delete(auth, deleteTask)
  .all(methodNotAllowed);

module.exports = router;
