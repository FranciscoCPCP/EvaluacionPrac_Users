// Controlador de usuario - maneja la lógica de registro

// Importa el modelo de usuario
import * as userModel from '../models/userModel.js';

// Obtiene la página de registro
export const getRegisterPage = (req, res) => {
  res.json({ message: 'Endpoint de la página de registro' });
};

// Registra un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, userType } = req.body;
    
    // Valida los campos requeridos
    if (!name || !email || !userType) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    // Verifica si el correo ya existe
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }
    
    // Crea un nuevo usuario
    const newUser = await userModel.create({
      name,
      email,
      userType,
      createdAt: new Date().toISOString()
    });
    
    // Devuelve la respuesta de éxito
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType
      }
    });
    
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtiene todos los usuarios (función de administrador)
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json({ users });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Inicia sesión de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Valida que el correo y la contraseña estén presentes
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }
    // Busca el usuario por correo
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Correo o credenciales inválidas' });
    }
    // Valida la contraseña (comparación simple, sin hash)
    if (!user.password || user.password !== password) {
      return res.status(401).json({ error: 'Correo o credenciales inválidas' });
    }
    // Devuelve los datos del usuario (sin contraseña)
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};