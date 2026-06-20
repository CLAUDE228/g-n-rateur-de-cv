<template>
  <div class="container py-5 my-3 text-center">
    <div class="card p-5 max-w-lg mx-auto rounded-4 border-light shadow bg-white">
      <div class="mb-4">
        <i class="bi bi-check-circle-fill display-2 text-success animated pulse infinite"></i>
      </div>
      
      <h2 class="fw-bold text-slate-800">Exportation Réussie !</h2>
      <p class="text-muted mb-4">Votre CV est optimisé au format PDF vectoriel et a été généré sur l'imprimante réseau de votre navigateur.</p>

      <div class="bg-light p-4 rounded-3 text-start small mb-4">
        <h6 class="fw-bold"><i class="bi bi-info-circle-fill text-primary"></i> Rappel pour l'impression :</h6>
        <p class="text-muted mb-0">Pour un rendu optimal sur une seule page : cochez l'option "Graphismes d'arrière-plan" et décochez "En-têtes et pieds de page" dans vos préférences système d'impression Chrome/Safari.</p>
      </div>

      <div class="d-flex gap-3 justify-content-center">
        <button @click="reprint" class="btn btn-dark rounded-pill px-4">
          <i class="bi bi-printer"></i> Ré-essayer l'impression
        </button>
        <router-link to="/form" class="btn btn-outline-secondary rounded-pill px-4">
          Retourner au formulaire
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const reprint = () => {
  window.print();
};
</script>
