<template>
  <nav class="navbar">
    <div>
      <router-link to="/" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Inicio</router-link>
    </div>
    <div>
      <router-link to="/crear-usuario" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Registrar Usuario</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  position: relative; 
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: rgba(43, 50, 56, 0.432); 
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(64px); 
  z-index: 10; 
}

</style>