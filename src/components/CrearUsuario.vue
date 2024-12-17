<template>
  <div class="registros">
    <div class="flex flex-col items-center justify-center min-h-screen bg-custom-background">
      <div class="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <p class="text-4xl font-bold mb-4">{{ isEdit ? 'Editar Usuario' : 'Registrar Usuario' }}</p>
        <form @submit.prevent="isEdit ? actualizarUsuario() : registrarUsuario()">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="username"
              v-model="nuevoUsuario.usurname"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              v-model="nuevoUsuario.email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="password"
              v-model="nuevoUsuario.password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                v-model="nuevoUsuario.isActive"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
            </div>
            <label for="terms" class="ms-2 text-sm font-medium text-gray-900">Activo</label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {{ isEdit ? 'Actualizar' : 'Registrar' }}
          </button>
        </form>
        <transition name="fade">
          <div>
            <div v-if="successMessage" class="mt-4 text-green-500">
              {{ isEdit ? 'Usuario actualizado con éxito!' : 'Usuario registrado con éxito!' }}
            </div>
            <div v-if="errorMessage" class="mt-4 text-red-500">
              {{ errorMessage }}
            </div>
          </div>
        </transition>
      </div>
    </div>
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
      errorMessage: '',
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
        this.errorMessage = '';
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
        this.errorMessage = '';
        this.nuevoUsuario = { usurname: '', password: '', email: '', isActive: true };

        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      } catch (error) {
        console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 409) {
          this.errorMessage = 'El correo electrónico ya está en uso. Por favor, elige otro.';
        } else {
          this.errorMessage = 'El correo electrónico ya está en uso. Por favor, elige otro.';
        }
      }
    },
    async actualizarUsuario() {
      try {
        const userId = this.$route.params.id;
        const response = await axios.patch(`http://localhost:3000/usuarios/${userId}`, this.nuevoUsuario);
        console.log('Usuario actualizado:', response.data);
        this.successMessage = true;
        this.errorMessage = '';

        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      } catch (error) {
        console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 409) {
          this.errorMessage = 'El correo electrónico ya está en uso. Por favor, elige otro.';
        } else {
          this.errorMessage = 'El correo electrónico ya está en uso. Por favor, elige otro.';
        }
      }
    }
  }
};
</script>

<style scoped>
.registros {
  position: absolute;
  top: 0%;
  left: 38%;
}
</style>