import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { user } from "../entities/user";
import { hashPassword } from "../utils";
import { todo } from "../entities/todo";
import { IsBooleanString } from "class-validator";

class BetController {
  static listAll = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const userRepository = getRepository(user);
    const foundUser = await userRepository.findOne(id);
    const betRepository = getRepository(todo);
    const todos = await betRepository.find({
      where: { user: foundUser },
      order: { createdAt: "DESC" }
    });
    res.send(todos);
  };

  static createTodo = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const { description, name } = req.body;
    const userRepository = getRepository(user);
    const foundUser = await userRepository.findOne(id);
    const todoRepository = getRepository(todo);
    const todoToAdd = new todo();
    todoToAdd.description = description;
    todoToAdd.name = name;
    todoToAdd.user = foundUser;
    const savedTodo = await todoRepository.save(todoToAdd);
    res.status(200).send(savedTodo);
  };

  static editTodo = async (req: Request, res: Response) => {
    const { id, content, isdone } = req.query;
    const isDoneNumber: number = parseInt(isdone);
    const todoRepository = getRepository(todo);
    const foundTodo = await todoRepository.findOne(id);
    foundTodo.name = content;
    foundTodo.isDone = !!isDoneNumber;
    const savedTodo = await todoRepository.save(foundTodo);
    res.status(200).send(savedTodo);
  };

  static deleteTodo = async (req: Request, res: Response) => {
    const todoId = req.query.id;
    const userId = res.locals.jwtPayload.userId;
    const userRepository = getRepository(user);
    const foundUser = await userRepository.findOne(userId);
    const todoRepository = getRepository(todo);
    const foundTodo = await todoRepository.findOne({
      where: { id: todoId },
      relations: ["user"]
    });
    if (!foundTodo) {
      res.status(404).send("To-do not found");
      return;
    }
    // if this code is reached, it means the user is authenticated and valid, so no needs to check if the foundUser is null
    if (foundTodo.user && foundTodo.user.id === foundUser.id) {
      await todoRepository.delete(todoId);
      res.status(200).send(foundTodo);
    } else {
      res.status(401).send(`You don't have rights to do that`);
    }
  };
}

export default BetController;
