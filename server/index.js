import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8085',
    'http://192.168.2.123:8085',
    'http://172.28.16.1:8085'
  ],
  credentials: true
}));
app.use(bodyParser.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../')));

// Ruta para servir index.html en cualquier ruta que no sea API
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Models directory path
const modelsDir = join(__dirname, 'models');
const usersFilePath = join(modelsDir, 'users.json');

// Asegúrate de que exista el directorio models
async function ensureModelsDir() {
  try {
    await fs.mkdir(modelsDir, { recursive: true });
    // Inicializa el archivo de usuarios vacío si no existe
    try {
      await fs.access(usersFilePath);
    } catch {
      await fs.writeFile(usersFilePath, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error al crear el directorio models:', error);
  }
}

// Inicializa el servidor
ensureModelsDir();

// Routes
app.get('/api/register', (req, res) => {
  res.json({ message: 'El endpoint de registro está listo' });
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, userType, password } = req.body;
    
    // Valida los campos requeridos
    if (!name || !email || !userType || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    // Crea un nuevo usuario con timestamp
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      userType,
      password,
      createdAt: new Date().toISOString()
    };
    
    // Lee los usuarios actuales
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);
    
    // Verifica si el correo ya existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }
    
    // Agrega el nuevo usuario
    users.push(newUser);
    
    // Guarda la lista de usuarios actualizada
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    
    // Responde con éxito
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
});

app.post('/api/login', async (req, res) => {
  // Redirige la petición al controlador de usuario
  const userController = await import('./controllers/userController.js');
  return userController.loginUser(req, res);
});

// Inicia el servidor
app.listen(PORT, '192.168.2.123', () => {
  console.log(`Servidor corriendo en http://192.168.2.123:${PORT}`);
});