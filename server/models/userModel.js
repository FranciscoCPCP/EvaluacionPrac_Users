// Modelo de usuario para manejar datos en archivo JSON
import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta al archivo de datos de usuarios
const usersFilePath = join(__dirname, 'users.json');

// Inicializa el archivo de usuarios si no existe
async function initUsersFile() {
  try {
    await fs.access(usersFilePath);
  } catch (error) {
    // El archivo no existe, créalo con un array vacío
    await fs.writeFile(usersFilePath, JSON.stringify([]));
  }
}

// Obtiene todos los usuarios
export async function findAll() {
  await initUsersFile();
  const data = await fs.readFile(usersFilePath, 'utf8');
  return JSON.parse(data);
}

// Busca usuario por correo
export async function findByEmail(email) {
  const users = await findAll();
  return users.find(user => user.email === email);
}

// Busca usuario por ID
export async function findById(id) {
  const users = await findAll();
  return users.find(user => user.id === id);
}

// Crea un nuevo usuario
export async function create(userData) {
  await initUsersFile();
  // Obtiene los usuarios existentes
  const users = await findAll();
  // Crea nuevo usuario con ID
  const newUser = {
    id: Date.now().toString(),
    ...userData
  };
  // Agrega al array de usuarios
  users.push(newUser);
  // Guarda la lista actualizada
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  return newUser;
}

// Actualiza un usuario
export async function update(id, userData) {
  const users = await findAll();
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return null;
  }
  
  // Actualiza los datos del usuario
  const updatedUser = {
    ...users[index],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  
  users[index] = updatedUser;
  
  // Guarda la lista actualizada
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  
  return updatedUser;
}

// Elimina un usuario
export async function remove(id) {
  const users = await findAll();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) {
    return false; // Usuario no encontrado
  }
  
  // Guarda la lista actualizada
  await fs.writeFile(usersFilePath, JSON.stringify(filteredUsers, null, 2));
  
  return true;
}