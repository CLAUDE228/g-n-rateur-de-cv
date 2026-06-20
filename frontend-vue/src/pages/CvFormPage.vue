<template>
  <div class="container py-4 my-2">
    <div class="row">
      
      <!-- Side Tab Controller list column (Mobile responsive horizontal list, Desktop vertical) -->
      <div class="col-md-3 mb-4">
        <div class="card border-0 bg-transparent">
          <div class="list-group list-group-flush rounded-3 border-0 bg-light shadow-sm flex-row flex-md-column overflow-auto text-nowrap scrollbar-none d-flex">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="list-group-item list-group-item-action py-3 px-4 d-flex align-items-center gap-2 border-0 text-start"
              :class="{ 'active bg-dark text-white fw-bold': activeTab === tab.id }"
            >
              <i :class="['bi', tab.icon]"></i>
              <span class="d-none d-sm-inline">{{ tab.label }}</span>
            </button>
          </div>
          
          <div class="card-body px-0 py-3 d-none d-md-block">
            <button @click="cvStore.loadDemoData()" class="btn btn-outline-primary btn-sm w-100 rounded-pill mb-2">
              <i class="bi bi-magic"></i> Utiliser l'exemple démo
            </button>
            <button @click="cvStore.clearForm()" class="btn btn-outline-danger btn-sm w-100 rounded-pill">
              <i class="bi bi-trash"></i> Vider le formulaire
            </button>
          </div>
        </div>
      </div>

      <!-- Editing Tab workspaces column -->
      <div class="col-md-9 mb-4">
        <div class="card border border-light p-4 p-md-5 rounded-4 shadow-sm bg-white">
          
          <!-- Tab 1: Personal Profile widget -->
          <div v-show="activeTab === 'personal'">
            <h3 class="fw-bold text-slate-800 mb-3">Informations de Profil</h3>
            <p class="text-muted small mb-4">L'en-tête principal de contact et présentation de votre identité.</p>
            
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label text-slate-700 fw-semibold">Prénom</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :class="{ 'is-invalid': cvStore.errors.firstName }"
                  :value="cvStore.personalInfo.firstName"
                  @input="e => cvStore.setPersonalInfo('firstName', e.target.value)"
                  placeholder="Ex: Jean"
                />
                <div v-if="cvStore.errors.firstName" class="invalid-feedback">{{ cvStore.errors.firstName }}</div>
              </div>

              <div class="col-sm-6">
                <label class="form-label text-slate-700 fw-semibold">Nom de famille</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :class="{ 'is-invalid': cvStore.errors.lastName }"
                  :value="cvStore.personalInfo.lastName"
                  @input="e => cvStore.setPersonalInfo('lastName', e.target.value)"
                  placeholder="Ex: Dupont"
                />
                <div v-if="cvStore.errors.lastName" class="invalid-feedback">{{ cvStore.errors.lastName }}</div>
              </div>

              <div class="col-12">
                <label class="form-label text-slate-700 fw-semibold">Titre professionnel</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :value="cvStore.personalInfo.title"
                  @input="e => cvStore.setPersonalInfo('title', e.target.value)"
                  placeholder="Ex: Architecte Cloud Senior"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label text-slate-700 fw-semibold">E-mail de contact</label>
                <input 
                  type="email" 
                  class="form-control" 
                  :class="{ 'is-invalid': cvStore.errors.email }"
                  :value="cvStore.personalInfo.email"
                  @input="e => cvStore.setPersonalInfo('email', e.target.value)"
                  placeholder="Ex: jean.dupont@email.com"
                />
                <div v-if="cvStore.errors.email" class="invalid-feedback">{{ cvStore.errors.email }}</div>
              </div>

              <div class="col-md-6">
                <label class="form-label text-slate-700 fw-semibold">Téléphone mobile</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  :class="{ 'is-invalid': cvStore.errors.phone }"
                  :value="cvStore.personalInfo.phone"
                  @input="e => cvStore.setPersonalInfo('phone', e.target.value)"
                  placeholder="Ex: +33 6 12 34 56 78"
                />
                <div v-if="cvStore.errors.phone" class="invalid-feedback">{{ cvStore.errors.phone }}</div>
              </div>

              <div class="col-md-6">
                <label class="form-label text-slate-700 fw-semibold">Ville et Pays</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :value="cvStore.personalInfo.address"
                  @input="e => cvStore.setPersonalInfo('address', e.target.value)"
                  placeholder="Ex: Paris, France"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label text-slate-700 fw-semibold">Site Web, LinkedIn ou Portfolio</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :value="cvStore.personalInfo.website"
                  @input="e => cvStore.setPersonalInfo('website', e.target.value)"
                  placeholder="Ex: https://github.com"
                />
              </div>

              <div class="col-12 text-sm">
                <div class="d-flex justify-content-between align-items-baseline mb-1">
                  <label class="form-label text-slate-700 fw-semibold">Résumé de profil</label>
                  <span class="text-muted small">{{ cvStore.personalInfo.summary.length }} / 500 caractéres</span>
                </div>
                <textarea 
                  rows="4" 
                  class="form-control" 
                  maxlength="500"
                  :value="cvStore.personalInfo.summary"
                  @input="e => cvStore.setPersonalInfo('summary', e.target.value)"
                  placeholder="Résumez en 3-4 phrases fortes vos compétences et ambitions..."
                ></textarea>
              </div>
            </div>
            
            <div class="d-flex justify-content-end mt-4 pt-3 border-top">
              <button @click="activeTab = 'experience'" class="btn btn-dark rounded-pill">
                Suivant : Étape Expériences
              </button>
            </div>
          </div>

          <!-- Tab 2: Work Experiences list widget -->
          <div v-show="activeTab === 'experience'">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3 class="fw-bold text-slate-800 mb-0">Expériences Professionnelles</h3>
              <button @click="cvStore.addExperience()" class="btn btn-outline-dark btn-sm rounded-pill"><i class="bi bi-plus"></i></button>
            </div>

            <div v-if="cvStore.experiences.length === 0" class="text-center py-5 border border-dashed rounded-4 bg-light">
              <i class="bi bi-briefcase text-secondary display-5 mb-3 d-block"></i>
              <span class="text-muted">Aucune expérience n'a été ajoutée.</span>
            </div>

            <div v-else class="space-y-4">
              <div v-for="(exp, idx) in cvStore.experiences" :key="exp.id" class="card border rounded-3 p-4 mb-3 position-relative">
                <button @click="cvStore.removeExperience(exp.id)" class="btn btn-sm btn-outline-danger position-absolute top-3 end-3"><i class="bi bi-trash"></i></button>
                <span class="badge bg-secondary mb-3 w-fit">Expérience #{{ idx + 1 }}</span>
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label class="form-label small fw-semibold">Intitulé du poste</label>
                    <input type="text" class="form-control" v-model="exp.jobTitle" placeholder="Ex: Lead React Dev" />
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label small fw-semibold">Entreprise</label>
                    <input type="text" class="form-control" v-model="exp.company" placeholder="Ex: Tech SAS" />
                  </div>
                  <div class="col-12">
                    <label class="form-label small fw-semibold">Description</label>
                    <textarea class="form-control" rows="3" v-model="exp.description"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4 pt-3 border-top">
              <button @click="activeTab = 'personal'" class="btn btn-outline-secondary rounded-pill">Précédent</button>
              <button @click="activeTab = 'education'" class="btn btn-dark rounded-pill">Suivant : Formations</button>
            </div>
          </div>

          <!-- Tab 3: Educations list widget -->
          <div v-show="activeTab === 'education'">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3 class="fw-bold text-slate-800 mb-0">Formations & Diplômes</h3>
              <button @click="cvStore.addEducation()" class="btn btn-outline-dark btn-sm rounded-pill"><i class="bi bi-plus"></i></button>
            </div>

            <div v-if="cvStore.educations.length === 0" class="text-center py-5 border border-dashed rounded-4 bg-light">
              <i class="bi bi-mortarboard text-secondary display-5 mb-3 d-block"></i>
              <span class="text-muted">Aucun diplôme répertorié.</span>
            </div>

            <div v-else>
              <div v-for="edu in cvStore.educations" :key="edu.id" class="card border rounded-3 p-4 mb-3 position-relative">
                <button @click="cvStore.removeEducation(edu.id)" class="btn btn-sm btn-outline-danger position-absolute top-3 end-3"><i class="bi bi-trash"></i></button>
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label class="form-label small">Diplôme / Certificat</label>
                    <input type="text" class="form-control" v-model="edu.degree" />
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label small">École / Université</label>
                    <input type="text" class="form-control" v-model="edu.school" />
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4 pt-3 border-top">
              <button @click="activeTab = 'experience'" class="btn btn-outline-secondary rounded-pill">Précédent</button>
              <button @click="activeTab = 'skills'" class="btn btn-dark rounded-pill">Suivant : Compétences</button>
            </div>
          </div>

          <!-- Tab 4: Technical Skills list widget -->
          <div v-show="activeTab === 'skills'">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3 class="fw-bold text-slate-800 mb-0">Compétences</h3>
              <button @click="cvStore.addSkill()" class="btn btn-outline-dark btn-sm rounded-pill"><i class="bi bi-plus"></i></button>
            </div>

            <div class="row g-3">
              <div v-for="sk in cvStore.skills" :key="sk.id" class="col-md-6">
                <div class="card border p-3 flex-column rounded-3 bg-light">
                  <input type="text" class="form-control mb-2" v-model="sk.name" placeholder="Compétence" />
                  <input type="range" class="form-range" min="10" max="100" v-model.number="sk.level" />
                  <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>Niveau</span>
                    <span>{{ sk.level }}%</span>
                  </div>
                  <button @click="cvStore.removeSkill(sk.id)" class="btn btn-link link-danger text-end p-0 small mt-2">Détruire</button>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4 pt-3 border-top">
              <button @click="activeTab = 'education'" class="btn btn-outline-secondary rounded-pill">Précédent</button>
              <router-link to="/preview" class="btn btn-primary rounded-pill">Continuer : Voir l'Aperçu du CV <i class="bi bi-eye ms-1"></i></router-link>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCvStore } from '../store/cvStore';

const cvStore = useCvStore();
const activeTab = ref('personal');

const tabs = [
  { id: 'personal', label: 'Profil', icon: 'bi-person-badge' },
  { id: 'experience', label: 'Expérience', icon: 'bi-briefcase' },
  { id: 'education', label: 'Formations', icon: 'bi-mortarboard' },
  { id: 'skills', label: 'Compétences', icon: 'bi-gem' }
];
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
