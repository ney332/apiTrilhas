import express from "express";
import cors from "cors";
import trails from "./data/trails.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.send("🌍 API de Trilhas Turísticas - Explore o mundo com seu app de viagens!");
});

// Todas as trilhas
app.get("/trails", (req, res) => {
  res.json(trails);
});

// Filtrar por país
app.get("/trails/country/:country", (req, res) => {
  const { country } = req.params;
  const filtered = trails.filter(t => t.country.toLowerCase() === country.toLowerCase());
  res.json(filtered.length ? filtered : { message: "Nenhuma trilha encontrada nesse país." });
});

// Filtrar por tag (ex: montanha, praia, histórico)
app.get("/trails/tag/:tag", (req, res) => {
  const { tag } = req.params;
  const filtered = trails.filter(t => t.tags.includes(tag.toLowerCase()));
  res.json(filtered.length ? filtered : { message: "Nenhuma trilha encontrada com essa tag." });
});

// Buscar por ID
app.get("/trails/:id", (req, res) => {
  const trail = trails.find(t => t.id === parseInt(req.params.id));
  trail
    ? res.json(trail)
    : res.status(404).json({ message: "Trilha não encontrada." });
});

// Porta
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 API de trilhas rodando em http://localhost:${PORT}`));
