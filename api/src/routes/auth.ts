import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

interface ILoginBody {
  email?: string;
  password?: string;
  fbToken?: string;
  googleToken?: string;
  linkedinToken?: string;
  twitterToken?: string;
}
const router = Router();
//Login route

/**
 * @typedef LoginBody
 *
 * @property {string} email - password if login with email
 * @property {string} password - password if login with email
 * @property {string} fbToken - Facebook token if login with Facebook
 * @property {string} googleToken - Google token if login with Google
 * @property {string} linkedinToken - Linkedin token if login with Linkedin
 * @property {string} twitterToken - Twitter token if login with Twitter
 */

/**
 * @typedef LoginResponse
 *
 * @property {string} token - jwt
 * @property {object} user - user from typeorm
 */

/**
 *
 * @route POST /auth/login
 * @group Auth - Auth operations
 * @param {LoginBody.model} loginBody.body.required - login data
 * @returns {LoginResponse.model}  200 - {user, token}
 * @returns {Error}  400 -  {error}
 */
router.post("/login", AuthController.login);



/**
 * @typedef SignUpBody
 *
 * @property {string} email - user email
 * @property {string} password - user password
 * @property {string} firstName - user first name
 * @property {string} lastName - user last name
 */

/**
 * @route POST /auth/signup
 * @group Auth - Auth operations (signup)
 * @param {SignUpBody.model} loginBody.body.required - the new point
 * @returns {LoginResponse.model}  200 - {user, token}
 * @returns {Error}  400 -  {error}
 */
router.post("/signup", AuthController.signUp);

router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
