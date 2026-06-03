# Notes App

En anteckningsapp byggd med React (frontend) och Node.js/Express (backend).

## Komma igång

### Installation och start

1. Klona projektet:
```bash
git clone <repository-url>
cd notes-app-main

starta backend o frontend i 2 olika terminaler


Terminal 1 - Backend:


cd backend
npm install
npm run dev
Terminal 2 - Frontend:


cd frontend
npm install
npm run dev
Öppna webbläsaren och gå till: http://localhost:5173
Användning
Skapa anteckning: Fyll i titel och innehåll, klicka på "Add Note"
Redigera anteckning: Klicka på "Edit" knappen på en anteckning
Ta bort anteckning: Klicka på "Delete" knappen (bekräftelse krävs)
API Dokumentation
Alla endpoints prefixas med /notes

Metod	Endpoint	Beskrivning	Svarsstatus
GET	/notes	Hämta alla anteckningar	200 OK
GET	/notes/:id	Hämta specifik anteckning	200 OK, 404 Not Found
POST	/notes	Skapa ny anteckning	201 Created, 400 Bad Request
PUT	/notes/:id	Uppdatera anteckning	200 OK, 404 Not Found
DELETE	/notes/:id	Ta bort anteckning	204 No Content, 404 Not Found


Request/Response Format
POST /notes - Skapa anteckning


// Request Body
{
  "title": "antecking123",
  "content": "star wars123..."
}

// Response 201
{
  "id": "abc123",
  "title": "Star wars",
  "content": "Darth maul...",
  "createdAt": "2029-07-08T12:00:00.000Z"
}

// Response 400 (tom titel)
{
  "message": "Title is required"
}


PUT /notes/:id - Uppdatera anteckning


// Request Body
{
  "title": "Ny star wars",
  "content": "Clone wars version of darth maul"
}

Notes Modell
Fält	Typ	Beskrivning
id	string	Unikt identifierare
title	string	Anteckningens titel (krävs)
content	string	Anteckningens innehåll
createdAt	string	Skapandetidpunkt (ISO 8601)
Projektstruktur



Backend:

cd backend
npm test


Frontend:
cd frontend
npx playwright test


## CI/CD

Projektet använder GitHub Actions för kontinuerlig integration. Vid varje push eller pull request till `main`:

- vi installerar back/frontend-beroenden
- Playwright-tester
- ESLint-kodgranskning
- npm audit körs för säkerhetskontroll

```
```


Note to self att fixa guthub pipeline, allt ska inte köras under test, ha dependency scanning
frontend test
backend test
deploy
