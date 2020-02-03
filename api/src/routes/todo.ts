import { Router } from "express";
var swaggerAnnotations = require("swagger-annotations");
import { checkJwt } from "../middlewares/checkJwt";
import TodoController from "../controllers/todo-controller";

const router = Router();

/**
 *
 * @route GET /todo
 * @group Todo - Todo operations
 * @headers {string} auth -
 * @returns {object}  200 - {todo}
 * @returns {Error}  400 -  {error}
 */
router.get("/", checkJwt, TodoController.listAll);

/**
 * @typedef PostTodoBody
 *
 * @property {string} name - user email
 * @property {string} isDone - user password
 */

/**
 *
 * @route POST /todo
 * @group Todo - Todo operations
 * @headers {string} auth -
 * @param {PostTodoBody.model} PostTodoBody.body.required - the new todo
 * @returns {object}  200 - {todo}
 * @returns {Error}  400 -  {error}
 */
router.post("/", checkJwt, TodoController.createTodo);

/**
 *
 * @route PUT /todo
 * @group Todo - Todo operations
 * @headers {string} auth -
 * @param {number} id.query.required - To-do's id
 * @param {string} content.query.required - To-do's id
 * @param {number} isdone.query.required - To-do's id
 * @returns {object}  200 - {todo}
 * @returns {Error}  400 -  {error}
 */
router.put("/", checkJwt, TodoController.editTodo);

/**
 *
 * @route DELETE /todo
 * @group Todo - Todo operations
 * @headers {string} auth -
 * @param {number} id.query.required - To-do's id
 * @returns {object}  200 - {todo}
 * @returns {Error}  400 -  {error}
 */
router.delete("/", checkJwt, (req, res) => TodoController.deleteTodo(req, res));

export default router;
