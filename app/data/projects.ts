/*
 * PLACEHOLDER CASE STUDIES -- the shape is real, the projects are not. Client
 * names, locations, dates and figures are invented and must be replaced with
 * real, permissioned work before launch.
 *
 * Note the `testimonial` field is intentionally left unset on every entry. A
 * fabricated quote attributed to a named person at a named company is a
 * different kind of placeholder from invented body copy, so the type supports
 * testimonials and the page renders them, but none ship.
 */

export interface Project {
    slug: string
    title: string
    category: 'Commercial' | 'Residential' | 'Industrial' | 'Renovation'
    client: string
    location: string
    /** Completion year, as a string so it renders unformatted. */
    year: string
    duration: string
    size: string
    /** Slugs from services.ts. Drives the cross-links in both directions. */
    services: string[]
    image: string
    imageAlt: string
    /** Additional images for the case-study gallery. */
    gallery: {src: string, alt: string}[]
    /** One line, used on cards and as the meta description. */
    summary: string
    challenge: string
    solution: string
    outcome: string
    /** Two to four headline figures for the case study. */
    facts: {value: string, label: string}[]
    testimonial?: {quote: string, name: string, role: string}
}

export const projects: Project[] = [
    {
        slug: 'meridian-office-tower',
        title: 'Meridian Office Tower',
        category: 'Commercial',
        client: 'Meridian Property Group',
        location: 'Springfield, IL',
        year: '2024',
        duration: '26 months',
        size: '184,000 sq ft',
        services: ['foundations', 'structural'],
        image: '/img/office.jpg',
        imageAlt: 'Glazed office tower photographed from street level',
        gallery: [
            {src: '/img/structural.jpg', alt: 'Steel frame during erection'},
            {src: '/img/foundations.jpg', alt: 'Piled raft foundation before the pour'},
        ],
        summary:
            'A fourteen-storey speculative office building delivered on a constrained '
            + 'city-centre plot with live rail infrastructure on two boundaries.',
        challenge:
            'The plot sat between an operational rail cutting and a Victorian terrace, '
            + 'leaving no room for a conventional crane base or a full site compound. '
            + 'Ground conditions were made ground over stiff clay, with a perched water '
            + 'table two metres below the proposed slab.',
        solution:
            'We took the substructure to a piled raft, cast against the retained face '
            + 'rather than in open cut, which removed the need to encroach on the rail '
            + 'boundary entirely. The frame was erected using a luffing jib tower crane '
            + 'placed inside the footprint and climbed with the structure, and deliveries '
            + 'ran to a booked slot system between 06:00 and 09:00 to keep the terrace '
            + 'street clear the rest of the day.',
        outcome:
            'Practical completion was achieved two weeks inside the contract date with no '
            + 'reportable incidents and no encroachment notices from the rail operator. '
            + 'The building let to seventy percent occupancy before handover.',
        facts: [
            {value: '14', label: 'Storeys'},
            {value: '184k', label: 'Sq ft delivered'},
            {value: '26', label: 'Months on site'},
            {value: '0', label: 'Reportable incidents'},
        ],
    },
    {
        slug: 'harbour-point-residences',
        title: 'Harbour Point Residences',
        category: 'Residential',
        client: 'Harbour Point Development',
        location: 'Decatur, IL',
        year: '2023',
        duration: '19 months',
        size: '96 units',
        services: ['electrical', 'renovation'],
        image: '/img/residential.jpg',
        imageAlt: 'Residential apartment complex with balconies',
        gallery: [
            {src: '/img/electrical.jpg', alt: 'Distribution board installation in a plant room'},
            {src: '/img/renovation.avif', alt: 'Completed apartment interior'},
        ],
        summary:
            'Ninety-six apartments across four blocks, taken from frame handover to '
            + 'occupied in nineteen months on a fixed-price package.',
        challenge:
            'The developer needed a single package covering electrical services and the '
            + 'entire fit-out, with a phased handover so the first block could be let '
            + 'while the last was still being finished. Any drift in the early blocks '
            + 'would compound across the sequence.',
        solution:
            'We ran the four blocks as four overlapping programmes rather than one long '
            + 'one, with a dedicated first-fix crew moving through ahead of a finishing '
            + 'crew. Distribution was pre-assembled off site so each block\'s plant room '
            + 'could be energised in a single day rather than a fortnight.',
        outcome:
            'The first block handed over at month eleven and was fully let before the '
            + 'final block completed. All ninety-six units passed local authority '
            + 'inspection at first visit.',
        facts: [
            {value: '96', label: 'Units delivered'},
            {value: '4', label: 'Phased handovers'},
            {value: '19', label: 'Months on site'},
            {value: '100%', label: 'First-visit pass rate'},
        ],
    },
    {
        slug: 'northgate-industrial-park',
        title: 'Northgate Industrial Park',
        category: 'Industrial',
        client: 'Northgate Logistics',
        location: 'Bloomington, IL',
        year: '2024',
        duration: '14 months',
        size: '240,000 sq ft',
        services: ['foundations', 'electrical'],
        image: '/img/industrial.jpg',
        imageAlt: 'Interior of a large industrial distribution facility',
        gallery: [
            {src: '/img/foundations.jpg', alt: 'Power-floated warehouse slab'},
            {src: '/img/electrical.jpg', alt: 'Three-phase industrial power installation'},
        ],
        summary:
            'A distribution facility with a laser-levelled slab and three-phase power '
            + 'sized for automated handling equipment installed after handover.',
        challenge:
            'The slab had to meet a flatness tolerance tight enough for very-narrow-aisle '
            + 'racking, over a footprint of 240,000 square feet, on a site that had '
            + 'previously been agricultural and drained badly. The tenant\'s automation '
            + 'contractor also needed final power positions that were not confirmed until '
            + 'month nine.',
        solution:
            'We ground-stabilised the platform and installed an attenuation system before '
            + 'any slab work, then poured in laser-screeded bays with flatness surveyed bay '
            + 'by bay rather than at completion. Power was installed as an overhead busbar '
            + 'grid rather than fixed drops, so the automation contractor\'s late positions '
            + 'became a tap-off exercise instead of a rewire.',
        outcome:
            'Every bay met the specified flatness classification on first survey. The '
            + 'tenant\'s automation fit-out started four days after handover.',
        facts: [
            {value: '240k', label: 'Sq ft of slab'},
            {value: '14', label: 'Months on site'},
            {value: '100%', label: 'Bays passed first survey'},
            {value: '4 days', label: 'Handover to fit-out'},
        ],
    },
    {
        slug: 'ashcombe-house',
        title: 'Ashcombe House',
        category: 'Renovation',
        client: 'Private client',
        location: 'Springfield, IL',
        year: '2025',
        duration: '11 months',
        size: '7,400 sq ft',
        services: ['renovation', 'structural'],
        image: '/img/luxury.jpg',
        imageAlt: 'Renovated luxury interior with bespoke joinery',
        gallery: [
            {src: '/img/renovation.avif', alt: 'Finishing works in progress'},
            {src: '/img/structural.jpg', alt: 'Steel beam installed to open up a ground floor'},
        ],
        summary:
            'A full renovation of a 1920s residence, opening up the ground floor while '
            + 'retaining and restoring the original stair, panelling and plasterwork.',
        challenge:
            'The client wanted a contemporary open ground floor inside a house whose value '
            + 'lay in its period detail. Three load-bearing walls needed to come out, and '
            + 'the original lath-and-plaster ceilings above them had to survive the process '
            + 'intact.',
        solution:
            'The temporary works were designed to prop off the floor above at close centres '
            + 'so the ceilings were supported continuously rather than spanning between '
            + 'props. Beams went in one at a time over eight weeks, with movement monitored '
            + 'weekly. Panelling and cornice were removed, catalogued, restored off site and '
            + 'reinstated.',
        outcome:
            'All three walls were removed with no cracking to the retained ceilings. The '
            + 'restored joinery was reinstated to its original positions.',
        facts: [
            {value: '3', label: 'Walls removed'},
            {value: '7,400', label: 'Sq ft renovated'},
            {value: '11', label: 'Months on site'},
            {value: '0mm', label: 'Recorded movement'},
        ],
    },
    {
        slug: 'crescent-retail-centre',
        title: 'Crescent Retail Centre',
        category: 'Commercial',
        client: 'Crescent Asset Management',
        location: 'Champaign, IL',
        year: '2023',
        duration: '22 months',
        size: '310,000 sq ft',
        services: ['structural', 'renovation'],
        image: '/img/shopping-mall.jpg',
        imageAlt: 'Interior atrium of a modern shopping centre',
        gallery: [
            {src: '/img/structural.jpg', alt: 'Structural alterations to the atrium frame'},
            {src: '/img/office.jpg', alt: 'Completed commercial interior'},
        ],
        summary:
            'Structural remodelling and full refurbishment of a trading retail centre, '
            + 'delivered in phases without closing the centre for a single day.',
        challenge:
            'The centre remained open to the public throughout. The work involved cutting a '
            + 'new atrium through two floor plates directly above the busiest circulation '
            + 'route, and every phase had to be handed back clean and safe by 09:00.',
        solution:
            'Work ran in a nightly window with a full hoarding line erected and struck each '
            + 'shift. The atrium was cut in eleven segments, each propped, cut, trimmed and '
            + 'made safe within a single window. Dust and noise were monitored continuously '
            + 'against limits agreed with the tenants in advance.',
        outcome:
            'Twenty-two months of structural and finishing work with zero unplanned trading '
            + 'hours lost, and no tenant compensation claims.',
        facts: [
            {value: '310k', label: 'Sq ft refurbished'},
            {value: '0', label: 'Trading days lost'},
            {value: '11', label: 'Atrium cut segments'},
            {value: '22', label: 'Months on site'},
        ],
    },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const projectsForService = (serviceSlug: string) =>
    projects.filter((p) => p.services.includes(serviceSlug))

export const projectCategories = [
    'All', 'Commercial', 'Residential', 'Industrial', 'Renovation',
] as const
