<template>
  <Navbar @registrar="mostrarRegistro = true" />
  <router-view />
  <div class="centrartexto" v-if="isHomePage">
    <p class="text-4xl font-bold text-gray-900 dark:text-white">Tabla de Usuarios Registrados</p>
  </div>
  <div class="shadow-2xl" v-if="isHomePage">
    <div class="container2">
      <CrearUsuario 
        v-if="mostrarRegistro" 
        :usuarioEditado="usuarioEditado" 
        @crearUsuario="crearUsuario" 
        @cancelar="cancelarEdicion" 
      />
      <DataTable 
        :listarDatos="listarDatos" 
        @delete="handleDelete" 
        @edit="handleEdit"
      />
    </div>
  </div>
  <AlertaBorrado 
    :isVisible="isModalVisible" 
    :onConfirm="confirmDelete" 
    :onCancel="cancelDelete" 
  />
</template>

<script>
import axios from 'axios';
import DataTable from './components/DataTable.vue';
import Navbar from './components/Navbar.vue';
import CrearUsuario from './components/CrearUsuario.vue'; 
import AlertaBorrado from './components/AlertaBorrado.vue';

export default {
  name: 'App',
  components: {
    DataTable,
    Navbar,
    CrearUsuario,
    AlertaBorrado 
  },
  data() { 
    return {
      listarDatos: [],
      mostrarRegistro: false,
      usuarioEditado: null,
      isModalVisible: false, // Aqui controlamos la visibilidad del modal
      userIdToDelete: null // userIdtoDelete almacena el ID del usuario a eliminar
    };
  },
  mounted() {
    this.obtenerUsuarios();
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    }
  },
  methods: {
    async obtenerUsuarios() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        this.listarDatos = response.data;
        console.log(this.listarDatos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    
    async crearUsuario(nuevoUsuario) {
      try {
        const response = await axios.post('http://localhost:3000/usuarios', nuevoUsuario);
        console.log('Usuario registrado:', response.data);
        this.obtenerUsuarios();
        this.mostrarRegistro = false;
      } catch (error) {
        console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
      }
    },
    
    handleDelete(id) {
      this.userIdToDelete = id; // Almacena el ID del usuario a eliminar
      this.isModalVisible = true; // Muestra el modal de confirmación
    },
    
    async confirmDelete() {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${this.userIdToDelete}`);
        console.log('Usuario eliminado:', this.userIdToDelete);
        this.obtenerUsuarios();
      } catch (error) {
        console.error('Error al eliminar el usuario:', error.response ? error.response.data : error.message);
      } finally {
        this.isModalVisible = false; // Ocultamos el modal después de la acción
        this.userIdToDelete = null; // Resetea el ID del usuario a eliminar
      }
    },
    
    cancelDelete() {
      this.isModalVisible = false; 
      this.userIdToDelete = null; 
    },
    
    handleEdit(usuario) {
      this.usuarioEditado = usuario;
      this.mostrarRegistro = true;
    },
    
    async editarUsuario(usuarioActualizado) {
      try {
        const response = await axios.patch(`http://localhost:3000/usuarios/${usuarioActualizado.id}`, usuarioActualizado);
        console.log('Usuario actualizado:', response.data);
        this.obtenerUsuarios();
        this.mostrarRegistro = false;
        this.usuarioEditado = null;
      } catch (error) {
        console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
      }
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
.container2 {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 28%;
  left: 18%;
  box-shadow: 0 40px 60px rgba(0, 0, 0, 0.25);
}
.centrartexto {
  margin-top: 75px;
  text-align: center;
}
</style>