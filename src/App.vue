<template>
  <Navbar @registrar="mostrarRegistro = true" />
  <router-view />
  <div class="shadow-2xl" v-if="isHomePage">
    <div class="container2">
      <CrearUsuario 
      v-if="mostrarRegistro" 
      :usuarioEditado="usuarioEditado" 
      @crearUsuario="crearUsuario" 
      @editarUsuario="editarUsuario" 
      @cancelar="cancelarEdicion" 
    />
      <DataTable 
        :listarDatos="listarDatos" 
        @delete="handleDelete" 
        @edit="handleEdit"
      />
    </div>
    <CrearUsuario v-if="mostrarRegistro" @usuarioCreado="crearUsuario" /> <!-- Mostrar el formulario de registro -->
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from './components/DataTable.vue';
import Navbar from './components/Navbar.vue';
import CrearUsuario from './components/CrearUsuario.vue'; // Importar el componente de registro
import { computed } from 'vue';

export default {
  name: 'App',
  components: {
    DataTable,
    Navbar,
    CrearUsuario
  },
  data() { 
    return {
      listarDatos: [],
      mostrarRegistro: false, // Controlar la visibilidad del formulario de registro
    };
  },
  mounted() {
    this.obtenerUsuarios(); // Llama a la función para obtener usuarios al montar el componente
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/'; // Verifica si la ruta actual es la de inicio
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
        this.obtenerUsuarios(); // Actualiza la lista de usuarios después de crear uno nuevo
        this.mostrarRegistro = false; // Ocultar el formulario después de registrar
      } catch (error) {
        console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
      }
    },
    async handleDelete(id) {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${id}`);
        console.log('Usuario eliminado:', id);
        this.obtenerUsuarios(); 
      } catch (error) {
        console.error('Error al eliminar el usuario:', error.response ? error.response.data : error.message);
      }
    },
    handleEdit(usuario) {
      this.usuarioEditado = usuario; // Se Almacena el usuario que se va a editar
      this.mostrarRegistro = true; // Se Muestra el formulario de registro
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

    cancelarEdicion() {
      this.mostrarRegistro = false; // Ocultar el formulario
      this.usuarioEditado = null; // Reiniciar el usuario editado
    }
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
  top: 20%;
  left: 18%;
  box-shadow: 0 40px 60px rgba(0, 0, 0, 0.25);
}
</style>