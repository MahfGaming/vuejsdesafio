<script>
import axios from 'axios';

export default {
  name: 'App',
  data: () {
    return {
    fields: ['usurname','password','email','isAtive'],
    id: "",
    usurname: "",
    password: "",
    email: "",
    isActive: "",
    listarDatos: [],
    }
  },
  mounted() {
    axios.get('http://localhost:3000/usuarios')
  }

}




</script>






<template>
 <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
</template>

<style scoped>

</style>
