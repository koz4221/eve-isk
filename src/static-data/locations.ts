export class Region {
  name: string;
  regionID: number;
  code: string;
}

export const REGIONS: Region[] = [
   {
      name: "The Forge",
      regionID: 10000002,
      code: "forge"
   },
   {
      name: "Domain",
      regionID: 10000043,
      code: "domain"
   }
]

export class Location {
   name: string;
   fullname: string;
   locationID: number;
   regionID: number;
   code: string;
}

export const LOCATIONS: Location[] = [
   {
      name: "Jita",
      fullname: "Jita IV - Moon 4 - Caldari Navy Assembly Plant",
      locationID: 60003760,
      regionID: 10000002,
      code: "jita"
   },
   {
      name: "Amarr",
      fullname: "Amarr VIII (Oris) - Emperor Family Academy",
      locationID: 60008494,
      regionID: 10000043,
      code: "amarr"
   }
]