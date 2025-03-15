import express from 'express';
import { LoginUserRequest, RegisterUserRequest } from "../model/user-model";
import { AuthService } from "../service/auth-service";

export const authController = express.Router();

authController.post("/register", async (req, res) => {
  const request = req.body as RegisterUserRequest;
  try {
    const response = await AuthService.register(request);
    res.status(200).json({
      data: response,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

authController.post("/login", async (req, res) => {
  const request = req.body as LoginUserRequest;
  try {
    const response = await AuthService.login(request);
    res.status(200).json({
      data: response,
    });
  } catch (error: any) {
    res.status(401).json({
      message: error.message,
    });
  }
});
