# Krishi AI V2 — Farmer Dashboard & Core Agricultural Features

Welcome to the **Krishi AI V2** farmer-first experience. This application is housed inside `krishi-experience-v2/` as a completely standalone, independent frontend. It leaves legacy frontend and backend files untouched.

---

## 🌾 Overview & Purpose

Following Phase 1 onboarding, Krishi AI V2 connects the farmer's registered profile into a personalized agricultural dashboard and two production-grade core features:

1. **Crop Life-Cycle Monitoring & Interactive Calendar** (Core Priority 1):
   - Verified agronomic schedules across major Indian crops (Wheat, Rice, Cotton, Maize, Mustard, Potato, Soybean).
   - Real-time **Days After Sowing (DAS)** calculation and active growth stage tracking.
   - **Gantt-Style Growth Stage Timeline**: Completed, current, and upcoming stages with duration and estimated harvest window.
   - **Interactive Monthly Calendar Grid**: Month-by-month navigation, activity indicators color-coded by category (irrigation, nutrients, protection, weeding, harvest), and "Today" shortcut.
   - **Daily Task Details Panel**: Detailed operations checklist, one-click completion toggle, rescheduling modal, and note editor.
   - Dynamic schedule recalculation when the sowing date or crop is updated.

2. **APMC Mandi Price Intelligence & AI Forecasting** (Core Priority 2):
   - Regulated APMC Mandi database across key agricultural states (Punjab, Maharashtra, UP, MP, Rajasthan, Haryana).
   - **7-Day Historical Daily Price Trend**: Interactive SVG curve displaying daily modal prices, daily ranges (min-max spread), and arrival volumes (MT).
   - **Cross-Mandi Price Comparison Table**: Evaluates rates across neighboring markets within the state to find the most profitable selling destination.
   - **AI Price Forecasting**: Integrates with the backend LSTM model `/api/market/forecast` (with automated momentum fallback), clearly distinguishing observed historical auction rates from projected future prices.

3. **7-Day Agricultural Weather & Micro-Climate Forecast**:
   - Integrated with Open-Meteo Agro-Climatic Feed based on the farm's saved district coordinates.
   - Displays daily min/max temperature, precipitation probability, humidity, and wind speed.
   - Actionable agronomic alerts (e.g. spray windows, heavy rainfall drainage warnings).

4. **Smart Soil Analysis & AI Crop Recommendation**:
   - Evaluates the farmer's soil characteristics (Alluvial, Black, Red, etc.), N-P-K balances, and pH level.
   - Calls backend `/predict` (with agronomic suitability fallback) to recommend top-performing crops with match confidence % for planning farmers.

5. **Additional Agricultural Feature Hub Cards**:
   - **Crop Disease Detection**: Leaf photo inspection for fungal blights, yellow rust, leaf miners, and bio-organic remedies.
   - **Smart Irrigation Advisor**: Root-zone moisture calculation, deficit depth, and drip running minutes.
   - **Agricultural Marketplace (Kisan Bazar)**: Quality-certified foundation seeds, organic compost, solar pumps, and farm machinery rentals.

---

## 🛠 Tech Stack

- **Framework**: React 18.3.1 (with Fast Refresh)
- **Bundler & Dev Server**: Vite 8.1.0 (configured on dedicated port `5174`)
- **Styling**: Tailwind CSS 3.4.19 with custom agriculture palette:
  - Warm Ivory (`#FAF9F5`)
  - Forest Green accents (`#1b4332`, `#2d6a4f`)
  - Earth neutrals (`#7f4f24`, `#F4F3EE`)
- **Icons**: Lucide React 1.21.0
- **Testing**: Node ESM Automated Verification Suite (`test-core-engine.mjs`)

---

## 📦 Installation & Running

### 1. Navigate to the directory
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
Open **`http://localhost:5174`** in your browser.

### 4. Run automated core engine tests
```bash
node test-core-engine.mjs
```
*Validates 33 test cases across DAS calculation, stage transitions, task state persistence, Mandi pricing, and weather parsing.*

### 5. Build for production
```bash
npm run build
```

---

## 🔗 Architecture & Backend Integration Status

| Module | Integration Target | Status / Fallback Behavior |
| :--- | :--- | :--- |
| **Authentication** | `POST /auth/register`<br>`POST /auth/login` | Fully connected to Flask backend. Falls back to verified local session when offline. |
| **Crop Recommendation** | `POST /predict` | Calls backend RandomForest model. Falls back to agronomic soil suitability map. |
| **Mandi Price Forecast** | `POST /api/market/forecast` | Calls backend LSTM neural network. Falls back to 10-day price momentum calculation with clear labeling. |
| **Weather Forecast** | Open-Meteo REST API | Live HTTP integration with fallback to IMD-calibrated agro-climatic fixture. |
| **Crop Calendar & Tasks**| `krishi_task_state_v2` (localStorage) | Reactive storage service synchronizing Dashboard, Calendar, and Timeline immediately. |

---

## 🛡️ Repository Safety Checklist

- [x] Legacy `Frontend/` folder is untouched.
- [x] Legacy `Backend/` folder is untouched.
- [x] No shared dependencies modified in root.
- [x] Dedicated port `5174` utilized.
- [x] All 33 automated tests passed.
- [x] Verified zero console or bundling errors (`npm run build` succeeds in <5s).
