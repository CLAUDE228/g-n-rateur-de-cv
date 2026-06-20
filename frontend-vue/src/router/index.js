import { createRouter, createWebHistory } from 'vue-router';
import SplashPage from '../pages/SplashPage.vue';
import LandingPage from '../pages/LandingPage.vue';
import ChooseTemplatePage from '../pages/ChooseTemplatePage.vue';
import CvFormPage from '../pages/CvFormPage.vue';
import PreviewPage from '../pages/PreviewPage.vue';
import DownloadPage from '../pages/DownloadPage.vue';

const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashPage
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '/templates',
    name: 'templates',
    component: ChooseTemplatePage
  },
  {
    path: '/form',
    name: 'form',
    component: CvFormPage
  },
  {
    path: '/preview',
    name: 'preview',
    component: PreviewPage
  },
  {
    path: '/download',
    name: 'download',
    component: DownloadPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
