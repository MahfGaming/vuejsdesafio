<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-custom-background">
    <p class="text-4xl font-bold text-gray-900 dark:text-white">{{ isEdit ? 'Editar Usuario' : 'Registrar Usuario' }}</p>
    <form @submit.prevent="isEdit ? actualizarUsuario() : registrarUsuario()" class="max-w-sm mx-auto bg-grey p-6 rounded shadow-md">
      <div class="mb-5">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input
          type="text"
          id="username"
          v-model="nuevoUsuario.usurname"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="aquí tu nombre."
          required
        />
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
        <input
          type="email"
          id="email"
          v-model="nuevoUsuario.email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w -full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"/>
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Activo</label>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {{ isEdit ? 'Actualizar' : 'Registrar' }}
      </button>
    </form>
    <transition name="fade">
      <div v-if="successMessage" class="mt-4 text-green-500">
        {{ isEdit ? 'Usuario actualizado con éxito!' : 'Usuario registrado con éxito!' }}
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
      successMessage: false,
      isEdit: false,
    };
  },
  created() {
    const userId = this.$route.params.id;
    if (userId) {
      this.isEdit = true;
      this.obtenerUsuario(userId);
    }
  },
  methods: {
    async obtenerUsuario(id) {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
        this.nuevoUsuario = response.data;
        this.successMessage = false;
      } catch (error) {
        console.error('Error al obtener el usuario:', error.response ? error.response.data : error.message);
      }
    },
    async registrarUsuario() {
      try {
        console.log('Datos a registrar:', this.nuevoUsuario);
        const response = await axios.post('http://localhost:3000/usuarios', this.nuevoUsuario);
        console.log('Usuario registrado:', response.data);
        this.successMessage = true;
        this.nuevoUsuario = { usurname: '', password: '', email: '', isActive: false };

        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      } catch (error) {
        console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
      }
    },
    async actualizarUsuario() {
      try {
        const userId = this.$route.params.id;
        const response = await axios.patch(`http://localhost:3000/usuarios/${userId}`, this.nuevoUsuario);
        console.log('Usuario actualizado:', response.data);
        this.successMessage = true;

        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      } catch (error) {
        console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<style scoped>


</style>