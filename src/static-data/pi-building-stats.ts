export class CommandCenterStat {
  level: number;
  cpu: number;
  power: number;
  upgradeCost: number;
}

export const COMMAND_CENTER_STATS: CommandCenterStat[] = [
      {
         level: 0,
         cpu: 1675,
         power: 6000,
         upgradeCost: 0
      },
      {
         level: 1,
         cpu: 7057,
         power: 9000,
         upgradeCost: 580000
      },
      {
         level: 2,
         cpu: 12136,
         power: 12000,
         upgradeCost: 930000
      },
      {
         level: 3,
         cpu: 17215,
         power: 15000,
         upgradeCost: 1200000
      },
      {
         level: 4,
         cpu: 21315,
         power: 17000,
         upgradeCost: 1500000
      },
      {
         level: 5,
         cpu: 25415,
         power: 19000,
         upgradeCost: 2100000
      }
]

export class PIBuildingStat {
  name: string;
  code: string;
  cpu: number;
  power: number;
  cost: number;
}

export const PI_BUILDING_STATS: PIBuildingStat[] = [
   {
      name: "Extractor Control Unit",
      code: "ecu",
      cpu: 400,
      power: 2600,
      cost: 45000
   },
   {
      name: "Extractor Head",
      code: "ehead",
      cpu: 110,
      power: 550,
      cost: 0
   },
   {
      name: "Basic Industry Facility",
      code: "basic",
      cpu: 200,
      power: 800,
      cost: 75000
   },
   {
      name: "Advanced Industry Facility",
      code: "adv",
      cpu: 500,
      power: 700,
      cost: 250000
   },
   {
      name: "High-Tech Industry Facility",
      code: "hitech",
      cpu: 1100,
      power: 400,
      cost: 525000
   },
   {
      name: "Storage Facility",
      code: "storage",
      cpu: 500,
      power: 700,
      cost: 250000
   },
   {
      name: "Space Port",
      code: "launchpad",
      cpu: 3600,
      power: 700,
      cost: 900000
   }
]