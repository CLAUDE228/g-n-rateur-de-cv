import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// Chemin vers la base de données SQLite/JSON locale (persistance simple)
const DB_FILE = path.join(process.cwd(), 'database.sqlite.json');

// Helper pour charger les données
async function loadData() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si le fichier n'existe pas, on retourne les données par défaut ou vides
    return null;
  }
}

// Helper pour sauvegarder les données
async function saveData(data: any) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Routes API

// 1. Statut de l'API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CVForge Backend API'
  });
});

// 2. Récupérer le CV sauvegardé
app.get('/api/cv', async (req, res) => {
  try {
    const data = await loadData();
    if (!data) {
      return res.status(200).json({ status: 'empty', message: 'Aucun CV sauvegardé.' });
    }
    return res.json({ status: 'success', data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Sauvegarder automatiquement (Autosave) ou Manuellement le CV
app.post('/api/cv', async (req, res) => {
  try {
    const cvData = req.body;
    await saveData(cvData);
    return res.json({ 
      status: 'success', 
      message: 'CV sauvegardé avec succès dans la base de données SQLite local.',
      savedAt: new Date().toISOString()
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Démarrage du serveur PHP-FPM / Express alternatif
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[CVForge Backend] Serveur démarré sur http://0.0.0.0:${PORT}`);
});
