# Notes App

En anteckningsapp byggd med React (frontend) och Node.js/Express (backend).

## Komma igång

### Installation och start

1. Klona projektet:
```bash
git clone <repository-url>
cd notes-app-main
```

starta backend o frontend i 2 olika terminaler


Terminal 1 - Backend:

```bash
cd backend
npm install
npm run dev
```

Terminal 2 - Frontend:

```bash
cd frontend
npm install
npm run dev
```
Öppna webbläsaren och gå till: http://localhost:5173


### Användning
Skapa anteckning: Fyll i titel och innehåll, klicka på "Add Note"

Redigera anteckning: Klicka på "Edit" knappen på en anteckning


Ta bort anteckning: Klicka på "Delete" knappen (bekräftelse krävs)





### API Dokumentation
Alla endpoints prefixas med /notes

|      Metod	      |     Endpoint  |   Beskrivning	|  Svarsstatus  |
| -------------     | ------------- | ------------- | ------------- |
|GET	 |/notes	    | Hämta alla anteckningar	|200 OK|
|GET	 |/notes/:id	| Hämta specifik anteckning	|200 OK, 404 Not Found|
|POST  |	/notes	  | Skapa ny anteckning	|201 Created, 400 Bad Request|
|PUT	 |/notes/:id	| Uppdatera anteckning	|200 OK, 404 Not Found|
|DELETE|/notes/:id	| Ta bort anteckning	|204 No Content, 404 Not Found|


### Request/Response Detaljer

| Endpoint & Metod | Typ | Status / Scenario | Format (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** `/notes` <br>*(Skapa anteckning)* | **Request** | Body | `{ "title": "antecking123", "content": "star wars123..." }` |
| | **Response** | `201 Created` | `{ "id": "abc123", "title": "Star wars", "content": "Darth maul...", "createdAt": "2029-07-08T12:00:00.000Z" }` |
| | **Response** | `400 Bad Request` <br>*(Tom titel)* | `{ "message": "Title is required" }` |
| **PUT** `/notes/:id` <br>*(Uppdatera anteckning)* | **Request** | Body | `{ "title": "Ny star wars", "content": "Clone wars version of darth maul" }` |






### Testa koden:
Backend:
```bash
cd backend
npm test
```



Frontend:
```bash
cd frontend
npx playwright test
```


## CI/CD

Vi använder använder GitHub Actions för kontinuerlig integration. Vid varje push eller pull request till `main`:

- vi installerar back/frontend-beroenden
- Playwright-tester
- ESLint-kodgranskning
- npm audit körs för säkerhetskontroll


## Testa endpoints med curl

### 1. Hämta alla anteckningar
```bash
curl -X GET http://localhost:3001/notes
```

### 2. Hämta specifik anteckning
```bash
curl -X GET http://localhost:3001/notes/{id}
```

### 3. Skapa ny anteckning
```bash
curl -X POST http://localhost:3001/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Min anteckning",
    "content": "Innehål här"
  }'
```

### 4. Uppdatera anteckning
```bash
curl -X PUT http://localhost:3001/notes/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Uppdaterad titel",
    "content": "Uppdaterat innehål"
  }'
```

### 5. Ta bort anteckning
```bash
curl -X DELETE http://localhost:3001/notes/{id}
```