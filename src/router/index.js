import { createRouter, createWebHistory } from 'vue-router';
import CrearUsuario from '../components/CrearUsuario.vue';


const routes = [
  {
    path: '/', 
     name: 'Home',
    component: { template: '<div></div>' } 
  },

 {
      path: '/crear-usuario',
      component: CrearUsuario,
    },

    {
        path: '/editar/:id',
        name: 'EditarUsuario',
        component: CrearUsuario,
      },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;