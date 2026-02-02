# Internal Linking Strategy - Aquapro Cleaning

## Site Architecture Overview

```
                                    HOME
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
              /services            /areas          /about, /contact
             (Hub Page)          (Hub Page)        (Trust Pages)
                    │                 │
        ┌───────────┼───────────┐     │
        │           │           │     │
   [Interior]  [Exterior]   [All]     │
    Cluster     Cluster   Services    │
        │           │                 │
        └─────┬─────┘                 │
              │                       │
        /services/[service]    /areas/[location]
         (7 pages)              (59 pages)
              │                       │
              └───────────┬───────────┘
                          │
                  /[service]/[location]
                     (413 pages)
                    "MONEY PAGES"
```

---

## Topical Clusters

### Cluster 1: Interior Cleaning (Fabric & Flooring)
Primary topic authority: **"carpet cleaning", "upholstery cleaning", "stain removal"**

| Service | Related Services | Semantic Connection |
|---------|-----------------|---------------------|
| Carpet & Rug Cleaning | Upholstery, Stain Removal | Same equipment, same visit, fabric cleaning |
| Sofa & Upholstery Cleaning | Carpet, Stain Removal | Fabric cleaning, pet stains, odours |
| Stain Removal | Carpet, Upholstery | Specialist add-on, problem-solving |

**Cross-linking logic:**
- Carpet page → "We also clean sofas and upholstery" → Upholstery page
- Carpet page → "Stubborn stains? See our stain removal service" → Stain Removal page
- Upholstery page → "Combine with carpet cleaning for best results" → Carpet page
- Stain Removal page → "Available for carpets and upholstery" → Both pages

### Cluster 2: Exterior Cleaning (Property Exterior)
Primary topic authority: **"roof cleaning", "pressure washing", "gutter cleaning", "window cleaning"**

| Service | Related Services | Semantic Connection |
|---------|-----------------|---------------------|
| Roof Cleaning & Moss Removal | Gutter Cleaning, Pressure Washing | Same visit, property exterior, access equipment |
| Pressure Washing | Roof Cleaning, Gutter Cleaning | External surfaces, driveways/patios |
| Gutter Cleaning | Roof Cleaning, Window Cleaning | Height access, property maintenance |
| Window Cleaning | Gutter Cleaning, Pressure Washing | External cleaning, regular maintenance |

**Cross-linking logic:**
- Roof page → "Include gutter clearing with your roof clean" → Gutter page
- Roof page → "We also clean driveways and patios" → Pressure Washing page
- Pressure Washing → "Combine with roof cleaning for full exterior refresh" → Roof page
- Gutter page → "Book with roof cleaning and save" → Roof page
- Window page → "Add gutter cleaning to your regular window clean" → Gutter page

### Cross-Cluster Links (Interior ↔ Exterior)
- Home page links to both clusters equally
- "Complete home cleaning" messaging links across clusters
- Bundle/package suggestions cross-link (e.g., "Moving home? Carpet + Window cleaning")

---

## Page-Level Linking Strategy

### 1. HOME PAGE (/)
**Role:** Ultimate authority distributor, entry point

**Must link to:**
- /services (prominent CTA)
- /areas (prominent CTA)
- All 7 individual service pages (service cards)
- /about (trust building)
- /contact (conversion)

**Current issue:** Service cards link to /contact instead of /services/[service]
**Fix:** Link to service pages, add separate "Get Quote" CTA

```
┌─────────────────────────────────────────────────────────┐
│                        HOME                              │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ Interior │  │ Exterior │  │  Areas   │               │
│  │ Services │  │ Services │  │   Hub    │               │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘               │
│       │             │             │                      │
│       ▼             ▼             ▼                      │
│  /services/    /services/     /areas                     │
│  carpet        roof                                      │
│  upholstery    pressure                                  │
│  stain         gutter                                    │
│                window                                    │
└─────────────────────────────────────────────────────────┘
```

### 2. SERVICES HUB (/services)
**Role:** Pillar page for all services, category organizer

**Must link to:**
- All 7 service detail pages (organized by cluster)
- /areas hub ("Find services in your area")
- Top locations for each service (optional)

**Link structure:**
```
/services
├── Interior Cleaning Section
│   ├── /services/carpet-cleaning
│   ├── /services/upholstery-cleaning
│   └── /services/stain-removal
│
├── Exterior Cleaning Section
│   ├── /services/roof-cleaning
│   ├── /services/pressure-washing
│   ├── /services/gutter-cleaning
│   └── /services/window-cleaning
│
└── "Find services in your area" → /areas
```

### 3. AREAS HUB (/areas)
**Role:** Pillar page for all locations, geographic organizer

**Must link to:**
- All 59 location pages
- /services hub ("View all our services")
- Service x Location quick links (existing - good)

**Link structure:**
```
/areas
├── Essex (County) → /areas/essex
├── All Towns (A-Z or by region)
│   ├── /areas/chelmsford
│   ├── /areas/southend-on-sea
│   └── ... (57 more)
│
├── "Browse by Service" section (existing)
│   └── Each service → all locations (413 links)
│
└── "View all our services" → /services
```

### 4. SERVICE DETAIL PAGES (/services/[service])
**Role:** Service authority page, conversion point

**Must link to:**
| Link Type | Destination | Purpose |
|-----------|-------------|---------|
| Breadcrumb | / → /services | Navigation + authority flow |
| Related Services | Other services in same cluster | Topical clustering |
| Cross-Cluster | 1-2 complementary services | User journey |
| Top Locations | /[service]/[location] × 8 | Local SEO |
| All Areas | /areas | Discovery |
| Service Hub | /services | Hub authority |

**Example for /services/carpet-cleaning:**
```
┌─────────────────────────────────────────────────────────┐
│           /services/carpet-cleaning                      │
│                                                          │
│  Breadcrumb: Home > Services > Carpet & Rug Cleaning    │
│                                                          │
│  [Main Content: Hero, Benefits, Process, FAQs]          │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  RELATED INTERIOR SERVICES (Cluster Links)      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │    │
│  │  │Upholstery│  │  Stain   │  │  [Empty] │      │    │
│  │  │ Cleaning │  │ Removal  │  │          │      │    │
│  │  └──────────┘  └──────────┘  └──────────┘      │    │
│  │  "Complete your interior clean"                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  AVAILABLE IN YOUR AREA                          │    │
│  │  Chelmsford | Southend | Colchester | Basildon  │    │
│  │  Brentwood | Harlow | Romford | Grays           │    │
│  │  → View all 59 locations                         │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ← Back to All Services                                  │
└─────────────────────────────────────────────────────────┘
```

### 5. LOCATION PAGES (/areas/[location])
**Role:** Location authority page, service discovery

**Must link to:**
| Link Type | Destination | Purpose |
|-----------|-------------|---------|
| Breadcrumb | / → /areas | Navigation |
| All Services | /[service]/[location] × 7 | Service discovery |
| Nearby Areas | /areas/[nearby] × 6 | Geographic clustering |
| Services Hub | /services | Cross-hub linking |
| Service Detail | /services/[service] (optional) | Deep info |

**Example for /areas/chelmsford:**
```
┌─────────────────────────────────────────────────────────┐
│              /areas/chelmsford                           │
│                                                          │
│  Breadcrumb: Home > Areas > Chelmsford                  │
│                                                          │
│  [Hero: "Cleaning Services in Chelmsford"]              │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  SERVICES AVAILABLE IN CHELMSFORD               │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │    │
│  │  │ Carpet   │  │ Sofa &   │  │  Stain   │      │    │
│  │  │ Cleaning │  │Upholstery│  │ Removal  │      │    │
│  │  │→/carpet- │  │→/uphol-  │  │→/stain-  │      │    │
│  │  │cleaning/ │  │stery-    │  │removal/  │      │    │
│  │  │chelmsford│  │cleaning/ │  │chelmsford│      │    │
│  │  │          │  │chelmsford│  │          │      │    │
│  │  └──────────┘  └──────────┘  └──────────┘      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │    │
│  │  │  Roof    │  │ Pressure │  │  Gutter  │      │    │
│  │  │ Cleaning │  │ Washing  │  │ Cleaning │      │    │
│  │  └──────────┘  └──────────┘  └──────────┘      │    │
│  │  ┌──────────┐                                   │    │
│  │  │ Window   │  → View all services              │    │
│  │  │ Cleaning │                                   │    │
│  │  └──────────┘                                   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  NEARBY AREAS WE COVER                          │    │
│  │  Braintree | Witham | Maldon | Billericay      │    │
│  │  Brentwood | Harlow                             │    │
│  │  → View all areas                               │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### 6. SERVICE × LOCATION PAGES (/[service]/[location])
**Role:** "Money pages" - highest conversion intent, local SEO targets

**Must link to:**
| Link Type | Destination | Purpose |
|-----------|-------------|---------|
| Breadcrumb | / → /services → /services/[service] | Authority flow UP |
| Same Service, Nearby | /[service]/[nearby] × 6 | Geographic cluster |
| Other Services, Same Location | /[other-service]/[location] × 6 | Service cluster |
| Parent Service | /services/[service] | Upward authority |
| Parent Location | /areas/[location] | Upward authority |

**This is the critical missing piece - these pages need BOTH:**
1. "Nearby areas" for same service (exists)
2. "Other services in [location]" (MISSING)

**Example for /carpet-cleaning/chelmsford:**
```
┌─────────────────────────────────────────────────────────┐
│           /carpet-cleaning/chelmsford                    │
│                                                          │
│  Breadcrumb: Home > Services > Carpet Cleaning >        │
│              Carpet Cleaning in Chelmsford              │
│                                                          │
│  [Hero, Value Prop, Process, FAQs, Reviews]             │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  OTHER SERVICES IN CHELMSFORD (NEW)             │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │    │
│  │  │Upholstery│  │  Stain   │  │  Roof    │      │    │
│  │  │→/uphol-  │  │→/stain-  │  │→/roof-   │      │    │
│  │  │stery-    │  │removal/  │  │cleaning/ │      │    │
│  │  │cleaning/ │  │chelmsford│  │chelmsford│      │    │
│  │  │chelmsford│  │          │  │          │      │    │
│  │  └──────────┘  └──────────┘  └──────────┘      │    │
│  │  "Book multiple services and save"              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  CARPET CLEANING NEARBY (EXISTS)                │    │
│  │  Braintree | Witham | Maldon | Billericay      │    │
│  │  Brentwood | Harlow                             │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ← More about Carpet Cleaning | All Chelmsford Services │
└─────────────────────────────────────────────────────────┘
```

---

## Link Equity Flow Diagram

```
                         ┌──────────┐
                         │   HOME   │ (100% authority)
                         └────┬─────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
     ┌──────────┐      ┌──────────┐      ┌──────────┐
     │ /services│◄────►│  /areas  │      │ /about   │
     │  (Hub)   │      │  (Hub)   │      │ /contact │
     └────┬─────┘      └────┬─────┘      └──────────┘
          │                 │                 ▲
          │ (7 links)       │ (59 links)      │
          ▼                 ▼                 │
   ┌─────────────┐   ┌─────────────┐          │
   │  /services/ │   │   /areas/   │          │
   │  [service]  │◄─►│ [location]  │──────────┘
   │  (7 pages)  │   │ (59 pages)  │
   └──────┬──────┘   └──────┬──────┘
          │                 │
          │  ┌──────────────┘
          │  │
          ▼  ▼
   ┌─────────────────┐
   │ /[service]/     │
   │ [location]      │
   │ (413 pages)     │
   │                 │
   │ Links UP to:    │
   │ - Parent service│
   │ - Parent area   │
   │                 │
   │ Links ACROSS:   │
   │ - Same service, │
   │   nearby areas  │
   │ - Same area,    │
   │   other services│
   └─────────────────┘

   ◄──► = Bidirectional link
   ───► = Unidirectional link
```

---

## Cluster Relationship Matrix

### Service Clusters - Linking Priority

| From \ To | Carpet | Upholstery | Stain | Roof | Pressure | Gutter | Window |
|-----------|--------|------------|-------|------|----------|--------|--------|
| **Carpet** | - | HIGH | HIGH | LOW | LOW | LOW | LOW |
| **Upholstery** | HIGH | - | HIGH | LOW | LOW | LOW | LOW |
| **Stain** | HIGH | HIGH | - | LOW | LOW | LOW | LOW |
| **Roof** | LOW | LOW | LOW | - | HIGH | HIGH | MED |
| **Pressure** | LOW | LOW | LOW | HIGH | - | MED | MED |
| **Gutter** | LOW | LOW | LOW | HIGH | MED | - | HIGH |
| **Window** | LOW | LOW | LOW | MED | MED | HIGH | - |

**HIGH** = Same cluster, always link
**MED** = Related, contextual link
**LOW** = Different cluster, link only on hub pages

### Location Clustering Logic

```javascript
// Nearby areas should be within ~15 miles and semantically related
// Priority: Same county > Adjacent towns > Same postcode prefix

Example for Chelmsford (CM1, CM2, CM3):
1. Writtle (CM1) - same postcode
2. Danbury (CM3) - same postcode
3. Braintree (CM7) - adjacent
4. Maldon (CM9) - adjacent
5. Witham (CM8) - adjacent
6. Brentwood (CM13) - nearby Essex
```

---

## Implementation Components Needed

### 1. RelatedServices Component
```tsx
// Shows related services from same cluster
// Used on: /services/[service], /[service]/[location]

type Props = {
  currentServiceId: string;
  location?: Location; // If provided, links to /[service]/[location]
};

// Logic:
// 1. Get current service cluster (interior/exterior)
// 2. Filter other services in same cluster
// 3. Add 1-2 cross-cluster services if relevant
// 4. Render as linked cards
```

### 2. ServiceLocationLinks Component
```tsx
// Shows other services available in same location
// Used on: /[service]/[location]

type Props = {
  currentServiceId: string;
  location: Location;
};

// Logic:
// 1. Get all services except current
// 2. Prioritize same-cluster services first
// 3. Link to /[service.slug]/[location.slug]
```

### 3. NearbyServicesFooter Component
```tsx
// Shows same service in nearby areas (already exists, needs enhancement)
// Used on: /[service]/[location]

type Props = {
  service: Service;
  location: Location;
};

// Already exists - just ensure it's deployed
```

### 4. CrossHubLinks Component
```tsx
// Links between /services and /areas hubs
// Used on: /services, /areas

// On /services: "Find these services in your area →"
// On /areas: "View all our services →"
```

### 5. ServiceClusterNav Component
```tsx
// Interior/Exterior cluster navigation
// Used on: /services hub page

// Renders:
// Interior Cleaning: Carpet | Upholstery | Stain Removal
// Exterior Cleaning: Roof | Pressure | Gutter | Window
```

---

## Anchor Text Strategy

### Vary anchor text naturally:

**For service links:**
- "carpet cleaning" (exact match)
- "professional carpet cleaners" (semantic)
- "our carpet cleaning service" (branded)
- "deep carpet cleaning" (long-tail)
- "Carpet & Rug Cleaning" (proper name)

**For location links:**
- "carpet cleaning in Chelmsford" (exact local)
- "Chelmsford" (location only)
- "our Chelmsford team" (branded local)
- "cleaning services in Chelmsford" (category local)

**For cross-links:**
- "also available: upholstery cleaning" (discovery)
- "combine with roof cleaning" (upsell)
- "nearby areas" (geographic)
- "all our services" (hub)

---

## Priority Implementation Order

### Phase 1: Fix Critical Gaps (High Impact)
1. ✅ Home page service cards → link to /services/[service]
2. ✅ Add ServiceLocationLinks to /[service]/[location] pages
3. ✅ Add RelatedServices to /services/[service] pages
4. ✅ Add cross-hub links (/services ↔ /areas)

### Phase 2: Enhance Clusters (Medium Impact)
5. Add ServiceClusterNav to /services hub
6. Add "Back to service" links on /[service]/[location]
7. Add "View all [location] services" on /[service]/[location]
8. Enhance breadcrumbs with proper hierarchy

### Phase 3: Polish & Optimize (Lower Impact)
9. Add contextual cross-cluster links
10. Implement varied anchor text
11. Add "bundle" suggestions
12. Review and audit link equity distribution

---

## Expected SEO Impact

| Metric | Current | Expected After |
|--------|---------|----------------|
| Avg. internal links per page | ~8 | ~15 |
| Pages per session | 1.8 | 3.0+ |
| Service page authority | Siloed | Clustered |
| Location page authority | Siloed | Connected |
| Money page link equity | Low | High (from multiple paths) |
| Topical relevance signals | Weak | Strong (cluster structure) |

---

## Link Audit Checklist

For each page type, verify:

- [ ] **Home**: Links to both hubs + all services + trust pages
- [ ] **/services**: Links to all 7 services organized by cluster + /areas
- [ ] **/areas**: Links to all 59 locations + /services
- [ ] **/services/[service]**: Related services + top locations + back to hub
- [ ] **/areas/[location]**: All services in location + nearby areas + back to hub
- [ ] **/[service]/[location]**: Other services same location + same service nearby areas + parent pages

---

## Summary

The optimal strategy creates a **"pillar and cluster"** model where:

1. **Home** distributes authority to two pillars
2. **/services** and **/areas** are bidirectionally linked pillars
3. Service detail pages cluster by Interior/Exterior
4. Location pages connect to all services
5. Money pages (service×location) receive links from FOUR directions:
   - Parent service page (topical authority)
   - Parent location page (geographic authority)
   - Same service, nearby areas (geographic cluster)
   - Same location, other services (topical cluster)

This creates maximum crawlability, topical authority, and link equity distribution.
