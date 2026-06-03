# Notes App - Projekt Rapport

## 1. Applikationsbeskrivning

### Vad gör applikationen?
Notes App är en fullstack-webbapplikation för att hantera anteckningar. Du som användare kan kan:
- Skapa nya anteckningar med titel och innehåll
- Läs alla existerande anteckningar
- Redigera existerande anteckningar
- Radera anteckningar

### Arkitektur

**Frontend (React + Vite):**
- UI-komponenter: NoteForm, NoteList, NoteItem
- API-klient: notesApi.jsx (axios)
- State management: React hooks (useState, useEffect)

**Backend (Node.js + Express):**
- Routes: REST API endpoints (/notes)
- Controllers: Request/response-hantering
- Services: Affärslogik för CRUD-operationer (Här finns logiken för t.ex lägga till anteckningar, ta bort anteckningar etc..)
- Database: JSON-fil (Anledningen är bara att jag tyckte det var enklare för ett kursprojekt)

---

## 2. Testning

### Implementerad testning

**Backend - Enhetstester (Jest) - notes.service.test.js:**
- findAllNotes() - hämta alla anteckningar
- findNoteById() - hämta anteckning (finns/finns ej)
- addNote() - skapa ny anteckning
- editNote() - redigera anteckning
- removeNote() - radera anteckning

**Backend - Integrationstester (Supertest) - notes.api.test.js:**
- GET /notes - hämta alla (200)
- GET /notes/:id - hämta en (200/404)
- POST /notes - skapa ny (201/400)
- PUT /notes/:id - uppdatera (200)
- DELETE /notes/:id - radera (204/404)

**Frontend - E2E tester (Playwright) - notes.spec.js:**
- Skapa ny anteckning
- Valideringsfel (tom titel)
- Radera anteckning
- Redigera anteckning (modal)

### Testtäckning

| Lager | Täckt | Ej täckt |
|-------|-------|----------|
| Service | Alla funktioner | - |
| API | Alla endpoints | - |
| Frontend | Grundläggande flöden | Felhantering, edge cases |


I frontend täcker vi inte felhantering och edge cases, t.ex felhantering vid api-fel och tomma listor



---

## 3. Testbarhet

### Vad är testbart?
- All affärslogik (service layer)
- Alla API-endpoints
- Användarflöden i UI

### Begränsningar i nuvarande testbarhet


**1. Frontend-tester:**
- Playwright-testerna kräver att backend är igång, Ingen felscenariotestning - T.ex. vad händer om backend är nere?
- Ingen mockning av API-svar
- Testerna är beroende av faktisk databas (ingen mock databas)



### För att uppnå full testbarhet krävs:
1. API-mockning i frontend-tester
2. Lägg till tester för felhantering
3. Testa edge cases, t.ex tom lista
---

## 4. CI Pipeline

### Implementerade steg

```
1. Checkout repository
2. Setup Node (v22)
3. Install backend dependencies
4. Install frontend dependencies
5. Install Playwright browsers
6. Start backend (npm run dev)
7. Build frontend
8. Start frontend (npm run dev)
9. Wait for frontend (wait-on)
10. Run Playwright tests
11. Run ESLint
12. npm audit (frontend + backend)
```

### Gates och logik

- Push till main branch
- Pull requests till main


- Alla steg körs sekventiellt
- Vid fel avbryts hela workflow

### Svårigheter och luckor

**1. Backend-tester körs ej i CI:**
- Jest-testerna (service + API) körs inte
- Endast Playwright E2E körs



**3. Saknar:**
- Code coverage rapport
- Deploy-step


---

## 5. Reflektion

### Projektet
Ett välstrukturerat projekt med tydlig separation mellan frontend/backend. Arkitekturen följer best practices med routes/controllers/services.

### Vad jag lärt mig
- Playwright för E2E-testning (visste inte ens att detta existerade förut, att man kan simulera knapptryckningar)
- GitHub Actions pipeline-konfiguration
- Lowdb för JSON-baserad lagring (jättebra för att komma igång snabbt)

### Vad jag vill lära mig mer om
- Deploy till molntjänster (Azure/AWS)
- Code coverage-verktyg
- Security scanning i CI
- Kubernetes för att orkestrera containers, hur det funkar med control panel, med poddar, hur den skalar upp automatiskt/self-healing och alla dess olike coola features.
