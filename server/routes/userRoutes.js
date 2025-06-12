import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Rutas de registro
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.registerUser);

// Rutas de administrador
router.get('/users', userController.getAllUsers);

// Ruta para inicio de sesión
router.post('/login', userController.loginUser);

export default router;