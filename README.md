# Inventario CI/CD

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

Sistema de inventario full-stack con pipeline CI/CD completo. Backend REST en Node.js + Express, frontend SPA en React + Vite, pruebas automáticas con Jest y Vitest, y despliegue simulado con GitHub Actions.

---

## Tecnologías

| Capa | Tecnología | Pruebas |
|------|-----------|---------|
| Backend | Node.js + Express | Jest + Supertest |
| Frontend | React + Vite | Vitest + Testing Library |
| CI/CD | GitHub Actions | 3 workflows |

---

## Estructura del proyecto

```
inventario-ci-cd/
├── backend/
│   ├── src/
│   │   ├── app.js                  # Rutas HTTP
│   │   ├── app.test.js             # Pruebas de integración
│   │   ├── inventoryService.js     # Lógica de negocio
│   │   ├── inventoryService.test.js # Pruebas unitarias
│   │   └── server.js               # Punto de entrada
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Componente principal
│   │   ├── App.test.jsx            # Prueba del componente
│   │   └── setupTests.js           # Mock global de fetch
│   ├── vite.config.js
│   └── package.json
└── .github/
    └── workflows/
        ├── ci-backend.yml          # CI del backend
        ├── ci-frontend.yml         # CI del frontend
        └── deploy.yml              # CD simulado
```

---

## Correr localmente

### Backend

```bash
cd backend
npm install
npm start        # http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

### API endpoints

```
GET  http://localhost:3000/api/productos
POST http://localhost:3000/api/productos
     Body: { "sku": "A-001", "nombre": "Cable HDMI", "stock": 10 }
```

---

## Pruebas

```bash
# Backend — Jest + Supertest
cd backend && npm test

# Frontend — Vitest + Testing Library
cd frontend && npm test -- --run
```

---

## Pipeline CI/CD

Cada `push` o `pull_request` a `main` activa automáticamente:

```
push / PR a main
      │
      ├── CI Backend  →  npm install + jest
      │
      └── CI Frontend →  npm install + vitest
                │
                └── (ambos en verde)
                        │
                        └── Deploy simulado → build + artefacto
```

Los workflows viven en `.github/workflows/`. Si alguna prueba falla, el PR queda bloqueado.
