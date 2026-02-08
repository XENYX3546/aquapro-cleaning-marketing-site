// SEO Keyword Variation Map for Service x Location Pages
//
// Strategy:
// - Primary keyword: Used ONLY in H1, meta title, and hero description
// - Variations: Used throughout the rest of the page body to avoid keyword stuffing,
//   read naturally, and capture long-tail search queries
//
// variations[0] → "What's Included" section heading
// variations[1] → "Why Choose" section heading
// variations[2] → FAQ section heading + location FAQ Q&A
// variations[3] → CTA section heading
// variations[4+] → Additional body copy, schema alt text, etc.

export type ServiceKeywords = {
  primary: string;
  variations: string[];
  semanticNeighbors: string[];
  specs: Record<string, string>;
};

export const serviceKeywordMap: Record<string, ServiceKeywords> = {
  'carpet-cleaning': {
    primary: 'Carpet Cleaning',
    variations: [
      'Deep Carpet Clean',
      'Professional Carpet Cleaning',
      'Carpet Stain Removal',
      'Professional Carpet Clean',
      'Hot Water Extraction Clean',
      'Domestic Carpet Cleaning',
    ],
    semanticNeighbors: ['steam cleaning', 'fibre protection', 'allergen removal', 'pet odour treatment', 'carpet sanitisation', 'stain guard'],
    specs: {
      'Method': 'Hot water extraction (steam cleaning)',
      'Drying Time': '2–4 hours',
      'Carpet Types': 'Wool, synthetic, berber, loop pile, cut pile',
      'Includes': 'Pre-treatment, stain spotting, deodorising',
      'Equipment': 'Commercial-grade truck-mounted machines',
      'Safe For': 'Children, pets, allergy sufferers',
    },
  },
  'upholstery-cleaning': {
    primary: 'Upholstery Cleaning',
    variations: [
      'Sofa Cleaning',
      'Sofa & Upholstery Clean',
      'Couch Cleaning',
      'Fabric & Leather Furniture Cleaning',
      'Professional Furniture Clean',
      'Settee & Armchair Cleaning',
    ],
    semanticNeighbors: ['fabric protection', 'leather conditioning', 'cushion cleaning', 'pet hair removal', 'odour neutralisation', 'fire retardant treatment'],
    specs: {
      'Method': 'Low-moisture extraction & dry cleaning',
      'Drying Time': '1–3 hours',
      'Fabric Types': 'Cotton, linen, polyester, velvet, microfibre, leather',
      'Includes': 'Pre-inspection, stain treatment, fabric protection',
      'Equipment': 'Handheld extraction tools with upholstery attachments',
      'Safe For': 'All fabric types including delicate materials',
    },
  },
  'pressure-washing': {
    primary: 'Pressure Washing',
    variations: [
      'Jet Washing',
      'Power Washing',
      'High-Pressure Cleaning',
      'Exterior Pressure Clean',
      'Commercial Jet Wash',
      'Surface Pressure Cleaning',
    ],
    semanticNeighbors: ['algae treatment', 'weed removal', 'sealant application', 'concrete cleaning', 'brick cleaning', 'surface restoration'],
    specs: {
      'Method': 'High-pressure rotary surface cleaner',
      'Pressure': 'Up to 3,000 PSI (adjusted per surface)',
      'Surfaces': 'Block paving, concrete, tarmac, brick, Indian stone',
      'Includes': 'Algae & moss treatment, weed removal, final rinse',
      'Water Supply': 'Self-contained — we bring our own water',
      'Add-Ons': 'Sealant application, re-sanding joints',
    },
  },
  'roof-cleaning': {
    primary: 'Roof Cleaning',
    variations: [
      'Moss Removal',
      'Roof Moss Removal',
      'Roof Tile Cleaning',
      'Roof Moss Treatment',
      'Soft Wash Roof Clean',
      'Roof Algae Removal',
    ],
    semanticNeighbors: ['biocide treatment', 'lichen removal', 'ridge tile repointing', 'fungal treatment', 'tile sealing', 'roof preservation'],
    specs: {
      'Method': 'Low-pressure soft wash with biocide treatment',
      'Guarantee': '5 years moss-free (re-applied at year 3)',
      'Tile Types': 'Clay, concrete, slate, flat felt, ridge tiles',
      'Includes': 'Moss scrape, biocide spray, gutter clear, window clean',
      'Safety': 'Full harness system, £5M public liability',
      'Turnaround': '1 day for most roofs',
    },
  },
  'window-cleaning': {
    primary: 'Window Cleaning',
    variations: [
      'Window Washing',
      'Glass Cleaning',
      'Pure Water Window Clean',
      'Streak-Free Window Clean',
      'Window & Frame Cleaning',
      'Residential Window Clean',
    ],
    semanticNeighbors: ['sill cleaning', 'frame cleaning', 'hard water stain removal', 'conservatory glass', 'Velux window cleaning', 'deionised water system'],
    specs: {
      'Method': 'Pure water fed pole system',
      'Reach': 'Up to 4 storeys without ladders',
      'Water': 'Deionised pure water — no chemicals, streak-free',
      'Includes': 'Glass, frames, sills, Velux windows',
      'Frequency': 'One-off or regular (4, 8, or 12 weekly)',
      'Access': 'No ladders or scaffolding needed',
    },
  },
  'gutter-cleaning': {
    primary: 'Gutter Cleaning',
    variations: [
      'Gutter Clearing',
      'Gutter & Downpipe Cleaning',
      'Gutter Clearance',
      'Gutter Maintenance',
      'Blocked Gutter Clearing',
      'High-Reach Gutter Clean',
    ],
    semanticNeighbors: ['downpipe clearing', 'fascia cleaning', 'soffit cleaning', 'leaf guard', 'rainwater drainage', 'gutter repair'],
    specs: {
      'Method': 'High-reach vacuum system (SkyVac)',
      'Reach': 'Up to 12 metres — no ladders required',
      'Includes': 'Gutters, downpipes, hoppers, outlets',
      'Camera Check': 'Before & after CCTV footage provided',
      'Add-Ons': 'Fascia, soffit & cladding cleaning',
      'Frequency': 'Recommended annually',
    },
  },
  'stain-removal': {
    primary: 'Stain Removal',
    variations: [
      'Stain Treatment',
      'Spot & Stain Cleaning',
      'Carpet Stain Treatment',
      'Professional Stain Treatment',
      'Emergency Stain Removal',
      'Pet Stain Treatment',
    ],
    semanticNeighbors: ['enzyme treatment', 'oxidation cleaning', 'colour restoration', 'fibre testing', 'pH-neutral solution', 'pre-treatment spray'],
    specs: {
      'Method': 'Targeted enzyme & oxidation treatment',
      'Stain Types': 'Red wine, coffee, blood, pet urine, ink, grease',
      'Surfaces': 'Carpet, upholstery, mattress, curtains',
      'Response': 'Same-day emergency bookings available',
      'Testing': 'Fibre & colourfastness test before treatment',
      'Guarantee': 'No charge if stain cannot be removed',
    },
  },
  'driveway-cleaning': {
    primary: 'Driveway Cleaning',
    variations: [
      'Driveway Pressure Washing',
      'Block Paving Cleaning',
      'Driveway Restoration',
      'Driveway Jet Washing',
      'Driveway Moss Removal',
      'Paving & Driveway Clean',
    ],
    semanticNeighbors: ['re-sanding joints', 'sealant application', 'weed treatment', 'oil stain removal', 'tarmac cleaning', 'resin bound cleaning'],
    specs: {
      'Method': 'Rotary surface cleaner + targeted jet wash',
      'Surfaces': 'Block paving, tarmac, resin bound, concrete, gravel',
      'Includes': 'Weed removal, moss treatment, oil stain pre-treatment',
      'Add-Ons': 'Kiln-dried re-sanding, sealant application',
      'Turnaround': 'Most driveways completed in half a day',
      'Result': 'Restores original colour and finish',
    },
  },
  'patio-cleaning': {
    primary: 'Patio Cleaning',
    variations: [
      'Patio Pressure Washing',
      'Patio Restoration',
      'Stone & Slab Cleaning',
      'Patio Jet Washing',
      'Patio Algae Removal',
      'Natural Stone Patio Clean',
    ],
    semanticNeighbors: ['re-grouting', 'pointing repair', 'Indian sandstone care', 'porcelain tile cleaning', 'weed killer treatment', 'slab sealing'],
    specs: {
      'Method': 'Low-pressure clean with surface-specific nozzles',
      'Stone Types': 'Indian sandstone, limestone, porcelain, slate, York stone',
      'Includes': 'Algae removal, weed treatment, final rinse',
      'Add-Ons': 'Re-pointing, sealant application, colour enhancer',
      'Turnaround': 'Most patios completed in a single visit',
      'Pressure': 'Adjusted per stone type to prevent damage',
    },
  },
  'solar-panel-cleaning': {
    primary: 'Solar Panel Cleaning',
    variations: [
      'Solar Panel Washing',
      'PV Panel Cleaning',
      'Solar Panel Maintenance',
      'Photovoltaic Panel Clean',
      'Solar Array Cleaning',
      'Solar Panel Care',
    ],
    semanticNeighbors: ['bird proofing', 'energy efficiency restoration', 'panel inspection', 'pigeon guard installation', 'inverter check', 'output monitoring'],
    specs: {
      'Method': 'Deionised pure water & soft brush system',
      'Panel Types': 'Monocrystalline, polycrystalline, thin-film',
      'Efficiency Gain': 'Up to 30% output restored after cleaning',
      'Includes': 'Panel wash, frame wipe, visual inspection',
      'Add-Ons': 'Bird proofing, pigeon guard installation',
      'Frequency': 'Recommended every 6–12 months',
    },
  },
  'conservatory-cleaning': {
    primary: 'Conservatory Cleaning',
    variations: [
      'Conservatory Roof Cleaning',
      'Conservatory Wash',
      'Conservatory Restoration',
      'Conservatory Roof & Glass Clean',
      'UPVC Conservatory Clean',
      'Polycarbonate Roof Cleaning',
    ],
    semanticNeighbors: ['frame restoration', 'seal replacement', 'algae treatment', 'self-cleaning glass', 'UPVC brightening', 'rubber seal conditioning'],
    specs: {
      'Method': 'Pure water wash & non-abrasive hand clean',
      'Roof Types': 'Glass, polycarbonate, UPVC panels',
      'Includes': 'Roof, glass panels, frames, guttering, seals',
      'Add-Ons': 'UPVC restoration, seal conditioning',
      'Result': 'Restores natural light transmission',
      'Access': 'Specialist tools — no walking on the roof',
    },
  },
  'mattress-cleaning': {
    primary: 'Mattress Cleaning',
    variations: [
      'Mattress Sanitisation',
      'Mattress Deep Clean',
      'Dust Mite Removal',
      'Mattress Stain Removal',
      'Mattress Hygiene Treatment',
      'Professional Mattress Clean',
    ],
    semanticNeighbors: ['UV sanitisation', 'allergy treatment', 'bed bug treatment', 'enzyme cleaner', 'hypoallergenic treatment', 'anti-bacterial spray'],
    specs: {
      'Method': 'Hot water extraction with UV sanitisation',
      'Removes': 'Dust mites, allergens, bacteria, odours, stains',
      'Mattress Types': 'Single, double, king, super king, memory foam',
      'Includes': 'Vacuuming, stain treatment, sanitisation, deodorising',
      'Drying Time': '2–3 hours',
      'Safe For': 'Babies, allergy sufferers, sensitive skin',
    },
  },
};

export const getServiceKeywords = (serviceSlug: string): ServiceKeywords => {
  return serviceKeywordMap[serviceSlug] ?? { primary: '', variations: [], semanticNeighbors: [], specs: {} };
};

// Complementary services map — used for contextual internal links (D9 NavBoost)
// Each service maps to 2 services customers genuinely book together
export const relatedServiceMap: Record<string, { slug: string; label: string }[]> = {
  'carpet-cleaning': [
    { slug: 'upholstery-cleaning', label: 'upholstery cleaning' },
    { slug: 'stain-removal', label: 'stain removal' },
  ],
  'upholstery-cleaning': [
    { slug: 'carpet-cleaning', label: 'carpet cleaning' },
    { slug: 'mattress-cleaning', label: 'mattress cleaning' },
  ],
  'pressure-washing': [
    { slug: 'driveway-cleaning', label: 'driveway cleaning' },
    { slug: 'patio-cleaning', label: 'patio cleaning' },
  ],
  'roof-cleaning': [
    { slug: 'gutter-cleaning', label: 'gutter cleaning' },
    { slug: 'window-cleaning', label: 'window cleaning' },
  ],
  'window-cleaning': [
    { slug: 'conservatory-cleaning', label: 'conservatory cleaning' },
    { slug: 'gutter-cleaning', label: 'gutter cleaning' },
  ],
  'gutter-cleaning': [
    { slug: 'roof-cleaning', label: 'roof cleaning' },
    { slug: 'window-cleaning', label: 'window cleaning' },
  ],
  'stain-removal': [
    { slug: 'carpet-cleaning', label: 'carpet cleaning' },
    { slug: 'upholstery-cleaning', label: 'upholstery cleaning' },
  ],
  'driveway-cleaning': [
    { slug: 'patio-cleaning', label: 'patio cleaning' },
    { slug: 'pressure-washing', label: 'pressure washing' },
  ],
  'patio-cleaning': [
    { slug: 'driveway-cleaning', label: 'driveway cleaning' },
    { slug: 'conservatory-cleaning', label: 'conservatory cleaning' },
  ],
  'solar-panel-cleaning': [
    { slug: 'roof-cleaning', label: 'roof cleaning' },
    { slug: 'gutter-cleaning', label: 'gutter cleaning' },
  ],
  'conservatory-cleaning': [
    { slug: 'window-cleaning', label: 'window cleaning' },
    { slug: 'patio-cleaning', label: 'patio cleaning' },
  ],
  'mattress-cleaning': [
    { slug: 'carpet-cleaning', label: 'carpet cleaning' },
    { slug: 'upholstery-cleaning', label: 'upholstery cleaning' },
  ],
};

// Outbound authority links — one trusted source per service (#14 Embedding Support)
// Trade bodies and gov.uk only. No health/YMYL sources.
export const authorityLinkMap: Record<string, { url: string; label: string; context: string }> = {
  'carpet-cleaning': {
    url: 'https://ncca.co.uk/national-carpet-cleaners-association/',
    label: 'NCCA',
    context: 'National Carpet Cleaners Association accredited',
  },
  'upholstery-cleaning': {
    url: 'https://ncca.co.uk/faqs/',
    label: 'NCCA',
    context: 'National Carpet Cleaners Association accredited',
  },
  'pressure-washing': {
    url: 'https://www.gov.uk/guidance/pollution-prevention-for-businesses',
    label: 'GOV.UK',
    context: 'Following GOV.UK pollution prevention guidance',
  },
  'roof-cleaning': {
    url: 'https://www.hse.gov.uk/pubns/books/hsg33.htm',
    label: 'HSE',
    context: 'Compliant with HSE roof work safety guidance (HSG33)',
  },
  'window-cleaning': {
    url: 'https://www.hse.gov.uk/cleaning/topics/window-cleaning.htm',
    label: 'HSE',
    context: 'Following HSE window cleaning safety standards',
  },
  'gutter-cleaning': {
    url: 'https://www.hse.gov.uk/cleaning/falls.htm',
    label: 'HSE',
    context: 'Following HSE work at height safety guidance',
  },
  'stain-removal': {
    url: 'https://ncca.co.uk/news/what-is-the-ncca-accreditation-code-of-practice-and-how-does-it-benefit-you/',
    label: 'NCCA',
    context: 'Meeting NCCA Code of Practice standards',
  },
  'driveway-cleaning': {
    url: 'https://www.gov.uk/government/publications/permeable-surfacing-of-front-gardens-guidance/guidance-on-the-permeable-surfacing-of-front-gardens',
    label: 'GOV.UK',
    context: 'Following GOV.UK permeable surface maintenance guidance',
  },
  'patio-cleaning': {
    url: 'https://www.gov.uk/government/publications/permeable-surfacing-of-front-gardens-guidance/guidance-on-the-permeable-surfacing-of-front-gardens',
    label: 'GOV.UK',
    context: 'Following GOV.UK surface maintenance guidance',
  },
  'solar-panel-cleaning': {
    url: 'https://energysavingtrust.org.uk/solar-panel-cleaning-maintenance/',
    label: 'Energy Saving Trust',
    context: 'Recommended by the Energy Saving Trust',
  },
  'conservatory-cleaning': {
    url: 'https://www.ggf.org.uk/myglazing/news/planning-a-conservatory-things-to-consider/',
    label: 'GGF',
    context: 'Glass and Glazing Federation recommended practices',
  },
  'mattress-cleaning': {
    url: 'https://ncca.co.uk/national-carpet-cleaners-association/',
    label: 'NCCA',
    context: 'National Carpet Cleaners Association accredited',
  },
};
