import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function login(request: Request, response: Response) {
  const userRepository = getManager().getRepository(User);
  const userDB = await userRepository.findOne({
    login: request.body.login
  });

  const Reject = () => {
    return response.status(401).json({
      errorMessage: "login or password is incorrect"
    });
  };

  if (userDB) {
    bcrypt.compare(request.body.password, userDB.password, (err, res) => {
      console.log(res);
      if (res === true) {
        const userData = {
          login: request.body.login,
          userId: userDB.id,
          isAdmin: userDB.isAdmin
        };

        jwt.sign(
          { userData },
          "secretkey-1992",
          { expiresIn: "86400s" },
          (err, token) => {
            response.json({
              userName: userDB.login,
              userId: userDB.id,
              token: token,
              isAuthorized: true,
              error: ""
            });
          }
        );
      } else {
        Reject();
      }
    });
  } else {
    Reject();
  }
}
