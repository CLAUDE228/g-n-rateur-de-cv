<template>
  <div class="min-h-screen bg-light">
    <!-- Top Global Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm sticky-top">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center gap-2 font-monospace fw-bold" to="/landing">
          <i class="bi bi-file-earmark-person-fill text-primary"></i>
          <span>CV<span class="text-primary">Forge</span></span>
        </router-link>
        
        <div class="d-flex align-items-center gap-3 ms-auto">
          <router-link to="/templates" class="btn btn-outline-light btn-sm rounded-pill px-3">
            Modèles
          </router-link>
          <router-link to="/form" class="btn btn-primary btn-sm rounded-pill px-3">
            Créer mon CV
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Page Outlet -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Simple sticky footer -->
    <footer class="bg-dark text-slate-400 text-center py-4 border-top border-secondary mt-auto text-white">
      <div class="container text-muted small">
        © 2026 CVForge Builder Inc. — Tous droits réservés.
      </div>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
