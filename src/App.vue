<script>
import axios from 'axios';
import { useAttrs } from 'vue';

export default {
  name: 'App',
  data() { 
    return {
      fields: ['usurname', 'password', 'email', 'isActive'],
      id: "",
      usurname: "",
      password: "",
      email: "",
      isActive: "",
      listarDatos: [],
    };
  },
  mounted() {
    axios.get('http://localhost:3000/usuarios')
      .then(response => {
        this.listarDatos = response.data;
        console.log(this.listarDatos);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  
  }
}

</script>


<template>
  <div class="container flex items-center justify-center min-h-screen">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-4xl">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Contraseña</th>
            <th scope="col" class="px-6 py-3">Correo</th>
            <th scope="col" class="px-6 py-3">Activo/Inactivo</th>
            <th scope="col" class="px-6 py-3">Acciones</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="ld in listarDatos" :key="ld.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ ld.id }}
            </th>
            <td class="px-6 py-4">{{ ld.usurname }}</td>
            <td class="px-6 py-4">{{ ld.password }}</td>
            <td class="px-6 py-4">{{ ld.email }}</td>
            <td class="px-6 py-4">{{ ld.isActive ? 'Activo' : 'Inactivo' }}</td>
            <td class="px-6 py-4">
              <!-- Botón de Editar -->
              <button type="button" class="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
                Editar 
              </button>
              <!-- Botón de Eliminar -->
              <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
