export class PITypeID {
  type_id: number;
  type_name: string;
  p_class: number;
  input1_type_id?: number;
  input2_type_id?: number;
  input3_type_id?: number;
  single_planet?: boolean;
}

export const PI_TYPE_IDS: PITypeID[] =
[
  {
    "type_id": 2268,
    "type_name": "Aqueous Liquids",
    "p_class": 0
  },
  {
    "type_id": 2305,
    "type_name": "Autotrophs",
    "p_class": 0
  },
  {
    "type_id": 2267,
    "type_name": "Base Metals",
    "p_class": 0
  },
  {
    "type_id": 2288,
    "type_name": "Carbon Compounds",
    "p_class": 0
  },
  {
    "type_id": 2287,
    "type_name": "Complex Organisms",
    "p_class": 0
  },
  {
    "type_id": 2307,
    "type_name": "Felsic Magma",
    "p_class": 0
  },
  {
    "type_id": 2272,
    "type_name": "Heavy Metals",
    "p_class": 0
  },
  {
    "type_id": 2309,
    "type_name": "Ionic Solutions",
    "p_class": 0
  },
  {
    "type_id": 2073,
    "type_name": "Micro Organisms",
    "p_class": 0
  },
  {
    "type_id": 2310,
    "type_name": "Noble Gas",
    "p_class": 0
  },
  {
    "type_id": 2270,
    "type_name": "Noble Metals",
    "p_class": 0
  },
  {
    "type_id": 2306,
    "type_name": "Non-CS Crystals",
    "p_class": 0
  },
  {
    "type_id": 2286,
    "type_name": "Planktic Colonies",
    "p_class": 0
  },
  {
    "type_id": 2311,
    "type_name": "Reactive Gas",
    "p_class": 0
  },
  {
    "type_id": 2308,
    "type_name": "Suspended Plasma",
    "p_class": 0
  },
  {
    "type_id": 2393,
    "type_name": "Bacteria",
    "p_class": 1
  },
  {
    "type_id": 2396,
    "type_name": "Biofuels",
    "p_class": 1
  },
  {
    "type_id": 3779,
    "type_name": "Biomass",
    "p_class": 1
  },
  {
    "type_id": 2401,
    "type_name": "Chiral Structures",
    "p_class": 1
  },
  {
    "type_id": 2390,
    "type_name": "Electrolytes",
    "p_class": 1
  },
  {
    "type_id": 2397,
    "type_name": "Industrial Fibers",
    "p_class": 1
  },
  {
    "type_id": 2392,
    "type_name": "Oxidizing Compound",
    "p_class": 1
  },
  {
    "type_id": 3683,
    "type_name": "Oxygen",
    "p_class": 1
  },
  {
    "type_id": 2389,
    "type_name": "Plasmoids",
    "p_class": 1
  },
  {
    "type_id": 2399,
    "type_name": "Precious Metals",
    "p_class": 1
  },
  {
    "type_id": 2395,
    "type_name": "Proteins",
    "p_class": 1
  },
  {
    "type_id": 2398,
    "type_name": "Reactive Metals",
    "p_class": 1
  },
  {
    "type_id": 9828,
    "type_name": "Silicon",
    "p_class": 1
  },
  {
    "type_id": 2400,
    "type_name": "Toxic Metals",
    "p_class": 1
  },
  {
    "type_id": 3645,
    "type_name": "Water",
    "p_class": 1
  },
  {
    "type_id": 2329,
    "type_name": "Biocells",
    "p_class": 2,
    "input1_type_id": 2396,
    "input2_type_id": 2399,
    "single_planet": true
  },
  {
    "type_id": 3828,
    "type_name": "Construction Blocks",
    "p_class": 2,
    "input1_type_id": 2398,
    "input2_type_id": 2400,
    "single_planet": true
  },
  {
    "type_id": 9836,
    "type_name": "Consumer Electronics",
    "p_class": 2,
    "input1_type_id": 2400,
    "input2_type_id": 2401,
    "single_planet": true
  },
  {
    "type_id": 9832,
    "type_name": "Coolant",
    "p_class": 2,
    "input1_type_id": 2390,
    "input2_type_id": 3645,
    "single_planet": true
  },
  {
    "type_id": 44,
    "type_name": "Enriched Uranium",
    "p_class": 2,
    "input1_type_id": 2399,
    "input2_type_id": 2400,
    "single_planet": true
  },
  {
    "type_id": 3693,
    "type_name": "Fertilizer",
    "p_class": 2,
    "input1_type_id": 2393,
    "input2_type_id": 2395,
    "single_planet": true
  },
  {
    "type_id": 15317,
    "type_name": "Genetically Enhanced Livestock",
    "p_class": 2,
    "input1_type_id": 2395,
    "input2_type_id": 3779,
    "single_planet": true
  },
  {
    "type_id": 3725,
    "type_name": "Livestock",
    "p_class": 2,
    "input1_type_id": 2395,
    "input2_type_id": 2396,
    "single_planet": true
  },
  {
    "type_id": 3689,
    "type_name": "Mechanical Parts",
    "p_class": 2,
    "input1_type_id": 2398,
    "input2_type_id": 2399,
    "single_planet": true
  },
  {
    "type_id": 2327,
    "type_name": "Microfiber Shielding",
    "p_class": 2,
    "input1_type_id": 2397,
    "input2_type_id": 9828,
    "single_planet": false
  },
  {
    "type_id": 9842,
    "type_name": "Miniature Electronics",
    "p_class": 2,
    "input1_type_id": 2401,
    "input2_type_id": 9828,
    "single_planet": true
  },
  {
    "type_id": 2463,
    "type_name": "Nanites",
    "p_class": 2,
    "input1_type_id": 2393,
    "input2_type_id": 2398,
    "single_planet": true
  },
  {
    "type_id": 2317,
    "type_name": "Oxides",
    "p_class": 2,
    "input1_type_id": 2392,
    "input2_type_id": 3683,
    "single_planet": true
  },
  {
    "type_id": 2321,
    "type_name": "Polyaramids",
    "p_class": 2,
    "input1_type_id": 2392,
    "input2_type_id": 2397,
    "single_planet": false
  },
  {
    "type_id": 3695,
    "type_name": "Polytextiles",
    "p_class": 2,
    "input1_type_id": 2396,
    "input2_type_id": 2397,
    "single_planet": true
  },
  {
    "type_id": 9830,
    "type_name": "Rocket Fuel",
    "p_class": 2,
    "input1_type_id": 2389,
    "input2_type_id": 2390,
    "single_planet": true
  },
  {
    "type_id": 3697,
    "type_name": "Silicate Glass",
    "p_class": 2,
    "input1_type_id": 2392,
    "input2_type_id": 9828,
    "single_planet": false
  },
  {
    "type_id": 9838,
    "type_name": "Superconductors",
    "p_class": 2,
    "input1_type_id": 2389,
    "input2_type_id": 3645,
    "single_planet": true
  },
  {
    "type_id": 2312,
    "type_name": "Supertensile Plastics",
    "p_class": 2,
    "input1_type_id": 3683,
    "input2_type_id": 3779,
    "single_planet": true
  },
  {
    "type_id": 3691,
    "type_name": "Synthetic Oil",
    "p_class": 2,
    "input1_type_id": 2390,
    "input2_type_id": 3683,
    "single_planet": true
  },
  {
    "type_id": 2319,
    "type_name": "Test Cultures",
    "p_class": 2,
    "input1_type_id": 2393,
    "input2_type_id": 3645,
    "single_planet": true
  },
  {
    "type_id": 9840,
    "type_name": "Transmitter",
    "p_class": 2,
    "input1_type_id": 2389,
    "input2_type_id": 2401,
    "single_planet": true
  },
  {
    "type_id": 3775,
    "type_name": "Viral Agent",
    "p_class": 2,
    "input1_type_id": 2393,
    "input2_type_id": 3779,
    "single_planet": true
  },
  {
    "type_id": 2328,
    "type_name": "Water-Cooled CPU",
    "p_class": 2,
    "input1_type_id": 2398,
    "input2_type_id": 3645,
    "single_planet": true
  },
  {
    "type_id": 2358,
    "type_name": "Biotech Research Reports",
    "p_class": 3,
    "input1_type_id": 2463,
    "input2_type_id": 3725,
    "input3_type_id": 3828
  },
  {
    "type_id": 2345,
    "type_name": "Camera Drones",
    "p_class": 3,
    "input1_type_id": 3697,
    "input2_type_id": 9830
  },
  {
    "type_id": 2344,
    "type_name": "Condensates",
    "p_class": 3,
    "input1_type_id": 2317,
    "input2_type_id": 9832
  },
  {
    "type_id": 2367,
    "type_name": "Cryoprotectant Solution",
    "p_class": 3,
    "input1_type_id": 2319,
    "input2_type_id": 3691,
    "input3_type_id": 3693
  },
  {
    "type_id": 17392,
    "type_name": "Data Chips",
    "p_class": 3,
    "input1_type_id": 2312,
    "input2_type_id": 2327
  },
  {
    "type_id": 2348,
    "type_name": "Gel-Matrix Biopaste",
    "p_class": 3,
    "input1_type_id": 2317,
    "input2_type_id": 2329,
    "input3_type_id": 9838
  },
  {
    "type_id": 9834,
    "type_name": "Guidance Systems",
    "p_class": 3,
    "input1_type_id": 2328,
    "input2_type_id": 9840
  },
  {
    "type_id": 2366,
    "type_name": "Hazmat Detection Systems",
    "p_class": 3,
    "input1_type_id": 3695,
    "input2_type_id": 3775,
    "input3_type_id": 9840
  },
  {
    "type_id": 2361,
    "type_name": "Hermetic Membranes",
    "p_class": 3,
    "input1_type_id": 2321,
    "input2_type_id": 15317
  },
  {
    "type_id": 17898,
    "type_name": "High-Tech Transmitters",
    "p_class": 3,
    "input1_type_id": 2321,
    "input2_type_id": 9840
  },
  {
    "type_id": 2360,
    "type_name": "Industrial Explosives",
    "p_class": 3,
    "input1_type_id": 3693,
    "input2_type_id": 3695
  },
  {
    "type_id": 2354,
    "type_name": "Neocoms",
    "p_class": 3,
    "input1_type_id": 2329,
    "input2_type_id": 3697
  },
  {
    "type_id": 2352,
    "type_name": "Nuclear Reactors",
    "p_class": 3,
    "input1_type_id": 44,
    "input2_type_id": 2327
  },
  {
    "type_id": 9846,
    "type_name": "Planetary Vehicles",
    "p_class": 3,
    "input1_type_id": 2312,
    "input2_type_id": 3689,
    "input3_type_id": 9842
  },
  {
    "type_id": 9848,
    "type_name": "Robotics",
    "p_class": 3,
    "input1_type_id": 3689,
    "input2_type_id": 9836
  },
  {
    "type_id": 2351,
    "type_name": "Smartfab Units",
    "p_class": 3,
    "input1_type_id": 3828,
    "input2_type_id": 9842
  },
  {
    "type_id": 2349,
    "type_name": "Supercomputers",
    "p_class": 3,
    "input1_type_id": 2328,
    "input2_type_id": 9832,
    "input3_type_id": 9836
  },
  {
    "type_id": 2346,
    "type_name": "Synthetic Synapses",
    "p_class": 3,
    "input1_type_id": 2312,
    "input2_type_id": 2319
  },
  {
    "type_id": 12836,
    "type_name": "Transcranial Microcontrollers",
    "p_class": 3,
    "input1_type_id": 2329,
    "input2_type_id": 2463
  },
  {
    "type_id": 17136,
    "type_name": "Ukomi Super Conductors",
    "p_class": 3,
    "input1_type_id": 3691,
    "input2_type_id": 9838
  },
  {
    "type_id": 28974,
    "type_name": "Vaccines",
    "p_class": 3,
    "input1_type_id": 3725,
    "input2_type_id": 3775
  },
  {
    "type_id": 2867,
    "type_name": "Broadcast Node",
    "p_class": 4,
    "input1_type_id": 2354,
    "input2_type_id": 17392,
    "input3_type_id": 17898
  },
  {
    "type_id": 2868,
    "type_name": "Integrity Response Drones",
    "p_class": 4,
    "input1_type_id": 2348,
    "input2_type_id": 2366,
    "input3_type_id": 9846
  },
  {
    "type_id": 2869,
    "type_name": "Nano-Factory",
    "p_class": 4,
    "input1_type_id": 2360,
    "input2_type_id": 17136,
    "input3_type_id": 2398
  },
  {
    "type_id": 2870,
    "type_name": "Organic Mortar Applicators",
    "p_class": 4,
    "input1_type_id": 2344,
    "input2_type_id": 9848,
    "input3_type_id": 2393
  },
  {
    "type_id": 2871,
    "type_name": "Recursive Computing Module",
    "p_class": 4,
    "input1_type_id": 9834,
    "input2_type_id": 2346,
    "input3_type_id": 12836
  },
  {
    "type_id": 2872,
    "type_name": "Self-Harmonizing Power Core",
    "p_class": 4,
    "input1_type_id": 2345,
    "input2_type_id": 2361,
    "input3_type_id": 2352
  },
  {
    "type_id": 2875,
    "type_name": "Sterile Conduits",
    "p_class": 4,
    "input1_type_id": 2351,
    "input2_type_id": 28974,
    "input3_type_id": 3645
  },
  {
    "type_id": 2876,
    "type_name": "Wetware Mainframe",
    "p_class": 4,
    "input1_type_id": 2358,
    "input2_type_id": 2367,
    "input3_type_id": 2349
  }
]