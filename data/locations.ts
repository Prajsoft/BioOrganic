export type LocationFaq = { q: string; a: string }
export type LocationTopPest = { serviceSlug: string; cityNote: string }

export const locations = [
  {
    slug: 'ghaziabad',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    metaTitle: 'Pest Control in Ghaziabad',
    metaDescription: 'Govt-licensed pest control in Ghaziabad – termites, cockroaches, bed bugs & more. Serving Indirapuram, Vasundhara, Vaishali. Call +91-9999266042.',
    address: '19, Block B, Rampuri, Surya Nagar, Ghaziabad UP 201011',
    uniqueText: "Ghaziabad is our home base and we have been serving its residents since 2016. We cover all major colonies from the high-rise apartments of Indirapuram and Vaishali to the independent houses of Raj Nagar Extension and Aditya World City. Our technicians are familiar with the specific pest pressures — particularly termites and mosquitoes — that come with the region's soil type and monsoon drainage patterns.",
    sectors: ['Indirapuram', 'Vasundhara', 'Vaishali', 'Raj Nagar', 'Kaushambi', 'Aditya World City'],
    coordinates: { lat: 28.6692, lng: 77.4538 },
    topPests: [
      {
        serviceSlug: 'termite-control',
        cityNote: "Ghaziabad's clay-rich soil is ideal for subterranean termite colonies. We have treated hundreds of homes here since 2016, including post-construction drill-fill-seal treatments for independent houses and pre-treatment for new builds.",
      },
      {
        serviceSlug: 'mosquito-control',
        cityNote: 'Seasonal waterlogging and proximity to low-lying areas make mosquito pressure above average in Ghaziabad, particularly in Raj Nagar and Kaushambi. We offer larvicidal treatment, fogging, and long-duration repellent mesh installation.',
      },
      {
        serviceSlug: 'cockroach-control',
        cityNote: 'Dense apartment colonies in Vaishali and Indirapuram see rapid cockroach spread through shared drainage lines. Our gel-bait treatment eliminates infestations without requiring residents to vacate.',
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'How much does termite treatment cost in Ghaziabad?',
        a: 'Termite treatment in Ghaziabad starts at approximately ₹2,500 for a single room and is priced based on total area and infestation severity. All treatments include a written 3-year warranty with free retreatment.',
      },
      {
        q: 'Do you offer same-day pest control in Ghaziabad?',
        a: 'Yes. Since Ghaziabad is our home base, we can typically dispatch a technician the same day for urgent requests. Call or WhatsApp us before noon for best availability.',
      },
      {
        q: 'Do you serve independent houses and builder floors in Raj Nagar Extension?',
        a: 'Yes, we regularly treat independent houses, builder floors, and villa plots across Raj Nagar Extension and Aditya World City. Our technicians are familiar with the common pest entry points in ground-floor properties with open gardens.',
      },
      {
        q: 'Is the cockroach gel treatment safe for kitchens in Ghaziabad homes?',
        a: 'Yes. Our gel-bait treatment is applied in cracks and crevices — not sprayed on surfaces — making it safe for use in active kitchens with no requirement to vacate or cover food items beyond standard precautions.',
      },
      {
        q: 'Do you offer Annual Maintenance Contracts (AMC) for housing societies in Ghaziabad?',
        a: 'Yes. We offer AMC plans for residential societies across Ghaziabad covering all common areas and individual flats. Plans include scheduled quarterly or bi-monthly visits and priority emergency response.',
      },
    ] satisfies LocationFaq[],
  },
  {
    slug: 'noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    metaTitle: 'Pest Control in Noida',
    metaDescription: 'Professional pest control in Noida – cockroach, termite, bed bug & mosquito treatment. Serving Sector 18, 62, 137, 150. Call +91-9999266042.',
    address: 'C-99, IInd Floor, Sector 63, Noida 201301',
    uniqueText: "Noida's dense mix of high-rise residential towers, IT parks, and commercial hubs demands pest management that is discreet, fast, and safe for occupied spaces. We regularly service apartments in Sector 137 and Sector 150 as well as corporate offices in the Sector 62–63 IT corridor. Our gel-based and non-spray treatments are specifically suited to Noida's modern apartment layouts where traditional fogging is not practical.",
    sectors: ['Sector 62', 'Sector 63', 'Sector 18', 'Sector 137', 'Sector 150', 'Sector 168'],
    coordinates: { lat: 28.5355, lng: 77.3910 },
    topPests: [
      {
        serviceSlug: 'cockroach-control',
        cityNote: "Noida's high-rise apartment blocks share drainage infrastructure, making cockroach infestations spread floor-to-floor rapidly. Our odourless gel treatment works within 48 hours with no need to vacate — ideal for occupied flats.",
      },
      {
        serviceSlug: 'bed-bug-control',
        cityNote: 'Bed bugs are a growing problem in Noida rental apartments, especially in furnished flats in Sector 18 and Sector 62 near IT parks. We use heat-assisted treatment combined with targeted chemical application for thorough elimination.',
      },
      {
        serviceSlug: 'termite-control',
        cityNote: 'New-construction apartments in Sectors 137 and 150 frequently show termite activity in false ceilings and skirting within the first two years. We offer both pre- and post-construction termite treatment with a 3-year written warranty.',
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'How much does bed bug treatment cost in Noida?',
        a: 'Bed bug treatment in Noida is priced per room, starting at approximately ₹1,500 per room for a 1BHK. The final cost depends on the extent of infestation and number of rooms. All treatments carry a 1-year warranty.',
      },
      {
        q: 'Do you offer pest control in high-rise apartment buildings in Noida?',
        a: 'Yes. We routinely treat apartments in multi-storey towers across Noida including towers in Sector 137, Sector 150, and Sector 168. We use gel-bait and non-spray methods that are practical and safe for shared high-rise buildings.',
      },
      {
        q: 'How quickly can you respond to a pest emergency in Noida?',
        a: 'For urgent cases we aim to dispatch a technician within 4–6 hours during working hours (9am–7pm). Call us directly for the fastest response — WhatsApp works for non-urgent bookings.',
      },
      {
        q: 'Is cockroach gel treatment available in Noida?',
        a: 'Yes, gel-bait cockroach treatment is our standard method for apartments in Noida. It is odourless, requires no fogging or vacating, and starts eliminating cockroaches within 24–48 hours.',
      },
      {
        q: 'Do you treat offices and commercial spaces in Sector 62 and Sector 63?',
        a: 'Yes. We regularly serve IT offices, co-working spaces, and commercial units in the Sector 62–63 corridor. We schedule treatments during off-hours to avoid disruption and provide documentation for building management.',
      },
    ] satisfies LocationFaq[],
  },
  {
    slug: 'greater-noida',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    metaTitle: 'Pest Control in Greater Noida',
    metaDescription: 'Pest control in Greater Noida – termites, cockroaches, bed bugs & more. Serving Alpha, Beta, Gamma, Delta sectors. Call +91-9999266042.',
    address: 'H-74, IInd Floor, Beta-2, Greater Noida',
    uniqueText: "Greater Noida's planned sectors and new-construction housing societies are particularly vulnerable to wood borer and termite infestations due to the large amount of fresh woodwork installed during fit-outs. We have treated hundreds of homes across Alpha, Beta, Gamma, and Omicron sectors. Our team covers the entire Greater Noida West and Yamuna Expressway corridor with same-day booking available.",
    sectors: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Omicron', 'Zeta'],
    coordinates: { lat: 28.4744, lng: 77.5040 },
    topPests: [
      {
        serviceSlug: 'termite-control',
        cityNote: "New-construction homes in Greater Noida's planned sectors are high-risk for termite infestation within the first 3–5 years. Fresh woodwork, plywood, and MDF panels are particularly vulnerable. We offer post-construction termite treatment with a 3-year warranty.",
      },
      {
        serviceSlug: 'wood-borer-control',
        cityNote: "Wood borer beetles frequently attack new furniture and door frames in Greater Noida's recently built apartments. We treat active infestations with targeted injection and spray, stopping further damage and preventing reoccurrence.",
      },
      {
        serviceSlug: 'cockroach-control',
        cityNote: "Greater Noida's newer housing societies often have construction debris in common areas that harbour cockroaches during the initial years. Our gel treatment covers kitchens, bathrooms, and common-area risers effectively.",
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'Do you offer termite treatment for newly built flats in Greater Noida?',
        a: 'Yes. Post-construction termite treatment is one of our most common services in Greater Noida. We use the drill-fill-seal method to create a chemical barrier in floors and walls, backed by a 3-year written warranty.',
      },
      {
        q: 'How much does wood borer treatment cost in Greater Noida?',
        a: 'Wood borer treatment in Greater Noida starts at ₹1,500 for individual furniture items and is priced by the number of pieces and degree of infestation. Full-room treatments for floors and doors are priced based on area.',
      },
      {
        q: 'Do you cover Greater Noida West (Noida Extension)?',
        a: 'Yes. We cover both Greater Noida sectors (Alpha, Beta, Gamma, Delta, Omicron, Zeta) and Greater Noida West including Gaur City, Crossing Republik, and adjoining sectors. Same-day bookings are available across the corridor.',
      },
      {
        q: 'What is pre-construction anti-termite treatment and is it available in Greater Noida?',
        a: 'Pre-construction termite treatment is applied during the construction phase — to the soil and foundation before the slab is laid. It creates a long-lasting chemical barrier under the structure. We offer this service in Greater Noida for builders and individual plot owners.',
      },
      {
        q: 'How long does termite treatment warranty last in Greater Noida?',
        a: 'Our termite treatment in Greater Noida carries a 3-year written warranty. Within the warranty period, if termites reappear, we retreate the affected area at no additional cost.',
      },
    ] satisfies LocationFaq[],
  },
  {
    slug: 'indirapuram',
    city: 'Indirapuram',
    state: 'Uttar Pradesh',
    metaTitle: 'Pest Control in Indirapuram',
    metaDescription: 'Pest control in Indirapuram Ghaziabad – cockroach, termite & bed bug treatment. Ahinsa Khand, Nyay Khand, Shakti Khand. Call +91-9999266042.',
    address: 'Indirapuram, Ghaziabad UP 201014',
    uniqueText: "Indirapuram is one of our most active service areas with a high density of multi-storey apartment complexes. We work with housing societies across Ahinsa Khand, Nyay Khand, and Shipra Sun City for both individual flat treatments and full-building AMC contracts. The proximity to the Hindon riverbed means mosquito pressure here is above average during monsoon months, and we offer targeted larvicidal and fogging programmes to address it.",
    sectors: ['Ahinsa Khand 1', 'Ahinsa Khand 2', 'Nyay Khand', 'Shakti Khand', 'Shipra Sun City'],
    coordinates: { lat: 28.6412, lng: 77.3736 },
    topPests: [
      {
        serviceSlug: 'mosquito-control',
        cityNote: "Indirapuram's proximity to the Hindon riverbed creates elevated mosquito breeding conditions, especially during and after the monsoon. We offer larvicidal tank treatment, residual spray, and fogging specifically designed for apartment societies.",
      },
      {
        serviceSlug: 'cockroach-control',
        cityNote: "High-density apartment towers in Ahinsa Khand and Nyay Khand share drainage risers that allow cockroaches to travel freely between floors. Society-wide gel-bait treatment eliminates the colony rather than just individual flats.",
      },
      {
        serviceSlug: 'bed-bug-control',
        cityNote: 'Bed bug cases in Indirapuram have increased with second-hand furniture purchases. Our treatment is effective even in fully furnished apartments — no dismantling required.',
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'Do you offer mosquito control for housing societies in Indirapuram?',
        a: 'Yes. We offer society-level mosquito control in Indirapuram covering overhead water tanks (larvicidal treatment), common areas (residual spray), and surrounding green belts (fogging). Bulk-society pricing is available for AMC contracts.',
      },
      {
        q: 'How much does cockroach treatment cost in Indirapuram?',
        a: 'Cockroach gel treatment in Indirapuram starts at ₹800 for a 1BHK. Prices are based on flat size. For full-society treatments the per-flat rate is lower. All treatments include a 1-year warranty.',
      },
      {
        q: 'Do you provide AMC plans for housing societies in Ahinsa Khand?',
        a: 'Yes. Several housing societies in Ahinsa Khand 1 and 2 are on our Annual Maintenance Contract. The AMC covers scheduled visits for common areas, lift lobbies, basements, and gardens with priority response for individual flat calls.',
      },
      {
        q: 'How quickly can you come for bed bug treatment in Indirapuram?',
        a: 'We typically schedule bed bug treatment in Indirapuram within 24 hours of enquiry. For urgent cases, same-day service is available. Call us before noon for the best chance of a same-day slot.',
      },
      {
        q: 'Is the treatment safe for apartments with children and elderly residents?',
        a: 'Yes. All products we use in Indirapuram are BIS-approved and non-toxic. Gel-bait treatments require no vacating. For spray treatments we recommend staying out for 2 hours after application — your technician will advise you on the day.',
      },
    ] satisfies LocationFaq[],
  },
  {
    slug: 'noida-extension',
    city: 'Noida Extension',
    state: 'Uttar Pradesh',
    metaTitle: 'Pest Control in Noida Extension',
    metaDescription: 'Pest control in Noida Extension & Gaur City – termite, cockroach, bed bug treatment. Crossing Republik, Sector 16. Call +91-9999266042.',
    address: 'Panchsheel Green-2 Market, Sector 16, Noida Extension 201009',
    uniqueText: "Noida Extension, also known as Greater Noida West, has seen a rapid rise in residential projects over the past decade. New constructions often bring unseen pest problems — from termites in freshly installed woodwork to rodents nesting in unfinished common areas. We serve all major societies in Gaur City, Crossing Republik, and the numbered sectors, and offer new-home pre-treatment packages that protect your property from day one.",
    sectors: ['Gaur City', 'Sector 1', 'Sector 4', 'Sector 16', 'Crossing Republik'],
    coordinates: { lat: 28.6219, lng: 77.4371 },
    topPests: [
      {
        serviceSlug: 'termite-control',
        cityNote: "Noida Extension's rapid construction means many flats are handed over with untreated woodwork. Termites establish colonies within the first 1–3 years. We offer post-possession anti-termite treatment with a 3-year warranty.",
      },
      {
        serviceSlug: 'rodent-control',
        cityNote: "Unfinished common areas and construction debris in newer Noida Extension societies provide ideal nesting conditions for rodents. We use tamper-proof bait stations and exclusion techniques suited to partially occupied buildings.",
      },
      {
        serviceSlug: 'cockroach-control',
        cityNote: "New builds in Gaur City and Crossing Republik frequently have cockroaches nesting in construction gaps inside walls. Our gel-bait treatment targets these hidden colonies without the need for intrusive drilling.",
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'Do you treat termites in newly built flats in Noida Extension?',
        a: 'Yes. Post-construction termite treatment is one of our most requested services in Noida Extension. We drill into the slab perimeter and walls, inject BIS-approved termiticide, and seal the holes — providing a 3-year written warranty.',
      },
      {
        q: 'Do you cover Gaur City and Crossing Republik?',
        a: 'Yes. We actively serve Gaur City (all phases), Crossing Republik, Panchsheel Green, and all numbered sectors of Noida Extension. Call or WhatsApp us to confirm availability for your specific society.',
      },
      {
        q: 'Do you offer new-home pest pre-treatment packages in Noida Extension?',
        a: "Yes. Our new-home package covers anti-termite treatment, cockroach gel application, and rodent-proofing of entry points — all done before you move furniture in. It's the most effective way to start pest-free.",
      },
      {
        q: 'How much does rodent control cost in Noida Extension?',
        a: 'Rodent control in Noida Extension is priced based on property size and severity, starting at ₹1,500 for a standard flat. For buildings with active rodent colonies, we recommend a 2–3 visit programme with bait station monitoring.',
      },
      {
        q: 'Can you treat a flat that is still under possession or not fully furnished?',
        a: 'Yes. We prefer treating flats before furniture is installed as it gives better access for termite and cockroach treatment. We can coordinate with builders or housing society offices to schedule access.',
      },
    ] satisfies LocationFaq[],
  },
  {
    slug: 'east-delhi',
    city: 'East Delhi',
    state: 'Delhi',
    metaTitle: 'Pest Control in East Delhi',
    metaDescription: 'Pest control in East Delhi – cockroach, termite, bed bug & mosquito treatment. Mayur Vihar, Preet Vihar, Patparganj. Call +91-9999266042.',
    address: 'East Delhi, Delhi 110091',
    uniqueText: "East Delhi's older residential colonies and dense market areas create persistent pest challenges — particularly cockroaches in kitchens, termites in aging woodwork, and rodents in ground-floor shops and warehouses. We serve Mayur Vihar Phases 1–3, Preet Vihar, Vasundhara Enclave, and Laxmi Nagar with prompt response times. Our odourless, non-toxic treatments are well suited to the closely spaced homes typical of East Delhi neighbourhoods.",
    sectors: ['Mayur Vihar', 'Preet Vihar', 'Vasundhara Enclave', 'Patparganj', 'Laxmi Nagar'],
    coordinates: { lat: 28.6280, lng: 77.2957 },
    topPests: [
      {
        serviceSlug: 'cockroach-control',
        cityNote: "East Delhi's older kitchens and dense market-adjacent housing have some of the highest cockroach infestation rates we see. Our odourless gel treatment is effective even in fully occupied properties with no downtime required.",
      },
      {
        serviceSlug: 'termite-control',
        cityNote: "Aging woodwork in older colonies across Mayur Vihar and Preet Vihar is highly vulnerable to termite attack. We use a combination of chemical barrier and wood treatment to stop active termite damage and prevent recurrence.",
      },
      {
        serviceSlug: 'rodent-control',
        cityNote: "Ground-floor shops, warehouses, and eateries in Laxmi Nagar and Patparganj routinely deal with rodent pressure. We provide commercial-grade bait stations, entry-point sealing, and follow-up monitoring visits.",
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'Do you offer cockroach treatment in Mayur Vihar?',
        a: 'Yes. Mayur Vihar Phases 1, 2, and 3 are among our active service areas in East Delhi. We provide gel-bait cockroach treatment for apartments and independent homes, with same-day service available on request.',
      },
      {
        q: 'How much does termite treatment cost in East Delhi?',
        a: 'Termite treatment in East Delhi starts at ₹2,500 for a single room and increases based on area. For older properties with established infestations, we recommend a full-property assessment before quoting. All work carries a 3-year warranty.',
      },
      {
        q: 'Do you serve ground-floor shops and warehouses in Laxmi Nagar?',
        a: 'Yes. We regularly treat commercial properties in Laxmi Nagar including shops, godowns, and small warehouses. We can schedule treatments during non-business hours and provide service documentation.',
      },
      {
        q: 'Is your treatment safe for kitchens and food storage areas in East Delhi homes?',
        a: 'Yes. We use BIS-approved, food-safe formulations for kitchen treatments. Gel-bait requires no clearing of kitchen shelves. For spray treatments, we recommend covering food items and staying out for 2 hours — your technician will guide you.',
      },
      {
        q: 'Do you cover Preet Vihar and Vasundhara Enclave?',
        a: 'Yes. Both Preet Vihar and Vasundhara Enclave are fully covered. We typically serve East Delhi calls within the same business day. Call us for fastest booking.',
      },
    ] satisfies LocationFaq[],
  },
  {
    slug: 'vaishali',
    city: 'Vaishali',
    state: 'Uttar Pradesh',
    metaTitle: 'Pest Control in Vaishali Ghaziabad',
    metaDescription: 'Pest control in Vaishali Ghaziabad – termite, cockroach & bed bug treatment. All sectors covered. Call +91-9999266042.',
    address: 'Vaishali, Ghaziabad UP 201010',
    uniqueText: "Vaishali is a well-established residential township where we have built strong relationships with residents and housing societies across all six sectors. We find that the older construction stock in Sectors 3 and 4 often harbours established termite colonies requiring thorough anti-termite treatment, while the newer high-rises in Sector 1 and 6 more commonly deal with cockroach and bed bug issues. Our team responds to Vaishali calls within the same day for urgent treatments.",
    sectors: ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6'],
    coordinates: { lat: 28.6454, lng: 77.3392 },
    topPests: [
      {
        serviceSlug: 'termite-control',
        cityNote: "Older construction in Vaishali Sectors 3 and 4 frequently has established termite colonies in walls and floors. We carry out thorough chemical barrier treatments and follow up within the 3-year warranty period at no extra charge.",
      },
      {
        serviceSlug: 'cockroach-control',
        cityNote: "Newer high-rise blocks in Vaishali Sectors 1 and 6 see cockroach movement through shared drainage. Society-wide gel application prevents re-infestation from adjacent flats — we work with RWAs on coordinated treatments.",
      },
      {
        serviceSlug: 'bed-bug-control',
        cityNote: 'Bed bug infestations in Vaishali are often traced to second-hand furniture or visiting guests. Our treatment reaches bed bugs in mattress seams, headboards, and wall cracks for complete elimination with a 1-year warranty.',
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'Do you offer termite treatment for older flats in Vaishali?',
        a: "Yes. Older properties in Vaishali Sectors 3 and 4 often have long-standing termite infestations. We assess the full extent of damage before treatment and use a drill-fill-seal method to eliminate the colony. A 3-year written warranty is included.",
      },
      {
        q: 'How much does bed bug treatment cost in Vaishali?',
        a: 'Bed bug treatment in Vaishali starts at ₹1,500 per room. A standard 2BHK flat treatment costs approximately ₹3,000–₹4,000 depending on infestation level. All treatments include a 1-year warranty.',
      },
      {
        q: 'Do you cover all six sectors of Vaishali?',
        a: 'Yes. We cover all sectors of Vaishali township — Sector 1 through Sector 6. Response time is typically within the same business day.',
      },
      {
        q: 'Can you treat a 3BHK apartment for cockroaches in Vaishali without vacating?',
        a: 'Yes. Our gel-bait cockroach treatment requires no vacating and causes no disruption. The treatment takes 30–45 minutes for a 3BHK and starts working within 24–48 hours.',
      },
      {
        q: 'Do you work with RWAs for society-level pest control in Vaishali?',
        a: 'Yes. We have existing relationships with several RWAs in Vaishali for AMC contracts covering common areas, basements, and coordinated flat treatments. Contact us to discuss society-level pricing.',
      },
    ] satisfies LocationFaq[],
  },
  {
    slug: 'vasundhara',
    city: 'Vasundhara',
    state: 'Uttar Pradesh',
    metaTitle: 'Pest Control in Vasundhara Ghaziabad',
    metaDescription: 'Pest control in Vasundhara Ghaziabad – termite, cockroach, mosquito treatment. Sectors 1–14 covered. Call +91-9999266042.',
    address: 'Vasundhara, Ghaziabad UP 201012',
    uniqueText: "Vasundhara's mix of independent builder floors and apartment complexes means pest pressures vary significantly by property type. Ground-floor flats and builder floors with gardens are more prone to rodent and ant issues, while upper floors tend to see cockroach and mosquito problems. We tailor our treatment approach accordingly and have been a trusted name in Sectors 1, 2, 4, 5, 7, and 14 for nearly a decade.",
    sectors: ['Sector 1', 'Sector 2', 'Sector 4', 'Sector 5', 'Sector 7', 'Sector 14'],
    coordinates: { lat: 28.6565, lng: 77.3695 },
    topPests: [
      {
        serviceSlug: 'rodent-control',
        cityNote: "Ground-floor builder floors and properties with gardens in Vasundhara regularly see rodent activity, especially during monsoon when waterlogging displaces colonies. We use tamper-proof bait stations and physical exclusion to give lasting results.",
      },
      {
        serviceSlug: 'cockroach-control',
        cityNote: "Upper-floor apartments in Vasundhara apartment blocks see cockroaches travelling through drainage risers. Our gel treatment targets both the visible insects and the colony at source — effective within 48 hours.",
      },
      {
        serviceSlug: 'mosquito-control',
        cityNote: 'Vasundhara gardens and open green areas accumulate stagnant water after rain, creating mosquito breeding spots. We treat water bodies, drains, and green belt areas with larvicide and residual spray for lasting protection.',
      },
    ] satisfies LocationTopPest[],
    faqs: [
      {
        q: 'Do you offer rodent control for builder floors in Vasundhara?',
        a: 'Yes. Builder floors and independent houses with gardens in Vasundhara are one of our most common rodent treatment scenarios. We identify entry points, install bait stations, and seal gaps to prevent re-entry — with follow-up visits included.',
      },
      {
        q: 'How much does mosquito fogging cost in Vasundhara?',
        a: 'Mosquito fogging in Vasundhara is priced based on the area to be treated. A standard flat or garden starts at ₹500. Society-level fogging covering common areas and gardens is available at bulk rates under an AMC plan.',
      },
      {
        q: 'Do you cover all sectors of Vasundhara including Sectors 7 and 14?',
        a: 'Yes. We cover all sectors of Vasundhara including Sectors 1, 2, 4, 5, 7, and 14. If your sector is not listed, call us — our coverage extends to the entire Vasundhara township.',
      },
      {
        q: 'Is cockroach gel treatment available for apartments in Vasundhara?',
        a: 'Yes. Gel-bait treatment is our standard approach for apartments in Vasundhara. It is odourless, does not require vacating, and is safe for homes with children, pets, and elderly residents.',
      },
      {
        q: 'Can you treat a garden flat for ants and rodents together in Vasundhara?',
        a: 'Yes. We offer combined treatments covering multiple pest types in a single visit. For garden flats in Vasundhara, a common combination is ant control (perimeter spray) + rodent control (bait stations + exclusion) in one appointment.',
      },
    ] satisfies LocationFaq[],
  },
]
