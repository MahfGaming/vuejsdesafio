<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-custom-background">
      <h2 class="text-2xl font-bold mb-6">Registrar Usuario</h2>
      <form @submit.prevent="registrarUsuario" class="max-w-sm mx-auto bg-grey p-6 rounded shadow-md">
        <div class="mb-5">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input
            type="text"
            id="username"
            v-model="nuevoUsuario.usurname"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre"
            required
          />
        </div>
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            v-model="nuevoUsuario.email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="nuevoUsuario.password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contraseña"
            required
          />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              v-model="nuevoUsuario.isActive"
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
              required
            />
          </div>
          <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Activo</label>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar
        </button>
      </form>
      <transition name="fade">
        <div v-if="successMessage" class="mt-4 text-green-500">
          Usuario registrado con éxito!
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nuevoUsuario: {
          usurname: '',
          password: '',
          email: '',
          isActive: false,
        },
        successMessage: false // Para mostrar el mensaje de éxito
      };
    },
    methods: {
      async registrarUsuario() {
        try {
          const response = await axios.post('http://localhost:3000/usuarios', this.nuevoUsuario);
          console.log('Usuario registrado:', response.data);
          this.successMessage = true; // Mostrar el mensaje de éxito
          this.nuevoUsuario = { usurname: '', password: '', email: '', isActive: false }; // Reiniciar el formulario
  
          // Se oculta el mensaje después de 3 segundos
          setTimeout(() => {
            this.successMessage = false;
          }, 3000);
        } catch (error) {
          console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>