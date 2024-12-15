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
            <td class="px-6 py-4">{{ ld.isActive ? 'Activo' : 'Inactivo' }}
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
