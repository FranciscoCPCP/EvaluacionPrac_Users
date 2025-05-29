import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8085;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
    const { name, email, userType } = req.body;
    
    // Valida los campos requeridos
    if (!name || !email || !userType) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    // Crea un nuevo usuario con timestamp
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      userType,
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
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});