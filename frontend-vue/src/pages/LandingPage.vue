<template>
  <div class="container py-5 my-3">
    <div class="row align-items-center g-5">
      
      <!-- Left columns: Brand speech and CTA -->
      <div class="col-lg-6">
        <div class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 mb-3 fw-bold text-uppercase token-tag">
          <i class="bi bi-stars"></i> Créateur de CV Nouvelle Génération
        </div>
        
        <h1 class="display-4 fw-black text-slate-900 tracking-tight mb-3">
          Forgez votre avenir avec un CV exceptionnel.
        </h1>
        
        <p class="lead text-muted mb-4">
          Concevez, personnalisez et exportez des CV au format vectoriel certifié ATS en quelques clics. Plus qu'un simple éditeur, un véritable propulseur de carrière.
        </p>

        <div class="d-flex flex-wrap gap-3 mb-5">
          <router-link to="/templates" class="btn btn-dark btn-lg rounded-pill px-4 py-2.5 shadow font-semibold">
            Commencer maintenant <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
          <router-link to="/form" class="btn btn-outline-secondary btn-lg rounded-pill px-4">
            Remplir les champs
          </router-link>
        </div>

        <!-- Quick value markers -->
        <div class="row g-3 border-top pt-4">
          <div class="col-6 col-sm-4">
            <h4 class="fw-bold mb-0 text-slate-800">100%</h4>
            <span class="text-xs text-muted">Compatibilité ATS</span>
          </div>
          <div class="col-6 col-sm-4">
            <h4 class="fw-bold mb-0 text-slate-800">Vector</h4>
            <span class="text-xs text-muted">Haute Définition PDF</span>
          </div>
          <div class="col-6 col-sm-4">
            <h4 class="fw-bold mb-0 text-slate-800">Local</h4>
            <span class="text-xs text-muted">Sauvegarde automatique</span>
          </div>
        </div>

      </div>

      <!-- Right Column: Card simulation illustration -->
      <div class="col-lg-6">
        <div class="p-3 bg-white border border-slate-200 rounded-4 shadow-lg transform-card">
          <div class="p-4 bg-slate-900 text-white rounded-3 mb-3 d-flex justify-between align-items-center">
            <div>
              <h5 class="fw-bold mb-0">Jean Dupont</h5>
              <span class="text-primary small font-monospace">Développeur Full Stack Senior</span>
            </div>
            <i class="bi bi-file-earmark-person fs-1 text-primary"></i>
          </div>
          
          <div class="bg-light p-3 rounded-3 mb-3 small">
            <h6 class="fw-bold mb-1"><i class="bi bi-briefcase-fill me-1"></i> Expériences Clés</h6>
            <p class="mb-0 text-muted">Start-Up Tech SAS — Paris, France (2022 - Présent)</p>
          </div>

          <div class="bg-light p-3 rounded-3 small">
            <h6 class="fw-bold mb-1"><i class="bi bi-award-fill me-1"></i> Atouts majeurs</h6>
            <div class="d-flex flex-wrap gap-1.5 mt-2">
              <span class="badge bg-secondary-subtle text-secondary rounded">Vue 3 / React</span>
              <span class="badge bg-secondary-subtle text-secondary rounded">Laravel / Node.js</span>
              <span class="badge bg-secondary-subtle text-secondary rounded">Docker Containers</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.fw-black {
  font-weight: 900;
}
.transform-card {
  transition: transform 0.4s ease;
}
.transform-card:hover {
  transform: translateY(-8px) rotate(1deg);
}
</style>
