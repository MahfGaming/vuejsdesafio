import axios from 'axios';

export default {
  data() {
    return {
      usuarios: [] 
    };
  },
  methods: {
    async obtenerUsuarios() {
      try {
        const response = await axios.get('/api/usuarios');
        this.usuarios = response.data; // Asigna la lista de usuarios a la variable
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },
    async eliminarUsuario(id) {
      try {
        await axios.delete(`/api/usuarios/${id}`); // Llama al endpoint de eliminación
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id); // Actualiza la lista de usuarios
        console.log('Usuario eliminado');
      } catch (error) {
        console.error('Error al eliminar usuario:', error.response.data);
      }
    }
  },
  mounted() {
    this.obtenerUsuarios(); // Obtiene la lista de usuarios al montar el componente
  }
};