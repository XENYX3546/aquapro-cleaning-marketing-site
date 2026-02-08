// Location profile enrichment system
// Assigns each location an area archetype with default waterHardness, housingStock,
// environmentalFactors, and commonProblems. Explicit location data overrides archetype defaults.

import type { Location } from './locations';

export type AreaArchetype =
  | 'coastal'
  | 'estuary'
  | 'thames'
  | 'forest'
  | 'new-build'
  | 'historic'
  | 'commuter'
  | 'rural'
  | 'urban';

export type LocationProfile = {
  archetype: AreaArchetype;
  waterHardness: string;
  housingStock: string;
  environmentalFactors: string[];
  commonProblems: string[];
};

// ── Archetype default profiles ──────────────────────────────────────────────

type ArchetypeDefaults = {
  waterHardness: string;
  housingStock: string;
  environmentalFactors: string[];
  defaultProblems: string[];
};

const archetypeDefaults: Record<AreaArchetype, ArchetypeDefaults> = {
  coastal: {
    waterHardness: 'very hard',
    housingStock: 'a mix of seaside properties, bungalows, and family homes',
    environmentalFactors: ['sea salt air', 'high coastal humidity', 'wind-driven sand and grit'],
    defaultProblems: [
      'sea salt film building up on windows and fascias',
      'coastal damp driving moss and algae on roofs and patios',
      'sand and grit tracked into carpets and hallways',
    ],
  },
  estuary: {
    waterHardness: 'very hard',
    housingStock: 'a mix of waterfront properties and established family homes',
    environmentalFactors: ['estuary humidity', 'tidal water proximity', 'salt air from tidal channels'],
    defaultProblems: [
      'riverside humidity encouraging mould and damp indoors',
      'tidal silt and mud staining driveways and ground floors',
      'estuary salt air corroding gutters and fascias',
    ],
  },
  thames: {
    waterHardness: 'hard',
    housingStock: 'a mix of established housing and regeneration developments',
    environmentalFactors: ['Thames-side humidity', 'industrial area dust', 'heavy road traffic'],
    defaultProblems: [
      'Thames-side humidity accelerating mould and damp',
      'industrial and road dust settling on windows and roofs',
      'heavy traffic soot coating render and fascias',
    ],
  },
  forest: {
    waterHardness: 'hard',
    housingStock: 'established family homes with mature gardens',
    environmentalFactors: ['heavy leaf fall', 'tree pollen and sap', 'dense canopy shade'],
    defaultProblems: [
      'heavy leaf fall clogging gutters every autumn',
      'tree canopy shade driving moss on roofs and fences',
      'pollen and sap coating driveways and windows',
    ],
  },
  'new-build': {
    waterHardness: 'very hard',
    housingStock: 'modern estates with recently built homes',
    environmentalFactors: ['construction settling dust', 'developing landscaping', 'modern render and block paving'],
    defaultProblems: [
      'construction dust settling in new carpets and upholstery',
      'block paving weed growth within the first couple of years',
      'render staining quickly on modern estates',
    ],
  },
  historic: {
    waterHardness: 'very hard',
    housingStock: 'a mix of period properties and newer family homes',
    environmentalFactors: ['older building stock', 'town centre foot traffic', 'established tree cover'],
    defaultProblems: [
      'older properties trapping damp and encouraging mould',
      'town centre foot traffic wearing carpets and entrance areas',
      'mature street trees shedding leaves into gutters',
    ],
  },
  commuter: {
    waterHardness: 'very hard',
    housingStock: 'detached and semi-detached family homes with established gardens',
    environmentalFactors: ['mature garden cover', 'school-run traffic', 'established residential setting'],
    defaultProblems: [
      'heavy foot traffic wearing carpets and hallway flooring',
      'mature garden trees shedding leaves into gutters',
      'established driveways collecting moss, oil, and tyre marks',
    ],
  },
  rural: {
    waterHardness: 'very hard',
    housingStock: 'period cottages, farmhouses, and country homes',
    environmentalFactors: ['agricultural dust', 'country lane mud', 'exposed to weather'],
    defaultProblems: [
      'country lane mud tracked onto floors after rain',
      'agricultural dust settling on windows and roofs',
      'exposed location catching wind-driven moss and algae',
    ],
  },
  urban: {
    waterHardness: 'hard',
    housingStock: 'terraced houses, flats, and converted properties',
    environmentalFactors: ['traffic pollution', 'urban density', 'limited green buffer'],
    defaultProblems: [
      'traffic pollution grime building up on windows and render',
      'high-density housing trapping damp and mould',
      'road dust and dirt settling on all exterior surfaces',
    ],
  },
};

// ── Slug → archetype mapping ────────────────────────────────────────────────

const coastalSlugs = [
  'southend-on-sea', 'leigh-on-sea', 'westcliff-on-sea', 'shoeburyness', 'thorpe-bay',
  'clacton-on-sea', 'frinton-on-sea', 'walton-on-the-naze', 'harwich', 'dovercourt',
  'jaywick', 'holland-on-sea', 'west-mersea', 'brightlingsea', 'point-clear',
  'great-wakering', 'barling', 'foulness', 'st-osyth', 'great-clacton',
  'parkeston', 'ramsey',
];

const estuarySlugs = [
  'canvey-island', 'maldon', 'heybridge', 'burnham-on-crouch', 'wivenhoe',
  'rowhedge', 'hullbridge', 'manningtree', 'tollesbury', 'goldhanger',
  'salcott', 'south-woodham-ferrers', 'mistley', 'alresford', 'fingringhoe',
  'langenhoe', 'peldon', 'wrabness', 'thorrington',
];

const thamesSlugs = [
  'grays', 'tilbury', 'stanford-le-hope', 'corringham', 'chadwell-st-mary',
  'purfleet', 'west-thurrock', 'rainham', 'south-ockendon', 'aveley',
];

const forestSlugs = [
  'epping', 'loughton', 'chigwell', 'buckhurst-hill', 'theydon-bois',
  'chingford', 'hainault', 'woodford', 'waltham-abbey', 'abridge',
  'coopersale', 'thornwood',
];

const newBuildSlugs = [
  'basildon', 'harlow', 'stanway', 'chafford-hundred', 'springfield',
  'stratford', 'pitsea', 'laindon', 'lakeside',
];

const historicSlugs = [
  'chelmsford', 'colchester', 'saffron-walden', 'rochford', 'witham',
  'braintree', 'coggeshall', 'bocking', 'essex',
];

const urbanSlugs = [
  'romford', 'hornchurch', 'upminster', 'ilford', 'barking', 'dagenham',
  'walthamstow', 'leyton', 'leytonstone', 'east-ham', 'wanstead',
  'manor-park', 'forest-gate', 'woodgrange-park',
];

const commuterSlugs = [
  'brentwood', 'billericay', 'wickford', 'rayleigh', 'benfleet',
  'hockley', 'ingatestone', 'shenfield', 'hadleigh', 'thundersley',
  'marks-tey', 'hatfield-peverel', 'great-baddow', 'broomfield', 'prittlewell',
  'hawkwell', 'south-benfleet', 'eastwood', 'shotgate', 'great-burstead',
  'hutton', 'pilgrims-hatch', 'warley', 'galleywood', 'boreham',
  'langdon-hills',
];

// Everything else defaults to 'rural'

function buildArchetypeMap(): Record<string, AreaArchetype> {
  const map: Record<string, AreaArchetype> = {};
  const assign = (slugs: string[], archetype: AreaArchetype) => {
    for (const slug of slugs) map[slug] = archetype;
  };

  assign(coastalSlugs, 'coastal');
  assign(estuarySlugs, 'estuary');
  assign(thamesSlugs, 'thames');
  assign(forestSlugs, 'forest');
  assign(newBuildSlugs, 'new-build');
  assign(historicSlugs, 'historic');
  assign(urbanSlugs, 'urban');
  assign(commuterSlugs, 'commuter');
  // Anything not explicitly assigned gets 'rural' as default

  return map;
}

const archetypeMap = buildArchetypeMap();

// ── Public API ──────────────────────────────────────────────────────────────

/** Get the area archetype for a location slug */
export function getArchetype(slug: string): AreaArchetype {
  return archetypeMap[slug] ?? 'rural';
}

/** Get enriched profile for a location, merging explicit data with archetype defaults */
export function getLocationProfile(location: Location): LocationProfile {
  const archetype = getArchetype(location.slug);
  const defaults = archetypeDefaults[archetype];

  return {
    archetype,
    waterHardness: defaults.waterHardness,
    housingStock: defaults.housingStock,
    environmentalFactors: defaults.environmentalFactors,
    commonProblems: location.commonProblems && location.commonProblems.length > 0
      ? location.commonProblems
      : defaults.defaultProblems,
  };
}
