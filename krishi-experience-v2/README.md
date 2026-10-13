# Krishi AI V2 — Phase 1: Farmer Onboarding Experience

Welcome to the new **Krishi AI V2** farmer-first experience. This application is housed inside `krishi-experience-v2/` as a completely standalone, independent frontend. It leaves the legacy frontend and backend files completely untouched.

---

## 🌾 Overview & Purpose

Phase 1 focuses exclusively on the **Farmer Onboarding Experience**. Instead of opening to a generic landing page or dashboard, the application greets the farmer with an intuitive, respectful onboarding flow designed for high accessibility across mobile, tablet, and desktop devices:

1. **Screen 1 — Welcome & Account Creation**: Farmer name, email, secure password creation with visibility toggles, terms acknowledgment, and a dedicated modal for returning user login.
2. **Screen 2 — Farm Profile**: Village/town, district, state, PIN code, land size (acres or hectares), soil type (with visual swatches and *"I don't know"* option), irrigation source, water availability rating, and preferred farming season.
3. **Screen 3 — Farming Status (Conditional)**:
   - **Branch A (Already Farming)**: Current standing crop, planting date, crop stage timeline, fertilizers applied, and irrigation frequency.
   - **Branch B (Planning to Start)**: Planned sowing period, target season, laboratory soil health test values (N, P, K, pH), water availability, crops under consideration, and optional soil photograph upload with scientific accuracy disclaimers.
4. **Screen 4 — Review & Confirmation**: Summary of all entered details with 1-click **Edit** navigation back to any step without data loss. Confirmation checkbox and submission.
5. **Screen 5 — Success & Phase 2 Roadmap**: Celebratory confirmation, downloadable farm profile JSON, and an unclickable, clearly labeled placeholder for the Phase 2 Dashboard destination.

---

## 🛠 Tech Stack

- **Framework**: React 18.3.1 (with Fast Refresh)
- **Bundler & Dev Server**: Vite 8.1.0 (configured on dedicated port `5174`)
- **Styling**: Tailwind CSS 3.4.19 with custom agriculture palette:
  - Warm Ivory (`#FAF9F5`)
  - Forest Green accents (`#1b4332`, `#2d6a4f`)
  - Earth neutrals (`#7f4f24`, `#F4F3EE`)
- **Icons**: Lucide React 1.21.0
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)

---

## 📦 Installation & Running

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### 1. Navigate to the V2 directory
```bash
cd krishi-experience-v2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

The application will launch on:
👉 **`http://localhost:5174`**

*(Note: The legacy frontend runs on `http://localhost:5173`, avoiding any port conflict).*

### 4. Build for production
```bash
npm run build
```

---

## 🔗 Backend Integration & Architecture Status

We conducted a thorough inspection of the existing Flask backend (`Backend/`):

- **Active Endpoints Verified**:
  - `POST /auth/register` (creates user in SQLite database)
  - `POST /auth/login` (verifies password and issues JWT token)
  - `GET /health` (confirms backend server connectivity)
- **Phase 2 Pending Endpoints**:
  - Dedicated `POST /api/farm-profile` is prepared in `src/services/farmProfileService.js`. Since the backend currently only has columns `farm_size` and `location` in its `User` model, the rich farm profile is persisted locally to `localStorage` under `krishi_farm_profile_v2` and formatted ready for Phase 2 integration.
  - A live connectivity pill in the top navbar alerts the developer if the backend Flask server is running or if local mock fixture mode is active.

---

## 🛡️ Repository Safety Checklist

- [x] Legacy `Frontend/` folder is untouched.
- [x] Legacy `Backend/` folder is untouched.
- [x] No shared dependencies modified in root.
- [x] Dedicated port `5174` utilized.
- [x] No plaintext passwords stored in `localStorage`.
- [x] Auto-saving non-sensitive drafts prevents accidental data loss during onboarding.
