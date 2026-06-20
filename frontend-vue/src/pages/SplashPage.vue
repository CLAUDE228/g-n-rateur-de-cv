<template>
  <div class="splash-container d-flex flex-column align-items-center justify-content-center bg-dark text-white text-center">
    <div class="logo-wrapper mb-4">
      <div class="spinner-border text-primary mb-3" style="width: 4rem; height: 4rem;" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <h1 class="display-3 font-monospace fw-extrabold tracking-tight">
        CV<span class="text-primary">Forge</span>
      </h1>
      <p class="text-muted text-uppercase tracking-widest small">
        L'excellence du CV professionnel par l'IA
      </p>
    </div>

    <div class="progress w-50" style="height: 4px; max-width: 280px; background-color: rgba(255,255,255,0.1);">
      <div 
        class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
        role="progressbar" 
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>
    
    <span class="text-secondary mt-2 small font-monospace">{{ progressPercent }}% prêt</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const progressPercent = ref(0);

onMounted(() => {
  // Animate the loading progress linearly up to 100% in 5 seconds (5000ms)
  const interval = setInterval(() => {
    if (progressPercent.value < 100) {
      progressPercent.value += 4;
    } else {
      clearInterval(interval);
      router.push('/landing');
    }
  }, 200);
});
</script>

<style scoped>
.splash-container {
  height: calc(100vh - 120px);
  min-height: 500px;
}
.logo-wrapper h1 {
  letter-spacing: -2px;
}
</style>
