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
      'sea salt spray corroding gutters and downpipes',
      'coastal humidity accelerating damp and mould indoors',
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
      'waterfront humidity driving algae on roofs and patios',
      'mud tracked onto carpets and hallway flooring from riverside walks',
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
      'road grime and debris clogging gutters',
      'foot traffic wearing carpets and entrance areas',
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
      'muddy boots tracking leaf debris onto carpets and hallways',
      'dense tree cover encouraging damp and mould indoors',
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
      'construction debris clogging gutters on new estates',
      'new-build windows filming over quickly from settling dust',
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
      'moss and algae building up on period property roofs and patios',
      'town centre pollution leaving grime on windows and render',
    ],
  },
  commuter: {
    waterHardness: 'very hard',
    housingStock: 'detached and semi-detached family homes with established gardens',
    environmentalFactors: ['mature garden cover', 'school-run traffic', 'established residential setting'],
    defaultProblems: [
      'heavy foot traffic wearing carpets and hallway flooring',
      'mature garden trees shedding leaves into gutters',
      'established driveways collecting moss and tyre marks',
      'school-run traffic film building up on windows',
      'garden pollen and sap coating patio slabs and conservatory glass',
    ],
  },
  rural: {
    waterHardness: 'very hard',
    housingStock: 'period cottages, farmhouses, and country homes',
    environmentalFactors: ['agricultural dust', 'country lane mud', 'exposed to weather'],
    defaultProblems: [
      'country lane mud tracked onto carpets and floors after rain',
      'agricultural dust settling on windows and roofs',
      'exposed location catching wind-driven moss and algae',
      'fallen branches and debris blocking gutters after storms',
      'rural damp encouraging mould in older properties',
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
      'urban moss and debris blocking gutters',
      'foot traffic and city grime wearing carpets and hallway flooring',
    ],
  },
};

// ── Slug → archetype mapping ────────────────────────────────────────────────

const coastalSlugs = [
  'southend-on-sea', 'leigh-on-sea', 'westcliff-on-sea',
  'clacton-on-sea', 'frinton-on-sea', 'walton-on-the-naze', 'harwich',
  'west-mersea', 'brightlingsea',
];

const estuarySlugs = [
  'canvey-island', 'maldon', 'burnham-on-crouch', 'wivenhoe',
  'manningtree', 'south-woodham-ferrers',
];

const thamesSlugs = [
  'grays', 'tilbury', 'stanford-le-hope', 'rainham',
];

const forestSlugs = [
  'epping', 'loughton', 'chigwell', 'buckhurst-hill',
  'chingford', 'woodford', 'waltham-abbey',
];

const newBuildSlugs = [
  'basildon', 'harlow', 'stratford',
];

const historicSlugs = [
  'chelmsford', 'colchester', 'saffron-walden', 'rochford', 'witham',
  'braintree', 'coggeshall', 'essex',
];

const urbanSlugs = [
  'romford', 'hornchurch', 'upminster', 'ilford', 'barking', 'dagenham',
  'walthamstow', 'leyton', 'east-ham', 'wanstead',
];

const commuterSlugs = [
  'brentwood', 'billericay', 'wickford', 'rayleigh', 'benfleet',
  'hockley', 'ingatestone',
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
export function getLocationProfile(location: Location, serviceSlug?: string): LocationProfile {
  const archetype = getArchetype(location.slug);
  const defaults = archetypeDefaults[archetype];

  const explicitProblems = location.commonProblems && location.commonProblems.length > 0
    ? location.commonProblems
    : defaults.defaultProblems;

  let problems = explicitProblems;
  if (serviceSlug) {
    // Try filtering explicit location problems for this service
    const filtered = matchProblemsForService(explicitProblems, serviceSlug);
    if (filtered.length > 0) {
      problems = filtered;
    } else {
      // No explicit matches — try archetype defaults for this service instead
      const archetypeFiltered = matchProblemsForService(defaults.defaultProblems, serviceSlug);
      problems = archetypeFiltered.length > 0 ? archetypeFiltered : explicitProblems;
    }
  }

  return {
    archetype,
    waterHardness: defaults.waterHardness,
    housingStock: defaults.housingStock,
    environmentalFactors: defaults.environmentalFactors,
    commonProblems: problems,
  };
}

// Service-to-keyword mapping for filtering location problems by relevance
// Multi-word phrases use substring matching; single words use word-boundary matching
const serviceKeywordMap: Record<string, string[]> = {
  'carpet-cleaning': ['carpet', 'floor', 'hallway', 'tracked onto', 'foot traffic', 'indoor', 'tenancy', 'pet odour', 'mud tracked', 'dust settling in', 'boots'],
  'upholstery-cleaning': ['carpet', 'indoor', 'upholstery', 'sofa', 'furniture', 'pet odour', 'dust settling in', 'tenancy', 'soft furnishing', 'odour'],
  'stain-removal': ['carpet', 'stain', 'floor', 'tracked onto', 'mud tracked', 'pet odour', 'pet stain', 'indoor', 'tenancy'],
  'mattress-cleaning': ['indoor', 'damp', 'mould', 'humidity', 'allergen', 'dust mite'],
  'roof-cleaning': ['roof', 'moss', 'algae', 'lichen', 'tile', 'canopy shade', 'exposed'],
  'gutter-cleaning': ['gutter', 'leaf', 'leaves', 'downpipe', 'clogging', 'blocking', 'shedding', 'debris', 'fascia', 'overflow', 'corroding'],
  'window-cleaning': ['window', 'glass', 'salt film', 'salt spray', 'dust settling on', 'grime', 'pollution', 'soot', 'pollen coating', 'film on'],
  'pressure-washing': ['driveway', 'patio', 'path', 'block paving', 'tarmac', 'weed', 'oil stain', 'tyre', 'exterior surface', 'forecourt'],
  'patio-cleaning': ['patio', 'slab', 'stone', 'algae', 'moss', 'black spot', 'outdoor', 'rain pooling'],
  'driveway-cleaning': ['driveway', 'block paving', 'weed', 'oil stain', 'tyre', 'moss', 'tarmac'],
  'conservatory-cleaning': ['conservatory', 'glass', 'algae', 'pollen', 'bird', 'humidity', 'damp', 'moss'],
  'solar-panel-cleaning': ['solar', 'panel', 'pollen', 'bird', 'salt film', 'salt spray', 'sap', 'coating'],
  'render-cleaning': ['render', 'wall', 'fascia', 'soot', 'pollution', 'render staining'],
};

function matchProblemsForService(problems: string[], serviceSlug: string): string[] {
  const keywords = serviceKeywordMap[serviceSlug];
  if (!keywords) return problems;

  return problems.filter(problem => {
    const lower = problem.toLowerCase();
    return keywords.some(kw => {
      if (kw.includes(' ')) return lower.includes(kw);
      return new RegExp(`\\b${kw}\\b`).test(lower);
    });
  });
}
