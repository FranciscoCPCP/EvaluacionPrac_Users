// DashboardPage.tsx
// Vista principal del dashboard tras el login/registro exitoso.
// Muestra un saludo personalizado y una tabla demo de gestión de clientes.

import React from 'react';
import { useUser } from '../context/UserContext'; // Hook para obtener el usuario autenticado

const DashboardPage: React.FC = () => {
  // Obtiene el usuario actual desde el contexto global
  const { user } = useUser();

  // Renderiza la interfaz del dashboard
  return (
    // Contenedor principal con estilos de fondo y centrado
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-sky-50 p-6">
      {/* Tarjeta central con sombra y bordes redondeados */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
        {/* Saludo personalizado usando el nombre del usuario */}
        <h1 className="text-3xl font-bold mb-4">Bienvenid@{user?.name ? `, ${user.name}` : ''}!</h1>
        {/* Subtítulo del panel */}
        <p className="text-gray-700 mb-6">Panel de gestión de clientes</p>
        {/* Sección de clientes */}
        <div className="border rounded-lg p-6 bg-slate-50">
          <h2 className="text-xl font-semibold mb-4">Clientes</h2>
          {/* Tabla de clientes (demo, datos estáticos) */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Nombre</th>
                  <th className="px-4 py-2 border-b">Correo</th>
                  <th className="px-4 py-2 border-b">Tipo</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Fila 1: Cliente de ejemplo */}
                <tr>
                  <td className="px-4 py-2 border-b">Juan Pérez</td>
                  <td className="px-4 py-2 border-b">juan@email.com</td>
                  <td className="px-4 py-2 border-b">Empresa</td>
                  <td className="px-4 py-2 border-b">
                    {/* Botones de acción (no funcionales en demo) */}
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                  </td>
                </tr>
                {/* Fila 2: Cliente de ejemplo */}
                <tr>
                  <td className="px-4 py-2 border-b">Ana López</td>
                  <td className="px-4 py-2 border-b">ana@email.com</td>
                  <td className="px-4 py-2 border-b">Particular</td>
                  <td className="px-4 py-2 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                  </td>
                </tr>
                {/* Fila 3: Cliente de ejemplo */}
                <tr>
                  <td className="px-4 py-2 border-b">Carlos Ruiz</td>
                  <td className="px-4 py-2 border-b">carlos@email.com</td>
                  <td className="px-4 py-2 border-b">Empresa</td>
                  <td className="px-4 py-2 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Editar</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Nota aclaratoria */}
          <p className="text-gray-500 mt-4">Aquí podrás gestionar tus clientes. (Funcionalidad demo)</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
