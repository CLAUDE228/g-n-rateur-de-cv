<template>
  <div class="container py-5 my-2">
    <div class="text-center mb-5">
      <h2 class="fw-bold text-slate-900">Choisissez votre style de CV</h2>
      <p class="text-muted">Sélectionnez le modèle idéal adapté à votre domaine ou entreprise cible.</p>
    </div>

    <div class="row g-4 max-w-4xl mx-auto justify-content-center">
      
      <!-- Option 1: Modern Layout template -->
      <div class="col-md-6 col-lg-5">
        <div 
          class="card h-100 border-2 rounded-4 overflow-hidden shadow-sm transition-all text-center"
          :class="cvStore.templateId === 'modern' ? 'border-primary' : 'border-slate-200'"
        >
          <div class="card-body p-4">
            <div class="bg-primary-subtle text-primary rounded-pill px-3 py-1.5 inline-block text-xs font-bold mb-3">
              <i class="bi bi-palette"></i> Couleur & Design
            </div>
            
            <h4 class="fw-bold mb-2">Style Moderne</h4>
            <p class="text-muted small">Mise en page originale avec une élégante barre latérale colorée mettant en avant vos compétences et coordonnées.</p>
            
            <div class="template-preview-sketch bg-light py-4 rounded-3 border mb-4 d-flex flex-column align-items-center justify-content-center text-muted">
              <i class="bi bi-layout-sidebar-inset fs-1 text-primary mb-2"></i>
              <span class="text-[10px] font-monospace uppercase">Sidebar colorée + Profil</span>
            </div>

            <button 
              @click="selectTemplate('modern')"
              class="btn rounded-pill w-100 font-bold"
              :class="cvStore.templateId === 'modern' ? 'btn-primary' : 'btn-outline-dark'"
            >
              <span v-if="cvStore.templateId === 'modern'"><i class="bi bi-check-circle-fill"></i> Sélectionné</span>
              <span v-else>Choisir Moderne</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Option 2: Professional ATS layout template -->
      <div class="col-md-6 col-lg-5">
        <div 
          class="card h-100 border-2 rounded-4 overflow-hidden shadow-sm transition-all text-center"
          :class="cvStore.templateId === 'professional' ? 'border-primary' : 'border-slate-200'"
        >
          <div class="card-body p-4">
            <div class="bg-dark text-white rounded-pill px-3 py-1.5 inline-block text-xs font-bold mb-3">
              <i class="bi bi-send-check"></i> Standard ATS / Corporate
            </div>
            
            <h4 class="fw-bold mb-2">Style Professionnel</h4>
            <p class="text-muted small">Idéal pour l'ingénierie, la finance ou les grands groupes. Structure classique épurée qui facilite la lecture automatique des robots.</p>
            
            <div class="template-preview-sketch bg-light py-4 rounded-3 border mb-4 d-flex flex-column align-items-center justify-content-center text-muted">
              <i class="bi bi-grid-1x2 fs-1 text-dark mb-2"></i>
              <span class="text-[10px] font-monospace uppercase">Header centré + ATS optimum</span>
            </div>

            <button 
              @click="selectTemplate('professional')"
              class="btn rounded-pill w-100 font-bold"
              :class="cvStore.templateId === 'professional' ? 'btn-primary' : 'btn-outline-dark'"
            >
              <span v-if="cvStore.templateId === 'professional'"><i class="bi bi-check-circle-fill"></i> Sélectionné</span>
              <span v-else>Choisir Professionnel</span>
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Next Step link -->
    <div class="text-center mt-5">
      <router-link to="/form" class="btn btn-dark btn-lg rounded-pill px-5 shadow">
        Continuer vers le formulaire d'édition <i class="bi bi-arrow-right ms-2"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCvStore } from '../store/cvStore';

const cvStore = useCvStore();

const selectTemplate = (id) => {
  cvStore.templateId = id;
  cvStore.triggerAutosave();
};
</script>

<style scoped>
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.template-preview-sketch {
  height: 120px;
}
</style>
