import { TIET_HOSTELS, MEAL_SLOTS, type MealSlot } from '../data/messData';

export type AcademicPhase = 'normal' | 'mst' | 'est' | 'post_exam';
export type WeatherCondition = 'clear' | 'foggy_cold' | 'rainy' | 'extreme_heat';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface SimulationParams {
  hostelId: string; // 'all' or specific hostel id
  mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  dayOfWeek: DayOfWeek;
  academicPhase: AcademicPhase;
  weather: WeatherCondition;
  weekendPassPercentage: number; // 0 to 80%
  batchingEfficiency: number; // 0 to 100%
}

export interface DemandPredictionResult {
  hostelName: string;
  totalResidents: number;
  mealInfo: MealSlot;
  predictedTurnout: number;
  confidenceScore: number; // e.g. 94%
  traditionalCookPlates: number;
  traditionalWastePlates: number;
  traditionalWasteKg: number;
  traditionalFinancialLoss: number; // in INR
  smartCookPlates: number;
  smartWastePlates: number;
  smartWasteKg: number;
  smartFinancialLoss: number; // in INR
  netFinancialSaved: number; // in INR
  netWasteSavedKg: number;
  waterSavedLiters: number;
  co2AvoidedKg: number;
  batchSchedule: {
    batch1: { label: string; time: string; plates: number; percentage: number; menuDetails: string };
    batch2: { label: string; time: string; plates: number; percentage: number; menuDetails: string };
    batch3: { label: string; time: string; plates: number; percentage: number; menuDetails: string };
  };
  kitchenPantryQuantities: {
    riceKg: number;
    dalKg: number;
    chapatiCount: number;
    sabziKg: number;
    curdKg: number;
  };
  drivingFactors: { label: string; impact: string; isPositive: boolean }[];
}

export function calculateDemandPrediction(params: SimulationParams): DemandPredictionResult {
  const { hostelId, mealType, dayOfWeek, academicPhase, weather, weekendPassPercentage, batchingEfficiency } = params;

  // 1. Determine target hostels & population
  let residents = 0;
  let hostelLabel = 'All TIET Hostels (Campus Total)';
  let baseWeekendRate = 0.45;

  if (hostelId === 'all') {
    residents = TIET_HOSTELS.reduce((acc, h) => acc + h.currentResidents, 0);
    baseWeekendRate = 0.45;
  } else {
    const selected = TIET_HOSTELS.find((h) => h.id === hostelId) || TIET_HOSTELS[0];
    residents = selected.currentResidents;
    hostelLabel = selected.name;
    baseWeekendRate = selected.avgWeekendOutingRate;
  }

  const meal = MEAL_SLOTS[mealType] || MEAL_SLOTS.lunch;

  // 2. Base Turnout Factor
  let multiplier = meal.baseParticipation;
  const factors: { label: string; impact: string; isPositive: boolean }[] = [];

  // Day factor
  const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  const isFriday = dayOfWeek === 'Friday';

  if (isWeekend) {
    const effectiveLeaveRate = (weekendPassPercentage / 100) || baseWeekendRate;
    const leaveDrop = effectiveLeaveRate * (mealType === 'breakfast' ? 0.4 : mealType === 'dinner' ? 0.55 : 0.48);
    multiplier *= (1 - leaveDrop);
    factors.push({
      label: `${dayOfWeek} City Outing`,
      impact: `-${Math.round(leaveDrop * 100)}% attendance due to Urban Estate/city dining`,
      isPositive: false,
    });
  } else if (isFriday && mealType === 'dinner') {
    multiplier *= 0.76;
    factors.push({
      label: 'Friday Night Exodus',
      impact: '-24% due to weekend bus/train departures',
      isPositive: false,
    });
  } else {
    factors.push({
      label: 'Weekday Routine',
      impact: 'Nominal campus class attendance',
      isPositive: true,
    });
  }

  // Academic phase factor
  if (academicPhase === 'mst') {
    if (mealType === 'breakfast') {
      multiplier *= 1.15;
      factors.push({ label: 'MST Exam Rush', impact: '+15% breakfast before 8:30 AM shift', isPositive: true });
    } else if (mealType === 'snacks') {
      multiplier *= 1.25;
      factors.push({ label: 'Library Study Fuel', impact: '+25% snacks & chai surge', isPositive: true });
    } else if (mealType === 'dinner') {
      multiplier *= 1.12;
      factors.push({ label: 'Night Study Retention', impact: '+12% students stay on campus', isPositive: true });
    }
  } else if (academicPhase === 'est') {
    multiplier *= 1.18;
    factors.push({ label: 'Final Exams (EST)', impact: '+18% turnout, strict curfew attendance', isPositive: true });
  } else if (academicPhase === 'post_exam') {
    multiplier *= 0.52;
    factors.push({ label: 'Post-Exam Semester Break', impact: '-48% campus vacancy', isPositive: false });
  }

  // Weather factor
  if (weather === 'foggy_cold') {
    if (mealType === 'breakfast') {
      multiplier *= 0.78;
      factors.push({ label: 'Patiala Dense Winter Fog', impact: '-22% morning wake-up skipping', isPositive: false });
    } else if (mealType === 'dinner') {
      multiplier *= 1.06;
      factors.push({ label: 'Chilly Evening', impact: '+6% prefer warm mess meal over stepping out', isPositive: true });
    }
  } else if (weather === 'rainy') {
    if (mealType === 'snacks') {
      multiplier *= 1.35;
      factors.push({ label: 'Monsoon Rain Shower', impact: '+35% pakora & hot tea demand', isPositive: true });
    } else {
      multiplier *= 0.94;
      factors.push({ label: 'Heavy Downpour', impact: '-6% delayed between hostel & mess block', isPositive: false });
    }
  } else if (weather === 'extreme_heat') {
    if (mealType === 'lunch') {
      multiplier *= 0.88;
      factors.push({ label: 'May-June Heatwave (42°C)', impact: '-12% heavy lunch appetite', isPositive: false });
    }
  }

  // Bounds
  const predictedTurnout = Math.min(residents, Math.max(80, Math.round(residents * multiplier)));

  // Traditional preparation: cooks flat 88% of full resident capacity
  const traditionalCookPlates = Math.round(residents * 0.88);
  const rawTraditionalWaste = Math.max(0, traditionalCookPlates - predictedTurnout);

  // Kg calculations: 1 plate ~ 0.38 kg edible food waste
  const kgPerPlate = 0.38;
  const traditionalWasteKg = Math.round(rawTraditionalWaste * kgPerPlate);
  const traditionalFinancialLoss = Math.round(rawTraditionalWaste * meal.wasteCostFactor);

  // Smart mess batching model
  // Under smart batching, cooking matches predicted turnout with 3 tranches
  // Efficiency ratio (0% = traditional waste, 100% = max 4% buffer waste)
  const eff = Math.min(1, Math.max(0.1, batchingEfficiency / 100));
  const smartBufferPlates = Math.round(predictedTurnout * (0.03 + (1 - eff) * 0.18));
  const smartCookPlates = predictedTurnout + smartBufferPlates;
  const smartWastePlates = Math.round(smartBufferPlates * (1 - eff * 0.75));
  const smartWasteKg = Math.max(3, Math.round(smartWastePlates * kgPerPlate));
  const smartFinancialLoss = Math.max(120, Math.round(smartWastePlates * meal.wasteCostFactor));

  const netFinancialSaved = Math.max(0, traditionalFinancialLoss - smartFinancialLoss);
  const netWasteSavedKg = Math.max(0, traditionalWasteKg - smartWasteKg);

  // Environmental impact: 850L water per kg food, 2.3 kg CO2e per kg food waste
  const waterSavedLiters = Math.round(netWasteSavedKg * 850);
  const co2AvoidedKg = Math.round(netWasteSavedKg * 2.3);

  // 3-Stage Batching Breakdown
  const b1Plates = Math.round(predictedTurnout * 0.45);
  const b2Plates = Math.round(predictedTurnout * 0.35);
  const b3Plates = smartCookPlates - b1Plates - b2Plates;

  // Pantry raw material metrics for predicted turnout
  const riceKg = Math.round(predictedTurnout * 0.085); // 85g raw grain per plate
  const dalKg = Math.round(predictedTurnout * 0.055); // 55g raw pulses per plate
  const chapatiCount = Math.round(predictedTurnout * 3.4); // avg 3.4 rotis per student
  const sabziKg = Math.round(predictedTurnout * 0.12); // 120g veggies per plate
  const curdKg = Math.round(predictedTurnout * 0.09);

  return {
    hostelName: hostelLabel,
    totalResidents: residents,
    mealInfo: meal,
    predictedTurnout,
    confidenceScore: 94.8,
    traditionalCookPlates,
    traditionalWastePlates: rawTraditionalWaste,
    traditionalWasteKg,
    traditionalFinancialLoss,
    smartCookPlates,
    smartWastePlates,
    smartWasteKg,
    smartFinancialLoss,
    netFinancialSaved,
    netWasteSavedKg,
    waterSavedLiters,
    co2AvoidedKg,
    batchSchedule: {
      batch1: {
        label: 'Batch 1 (Early Rush)',
        time: mealType === 'breakfast' ? '07:15 AM' : mealType === 'lunch' ? '12:00 PM' : mealType === 'snacks' ? '04:45 PM' : '07:30 PM',
        plates: b1Plates,
        percentage: 45,
        menuDetails: 'Initial 45% loaded into steam counters. Rice, dal & primary veg ready at service opening.',
      },
      batch2: {
        label: 'Batch 2 (Peak Crowd)',
        time: mealType === 'breakfast' ? '08:15 AM' : mealType === 'lunch' ? '01:00 PM' : mealType === 'snacks' ? '05:30 PM' : '08:30 PM',
        plates: b2Plates,
        percentage: 35,
        menuDetails: 'Fired 30 min before peak. Fresh phulkas/rotis off the tawa, replenished steaming hot.',
      },
      batch3: {
        label: 'Batch 3 (Dynamic Buffer)',
        time: mealType === 'breakfast' ? '09:00 AM' : mealType === 'lunch' ? '01:45 PM' : mealType === 'snacks' ? '05:55 PM' : '09:15 PM',
        plates: b3Plates,
        percentage: 20,
        menuDetails: 'On-demand finishing based on live turnstile scanner counts. Halts excess boiling.',
      },
    },
    kitchenPantryQuantities: {
      riceKg,
      dalKg,
      chapatiCount,
      sabziKg,
      curdKg,
    },
    drivingFactors: factors,
  };
}

export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}
