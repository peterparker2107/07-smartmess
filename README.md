# SmartMess — "Stop Cooking Blindly — Let AI Feed the Campus"

**TIET Campus Suite | TIET Patiala ()**

---

## 🚀 Overview

SmartMess is an autonomous, kitchen-manager-side demand forecasting and waste-prevention terminal built specifically for university hostel messes at **TIET Patiala** (Hostel J, Hostel L, Hostel M, Hostel B, and Hostel D).

Instead of treating the mess problem as a passive "student menu viewer", SmartMess addresses the root cause of food waste, financial losses, and food quality complaints: **blind, static bulk cooking**.

### Key Problem Context at TIET:
1. **Weekend Outward Exodus**: On Fridays, Saturdays, and Sundays, 45%–60% of students leave campus or dine out in Patiala city (Urban Estate, 22 No. Phatak, Bhupindra Road). Traditional mess management cooks flat 85%–90% portions, leading to severe dumping of dal, rice, and chapatis.
2. **Quality Inconsistency & Food Incidents**: Disparities between commercial caterers (**Sodexo** in Hostels J, M, D) vs autonomous student societies (**TMSS** in Hostels L, B), including recurring oil reuse (high Total Polar Material %) and food safety incidents.
3. **Massive Financial Drain**: A single hostel mess (e.g. Hostel J) wastes over **₹14,200 per week** on discarded dal and rice alone.

---

## 🎯 Core Features

### 1. 📊 Hostel Meal Demand Forecaster & 3-Stage Batching
- Multi-factor prediction engine factoring:
  - **Day of Week**: Detects Friday departures, Saturday night outings, and Sunday return surges.
  - **Academic Calendar**: Dynamically adjusts for Mid-Semesters (MST-1 & MST-2 rush) and End-Semesters (EST).
  - **TIET Kiosk Outward Leaves**: Incorporates real-time gate pass volume trends.
  - **Patiala Weather**: Accounts for dense winter fog (7:30 AM breakfast skips), heavy monsoons (snack/chai surges), and 42°C summer heatwaves.
- **3-Stage Dynamic Cooking Roadmap**:
  - **Batch 1 (45%)**: Early rush, prepared 30 minutes before doors open.
  - **Batch 2 (35%)**: Peak rush, steaming hot refills off tawa.
  - **Batch 3 (20%)**: Dynamic on-demand tail based on live turnstile counts, halting excess boiling.
- **Instant Kitchen Pantry Prep Sheet**: Direct issue slips in kilograms for rice, dal, flour, and veggies.

### 2. 💸 Food Waste ₹ Impact Calculator
- Interactive financial meter demonstrating:
  > *"This week Hostel J wasted ₹14,200 worth of dal & rice. Predictive batching saves ₹9,800/week."*
- Animated breakdown of raw material savings across Dal, Rice, Rotis, Sabzi, and Dairy.
- Campus-wide ROI projector modeling **₹18.4+ Lakhs annual savings** across all 5 TIET messes.
- Ecological footprint metrics tracking agricultural virtual water conserved (liters) and landfill CO₂e averted.

### 3. 🍳 Surplus Repurposing Recipe Engine
- Standardized, rule-based culinary transformation matrix:
  - *Leftover lunch rice* ➔ Evening Crispy Veg Pulao or Tempered Curd Rice (92% value recovery).
  - *Morning steamed idlis* ➔ 5 PM Gunpowder Fried Idli Chaat (95% value recovery).
  - *Excess lunch dal* ➔ Whole-wheat Dal Paratha dough binding.
  - *Surplus boiled potatoes* ➔ High-crunch Aloo Tikki sliders.
  - *Leftover rajma/chole* ➔ High-protein Galouti cutlets.
- **FSSAI Food Safety Protocol**: Strict time-temperature requirements (reheat core &gt;74°C, rapid chill &lt;4°C, Bacillus cereus safeguards, max safe holding timers).
- Interactive **"Log Shift Surplus"** dialog to generate immediate chef station SOPs.

### 4. 🛡️ Vendor Audit & Incident Heatmap (Sodexo vs TMSS)
- Comprehensive comparative benchmark across 6 scientific vectors:
  - Hygiene Audit, Food Safety Index, Thermal Holding (>65°C), Pest Audit, Student Satisfaction, and Fresh Oil TPM score (&lt;25% FSSAI limit).
- Verified incident timeline tracking oil reuse complaints, TDS water filtration logs, and resolution statuses.
- Real-time student sentiment tracker categorized by Taste, Hygiene, Undercooked, Delay, and Cleanliness.

---

## ⚙️ Tech Stack & Philosophy

- **100% Client-Side / Zero API Keys**: Everything runs locally in the browser with deterministic mathematical algorithms and reactive simulation models.
- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: Tailwind CSS with dark kitchen terminal aesthetics (`oklch(0.65 0.20 50)` kitchen orange + dark cast-iron background `oklch(0.10 0.01 50)`).
- **Typography**: Geist & Geist Mono.
- **Visuals & Charts**: Recharts (ComposedChart, BarChart, RadarChart) + Lucide React + Framer Motion.

---

## 🛠️ Local Development & Build

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd C:\Users\armaa\Desktop\TIET Smart Campus\07-smartmess

# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build
```

---

*Built with ❤️ for TIET Campus Platform at Thapar Institute of Engineering & Technology (TIET), Patiala.*
