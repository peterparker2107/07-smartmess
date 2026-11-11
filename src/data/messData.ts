export interface HostelInfo {
  id: string;
  name: string;
  type: 'Boys' | 'Girls';
  capacity: number;
  currentResidents: number;
  vendor: 'Sodexo' | 'TMSS';
  messManager: string;
  chefInCharge: string;
  avgWeekendOutingRate: number; // percentage who leave campus
  rating: number; // out of 5
  lastInspectionDate: string;
  location: string;
}

export interface MealSlot {
  id: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  name: string;
  timeRange: string;
  baseParticipation: number; // baseline % of residents
  costPerPlate: number; // in INR
  wasteCostFactor: number; // loss per plate wasted
  stapleMenu: string[];
}

export interface TurnoutTrend {
  day: string;
  date: string;
  actualTurnout: number;
  traditionalPrepared: number;
  aiPredictedTurnout: number;
  batch1Cooked: number;
  batch2Cooked: number;
  batch3Cooked: number;
  wasteTraditionalKg: number;
  wasteSmartKg: number;
  costLostTraditional: number;
  costSavedSmart: number;
  notes: string;
}

export interface RepurposingRecipe {
  id: string;
  leftoverItem: string;
  fromMeal: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  suggestedDish: string;
  targetMeal: 'snacks' | 'dinner' | 'next_breakfast';
  prepTimeMinutes: number;
  shelfLifeHours: number;
  fssaiSafeTemp: string;
  costRecoveryRate: number; // percentage of original raw material cost recovered
  dietaryCategory: 'Veg' | 'High-Protein' | 'Comfort Food';
  chefInstructions: string[];
  mandatorySafetyChecks: string[];
  ingredientsToAdd: string[];
}

export interface VendorAudit {
  vendorName: 'Sodexo' | 'TMSS';
  fullName: string;
  assignedHostels: string[];
  totalStudentsFedDaily: number;
  overallHygieneScore: number; // /100
  foodSafetyIndex: number; // /100
  oilTpmScore: number; // Total Polar Material in %, <25% is safe FSSAI
  temperatureCompliance: number; // % meals kept >65°C
  pestInspectionScore: number; // /100
  studentSatisfaction: number; // /100
  complaintCountMonth: number;
  criticalIncidentsYear: number;
  strengths: string[];
  concerns: string[];
  lastAuditSummary: string;
}

export interface StudentComplaint {
  id: string;
  hostel: string;
  vendor: 'Sodexo' | 'TMSS';
  meal: string;
  category: 'Hygiene' | 'Taste' | 'Undercooked' | 'Quantity' | 'Cold Food';
  severity: 'Critical' | 'Warning' | 'Low';
  timestamp: string;
  comment: string;
  status: 'Investigating' | 'Resolved' | 'Action Taken';
}

export const TIET_HOSTELS: HostelInfo[] = [
  {
    id: 'hostel-j',
    name: 'Hostel J',
    type: 'Boys',
    capacity: 1250,
    currentResidents: 1180,
    vendor: 'Sodexo',
    messManager: 'Harpreet Singh Walia',
    chefInCharge: 'Chef Ram Kumar',
    avgWeekendOutingRate: 0.58, // 58% leave on weekends for Patiala / Delhi
    rating: 3.8,
    lastInspectionDate: '2026-11-04',
    location: 'Near COS Complex, North Campus',
  },
  {
    id: 'hostel-l',
    name: 'Hostel L',
    type: 'Boys',
    capacity: 950,
    currentResidents: 910,
    vendor: 'TMSS',
    messManager: 'Surinder Pal Sharma',
    chefInCharge: 'Chef Manoj Thapa',
    avgWeekendOutingRate: 0.44,
    rating: 4.2,
    lastInspectionDate: '2026-11-08',
    location: 'Near Synthetic Athletic Track',
  },
  {
    id: 'hostel-m',
    name: 'Hostel M',
    type: 'Boys',
    capacity: 820,
    currentResidents: 790,
    vendor: 'Sodexo',
    messManager: 'Rajeev Dutta',
    chefInCharge: 'Chef Balwant Singh',
    avgWeekendOutingRate: 0.52,
    rating: 3.9,
    lastInspectionDate: '2026-10-29',
    location: 'Next to Swimming Pool Block',
  },
  {
    id: 'hostel-b',
    name: 'Hostel B',
    type: 'Boys',
    capacity: 750,
    currentResidents: 720,
    vendor: 'TMSS',
    messManager: 'Gurvinder Singh',
    chefInCharge: 'Chef Deepak Rawat',
    avgWeekendOutingRate: 0.40,
    rating: 4.4,
    lastInspectionDate: '2026-11-06',
    location: 'Near Old Mechanical Block',
  },
  {
    id: 'hostel-d',
    name: 'Hostel D',
    type: 'Girls',
    capacity: 1100,
    currentResidents: 1040,
    vendor: 'Sodexo',
    messManager: 'Manju Grover',
    chefInCharge: 'Chef Santosh Verma',
    avgWeekendOutingRate: 0.32, // More stay on campus, but sensitive to food quality
    rating: 3.6,
    lastInspectionDate: '2026-11-09',
    location: 'Opposite Nirvana Canteen / Central Library',
  },
];

export const MEAL_SLOTS: Record<string, MealSlot> = {
  breakfast: {
    id: 'breakfast',
    name: 'Breakfast',
    timeRange: '07:30 AM – 09:45 AM',
    baseParticipation: 0.62,
    costPerPlate: 42,
    wasteCostFactor: 19.5,
    stapleMenu: ['Aloo Paratha with Curd & Pickle', 'Poha with Sev', 'Idli Sambar', 'Eggs / Sprouts', 'Tea / Coffee / Milk'],
  },
  lunch: {
    id: 'lunch',
    name: 'Lunch',
    timeRange: '12:15 PM – 02:30 PM',
    baseParticipation: 0.84,
    costPerPlate: 68,
    wasteCostFactor: 32.0,
    stapleMenu: ['Arhar Dal Tadka', 'Jeera Rice', 'Aloo Gobi Matar', 'Fresh Tawa Roti', 'Boondi Raita & Salad'],
  },
  snacks: {
    id: 'snacks',
    name: 'Evening Snacks',
    timeRange: '05:00 PM – 06:15 PM',
    baseParticipation: 0.54,
    costPerPlate: 28,
    wasteCostFactor: 14.0,
    stapleMenu: ['Bread Pakora / Samosa', 'Veg Cutlet', 'Aloo Tikki Burger', 'Masala Chai / Nimbu Paani'],
  },
  dinner: {
    id: 'dinner',
    name: 'Dinner',
    timeRange: '07:45 PM – 10:00 PM',
    baseParticipation: 0.78,
    costPerPlate: 74,
    wasteCostFactor: 36.5,
    stapleMenu: ['Shahi Paneer / Dal Makhani', 'Mixed Veg Korma', 'Peas Pulao', 'Butter Naan / Phulka', 'Gulab Jamun / Kheer'],
  },
};

export const HISTORICAL_WEEK_DATA: TurnoutTrend[] = [
  {
    day: 'Monday',
    date: '03 Nov',
    actualTurnout: 940,
    traditionalPrepared: 1120,
    aiPredictedTurnout: 955,
    batch1Cooked: 450,
    batch2Cooked: 330,
    batch3Cooked: 175,
    wasteTraditionalKg: 82,
    wasteSmartKg: 14,
    costLostTraditional: 4100,
    costSavedSmart: 3450,
    notes: 'Students back from weekend trips; strong dinner turnout',
  },
  {
    day: 'Tuesday',
    date: '04 Nov',
    actualTurnout: 980,
    traditionalPrepared: 1140,
    aiPredictedTurnout: 975,
    batch1Cooked: 460,
    batch2Cooked: 340,
    batch3Cooked: 175,
    wasteTraditionalKg: 74,
    wasteSmartKg: 12,
    costLostTraditional: 3850,
    costSavedSmart: 3250,
    notes: 'Full academic day; 100% lab attendance',
  },
  {
    day: 'Wednesday',
    date: '05 Nov',
    actualTurnout: 890,
    traditionalPrepared: 1120,
    aiPredictedTurnout: 905,
    batch1Cooked: 420,
    batch2Cooked: 320,
    batch3Cooked: 165,
    wasteTraditionalKg: 104,
    wasteSmartKg: 18,
    costLostTraditional: 5200,
    costSavedSmart: 4300,
    notes: 'Rain in Patiala afternoon: high snacks crowd, lighter dinner',
  },
  {
    day: 'Thursday',
    date: '06 Nov',
    actualTurnout: 860,
    traditionalPrepared: 1120,
    aiPredictedTurnout: 870,
    batch1Cooked: 410,
    batch2Cooked: 310,
    batch3Cooked: 150,
    wasteTraditionalKg: 118,
    wasteSmartKg: 19,
    costLostTraditional: 5900,
    costSavedSmart: 4950,
    notes: 'Pre-weekend submissions; late-night library crowd skipped dinner',
  },
  {
    day: 'Friday',
    date: '07 Nov',
    actualTurnout: 620,
    traditionalPrepared: 1080,
    aiPredictedTurnout: 640,
    batch1Cooked: 320,
    batch2Cooked: 220,
    batch3Cooked: 100,
    wasteTraditionalKg: 205,
    wasteSmartKg: 24,
    costLostTraditional: 11400,
    costSavedSmart: 9950,
    notes: 'Massive Friday exodus to Delhi, Chandigarh & Ludhiana',
  },
  {
    day: 'Saturday',
    date: '08 Nov',
    actualTurnout: 480,
    traditionalPrepared: 1050,
    aiPredictedTurnout: 495,
    batch1Cooked: 240,
    batch2Cooked: 170,
    batch3Cooked: 85,
    wasteTraditionalKg: 256,
    wasteSmartKg: 26,
    costLostTraditional: 14200,
    costSavedSmart: 12600,
    notes: 'Extreme waste day under static cooking! 58% hostel empty',
  },
  {
    day: 'Sunday',
    date: '09 Nov',
    actualTurnout: 530,
    traditionalPrepared: 1060,
    aiPredictedTurnout: 545,
    batch1Cooked: 260,
    batch2Cooked: 190,
    batch3Cooked: 95,
    wasteTraditionalKg: 238,
    wasteSmartKg: 28,
    costLostTraditional: 13100,
    costSavedSmart: 11400,
    notes: 'Special Sunday Chicken/Paneer menu: students return late evening',
  },
];

export const REPURPOSING_CATALOG: RepurposingRecipe[] = [
  {
    id: 'rec-01',
    leftoverItem: 'Steamed Rice (Basmati/Kolam)',
    fromMeal: 'lunch',
    suggestedDish: 'Crispy Veg & Corn Tawa Pulao',
    targetMeal: 'dinner',
    prepTimeMinutes: 20,
    shelfLifeHours: 4.5,
    fssaiSafeTemp: 'Reheat to core > 74°C for at least 2 minutes',
    costRecoveryRate: 92,
    dietaryCategory: 'Veg',
    chefInstructions: [
      'Rapid-cool leftover lunch rice to below 15°C within 60 minutes in shallow stainless steel trays.',
      'Sauté diced capsicum, carrots, sweet corn and onions in butter & cumin.',
      'Incorporate Pav Bhaji masala, degi mirch, and splash of lemon juice.',
      'Fold in rice gently at high heat (>80°C) with freshly chopped coriander.',
      'Serve sizzling hot at dinner counter within 3 hours.',
    ],
    mandatorySafetyChecks: [
      'Verify no sour or fermentation odor (Bacillus cereus risk).',
      'Check refrigeration thermometer log was steady below 4°C during holding.',
      'Record core internal temperature > 75°C on servery logging sheet.',
    ],
    ingredientsToAdd: ['Chopped Onions & Capsicum', 'Sweet Corn', 'Butter & Pav Bhaji Masala', 'Fresh Coriander & Lemon'],
  },
  {
    id: 'rec-02',
    leftoverItem: 'Steamed Rice (Cooked Lunch)',
    fromMeal: 'lunch',
    suggestedDish: 'South Indian Tempered Curd Rice',
    targetMeal: 'dinner',
    prepTimeMinutes: 15,
    shelfLifeHours: 5,
    fssaiSafeTemp: 'Hold cold strictly between 2°C – 4°C',
    costRecoveryRate: 88,
    dietaryCategory: 'Comfort Food',
    chefInstructions: [
      'Mash cooled rice lightly with fresh cow milk to prevent curd souring.',
      'Mix with chilled fresh curd, grated ginger, and slit green chillies.',
      'Prepare hot tadka of mustard seeds, urad dal, curry leaves, and asafoetida in ghee.',
      'Pour crackling tadka over curd rice and chill for 45 minutes.',
      'Top with pomegranate seeds and boondi before serving.',
    ],
    mandatorySafetyChecks: [
      'Ensure curd is fresh (<24 hours old, pH ~ 4.2 - 4.5).',
      'Keep continuously refrigerated until 10 minutes prior to service.',
      'Discard immediately if ambient counter time exceeds 2 hours.',
    ],
    ingredientsToAdd: ['Fresh Curd & Whole Milk', 'Curry Leaves & Mustard Seeds', 'Grated Ginger & Green Chillies', 'Pomegranate Arils'],
  },
  {
    id: 'rec-03',
    leftoverItem: 'Steamed Idli (Morning Batch)',
    fromMeal: 'breakfast',
    suggestedDish: 'Spicy Gunpowder Fried Idli Chaat',
    targetMeal: 'snacks',
    prepTimeMinutes: 15,
    shelfLifeHours: 6,
    fssaiSafeTemp: 'Flash fry / sauté at > 160°C oil temperature',
    costRecoveryRate: 95,
    dietaryCategory: 'Comfort Food',
    chefInstructions: [
      'Cube leftover morning idlis into 2cm bite-sized cubes.',
      'Toss with roasted gun powder (milagai podi) and cold-pressed sesame oil.',
      'Pan-crisp on flat tawa with curry leaves and mustard seeds until golden crunchy exterior.',
      'Garnish with nylon sev, chopped onions, and mint chutney for 5 PM evening tea.',
    ],
    mandatorySafetyChecks: [
      'Inspect idlis for moisture sweat or surface stickiness.',
      'Ensure internal crumb remains spongy and fresh.',
      'Frying oil TPM must be tested (<18%).',
    ],
    ingredientsToAdd: ['Milagai Podi (Gunpowder)', 'Cold Pressed Sesame/Mustard Oil', 'Curry leaves', 'Mint-Coriander Chutney'],
  },
  {
    id: 'rec-04',
    leftoverItem: 'Boiled Potatoes (Breakfast / Prep)',
    fromMeal: 'breakfast',
    suggestedDish: 'High-Crunch Aloo Tikki Sliders',
    targetMeal: 'snacks',
    prepTimeMinutes: 25,
    shelfLifeHours: 8,
    fssaiSafeTemp: 'Griddle temperature > 170°C',
    costRecoveryRate: 90,
    dietaryCategory: 'Comfort Food',
    chefInstructions: [
      'Mash chilled boiled potatoes with roasted jeera powder, rock salt, and chopped coriander.',
      'Add soaked poha or corn flour slurry for signature crunchy crust.',
      'Form uniform 70g patties and shallow fry on brass tawa with minimum oil.',
      'Assemble with local burger buns, shredded cabbage slaw, and spicy tamarind chutney.',
    ],
    mandatorySafetyChecks: [
      'No discoloration or green solanine tinge in potatoes.',
      'Potatoes must have been chilled promptly after morning steam.',
    ],
    ingredientsToAdd: ['Poha flakes binder', 'Roasted Jeera & Chaat Masala', 'Burger Buns & Slaw', 'Tamarind Chutney'],
  },
  {
    id: 'rec-05',
    leftoverItem: 'Yellow Arhar Dal / Moong Dal',
    fromMeal: 'lunch',
    suggestedDish: 'Nutritious Dal Paratha Dough Binding',
    targetMeal: 'dinner',
    prepTimeMinutes: 30,
    shelfLifeHours: 6,
    fssaiSafeTemp: 'Tandoor / Tawa surface > 190°C',
    costRecoveryRate: 85,
    dietaryCategory: 'High-Protein',
    chefInstructions: [
      'Use dense leftover cooked dal in place of water to knead whole wheat atta dough.',
      'Fold in ajwain (carom seeds), kasuri methi, chopped onions, and green chillies.',
      'Rest dough for 20 minutes for maximum gluten relaxation and soft texture.',
      'Roll into layered triangle parathas and roast with light ghee on iron tawa.',
    ],
    mandatorySafetyChecks: [
      'Dal acidity test: ensure pH has not dropped (sour dal produces dough discoloration).',
      'Discard if kept warm at ambient temperature for over 3 hours without cooling.',
    ],
    ingredientsToAdd: ['Whole Wheat Atta', 'Kasuri Methi & Ajwain', 'Finely Diced Onions', 'Desi Ghee brush'],
  },
  {
    id: 'rec-06',
    leftoverItem: 'Rajma / Chole Curry',
    fromMeal: 'lunch',
    suggestedDish: 'High-Protein Rajma Galouti Cutlets',
    targetMeal: 'dinner',
    prepTimeMinutes: 25,
    shelfLifeHours: 5,
    fssaiSafeTemp: 'Pan core > 75°C',
    costRecoveryRate: 91,
    dietaryCategory: 'High-Protein',
    chefInstructions: [
      'Drain excess gravy; roughly crush beans with potato masher.',
      'Blend with roasted gram flour (sattu), chopped mint, brown onion paste, and garam masala.',
      'Shape into medallion cutlets and sear gently in a cast iron pan.',
      'Serve with ring onions and curd-mint dip as dinner starter counter special.',
    ],
    mandatorySafetyChecks: [
      'Must have been chilled below 4°C immediately following lunch service cutoff (2:30 PM).',
      'Perform sensory check for any protein fermentation.',
    ],
    ingredientsToAdd: ['Roasted Chana Sattu', 'Brown Onion Paste', 'Fresh Mint & Garam Masala', 'Pickled Onion Rings'],
  },
];

export const VENDOR_AUDITS: VendorAudit[] = [
  {
    vendorName: 'Sodexo',
    fullName: 'Sodexo India On-Site Hospitality Services Ltd',
    assignedHostels: ['Hostel J', 'Hostel M', 'Hostel D'],
    totalStudentsFedDaily: 3010,
    overallHygieneScore: 78,
    foodSafetyIndex: 74,
    oilTpmScore: 21.8, // Close to 25% FSSAI limit
    temperatureCompliance: 81, // 81% hot food held >65C
    pestInspectionScore: 82,
    studentSatisfaction: 69,
    complaintCountMonth: 42,
    criticalIncidentsYear: 2, // Hostel D stomach upset Oct 2024, Hostel J oil complaint
    strengths: [
      'Centralized recipe standardization & digital inventory logs',
      'Professional staff uniforms and hairnet adherence',
      'Timely service opening even during peak examination surges',
    ],
    concerns: [
      'Frequent student complaints about excessive cooking oil reuse in Hostel J',
      'Inconsistent spice and salt balance between lunch and dinner shifts',
      'Hostel D past food safety incident flagged for water filtration TDS drift',
    ],
    lastAuditSummary: 'Needs immediate overhaul of frying oil replacement cycles. Recommend mandatory digital TPM loggers in Hostel J and D fryers.',
  },
  {
    vendorName: 'TMSS',
    fullName: 'Thapar Mess Services Society (Autonomous Cooperative)',
    assignedHostels: ['Hostel L', 'Hostel B'],
    totalStudentsFedDaily: 1630,
    overallHygieneScore: 89,
    foodSafetyIndex: 91,
    oilTpmScore: 14.2, // Fresh oil, well below 25%
    temperatureCompliance: 94,
    pestInspectionScore: 92,
    studentSatisfaction: 86,
    complaintCountMonth: 11,
    criticalIncidentsYear: 0,
    strengths: [
      'Direct mess committee student oversight with weekly sensory panel',
      'Strict oil replacement protocol after maximum 2 frying cycles',
      'High student satisfaction regarding roti freshness and dal seasoning',
      'Exceptional cold storage temperature maintenance (2.4°C average)',
    ],
    concerns: [
      'Manual pen-and-paper inventory management prone to small procurement delays',
      'Slower serving queue throughput during 01:15 PM peak rush hour',
    ],
    lastAuditSummary: 'Outstanding compliance benchmark. TMSS Hostel B and L kitchens exhibit superior culinary hygiene and zero food safety escalations.',
  },
];

export const RECENT_COMPLAINTS: StudentComplaint[] = [
  {
    id: 'CMP-2026-881',
    hostel: 'Hostel J',
    vendor: 'Sodexo',
    meal: 'Dinner (08 Nov)',
    category: 'Hygiene',
    severity: 'Critical',
    timestamp: '2 hours ago',
    comment: 'Puri had pungent rancid smell. Frying oil looked dark brown and reused repeatedly. Multiple students skipped dinner.',
    status: 'Investigating',
  },
  {
    id: 'CMP-2026-879',
    hostel: 'Hostel D',
    vendor: 'Sodexo',
    meal: 'Lunch (08 Nov)',
    category: 'Undercooked',
    severity: 'Warning',
    timestamp: '7 hours ago',
    comment: 'Rajma was hard and undercooked inside. Gravy lacked salt and tasted watery.',
    status: 'Action Taken',
  },
  {
    id: 'CMP-2026-874',
    hostel: 'Hostel L',
    vendor: 'TMSS',
    meal: 'Breakfast (08 Nov)',
    category: 'Quantity',
    severity: 'Low',
    timestamp: '14 hours ago',
    comment: 'Poha ran out at 09:15 AM before second batch was ready. Had to wait 8 mins for fresh batch.',
    status: 'Resolved',
  },
  {
    id: 'CMP-2026-868',
    hostel: 'Hostel M',
    vendor: 'Sodexo',
    meal: 'Dinner (07 Nov)',
    category: 'Cold Food',
    severity: 'Warning',
    timestamp: '1 day ago',
    comment: 'Chapatis in warmer tray were lukewarm and chewy. Bain-marie heat was not switched on.',
    status: 'Action Taken',
  },
  {
    id: 'CMP-2026-855',
    hostel: 'Hostel B',
    vendor: 'TMSS',
    meal: 'Lunch (07 Nov)',
    category: 'Taste',
    severity: 'Low',
    timestamp: '1 day ago',
    comment: 'Kadhi pakora had excellent seasoning. Good job today team!',
    status: 'Resolved',
  },
  {
    id: 'CMP-2026-842',
    hostel: 'Hostel J',
    vendor: 'Sodexo',
    meal: 'Lunch (06 Nov)',
    category: 'Hygiene',
    severity: 'Critical',
    timestamp: '2 days ago',
    comment: 'Found hair in salad bowl at counter 2. Utensil washing area smelled damp.',
    status: 'Investigating',
  },
];
