import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { user } from "../entities/user";
import config from "../config/config";
import { hashPassword, checkIfUnencryptedPasswordIsValid } from "../utils";
import { UserService } from "../services";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    console.log(req.body);
    let { fbToken, googleToken, linkedinToken, email, password } = req.body;

    const loginWithSocial = fbToken || googleToken || linkedinToken;
    const loginWithEmail = !!password;

    if (
      (!loginWithEmail && !loginWithSocial) ||
      (loginWithEmail && loginWithSocial)
    ) {
      res.status(400).json({ error: "Bad request" }); //TODO: locale support
      return;
    }
    if (loginWithEmail && !email) {
      res.status(400).json({ error: "Email is empty" });
      return;
    }

    //Get user from database

    let foundUser: user;

    if (loginWithEmail) {
      try {
        foundUser = await UserService.getUserByEmail(email);
      } catch (error) {
        console.log("error", error)
        res.status(401).send({ error: "User not found" });
        return;
      }

      //Check if encrypted password match
      // if (!checkIfUnencryptedPasswordIsValid(password, foundUser.password)) {
      //   res.status(401).send();
      //   return;
      // }
    } else if (loginWithSocial) {
      //TODO: implement login with social
      let newUser;
      if (fbToken) {
        //TODO: resolve facebook id from token
        const fbId = "123123";
        try {
          foundUser = await UserService.getUserByFBId(fbId);
        } catch {
          //New user
        }
      } else if (googleToken) {
        //TODO: resolve facebook id from token
        const googleId = "123123";
        try {
          foundUser = await UserService.getUserByGoogleId(googleId);
        } catch {
          //New user
        }
      } else if (linkedinToken) {
        //TODO: resolve facebook id from token
        const linkedinId = "123123";
        try {
          foundUser = await UserService.getUserByLinkedinId(linkedinId);
        } catch {
          //New user
          await UserService.addUser(newUser);
        }
      }
      if (newUser) {
        //Add new user
        // TODO: Get user name through social login
        newUser = new user();
        newUser.email = email;
        // newUser.firstName = firstName;
        // newUser.lastName = lastName;
        newUser.password = password;

        //Validade if the parameters are ok
        const errors = await validate(newUser);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        foundUser = newUser;
      }
    }

    console.log(foundUser);
    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send({ user: foundUser, token });
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(user);
    let foundUser: user;
    try {
      foundUser = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!checkIfUnencryptedPasswordIsValid(oldPassword, foundUser.password)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    foundUser.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    foundUser.password = hashPassword(newPassword);
    userRepository.save(foundUser);

    res.status(204).send();
  };

  static signUp = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { email, password, firstName, lastName } = req.body;
    let newUser = new user();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = password;

    //Validade if the parameters are ok
    const errors = await validate(newUser);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    newUser.password = hashPassword(password);

    //Try to save. If fails, the username is already in use
    try {
      await UserService.addUser(newUser);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    //Sing JWT, valid for 24 hours
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email
      },
      config.jwtSecret,
      { expiresIn: "24" }
    );

    //If all ok, send 201 response
    res.status(201).send({
      user: newUser,
      token
    });
  };
}
export default AuthController;
