<template>
  <div class="container py-4 my-2">
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h3 class="fw-bold mb-1 text-slate-900">Aperçu interactif de votre CV</h3>
        <p class="text-muted mb-0 small">Vérifiez les alignements et la conformité visuelle avant d'exporter.</p>
      </div>
      <div class="d-flex gap-2">
        <button @click="triggerPrint" class="btn btn-primary rounded-pill px-4">
          <i class="bi bi-printer-fill me-1"></i> Générer / Imprimer PDF
        </button>
        <router-link to="/form" class="btn btn-outline-dark rounded-pill">
          <i class="bi bi-pencil-fill me-1"></i> Corriger nos saisies
        </router-link>
      </div>
    </div>

    <!-- Live CV Preview frame simulator -->
    <div class="preview-stage d-flex justify-content-center bg-light border border-slate-250 p-4 rounded-4 overflow-auto">
      <div class="cv-sheet-wrapper bg-white shadow-lg p-5 border" style="width: 210mm; min-height: 297mm; max-height: 297mm; overflow: hidden;">
        
        <!-- Render modern layout -->
        <div v-if="cvStore.templateId === 'modern'" class="h-100 d-flex">
          <div class="col-4 bg-dark text-white p-4 h-100 border-end">
            <!-- Sidebar details layout -->
            <div class="text-center mb-4">
              <h5 class="fw-bold text-uppercase tracking-wider text-primary">{{ cvStore.personalInfo.firstName }} {{ cvStore.personalInfo.lastName }}</h5>
              <span class="text-muted small d-block">{{ cvStore.personalInfo.title }}</span>
            </div>
            <div class="mb-4">
              <h6 class="border-bottom border-secondary pb-1 small text-uppercase">Contact</h6>
              <ul class="list-unstyled small space-y-1 text-muted">
                <li><i class="bi bi-envelope-fill text-primary"></i> {{ cvStore.personalInfo.email }}</li>
                <li><i class="bi bi-telephone-fill text-primary"></i> {{ cvStore.personalInfo.phone }}</li>
                <li><i class="bi bi-geo-alt-fill text-primary"></i> {{ cvStore.personalInfo.address }}</li>
              </ul>
            </div>
          </div>
          <div class="col-8 p-4">
            <h5 class="border-bottom pb-2 text-dark font-monospace fw-bold mb-3">Expériences</h5>
            <div v-for="exp in cvStore.experiences" :key="exp.id" class="mb-3 small">
              <h6 class="fw-bold mb-1">{{ exp.jobTitle }} @ {{ exp.company }}</h6>
              <p class="text-muted mb-1">{{ exp.startDate }} - {{ exp.endDate || 'Présent' }}</p>
              <p class="mb-0">{{ exp.description }}</p>
            </div>
          </div>
        </div>

        <!-- Render professional layout -->
        <div v-else class="h-100">
          <div class="text-center border-bottom pb-3 mb-4">
            <h2 class="fw-bold text-uppercase mb-1 tracking-tight">{{ cvStore.personalInfo.firstName }} {{ cvStore.personalInfo.lastName }}</h2>
            <p class="lead text-primary fw-bold mb-2">{{ cvStore.personalInfo.title }}</p>
            <div class="d-flex justify-content-center gap-3 text-muted small">
              <span><i class="bi bi-envelope"></i> {{ cvStore.personalInfo.email }}</span>
              <span><i class="bi bi-telephone"></i> {{ cvStore.personalInfo.phone }}</span>
              <span><i class="bi bi-geo-alt"></i> {{ cvStore.personalInfo.address }}</span>
            </div>
          </div>

          <div class="row g-4 leading-relaxed">
            <div class="col-12 mb-3">
              <h5 class="border-bottom pb-1 text-uppercase fw-bold text-dark">Profil</h5>
              <p class="small text-muted">{{ cvStore.personalInfo.summary || 'Développeur expérimenté' }}</p>
            </div>

            <div class="col-12">
              <h5 class="border-bottom pb-1 text-uppercase fw-bold text-dark">Expériences Professionnelles</h5>
              <div v-for="exp in cvStore.experiences" :key="exp.id" class="mb-3">
                <div class="d-flex justify-content-between align-items-baseline">
                  <h6 class="fw-bold mb-0 text-slate-800">{{ exp.jobTitle }} — {{ exp.company }}</h6>
                  <span class="text-muted small">{{ exp.startDate }} - {{ exp.endDate || 'Présent' }}</span>
                </div>
                <p class="text-muted mt-1 small" style="white-space: pre-line;">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useCvStore } from '../store/cvStore';

const cvStore = useCvStore();

const triggerPrint = () => {
  window.print();
};
</script>

<style scoped>
.preview-stage {
  max-height: 600px;
}
.cv-sheet-wrapper {
  transform: scale(0.9);
  transform-origin: top center;
}
</style>
