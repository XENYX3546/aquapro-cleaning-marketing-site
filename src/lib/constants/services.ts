// Services Configuration - Aquapro Cleaning service offerings
// Following Single Responsibility Principle - this file only handles service data

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  selfBookable: boolean;
  description: string;
  longDescription: string;
  icon: string;
  image?: string;
  benefits: string[];
  features: string[];
  idealFor: string[];
  process: ProcessStep[];
  faqs: FAQ[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  // BLUF pricing for hero section (e.g. "from £40/room")
  startingFrom?: string;
  // Optional custom hero content
  hero?: {
    headline: string;
    subheadline?: string;
    description: string;
    checkpoints: string[];
    formTitle: string;
    trustBadges?: string[];
  };
  // Set to false to hide a service from the site without deleting it
  enabled?: boolean;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

const _allServices: Service[] = [
  {
    id: 'carpet-cleaning',
    slug: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    shortName: 'Carpets',
    tagline: 'Professional Deep Clean with Stain Protection Included',
    selfBookable: true,
    enabled: false,
    description: 'Professional carpet cleaning service for domestic and commercial properties. Hot water extraction removes stubborn stains, pet odours, and allergens. Family-run, fully insured, with 100% satisfaction guarantee.',
    longDescription: '<strong>Professional carpet cleaning</strong> that restores your carpets to like new condition. Our <strong>truck-mounted hot water extraction</strong> delivers the most thorough deep clean, far more powerful than portable cleaners. We remove <strong>stubborn stains, pet odours, and allergens</strong> with residue-free, eco-friendly solutions. <strong>Free stain protection treatment</strong> and deodoriser included. Family-run business with transparent pricing and no hidden fees.',
    icon: 'sparkles',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Carpets Stained or Faded?',
      subheadline: "We'll Bring Them Back to Life",
      description: 'Deep extraction cleaning that removes what vacuuming leaves behind. Stains, odours, allergens? Gone. Dry in hours, not days.',
      checkpoints: [
        'Stains, dirt & odours removed, or we re-clean free',
        'Dry in hours. Use your rooms the same day',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Carpet Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Removes What Vacuuming Can\'t',
      'Deep extraction pulls out ground-in dirt, stains, and allergens that regular cleaning misses.',
      'Dry in Hours, Not Days',
      'Walk on your carpets the same day. Our system extracts 95% of moisture on the spot.',
      'Safe for Kids, Pets & Allergy Sufferers',
      'Non-toxic solutions that eliminate dust mites, bacteria, and odours at the source.',
    ],
    features: [
      'Deep hot water extraction clean',
      'Free deodoriser treatment included',
      'Pre-treatment of all stains & high-traffic areas',
      'Residue-free eco-friendly solutions',
      'Stairs, landings & hallway specialist',
      '99.9% sanitisation & allergen removal',
    ],
    idealFor: [
      'Domestic & residential carpet cleaning',
      'Commercial offices & carpet tiles',
      'End of tenancy deep cleaning',
      'Pet owners with stains & odours',
      'Allergy sufferers & families with children',
      'Landlords & property managers',
    ],
    process: [
      { step: 1, title: 'Free, No-Obligation Quote', description: 'Tell us what needs cleaning and we\'ll give you a personalised, fixed-price quote, no pressure. Just expert advice and fair, transparent pricing with no hidden costs.' },
      { step: 2, title: 'Specialist Carpet Clean + Free Deodoriser', description: 'Our specialist cleaner gets to work using advanced, commercial-grade equipment. We remove deep stubborn dirt, stains, and odours, leaving your carpets fresh and revitalised.' },
      { step: 3, title: 'Fresh Carpets + 100% Satisfaction Guarantee', description: 'Most carpets dry in just a couple of hours. You\'ll be left with soft, fresh, like-new carpets backed by our 100% satisfaction guarantee. If you\'re not happy, we\'ll re-clean for free.' },
    ],
    faqs: [
      { question: 'How much does carpet cleaning cost?', answer: 'Most rooms cost between £40 and £70 depending on size and condition. A typical 3-bedroom house runs £150–£250 for a full deep clean including pre-treatment, stain targeting, deodoriser, and stain protection. We quote a fixed price upfront with no hidden fees.' },
      { question: 'Is professional carpet cleaning worth it?', answer: 'Yes — professional hot water extraction removes ground-in soil, dust mites, and allergens that domestic machines and rental units simply can\'t reach. It extends carpet lifespan, restores pile texture, and eliminates odours at the source. Most carpet manufacturers recommend professional cleaning every 12–18 months to maintain warranty.' },
      { question: 'What\'s the difference between steam cleaning and dry cleaning carpets?', answer: 'Steam cleaning (hot water extraction) injects heated water and cleaning solution deep into carpet fibres, then extracts it along with dirt and allergens. Dry cleaning uses chemical solvents with minimal moisture. Hot water extraction delivers a far deeper clean and is the method recommended by most carpet manufacturers.' },
      { question: 'How often should I get my carpets professionally cleaned?', answer: 'Every 12–18 months for a typical household. If you have pets, young children, or allergy sufferers, every 6–9 months keeps dust mite populations down and fibres in good condition. High-traffic areas like hallways and stairs may need attention more often.' },
      { question: 'Should I vacuum before the carpet cleaner arrives?', answer: 'A quick vacuum helps — it removes loose surface debris so our hot water extraction can focus on the deep-down soil, embedded dirt, and allergens. Don\'t worry if you can\'t though, we\'ll handle everything on the day.' },
      { question: 'How long does carpet cleaning take?', answer: 'Most homes are done in 2–3 hours, depending on the number and size of rooms. You\'ll get an exact time estimate before we begin, so you can plan your day.' },
      { question: 'How long do carpets take to dry?', answer: 'You can walk on your carpets in as little as 30–90 minutes. Wool and thicker piles may take a bit longer. Thanks to our truck-mounted extraction and low-moisture systems, we\'re faster than most.' },
      { question: 'Will carpet cleaning remove stains, pet urine, and odours?', answer: 'Yes — we remove most common stains including food, drink, mud, and pet accidents. For pet urine we use targeted enzyme treatments that break down uric acid at the source, eliminating both the stain and the smell. We also include free deodorising and 99.9% sanitisation with every clean.' },
      { question: 'What if the stains don\'t come out?', answer: 'Some stains can be permanent, especially older ones, but we\'ll tell you upfront what to expect. If you\'re not happy with the results, we\'ll re-clean the area for free. No questions asked.' },
      { question: 'Do I need to move furniture before you arrive?', answer: 'No need. We\'ll work around large furniture and move smaller pieces ourselves. If you\'d like us to clean under heavier items, just mention it when booking and we\'ll sort it.' },
      { question: 'Do I need to be home during the clean?', answer: 'Not necessarily. As long as we have access, we can get the job done while you\'re out. Many customers leave a key or use a lockbox. We\'ll send before and after photos so you can see the results.' },
      { question: 'What\'s included in the price?', answer: 'Everything. A full deep clean with hot water extraction, free pre-treatment and stain targeting, free deodoriser, 99.9% sanitisation, and our 100% satisfaction guarantee. One fixed price, no hidden costs, no upsells.' },
      { question: 'Is it safe for children, pets, and allergy sufferers?', answer: 'Yes. We use child and pet-safe solutions that are biodegradable and non-toxic. Our extraction process removes dust mites, bacteria, and airborne allergens trapped in carpet fibres. Great for asthmatics and eczema sufferers.' },
      { question: 'Will my carpets shrink or get damaged?', answer: 'No. We use modern, fibre-safe methods matched to your carpet type — wool, synthetic, berber, loop pile, or cut pile. We never over-wet or apply heat that could cause shrinkage.' },
      { question: 'How much is carpet cleaning per room?', answer: 'Most single rooms cost between £40 and £70, depending on size and carpet condition. Stairs typically cost £30–£50, and a full 3-bedroom house usually comes in at £150–£250 including pre-treatment, deodoriser, and stain protection. We quote a fixed price per room with no hidden extras.' },
      { question: 'Is it better to hire a carpet cleaner or buy one?', answer: 'Hiring a professional carpet cleaning service delivers far better results than a purchased or rented machine. Domestic carpet cleaners operate at lower temperatures and weaker suction, leaving behind moisture and soil that can cause mould and re-soiling. Our truck-mounted machines clean at over 150°C and extract 95% of moisture, giving you a deeper clean that dries in hours and lasts months longer.' },
    ],
    seo: {
      title: 'Professional Carpet Cleaning | Deep Clean & Stain Removal | Aquapro',
      description: 'Professional carpet cleaning service. Hot water extraction, stubborn stain removal, pet odour elimination. Free stain protection included. Family-run, 100% satisfaction guarantee. Free quotes.',
      keywords: ['professional carpet cleaners', 'carpet stain removal', 'pet stain removal', 'carpet cleaning near me', 'deep carpet cleaning', 'commercial carpet cleaning', 'domestic carpet cleaning', 'hot water extraction', 'carpet cleaning service'],
    },
    startingFrom: 'from £40/room',
  },
  {
    id: 'upholstery-cleaning',
    slug: 'upholstery-cleaning',
    name: 'Sofa & Upholstery Cleaning',
    shortName: 'Sofas & Upholstery',
    tagline: 'Professional Sofa, Couch & Furniture Cleaning',
    selfBookable: true,
    enabled: false,
    description: 'Professional sofa cleaning, couch cleaning, and upholstery cleaning for all fabric furniture. We clean sofas, settees, armchairs, recliners, and leather furniture.',
    longDescription: '<strong>Expert sofa and couch cleaning</strong> that removes embedded dirt, stains, and odours your vacuum can\'t reach. Whether you need a <strong>3-seater sofa cleaned</strong>, <strong>leather sofa restoration</strong>, or <strong>fabric armchair refresh</strong>, we handle all types. Safe for velvet, linen, cotton, microfibre, and leather.',
    icon: 'sofa',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Sofa Looking Tired and Stained?',
      subheadline: "We'll Make It Look New Again",
      description: 'Our upholstery cleaners remove deep-set dirt, stubborn stains, and pet odours that DIY methods can\'t touch. Safe for all fabrics including leather, velvet, linen, and more.',
      checkpoints: [
        'Stains and odours removed, or we re-clean free',
        'Safe for all fabrics including leather and velvet',
        'Dry in hours. Use your sofa the same day',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Sofa Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Deep cleans sofas, couches & settees',
      'Removes stains from fabric furniture',
      'Eliminates pet odours from sofas',
      'Safe for leather & fabric upholstery',
      'Extends sofa and furniture lifespan',
      'Restores armchairs and recliners',
    ],
    features: [
      'Sofa & couch deep cleaning',
      'Leather sofa cleaning & conditioning',
      'Fabric armchair restoration',
      'Settee and loveseat cleaning',
      'Recliner and ottoman cleaning',
      'Cushion and throw pillow cleaning',
    ],
    idealFor: [
      '2-seater & 3-seater sofas',
      'Corner sofas & sectionals',
      'Leather & fabric armchairs',
      'Recliners & footstools',
      'Dining chairs & office chairs',
      'Mattresses & headboards',
    ],
    process: [
      { step: 1, title: 'Free Sofa Cleaning Quote', description: 'We assess your sofa, couch, or armchair and provide a fixed-price quote. No obligation, no pressure.' },
      { step: 2, title: 'Deep Clean & Odour Removal', description: 'Our upholstery cleaners remove embedded dirt, stains, and pet odours using fabric-safe methods. Safe for leather, velvet, linen, and all fabric types.' },
      { step: 3, title: 'Fresh Furniture, Guaranteed', description: 'Your sofa is left clean, fresh, and dry within hours. Not happy? We re-clean for free.' },
    ],
    faqs: [
      { question: 'How much does sofa cleaning cost?', answer: 'A 2-seater sofa typically costs £50–£80, a 3-seater £70–£100, and large corner sofas £100–£150. Price depends on fabric type and condition. We quote a fixed price upfront — no hidden extras.' },
      { question: 'Can I clean my sofa myself or do I need a professional?', answer: 'Light surface marks can be spot-cleaned at home, but ground-in dirt, pet odours, and embedded allergens need professional extraction equipment to remove properly. DIY overwetting is the most common cause of watermarks and fabric damage — professional low-moisture cleaning avoids that risk entirely.' },
      { question: 'What upholstery cleaning method do you use?', answer: 'We use low-moisture extraction for most fabrics — it cleans deep without saturating the cushion core. For delicate materials like silk or vintage velvet we use dry cleaning solvents. Leather gets a specialist pH-balanced clean and conditioning treatment. We assess every piece before starting.' },
      { question: 'What furniture can you clean?', answer: 'All of it — fabric sofas, leather couches, velvet settees, linen armchairs, microfibre recliners, cotton dining chairs, ottomans, footstools, and upholstered headboards. We match our method to the material, whether it\'s synthetic, natural fibre, or leather.' },
      { question: 'How long does sofa cleaning take to dry?', answer: 'Most sofas and couches dry within 2–4 hours. We use low-moisture upholstery cleaning techniques to speed up drying time so you can use your furniture the same day.' },
      { question: 'Can you remove pet stains and odours from my sofa?', answer: 'Yes, it\'s one of our specialities. Our upholstery cleaners use enzyme treatments that break down pet urine and odours at the molecular level, not just mask them.' },
      { question: 'Is upholstery cleaning safe for my furniture?', answer: 'Absolutely. We test all products in a hidden area first and use the appropriate method for each fabric type. Non-toxic, eco-friendly solutions safe for your family and pets. No damage, guaranteed.' },
      { question: 'Will upholstery cleaning remove all stains?', answer: 'We remove most stains including food, drink, pet accidents, and general soiling. Some permanent marks like ink or bleach damage can\'t be fully reversed, and we\'ll always be upfront about what\'s achievable.' },
      { question: 'Do I need to be home during sofa cleaning?', answer: 'Not necessarily. As long as we have access to your property, our upholstery cleaners can complete the work while you\'re out.' },
      { question: 'How often should I have my sofa professionally cleaned?', answer: 'Every 12–18 months for a typical household. Families with pets or young children benefit from cleaning every 6–9 months to keep allergens, dust mites, and odour buildup under control.' },
    ],
    seo: {
      title: 'Sofa Cleaning & Upholstery Cleaning | Upholstery Cleaners | Aquapro',
      description: 'Professional sofa cleaning and upholstery cleaning service. Couch cleaning, settee cleaning, leather sofa cleaning, armchair cleaning. Local upholstery cleaners. Free quotes.',
      keywords: ['upholstery cleaners', 'couch cleaning', 'settee cleaning', 'leather sofa cleaning', 'armchair cleaning', 'furniture cleaning near me', 'sofa cleaners', 'upholstery cleaner near me'],
    },
    startingFrom: 'from £50/sofa',
  },
  {
    id: 'pressure-washing',
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    shortName: 'Pressure Washing',
    tagline: 'Powerful Results, No Surface Damage',
    selfBookable: false,
    description: 'Powerful pressure washing for driveways, patios, decking, and external surfaces. Remove years of grime in hours.',
    longDescription: '<strong>Removes moss, algae, oil stains, and years of grime</strong> from driveways, patios, and decking. <strong>Adjustable pressure won\'t damage surfaces</strong>. See the transformation in a single visit.',
    icon: 'droplets',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Driveway or Patio Looking Tired?',
      subheadline: 'Watch Years of Grime Disappear',
      description: 'Our pressure washing specialists remove moss, algae, oil stains, and years of built-up grime. See your surfaces transformed in just one visit.',
      checkpoints: [
        'Moss, algae, and oil stains removed',
        'No damage to your surfaces, guaranteed',
        'Re-sanding included for block paving',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Pressure Washing Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Removes moss, algae, and lichen',
      'Eliminates oil and grease stains',
      'Restores original surface appearance',
      'Improves property kerb appeal',
      'Prevents slip hazards',
      'Extends surface lifespan',
    ],
    features: [
      'Commercial-grade equipment',
      'Adjustable pressure settings',
      'Surface-appropriate techniques',
      'Eco-friendly detergents',
      'Re-sanding for block paving',
      'Sealing service available',
    ],
    idealFor: [
      'Block paving driveways',
      'Concrete driveways and paths',
      'Patios and courtyards',
      'Wooden decking',
      'Garden walls and fencing',
      'Commercial forecourts',
    ],
    process: [
      { step: 1, title: 'Free Pressure Washing Quote', description: 'We inspect your surfaces and provide a fixed-price quote. No hidden fees, no surprises.' },
      { step: 2, title: 'Professional Jet Wash', description: 'Our pressure washing specialists remove moss, algae, oil stains, and years of grime. Safe for block paving, concrete, and natural stone.' },
      { step: 3, title: 'Surfaces Restored, Guaranteed', description: 'Re-sanding included for block paving. Your surfaces look like new, with our 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much does pressure washing cost?', answer: 'Most driveways cost £150–£350 depending on size and surface type. Patios typically run £100–£250. That\'s roughly £2–£5 per square metre. We include weed removal, moss treatment, and re-sanding for block paving in the price.' },
      { question: 'Will pressure washing damage my paving?', answer: 'No. We adjust PSI levels for each surface type — lower for natural stone and decking, higher for concrete and tarmac. Our rotary surface cleaner gives an even clean without the striping that DIY jet washers leave behind.' },
      { question: 'What surfaces can you pressure wash?', answer: 'We pressure wash driveways, patios, decking, paths, walls, fencing, and forecourts. Block paving, concrete, tarmac, Indian sandstone, porcelain, and timber. We match the pressure and nozzle to each material.' },
      { question: 'How long does pressure washing take?', answer: 'An average driveway takes 2–4 hours depending on size and condition. Patios typically take 1–3 hours. We\'ll give you a time estimate when you book.' },
      { question: 'Can pressure washing remove oil stains?', answer: 'Yes. We pre-treat oil stains, tyre marks, and grease with specialist degreasers before pressure washing. Fresh stains come out completely; older stains are significantly reduced.' },
      { question: 'Do you offer sealing after pressure washing?', answer: 'Yes. Sealing protects against future staining, enhances the natural colour of your paving, and slows regrowth of moss and algae. We recommend resealing every 2–3 years.' },
      { question: 'Is pressure washing safe for wooden decking?', answer: 'Yes. We use lower pressure settings with a fan nozzle to clean timber decking without splintering or damaging the grain. Decking comes up looking fresh and ready to treat.' },
      { question: 'Do you re-sand block paving after pressure washing?', answer: 'Yes. Re-sanding with kiln-dried sand is included for all block paving jobs. It fills the joints, stabilises blocks, and prevents weed regrowth.' },
      { question: 'Will pressure washing remove moss and algae?', answer: 'Absolutely. Our commercial-grade equipment removes moss, algae, lichen, weeds, and years of built-up grime. Surfaces come back to their original colour.' },
      { question: 'Do I need to be home during pressure washing?', answer: 'No. As long as we have access to your property, water, and power, our team can complete the work while you\'re out.' },
      { question: 'How often should I have pressure washing done?', answer: 'Every 1–2 years for most surfaces. North-facing areas and driveways with tree coverage may need annual cleaning. Regular maintenance prevents long-term staining and surface damage.' },
      { question: 'What\'s the difference between pressure washing and jet washing?', answer: 'They\'re the same thing — jet washing is just the common name for pressure washing. We use commercial-grade equipment with rotary surface cleaners for a more even, professional finish than domestic machines.' },
    ],
    seo: {
      title: 'Pressure Washing | Jet Washing Service | Aquapro',
      description: 'Professional pressure washing service. Driveways, patios, decking, and paths restored to new. Jet washing with commercial equipment. Free quotes from local pressure washing specialists.',
      keywords: ['pressure washing near me', 'driveway pressure washing', 'patio jet washing', 'decking cleaning', 'pressure washing service', 'jet washing service'],
    },
    startingFrom: 'from £150',
  },
  {
    id: 'roof-cleaning',
    slug: 'roof-cleaning',
    name: 'Roof Cleaning & Moss Removal',
    shortName: 'Roof Cleaning',
    tagline: 'Professional Roof Moss Removal with 3-Year Guarantee',
    selfBookable: false,
    description: 'Professional roof cleaning and moss removal service. We remove moss, lichen, algae and organic growth from tiled rooftops using safe soft washing, manual scraping, and biocide treatment.',
    longDescription: '<strong>Professional roof moss removal</strong> that eradicates moss, lichen, and algae from your roof tiles. Choose from <strong>manual moss scraping</strong>, <strong>biocide treatment</strong>, or <strong>roof steam cleaning</strong>. Our low pressure roof cleaning methods prevent damage to old clay tiles, concrete tiles, and slate roofs. <strong>3-year moss-free guarantee</strong> included. Licensed waste removal. We hoover and bag all the moss.',
    icon: 'home',
    image: '/images/roof-cleaning-after.jpg',
    benefits: [
      'Prevents Costly Tile Damage',
      'Moss expands when wet, cracking and loosening tiles. We remove it before it causes expensive repairs.',
      'Restores That New Roof Look',
      'We remove the black streaks, green moss, and weathered buildup that makes your home look aged and worn.',
      'Boosts Property Value',
      'Many customers have added £10,000–£20,000 to their property value with nothing more than a professional roof clean.',
    ],
    features: [
      'Manual moss removal & scraping',
      'Biocide treatment application',
      'Low pressure soft washing for roofs',
      'Roof steam cleaning (hot pressure at low pressure)',
      'Safe access: MEWP, cherry picker, mobile tower',
      'PASMA & IPAF certified operatives',
    ],
    idealFor: [
      'Concrete tiles & clay roof tiles',
      'Slate roofs & man-made slates',
      'Old fragile clay tiles (listed buildings)',
      'Commercial & industrial rooftops',
      'Metal commercial rooftops',
      'Residential properties with conservatories',
    ],
    process: [
      { step: 1, title: 'Free Personalised Quote', description: 'We visit your property, survey your roof with our drone, and give you a fixed price on the spot. No hidden fees, no surprises.' },
      { step: 2, title: 'We Clean Your Roof', description: 'Our team safely removes every bit of moss, algae, and black staining. Then we apply a protective treatment that keeps your roof moss-free for years.' },
      { step: 3, title: 'Like New Roof, Guaranteed', description: 'We remove all the waste and leave your property spotless. Your roof looks brand new, backed by our 5-year guarantee.' },
    ],
    faqs: [
      { question: 'How much does roof cleaning cost?', answer: 'A typical semi-detached roof costs £400–£800, and a 4-bed detached around £800–£1,500. Price depends on roof size, tile type, and moss severity. Our quote includes the full clean, biocide treatment, gutter clear, window clean, waste removal, and a free re-treatment at year 3.' },
      { question: 'What\'s the difference between soft washing and pressure washing a roof?', answer: 'Soft washing uses low-pressure water with a biocide solution to kill moss and algae without force. Pressure washing blasts it off mechanically. We use soft washing because high-pressure jets can crack ageing clay and concrete tiles, strip protective coatings, and drive water under the tile overlap. Soft wash is safer, lasts longer, and is recommended for all UK roof types.' },
      { question: 'What\'s the best time of year to clean a roof?', answer: 'Spring through early autumn — ideally March to October. Biocide treatments need temperatures above 5°C to be effective. Cleaning in late autumn still works for the mechanical removal, but the protective treatment performs best in warmer, drier months.' },
      { question: 'Is roof moss removal safe for my tiles?', answer: 'Yes. Our gentle soft wash method is safe for clay tiles, concrete tiles, slate, and flat felt roofs. No damage, no lifted tiles, backed by our tile replacement guarantee.' },
      { question: 'How long does a roof clean take?', answer: 'Most roofs are completed in a single day. Larger or heavily mossy roofs may run into a second morning. You\'ll know the full schedule before we start.' },
      { question: 'Will roof cleaning leave a mess?', answer: 'Never. We sheet the area, remove all moss, algae, and debris, clean your gutters and windows, and leave your property spotless.' },
      { question: 'Is the biocide treatment safe for pets and plants?', answer: 'Yes. The protective biocide treatment we apply is completely safe for children, pets, and garden plants once dry. We take care around fishponds and cover them during application.' },
      { question: 'Do I need to be home during the roof clean?', answer: 'No. As long as we have access to your property, water, and power, our roof cleaning team can complete everything while you\'re out.' },
      { question: 'How long does a professional roof clean last?', answer: 'Our moss removal results are guaranteed for 5 years. We return after 3 years for a free biocide re-treatment to keep your roof moss-free. Without treatment, moss typically recolonises within 12–18 months.' },
      { question: 'What if a roof tile gets damaged?', answer: 'We replace it like-for-like, free of charge. That\'s our roof tile replacement guarantee, and we\'re fully insured for £5 million public liability.' },
      { question: 'What\'s included in a roof cleaning quote?', answer: 'Everything. Manual moss scraping, soft wash clean, biocide treatment, gutter clear, window clean, all waste removal, and a free re-treatment at year 3. One fixed price, no hidden costs.' },
    ],
    seo: {
      title: 'Roof Cleaning & Moss Removal | 3-Year Guarantee | Aquapro',
      description: 'Professional roof cleaning & moss removal service. Manual scraping, biocide treatment, soft washing. Safe for clay, slate & concrete tiles. 3-year moss-free guarantee. Fixed-price quotes.',
      keywords: ['roof moss removal', 'roof cleaners', 'mossy roof cleaning', 'biocide treatment roof', 'soft washing roofs', 'roof cleaning service', 'roof cleaning near me', 'cost of roof cleaning', 'professional roof moss removal'],
    },
    startingFrom: 'from £400',
    hero: {
      headline: 'Make Your Roof Look Brand New Again',
      subheadline: 'Roof Cleaning Specialists',
      description: 'Our professional roof cleaning service removes moss, algae and black streaks, prevents costly repairs and brings your home back to life - backed by our 5 year moss-free guarantee.',
      checkpoints: [
        'Removes 100% of moss, algae & black streaks',
        'Stops moss falling onto your driveway, patio, and conservatory',
        'Moss-free roof backed by our 5-year guarantee',
        'All waste removed, no mess left behind',
      ],
      formTitle: 'Get a Free Roof Cleaning Quote',
      trustBadges: [
        'Insured for £5,000,000',
        'Roof tile replacement guarantee',
      ],
    },
  },
  {
    id: 'window-cleaning',
    slug: 'window-cleaning',
    name: 'Window Cleaning',
    shortName: 'Windows',
    tagline: 'Streak-Free, Every Time',
    selfBookable: true,
    enabled: false,
    description: 'Crystal-clear window cleaning for homes and businesses using pure water technology.',
    longDescription: '<strong>Streak-free finish, no residue</strong>. Windows stay cleaner longer. <strong>Reaches up to 4 storeys safely</strong> from the ground. <strong>Frames and sills included</strong> at no extra cost.',
    icon: 'square',
    image: '/images/blake-window-cleaning.jpg',
    hero: {
      headline: 'Windows Looking Dull and Streaky?',
      subheadline: 'Crystal Clear, Guaranteed',
      description: 'Our window cleaners use pure water technology for a streak-free finish that lasts longer. Frames and sills included at no extra cost.',
      checkpoints: [
        'Streak-free finish, guaranteed',
        'Frames and sills cleaned free',
        'Reaches up to 4 storeys safely',
        'Regular or one-off service available',
      ],
      formTitle: 'Get My Free Window Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Streak-free, sparkling finish',
      'Frames and sills included',
      'Reaches high windows safely',
      'Pure water leaves no residue',
      'Windows stay cleaner longer',
      'Regular service available',
    ],
    features: [
      'Pure water fed pole system',
      'Reaches up to 4 storeys',
      'Window frames cleaned',
      'Sills wiped down',
      'Conservatory cleaning',
      'Regular service plans',
    ],
    idealFor: [
      'Residential homes',
      'Flats and apartments',
      'Commercial premises',
      'Shop fronts',
      'Conservatories',
      'Office buildings',
    ],
    process: [
      { step: 1, title: 'Free Window Cleaning Quote', description: 'We assess your windows and provide a fixed-price quote. Frames and sills included free.' },
      { step: 2, title: 'Pure Water Clean', description: 'Our window cleaners use pure water technology for a streak-free finish that lasts longer. Reaches up to 4 storeys safely.' },
      { step: 3, title: 'Crystal Clear Windows, Guaranteed', description: 'No streaks, no residue, no ladders on your property. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much does window cleaning cost?', answer: 'A typical 3-bedroom house costs £20–£35 per visit on a regular schedule. One-off cleans are higher — usually £40–£80 — because there\'s more buildup to remove. Price depends on the number of windows, access, and whether you need interior cleaning as well.' },
      { question: 'What does your window cleaning service include?', answer: 'Every clean covers the glass, frames, and sills on all exterior windows. We use a water-fed telescopic pole system with pure deionised water for a streak-free finish that lasts longer than traditional cleaning methods.' },
      { question: 'What is pure water window cleaning?', answer: 'Deionised pure water has minerals removed, so it dries without leaving spots, streaks, or residue. It\'s also chemical-free — completely safe for your glass seals, plants, pets, and family. Windows stay cleaner for longer compared to traditional squeegee methods.' },
      { question: 'Do your window cleaners clean inside windows?', answer: 'Yes, we offer interior window cleaning as an additional service. Just let us know when booking and we\'ll include it in your quote.' },
      { question: 'How often should I have my windows cleaned?', answer: 'Every 4–8 weeks for best results. Regular cleaning prevents mineral buildup and hard water staining. Coastal properties or homes near busy roads may benefit from more frequent cleans. We also offer one-off deep cleans.' },
      { question: 'Can you reach high or hard-to-reach windows?', answer: 'Yes. Our water-fed telescopic poles safely reach windows up to 4 storeys high, all from the ground. No ladders leaning against your property, no scaffolding needed.' },
      { question: 'Will window cleaning damage my glass or seals?', answer: 'No. Pure water is gentle on all glass types, UPVC frames, rubber seals, and timber frames. No chemicals, no abrasives, no pressure that could damage anything.' },
      { question: 'How long does window cleaning take?', answer: 'Most homes take 20–30 minutes. A standard 4-bedroom house is usually done in under half an hour. We\'ll give you an estimate when you book.' },
      { question: 'What if it rains on my window cleaning day?', answer: 'Light rain won\'t affect the clean — pure water actually helps windows dry streak-free. Rainwater contains minerals that cause spots, but our water doesn\'t. If weather is severe, we\'ll reschedule at no extra cost.' },
      { question: 'Do I need to be home for window cleaning?', answer: 'No. As long as our window cleaners have access to your property, we can complete the work while you\'re out. We\'ll let you know when we\'re done.' },
      { question: 'Do you clean commercial windows?', answer: 'Yes. We clean shop fronts, offices, restaurants, and commercial premises across Essex. Regular contracts with weekly, fortnightly, or monthly schedules available.' },
    ],
    seo: {
      title: 'Window Cleaning | Window Cleaners Near Me | Aquapro',
      description: 'Professional window cleaning service. Streak-free results with pure water technology. Frames and sills included. Homes and businesses. Free quotes from local window cleaners.',
      keywords: ['window cleaner near me', 'pure water window cleaning', 'commercial window cleaning', 'residential window cleaning', 'window cleaning service', 'window cleaners'],
    },
    startingFrom: 'from £20/visit',
  },
  {
    id: 'gutter-cleaning',
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    shortName: 'Gutters',
    tagline: 'Prevent Damage, Protect Your Home',
    selfBookable: false,
    description: 'High-reach gutter clearing to prevent blockages, leaks, and water damage.',
    longDescription: 'Professional gutter clearing using our high-reach vacuum system. No ladders on your property, wireless camera inspection included.',
    icon: 'droplets',
    image: '/images/blake-window-cleaning.jpg',
    hero: {
      headline: 'Gutters Blocked or Overflowing?',
      subheadline: 'Prevent Costly Water Damage',
      description: 'Our gutter cleaners clear leaves, moss, and debris using high-reach vacuum systems, no ladders on your property. Before and after photos included.',
      checkpoints: [
        'All gutters and downpipes cleared',
        'Before and after camera footage',
        'No ladders needed, cleaned from the ground',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Gutter Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Prevents water damage',
      'Extends gutter lifespan',
      'No ladders required',
      'Camera inspection included',
      'All debris removed',
      'Downpipes cleared',
    ],
    features: [
      'Wireless camera survey',
      'High-reach vacuum system',
      'No ladders required',
      'Downpipes unblocked',
      'Debris removed',
      'Before/after photos',
    ],
    idealFor: [
      'Residential homes',
      'Bungalows',
      'Multi-storey buildings',
      'Commercial premises',
      'Schools and offices',
      'Property management',
    ],
    process: [
      { step: 1, title: 'Free Gutter Cleaning Quote', description: 'We inspect your gutters with our camera system and provide a fixed-price quote. No obligation.' },
      { step: 2, title: 'High-Reach Vacuum Clear', description: 'Our gutter cleaners remove leaves, moss, and debris from the ground, no ladders on your property. All downpipes checked and cleared.' },
      { step: 3, title: 'Free-Flowing Gutters, Guaranteed', description: 'Before and after photos included so you can see the results. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much does gutter cleaning cost?', answer: 'A typical terraced or semi-detached house costs £60–£100. Detached properties run £80–£150 depending on gutter length and access. That includes all gutters, downpipe checks, debris removal, and before/after camera footage.' },
      { question: 'How do I know if my gutters need cleaning?', answer: 'Water overflowing during rain, green staining running down walls, plants growing from the gutterline, or sagging gutter sections are all signs of blockage. If you can see debris or moss sitting above the gutter edge, it\'s time for a clear.' },
      { question: 'Do you use ladders for gutter cleaning?', answer: 'No. We use a SkyVac high-reach vacuum system that cleans from ground level. No ladders against your property, no risk of damage to walls or guttering. Safer for our team, safer for your home.' },
      { question: 'How often should gutters be cleaned?', answer: 'At least once a year for most homes. If you have overhanging trees — especially oak, sycamore, or pine — twice a year is better, ideally late autumn after leaf fall and again in spring.' },
      { question: 'What does your gutter cleaning service include?', answer: 'Every job includes clearing all gutters, checking and unblocking downpipes and hoppers, removing all debris from site, and providing before/after camera footage so you can see the results.' },
      { question: 'Can you clean conservatory gutters?', answer: 'Yes. Our vacuum system reaches all types of guttering including conservatories, extensions, garages, and flat-roof sections.' },
      { question: 'Do you provide photos of the gutter cleaning?', answer: 'Yes. Our CCTV camera footage shows exactly what was in your gutters before and after the clean. You\'ll see the blockage and confirm everything\'s flowing freely.' },
      { question: 'What happens if my downpipes are blocked?', answer: 'We check and clear all downpipes as part of every gutter cleaning job. Leaves, moss, and sediment are the usual culprits. If there\'s a structural issue, we\'ll let you know.' },
      { question: 'Why is gutter cleaning important?', answer: 'Blocked gutters cause rainwater to overflow, leading to damp walls, fascia rot, foundation damage, and costly structural repairs. Regular clearing prevents these problems and protects your property.' },
      { question: 'Can you reach high gutters?', answer: 'Yes. Our high-reach vacuum system reaches gutters up to 12 metres high — that\'s 4 storeys — all from the ground. No ladders, no scaffolding.' },
      { question: 'Do I need to be home during gutter cleaning?', answer: 'No. As long as we have access to your property, we can complete the work while you\'re out. We\'ll send the camera footage when done.' },
      { question: 'Do you clean commercial gutters?', answer: 'Yes. We clean commercial properties, offices, schools, churches, and industrial units across Essex. Regular maintenance contracts available.' },
    ],
    seo: {
      title: 'Gutter Cleaning | Gutter Cleaners Near Me | Aquapro',
      description: 'Professional gutter cleaning service. High-reach vacuum system, no ladders needed. Before/after camera footage included. Local gutter cleaners. Free quotes.',
      keywords: ['gutter cleaner near me', 'gutter clearance', 'blocked gutters', 'gutter cleaning service', 'gutter cleaning near me', 'gutter cleaners'],
    },
    startingFrom: 'from £60',
  },
  {
    id: 'stain-removal',
    slug: 'stain-removal',
    name: 'Stain Removal',
    shortName: 'Stain Removal',
    tagline: 'Stubborn Stains Eliminated',
    selfBookable: true,
    enabled: false,
    description: 'Targeted treatment for stubborn stains on carpets, upholstery, and hard surfaces.',
    longDescription: 'Expert stain removal for red wine, coffee, pet accidents, and more. Emergency service available for fresh spills.',
    icon: 'sparkles',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Got a Stubborn Stain?',
      subheadline: "We'll Get It Out",
      description: 'Red wine, coffee, pet accidents... our stain removal specialists tackle the toughest stains on carpets and upholstery. Priority bookings available for fresh spills.',
      checkpoints: [
        'Most stains removed, or you don\'t pay',
        'Safe for all carpet and fabric types',
        'Priority bookings for urgent spills',
        'No residue left behind',
      ],
      formTitle: 'Get My Free Stain Removal Quote',
      trustBadges: [
        'Fully insured for £5M',
        'Stain removal guarantee',
      ],
    },
    benefits: [
      'Removes stubborn stains',
      'Emergency service available',
      'Safe for fabrics',
      'Eco-friendly products',
      'No residue left behind',
      'Results guaranteed',
    ],
    features: [
      'Red wine removal',
      'Coffee and tea stains',
      'Pet stain treatment',
      'Emergency callout',
      'Enzyme treatments',
      'Odour elimination',
    ],
    idealFor: [
      'Red wine spills',
      'Coffee and tea stains',
      'Pet accidents',
      'Ink stains',
      'Food stains',
      'Unknown stains',
    ],
    process: [
      { step: 1, title: 'Free Stain Assessment', description: 'We identify your stain (red wine, coffee, pet urine, blood, or other) and advise on the best treatment. Priority bookings for fresh spills.' },
      { step: 2, title: 'Targeted Stain Treatment', description: 'Our stain removal specialists apply professional-grade treatments to break down and lift the stain. Safe for all carpets and upholstery.' },
      { step: 3, title: 'Stain Gone, Guaranteed', description: 'No residue left behind. If we can\'t remove a stain we said we could, you don\'t pay for that treatment.' },
    ],
    faqs: [
      { question: 'Should I try to remove the stain myself before calling you?', answer: 'Blot the spill with a clean white cloth to absorb as much as you can — but don\'t rub, scrub, or apply heat. Rubbing pushes the stain deeper into carpet fibres, and shop-bought spot removers often set the stain or leave residue that makes professional treatment harder. If in doubt, just blot and call us.' },
      { question: 'What types of stains can you remove?', answer: 'We treat red wine, coffee, tea, food, pet urine, blood, ink, makeup, mud, grease, and unknown marks. Each stain type needs a different approach — oxidation for tannins, enzyme treatment for protein-based stains, solvent for grease. We identify the stain first and match the method.' },
      { question: 'Can you remove all stains?', answer: 'We remove or significantly reduce most stains. Some permanent damage like bleach spots, dye transfer, or very old set-in marks can\'t be fully reversed, and we\'ll always be honest upfront about what\'s achievable.' },
      { question: 'Do you offer emergency stain removal?', answer: 'Yes. Fresh spills are far easier to remove than dried-in stains, so we offer same-day priority bookings for urgent callouts. The sooner you call, the better the result.' },
      { question: 'Is stain removal safe for my carpet?', answer: 'Absolutely. We do a fibre test and colourfastness check in a hidden area before applying any treatment. We use pH-neutral, eco-friendly solutions safe for wool, synthetic, and delicate blends. No damage, guaranteed.' },
      { question: 'Can you remove pet stains and urine odours?', answer: 'Yes, it\'s one of our specialities. We use enzyme treatments that break down uric acid crystals at the molecular level, eliminating both the stain and the odour at the source — not just masking it.' },
      { question: 'How much does stain removal cost?', answer: 'Pricing depends on the stain type, size, and number of affected areas. Individual stain treatment typically starts from £30. We provide free quotes and are always upfront about costs before starting.' },
      { question: 'What if the stain doesn\'t come out?', answer: 'We\'ll be honest about what\'s achievable before we start. If we can\'t remove a stain we said we could, you don\'t pay for that treatment. That\'s our stain removal guarantee.' },
      { question: 'Do you remove stains from upholstery too?', answer: 'Yes. Our stain removal service covers carpets, rugs, sofas, armchairs, mattresses, and all upholstered furniture. Same expert treatment, same results.' },
      { question: 'How quickly should I treat a fresh stain?', answer: 'The sooner the better. A fresh red wine spill takes minutes to treat professionally but can become permanent if left 24–48 hours. Blot it, don\'t rub it, and call us straight away.' },
    ],
    seo: {
      title: 'Stain Removal | Carpet & Upholstery Stain Removal | Aquapro',
      description: 'Professional stain removal service. Red wine, coffee, pet stains, and more. Priority bookings for urgent spills. Stain removal specialists. Free quotes.',
      keywords: ['carpet stain removal', 'upholstery stain removal', 'pet stain removal', 'red wine stain removal', 'stain removal near me', 'stain removal service'],
    },
    startingFrom: 'from £30',
  },
  {
    id: 'driveway-cleaning',
    slug: 'driveway-cleaning',
    name: 'Driveway Cleaning',
    shortName: 'Driveways',
    tagline: 'Restore Your Driveway to Like-New Condition',
    selfBookable: false,
    description: 'Professional driveway cleaning for block paving, concrete, tarmac, and resin driveways. Remove moss, oil stains, and years of grime. Re-sanding and sealing available.',
    longDescription: '<strong>Transform your driveway</strong> with our professional driveway cleaning service. We remove <strong>moss, algae, weeds, oil stains, and years of built-up grime</strong> from all driveway types including <strong>block paving, concrete, tarmac, resin, and gravel</strong>. Our <strong>commercial-grade pressure washing</strong> equipment delivers stunning results. <strong>Re-sanding and sealing services</strong> available to protect your investment and keep your driveway looking great for longer.',
    icon: 'car',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Driveway Covered in Moss and Stains?',
      subheadline: "We'll Make It Look New Again",
      description: 'Our driveway cleaners remove years of moss, oil stains, and grime, transforming your kerb appeal in just one visit. Re-sanding included for block paving.',
      checkpoints: [
        'Moss, weeds, and oil stains removed',
        'Re-sanding included for block paving',
        'Instantly boosts kerb appeal',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Driveway Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Removes moss, algae, and weeds',
      'Eliminates oil and tyre marks',
      'Restores original colour and appearance',
      'Dramatically improves kerb appeal',
      'Prevents slip hazards',
      'Extends driveway lifespan',
    ],
    features: [
      'Block paving deep cleaning',
      'Concrete driveway restoration',
      'Tarmac and asphalt cleaning',
      'Resin driveway specialist',
      'Re-sanding service for block paving',
      'Protective sealing available',
    ],
    idealFor: [
      'Block paving driveways',
      'Concrete driveways',
      'Tarmac and asphalt driveways',
      'Resin bound driveways',
      'Gravel driveways (weed removal)',
      'Shared driveways and forecourts',
    ],
    process: [
      { step: 1, title: 'Free Driveway Cleaning Quote', description: 'We inspect your driveway, identify problem areas, and provide a fixed-price quote. No hidden fees.' },
      { step: 2, title: 'Professional Driveway Clean', description: 'Our driveway cleaners remove moss, weeds, oil stains, and years of built-up grime. Block paving, concrete, tarmac, and resin. We clean them all.' },
      { step: 3, title: 'Kerb Appeal Restored, Guaranteed', description: 'Re-sanding included for block paving. Your driveway looks like new, with our 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much does driveway cleaning cost?', answer: 'A typical 2-car block paving driveway costs £150–£300. Larger driveways or heavily stained surfaces may be more. Price includes weed removal, moss treatment, oil stain pre-treatment, and kiln-dried re-sanding for block paving. We quote a fixed price upfront.' },
      { question: 'What\'s the difference between soft washing and pressure washing a driveway?', answer: 'Pressure washing uses high-pressure water (up to 3,000 PSI) to blast dirt off mechanically — ideal for block paving, concrete, and tarmac. Soft washing uses lower pressure with cleaning agents, better for delicate surfaces like resin bound or aged Indian stone. We assess your surface and choose the right method.' },
      { question: 'Will pressure washing damage my block paving?', answer: 'No. We use a rotary surface cleaner that distributes pressure evenly, avoiding the striping and joint erosion that direct jet nozzles cause. We re-sand all block paving joints with kiln-dried sand after cleaning to restore stability.' },
      { question: 'Can you remove oil stains from my driveway?', answer: 'Yes. We pre-treat oil stains, tyre marks, and grease with specialist degreasers before the main clean. Fresh oil stains come out completely; older stains are significantly reduced or eliminated.' },
      { question: 'How long does driveway cleaning take?', answer: 'Most driveways take half a day — 2 to 4 hours depending on size and condition. Larger or heavily soiled driveways may run into a full day.' },
      { question: 'Do you clean tarmac driveways?', answer: 'Yes. We clean tarmac and asphalt using lower pressure settings to avoid surface damage. Moss, algae, and tyre marks are removed without degrading the tarmac finish.' },
      { question: 'What is re-sanding and do I need it?', answer: 'Re-sanding fills the joints between block paving with kiln-dried sand. It stabilises blocks, prevents weed regrowth, and stops ant nesting. It\'s included free for all block paving driveway cleans.' },
      { question: 'Do you offer driveway sealing?', answer: 'Yes. Sealing protects against oil stains, UV fading, and weed growth. It also enhances the natural colour of your paving. We recommend resealing every 2–3 years for lasting protection.' },
      { question: 'How often should I have my driveway cleaned?', answer: 'Every 1–2 years for most driveways. North-facing surfaces and those with overhanging trees collect moss and algae faster and may need annual cleaning to prevent permanent staining.' },
    ],
    seo: {
      title: 'Driveway Cleaning | Block Paving & Concrete | Aquapro',
      description: 'Professional driveway cleaning service. Block paving, concrete, tarmac, resin driveways restored. Moss removal, oil stain treatment, re-sanding & sealing. Free quotes.',
      keywords: ['block paving cleaning', 'driveway pressure washing', 'driveway cleaning near me', 'driveway jet washing', 'paving cleaning', 'oil stain removal driveway'],
    },
    startingFrom: 'from £150',
  },
  {
    id: 'patio-cleaning',
    slug: 'patio-cleaning',
    name: 'Patio Cleaning',
    shortName: 'Patios',
    tagline: 'Revive Your Patio for Summer',
    selfBookable: false,
    description: 'Professional patio cleaning for slabs, natural stone, porcelain, and decking. Remove green algae, black spots, and weathered grime. Restore your outdoor space.',
    longDescription: '<strong>Bring your patio back to life</strong> with our professional patio cleaning service. We restore <strong>concrete slabs, Indian sandstone, porcelain tiles, limestone, slate, and natural stone</strong> to their original beauty. Our specialist treatments remove <strong>green algae, black spot, lichen, and years of weathering</strong>. <strong>Safe cleaning methods</strong> for all patio types, no damage to pointing or delicate stone. <strong>Sealing available</strong> to protect your patio and enhance colour.',
    icon: 'sun',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Patio Green and Slippery?',
      subheadline: 'Get It Ready for Summer',
      description: 'Our patio cleaners remove algae, black spot, and years of weathering. Safe for sandstone, porcelain, and all stone types. Transform your outdoor space.',
      checkpoints: [
        'Algae and black spot removed',
        'Safe for all stone types',
        'Transforms your outdoor space',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Patio Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Removes green algae and black spot',
      'Restores natural stone colour',
      'Eliminates slip hazards',
      'Transforms outdoor living space',
      'Extends patio lifespan',
      'Ready for entertaining',
    ],
    features: [
      'Concrete slab patio cleaning',
      'Indian sandstone restoration',
      'Porcelain tile cleaning',
      'Natural stone specialist',
      'Black spot treatment',
      'Patio sealing available',
    ],
    idealFor: [
      'Concrete paving slabs',
      'Indian sandstone patios',
      'Porcelain patio tiles',
      'Limestone and travertine',
      'Slate patios',
      'York stone and flagstones',
    ],
    process: [
      { step: 1, title: 'Free Patio Cleaning Quote', description: 'We assess your patio (sandstone, porcelain, concrete, or natural stone) and provide a fixed-price quote.' },
      { step: 2, title: 'Professional Patio Clean', description: 'Our patio cleaners remove green algae, black spot, and years of weathering. Pressure adjusted for your stone type. No damage, guaranteed.' },
      { step: 3, title: 'Outdoor Space Transformed, Guaranteed', description: 'Your patio is left looking new and ready for entertaining. Optional sealing available. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much does patio cleaning cost?', answer: 'Typically £3–£6 per square metre depending on stone type and condition. A standard 20m² patio runs £80–£150. We include algae treatment, weed removal, and a final rinse. Sealing and re-pointing are available as optional extras.' },
      { question: 'Can I clean my patio myself with a pressure washer?', answer: 'You can shift surface dirt, but domestic machines lack the power and flow rate for deep moss and black spot removal. The bigger risk is damage — too much pressure on sandstone erodes the surface, and a direct jet nozzle blows out pointing. Our commercial equipment with surface-specific nozzles cleans deeper without the damage.' },
      { question: 'How often should I have my patio professionally cleaned?', answer: 'Once a year is enough for most patios. North-facing or shaded patios under trees may need cleaning every 6–12 months to stay on top of algae and moss. A spring clean before summer gets the most use out of your outdoor space.' },
      { question: 'Can you clean Indian sandstone safely?', answer: 'Yes, we specialise in Indian sandstone restoration. We use low-pressure fan nozzles and surface-specific cleaning agents to lift algae and black spot without eroding the soft stone or disturbing pointing.' },
      { question: 'What causes black spots on my patio?', answer: 'Black spots are lichen — a stubborn organism that bonds to the stone surface at a cellular level. Regular pressure washing alone won\'t remove it. We use specialist lichen treatments that break the bond and lift it cleanly.' },
      { question: 'Will pressure washing damage my pointing?', answer: 'We adjust pressure and nozzle type for each stone. If existing pointing is already loose or crumbling, we\'ll let you know before starting and can re-point as an add-on after cleaning.' },
      { question: 'How long does patio cleaning take?', answer: 'Most patios take 2–4 hours. Larger areas or patios with heavy black spot may take longer due to treatment soak time.' },
      { question: 'Do you clean porcelain patios?', answer: 'Yes. Porcelain tiles are very durable and clean beautifully — we restore them to a showroom finish. We also clean the grout lines where algae tends to build up.' },
      { question: 'Should I seal my patio after cleaning?', answer: 'Recommended for natural stone like Indian sandstone, limestone, and York stone. Sealing protects against staining, enhances the natural colour, and slows algae regrowth. Not usually needed for porcelain.' },
      { question: 'Can you clean around garden furniture?', answer: 'Yes, we clean around furniture, planters, and garden features. If you can move lighter items beforehand it helps us cover more area, but we\'ll work around whatever\'s there.' },
    ],
    seo: {
      title: 'Patio Cleaning | Slabs, Sandstone & Stone | Aquapro',
      description: 'Professional patio cleaning service. Concrete slabs, Indian sandstone, porcelain, natural stone restored. Black spot removal, algae treatment. Free quotes.',
      keywords: ['patio pressure washing', 'Indian sandstone cleaning', 'patio cleaning near me', 'black spot removal patio', 'stone patio cleaning', 'patio jet washing'],
    },
    startingFrom: 'from £80',
  },
  {
    id: 'solar-panel-cleaning',
    slug: 'solar-panel-cleaning',
    name: 'Solar Panel Cleaning',
    shortName: 'Solar Panels',
    tagline: 'Maximise Your Solar Energy Output',
    selfBookable: false,
    enabled: false,
    description: 'Professional solar panel cleaning to restore efficiency and maximise energy output. Safe pure water cleaning for all panel types. Improve performance by up to 30%.',
    longDescription: '<strong>Boost your solar panel efficiency</strong> with professional cleaning. Dirty panels can lose <strong>up to 30% of their energy output</strong> due to bird droppings, dust, pollen, and general grime. Our <strong>pure water cleaning system</strong> safely removes all contamination without scratching or damaging panels. <strong>No chemicals, no residue</strong>, just pure deionised water that dries spot-free. We clean <strong>roof-mounted and ground-mounted systems</strong> for homes and businesses.',
    icon: 'sun',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Solar Panels Not Performing?',
      subheadline: 'Restore Up to 30% Lost Efficiency',
      description: 'Dirty panels lose up to 30% efficiency. Our solar panel cleaners use pure water and soft brushes. No chemicals, no scratching, no voided warranty.',
      checkpoints: [
        'Restores up to 30% lost efficiency',
        'Pure water cleaning, no chemicals',
        'Won\'t void your panel warranty',
        'Safe for all panel types',
      ],
      formTitle: 'Get My Free Solar Panel Quote',
      trustBadges: [
        'Fully insured for £5M',
        'Manufacturer-approved method',
      ],
    },
    benefits: [
      'Restores up to 30% lost efficiency',
      'Maximises energy generation',
      'Extends panel lifespan',
      'No chemicals or scratching',
      'Removes bird droppings safely',
      'Protects your investment',
    ],
    features: [
      'Pure water cleaning system',
      'Soft brush technology',
      'No chemicals used',
      'Safe for all panel types',
      'Roof and ground mount systems',
      'Before/after output comparison',
    ],
    idealFor: [
      'Residential solar installations',
      'Commercial solar arrays',
      'Solar farms',
      'Panels under trees (pollen/sap)',
      'Coastal properties (salt buildup)',
      'Properties near busy roads',
    ],
    process: [
      { step: 1, title: 'Free Solar Panel Quote', description: 'We assess your solar installation and provide a fixed-price quote. No obligation.' },
      { step: 2, title: 'Pure Water Panel Clean', description: 'Our solar panel cleaners gently remove dirt, bird droppings, and grime. No chemicals, no scratching. Won\'t void your warranty.' },
      { step: 3, title: 'Efficiency Restored, Guaranteed', description: 'Your panels are left spotless. Restore up to 30% lost energy output. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much efficiency do dirty solar panels lose?', answer: 'Studies show dirty panels can lose 15-30% efficiency. Bird droppings are particularly harmful as they block cells completely, creating "hot spots" that reduce output.' },
      { question: 'How often should solar panels be cleaned?', answer: 'We recommend cleaning every 6-12 months. Panels near trees, busy roads, or the coast may need more frequent cleaning due to pollen, dust, or salt buildup.' },
      { question: 'Is it safe to pressure wash solar panels?', answer: 'No, we never use pressure washers on solar panels. High pressure can crack glass or damage seals. We use gentle pure water cleaning with soft brushes only.' },
      { question: 'What is pure water cleaning?', answer: 'Pure water (deionised water) has minerals removed, so it dries without leaving spots or residue. It\'s the safest and most effective method for solar panels.' },
      { question: 'Can you clean panels on my roof?', answer: 'Yes, we clean roof-mounted panels using telescopic water-fed poles from the ground where possible, keeping our team safe and avoiding roof damage.' },
      { question: 'Do you clean commercial solar installations?', answer: 'Yes, we clean commercial solar arrays of all sizes, from office rooftops to large solar farms. Regular cleaning contracts available.' },
      { question: 'Will cleaning void my panel warranty?', answer: 'No. Pure water cleaning is the manufacturer-recommended method. Using chemicals or pressure washers could void warranties, but our method is completely safe.' },
      { question: 'How much does solar panel cleaning cost?', answer: 'Residential systems typically cost £5-£10 per panel depending on access and quantity. We provide free quotes based on your installation.' },
    ],
    seo: {
      title: 'Solar Panel Cleaning | Restore Efficiency | Aquapro',
      description: 'Professional solar panel cleaning service. Pure water cleaning, no chemicals. Restore up to 30% lost efficiency. Safe for all panels. Free quotes.',
      keywords: ['solar panel cleaners', 'clean solar panels', 'solar panel cleaning near me', 'solar panel washing', 'photovoltaic cleaning', 'PV panel cleaning'],
    },
    startingFrom: 'from £5/panel',
  },
  {
    id: 'conservatory-cleaning',
    slug: 'conservatory-cleaning',
    name: 'Conservatory Cleaning',
    shortName: 'Conservatories',
    tagline: 'Crystal Clear Roof & Sparkling Glass',
    selfBookable: false,
    enabled: false,
    description: 'Professional conservatory cleaning for roofs, glass panels, frames, and gutters. Remove green algae, bird droppings, and years of grime. Restore your conservatory to like-new condition.',
    longDescription: '<strong>Transform your conservatory</strong> with our complete cleaning service. We clean <strong>polycarbonate roofs, glass roofs, UPVC frames, and all glass panels</strong>. Remove <strong>green algae, moss, bird droppings, and built-up grime</strong> that blocks light and makes your conservatory look tired. Our <strong>pure water system</strong> leaves glass streak-free and frames sparkling. We also clean <strong>conservatory gutters</strong> to prevent overflow and damp issues.',
    icon: 'home',
    image: '/images/blake-window-cleaning.jpg',
    hero: {
      headline: 'Conservatory Looking Green and Dull?',
      subheadline: 'Let the Light Back In',
      description: 'Our conservatory cleaners remove algae, moss, and grime from your roof, glass, and frames, restoring natural light and making it feel new again.',
      checkpoints: [
        'Roof, glass, and frames all cleaned',
        'Safe for polycarbonate and glass roofs',
        'Gutters cleared free',
        'Streak-free finish guaranteed',
      ],
      formTitle: 'Get My Free Conservatory Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Restores natural light',
      'Removes green algae and moss',
      'Cleans roof, glass, and frames',
      'Streak-free finish',
      'Prevents gutter overflow',
      'Extends conservatory lifespan',
    ],
    features: [
      'Polycarbonate roof cleaning',
      'Glass roof restoration',
      'UPVC frame cleaning',
      'All glass panels cleaned',
      'Conservatory gutter clearing',
      'Pure water system',
    ],
    idealFor: [
      'Polycarbonate roof conservatories',
      'Glass roof conservatories',
      'Lean-to conservatories',
      'Victorian conservatories',
      'Edwardian conservatories',
      'Orangeries and garden rooms',
    ],
    process: [
      { step: 1, title: 'Free Conservatory Quote', description: 'We inspect your conservatory and provide a fixed-price quote. Gutter clearing included free.' },
      { step: 2, title: 'Complete Conservatory Clean', description: 'Our conservatory cleaners remove algae, moss, and grime from your roof, glass panels, and UPVC frames. Safe for polycarbonate and glass roofs.' },
      { step: 3, title: 'Natural Light Restored, Guaranteed', description: 'Your conservatory is left crystal clear and bright again. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much does conservatory cleaning cost?', answer: 'A typical lean-to or Victorian conservatory costs £100–£200 for the exterior roof, glass panels, and UPVC frames. Larger orangeries or garden rooms may be more. Gutter clearing is included free. We quote a fixed price upfront.' },
      { question: 'What cleaning method do you use for conservatories?', answer: 'We use telescopic water-fed poles with pure deionised water and soft non-abrasive brushes. No chemicals, no ladders on your roof, and the pure water dries streak-free. For heavy algae buildup we apply a specialist treatment first to break it down before rinsing.' },
      { question: 'Can you clean polycarbonate roofs?', answer: 'Yes. Polycarbonate scratches easily, so we never use abrasive pads or high pressure. Our soft brush and pure water system lifts algae, bird droppings, and grime without marking the surface.' },
      { question: 'Do you clean glass conservatory roofs?', answer: 'Yes. Glass roofs are cleaned using our pure water system for a streak-free, spot-free finish. We take care around rubber seals and framework to avoid disturbing weatherproofing.' },
      { question: 'Will you clean inside the conservatory too?', answer: 'Exterior cleaning is included as standard. Interior glass cleaning is available as an optional extra — just let us know when booking and we\'ll add it to your quote.' },
      { question: 'How do you reach the roof safely?', answer: 'We use telescopic water-fed poles that reach from the ground — no ladders against your conservatory, no one walking on the roof. It\'s safer for our team and prevents any risk of cracking polycarbonate panels.' },
      { question: 'Can you remove green algae from my conservatory?', answer: 'Yes. Green algae is the most common problem, especially on north-facing or tree-shaded conservatories. Our cleaning removes it completely and restores natural light transmission through the roof panels.' },
      { question: 'Do you clean conservatory gutters?', answer: 'Yes, conservatory gutter clearing is included as part of every clean. Blocked conservatory gutters cause overflow, staining, and damp — we clear them while we\'re there.' },
      { question: 'How often should I have my conservatory cleaned?', answer: 'Every 6–12 months. North-facing conservatories or those under trees may need cleaning every 3–6 months to keep algae, pollen, and leaf staining under control.' },
    ],
    seo: {
      title: 'Conservatory Cleaning | Roof & Glass Specialists | Aquapro',
      description: 'Professional conservatory cleaning service. Polycarbonate roofs, glass panels, UPVC frames. Algae removal, gutter clearing included. Free quotes.',
      keywords: ['conservatory roof cleaning', 'polycarbonate roof cleaning', 'conservatory cleaners near me', 'glass conservatory cleaning', 'UPVC conservatory cleaning'],
    },
    startingFrom: 'from £100',
  },
  {
    id: 'mattress-cleaning',
    slug: 'mattress-cleaning',
    name: 'Mattress Cleaning',
    shortName: 'Mattresses',
    tagline: 'Deep Clean for a Healthier Sleep',
    selfBookable: true,
    enabled: false,
    description: 'Professional mattress cleaning to remove dust mites, allergens, stains, and odours. Deep sanitisation for a healthier night\'s sleep. All mattress sizes and types cleaned.',
    longDescription: '<strong>Sleep healthier with a professionally cleaned mattress</strong>. Your mattress harbours <strong>dust mites, dead skin, sweat, and allergens</strong> that vacuuming alone can\'t remove. Our <strong>deep extraction cleaning</strong> removes embedded dirt, <strong>sanitises against bacteria</strong>, and eliminates odours. We treat <strong>urine stains, sweat marks, and blood stains</strong> with specialist solutions. Safe for <strong>memory foam, spring, hybrid, and all mattress types</strong>. Wake up fresher.',
    icon: 'bed',
    image: '/images/blake-van-image.jpg',
    hero: {
      headline: 'Mattress Stained or Smelling?',
      subheadline: 'Sleep Fresher Tonight',
      description: 'Our mattress cleaners remove dust mites, allergens, stains, and odours, leaving your mattress fresh, sanitised, and ready for a healthier night\'s sleep.',
      checkpoints: [
        'Dust mites and allergens removed',
        'Stains and odours eliminated',
        'Dry same day. Sleep on it tonight',
        'Safe for all mattress types',
      ],
      formTitle: 'Get My Free Mattress Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Removes dust mites and allergens',
      'Eliminates sweat and odour',
      'Treats urine and stain marks',
      'Sanitises and freshens',
      'Improves sleep quality',
      'Extends mattress lifespan',
    ],
    features: [
      'Deep extraction cleaning',
      'Dust mite treatment',
      'Stain removal specialists',
      'Anti-bacterial sanitisation',
      'Odour elimination',
      'All mattress types and sizes',
    ],
    idealFor: [
      'Allergy and asthma sufferers',
      'Families with young children',
      'Pet owners',
      'Guest bedrooms and Airbnb',
      'Landlords between tenants',
      'Anyone wanting a fresher sleep',
    ],
    process: [
      { step: 1, title: 'Free Mattress Cleaning Quote', description: 'We inspect your mattress and provide a fixed-price quote. Single, double, king, all sizes cleaned.' },
      { step: 2, title: 'Deep Clean & Sanitise', description: 'Our mattress cleaners remove dust mites, allergens, stains, and odours. Safe for memory foam, spring, and hybrid mattresses.' },
      { step: 3, title: 'Fresher Sleep, Guaranteed', description: 'Your mattress is left fresh, sanitised, and dry same day, ready for a healthier night\'s sleep. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'How much does mattress cleaning cost?', answer: 'Single mattress from £40, double from £50, king size from £60, super king from £70. We offer discounts when you book multiple mattresses in one visit. Price includes full extraction clean, stain treatment, sanitisation, and deodorising.' },
      { question: 'Can I clean my mattress myself?', answer: 'Vacuuming and spot-cleaning help with surface freshness, but they can\'t reach the dust mites, dead skin cells, and allergens embedded deep inside. Professional hot water extraction pulls out what vacuuming leaves behind — most customers are surprised by how much comes out of a mattress that looks clean on the surface.' },
      { question: 'Can you remove urine stains from a mattress?', answer: 'Yes. We use enzyme treatments that break down uric acid crystals — the cause of both the stain and the lingering ammonia smell. Fresh stains remove completely; older stains are significantly reduced or eliminated.' },
      { question: 'Is mattress cleaning safe for memory foam?', answer: 'Yes. We use low-moisture extraction techniques that clean without saturating the foam core. Safe for memory foam, latex, hybrid, pocket sprung, and traditional open coil mattresses.' },
      { question: 'How long does a mattress take to dry?', answer: 'Typically 2–3 hours. Our extraction equipment removes most moisture during the clean, so you can make the bed and sleep on it the same evening.' },
      { question: 'Can mattress cleaning help with allergies?', answer: 'Yes. A used mattress can harbour millions of dust mites and their droppings — a common trigger for asthma, eczema, and rhinitis. Professional extraction removes mites, allergens, and bacteria that regular vacuuming can\'t reach. Many customers notice improved sleep and reduced symptoms.' },
      { question: 'How often should mattresses be cleaned?', answer: 'Every 6–12 months for most people. If you have allergies, asthma, pets on the bed, or young children, every 3–6 months keeps allergen levels under control.' },
      { question: 'How do I keep my mattress fresh between professional cleans?', answer: 'Use a washable mattress protector and wash it monthly at 60°C to kill dust mites. Vacuum the mattress surface every couple of weeks, air the bed daily by pulling back the duvet, and keep bedroom humidity below 50% — mites thrive in warm, damp conditions.' },
      { question: 'Can you remove blood stains from a mattress?', answer: 'Yes. We treat blood stains with cold-water enzyme solutions that break down the protein. Fresh stains usually remove completely; set-in stains are significantly lightened.' },
      { question: 'Do you clean pillows and duvets too?', answer: 'We focus on mattress cleaning but also clean upholstered headboards. For pillows and duvets, professional laundering at 60°C is the most effective option.' },
    ],
    seo: {
      title: 'Mattress Cleaning | Dust Mite & Stain Removal | Aquapro',
      description: 'Professional mattress cleaning service. Remove dust mites, allergens, urine stains, and odours. All sizes cleaned. Healthier sleep guaranteed. Free quotes.',
      keywords: ['mattress cleaners', 'mattress stain removal', 'dust mite removal', 'mattress cleaning near me', 'urine stain mattress', 'clean mattress service'],
    },
    startingFrom: 'from £40',
  },
];

// Active services only (enabled !== false) — used across the entire site
export const services: Service[] = _allServices.filter(s => s.enabled !== false);

// Full list including disabled services — for re-enabling later
export const allServices: Service[] = _allServices;

// Service Clusters for Internal Linking Strategy
export type ServiceCluster = 'interior' | 'exterior';

export const serviceClusters: Record<ServiceCluster, string[]> = {
  interior: ['carpet-cleaning', 'upholstery-cleaning', 'mattress-cleaning', 'stain-removal'],
  exterior: ['roof-cleaning', 'pressure-washing', 'driveway-cleaning', 'patio-cleaning', 'gutter-cleaning', 'window-cleaning', 'solar-panel-cleaning', 'conservatory-cleaning'],
};

export const clusterNames: Record<ServiceCluster, string> = {
  interior: 'Interior Cleaning',
  exterior: 'Exterior Cleaning',
};

// Helper functions following Interface Segregation Principle
export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getAllServiceSlugs = (): string[] => {
  return services.map(service => service.slug);
};

export const getServiceNavItems = () => {
  return services.map(service => ({
    label: service.name,
    href: `/services/${service.slug}`,
  }));
};

// Get the cluster a service belongs to
export const getServiceCluster = (serviceId: string): ServiceCluster | undefined => {
  if (serviceClusters.interior.includes(serviceId)) {
    return 'interior';
  }
  if (serviceClusters.exterior.includes(serviceId)) {
    return 'exterior';
  }
  return undefined;
};

// Get related services from the same cluster
export const getRelatedServices = (serviceId: string, limit?: number): Service[] => {
  const cluster = getServiceCluster(serviceId);
  if (!cluster) {
    return [];
  }

  const relatedIds = serviceClusters[cluster].filter(id => id !== serviceId);
  const related = relatedIds.map(id => getServiceById(id)).filter((s): s is Service => !!s);

  return limit ? related.slice(0, limit) : related;
};

// Get services from other clusters (for cross-cluster linking)
export const getCrossClusterServices = (serviceId: string, limit?: number): Service[] => {
  const cluster = getServiceCluster(serviceId);
  if (!cluster) {
    return [];
  }

  const otherCluster: ServiceCluster = cluster === 'interior' ? 'exterior' : 'interior';
  const crossIds = serviceClusters[otherCluster];
  const cross = crossIds.map(id => getServiceById(id)).filter((s): s is Service => !!s);

  return limit ? cross.slice(0, limit) : cross;
};

// Get other services (excluding current) - for location pages
export const getOtherServices = (serviceId: string): Service[] => {
  return services.filter(s => s.id !== serviceId);
};

// Get services by cluster
export const getServicesByCluster = (cluster: ServiceCluster): Service[] => {
  return serviceClusters[cluster]
    .map(id => getServiceById(id))
    .filter((s): s is Service => !!s);
};
