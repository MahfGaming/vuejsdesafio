<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Confirmar Eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Sí, eliminar</button>
          <button @click="cancelDelete" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      onConfirm: {
        type: Function,
        required: true
      },
      onCancel: {
        type: Function,
        required: true
      }
    },
    methods: {
      confirmDelete() {
        this.onConfirm(); // Llamamos a la función de confirmación
      },
      cancelDelete() {
        this.onCancel(); // Llamamos a la función de cancelación
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .modal-actions {
    margin-top: 20px;
  }
  
  .btn-confirm {
    background-color: red;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-cancel {
    background-color: gray;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>