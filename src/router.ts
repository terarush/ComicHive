import express from 'express';
import { authController } from './controller/auth-controller';

const m = express.Router();

m.use('/auth', authController);

export { m };
