<template>
    <nav class="navbar">
        <div><router-link to="/">Inicio</router-link></div>
     <div><router-link to="/crear-usuario">Crear Usuario</router-link></div>

    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #007BFF;
    color: white;
  }
  </style>