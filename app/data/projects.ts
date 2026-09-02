/*
 * PLACEHOLDER CASE STUDIES -- the shape is real, the projects are not. Client
 * names, locations, dates and figures are invented and must be replaced with
 * real, permissioned work before launch.
 *
 * TESTIMONIALS ARE FABRICATED. Every quote, name and role below is invented,
 * attributed to the invented client companies in this same file. They were
 * added deliberately so the case-study layout can be seen with its quote block
 * populated -- they are placeholder copy, not statements anyone made.
 *
 * This is the highest-risk placeholder in the repository, and more so now that
 * the company address and phone number are real: invented body copy reads as
 * marketing, but an invented quote attributed to a named person at a named
 * company reads as a claim that a specific individual said a specific thing.
 * Replace or delete every one before the site goes live, and only publish a
 * real quote with the client's written permission and their real name and role.
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
    gallery: { src: string, alt: string }[]
    /** One line, used on cards and as the meta description. */
    summary: string
    challenge: string
    solution: string
    outcome: string
    /** Two to four headline figures for the case study. */
    facts: { value: string, label: string }[]
    testimonial?: { quote: string, name: string, role: string }
}

export const projects: Project[] = [
    {
        slug: 'zuidas-office-tower',
        title: 'Zuidas Office Tower',
        category: 'Commercial',
        client: 'Meridiaan Vastgoed',
        location: 'Amsterdam Zuid',
        year: '2024',
        duration: '26 months',
        size: '17,100 m²',
        services: ['foundations', 'structural'],
        image: '/img/office.jpg',
        imageAlt: 'Glazed office tower photographed from street level',
        gallery: [
            {src: '/img/structural.jpg', alt: 'Steel frame during erection'},
            {src: '/img/foundations.jpg', alt: 'Pile caps and raft before the pour'},
        ],
        summary:
            'A fourteen-storey speculative office building delivered on a constrained '
            + 'Zuidas plot, hard against the rail corridor and the A10.',
        challenge:
            'The plot sat between the Amsterdam Zuid rail corridor and a nineteenth-century '
            + 'terrace, leaving no room for a conventional crane base or a full site '
            + 'compound. Ground conditions were the usual Amsterdam profile -- made ground '
            + 'over soft clay and peat, with the water table barely a metre below the '
            + 'proposed slab, so nothing could be founded at shallow depth.',
        solution:
            'The substructure went onto driven piles with a capping raft cast against the '
            + 'retained face rather than in open cut, which removed any need to encroach on '
            + 'the rail boundary. The frame was erected with a luffing jib crane placed '
            + 'inside the footprint and climbed with the structure, and deliveries ran to a '
            + 'booked slot system between 06:00 and 09:00 to keep the terrace street clear '
            + 'for the rest of the day.',
        outcome:
            'Oplevering was achieved two weeks inside the contract date with no reportable '
            + 'incidents and no objection raised by the rail operator. The building let to '
            + 'seventy percent occupancy before handover.',
        facts: [
            {value: '14', label: 'Storeys'},
            {value: '17,100', label: 'm² delivered'},
            {value: '26', label: 'Months on site'},
            {value: '0', label: 'Reportable incidents'},
        ],
        testimonial: {
            quote:
                'The rail boundary was the reason two other contractors declined to bid. '
                + 'Flex came back with a sequence that never crossed it, and then actually '
                + 'built to that sequence. Handing over ahead of the date on a plot that '
                + 'constrained is not something we expected.',
            name: 'Annemieke van der Velden',
            role: 'Development Director, Meridiaan Vastgoed',
        },
    },
    {
        slug: 'havenkwartier-residences',
        title: 'Havenkwartier Residences',
        category: 'Residential',
        client: 'Havenkwartier Ontwikkeling',
        location: 'Zaandam',
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
            'The developer needed a single package covering the electrical installation and '
            + 'the entire fit-out, with a phased oplevering so the first block could be let '
            + 'while the last was still being finished. Any drift in the early blocks would '
            + 'compound across the sequence.',
        solution:
            'We ran the four blocks as four overlapping programmes rather than one long '
            + 'one, with a dedicated first-fix crew moving through ahead of a finishing '
            + 'crew. Distribution boards were pre-assembled off site so each block could be '
            + 'energised and tested to NEN 1010 in a single day rather than a fortnight.',
        outcome:
            'The first block handed over at month eleven and was fully let before the final '
            + 'block completed. All ninety-six units passed gemeente inspection at the first '
            + 'visit.',
        facts: [
            {value: '96', label: 'Units delivered'},
            {value: '4', label: 'Phased handovers'},
            {value: '19', label: 'Months on site'},
            {value: '100%', label: 'First-visit pass rate'},
        ],
        testimonial: {
            quote:
                'Four blocks, four handovers, and the first one was letting while the last '
                + 'was still in first fix. That only works if the early phases hold, and '
                + 'they held. We were never once waiting on them to tell us where they were.',
            name: 'Sander Bruinsma',
            role: 'Project Director, Havenkwartier Ontwikkeling',
        },
    },
    {
        slug: 'westpoort-logistics-hub',
        title: 'Westpoort Logistics Hub',
        category: 'Industrial',
        client: 'Noordgate Logistiek',
        location: 'Amsterdam Westpoort',
        year: '2024',
        duration: '14 months',
        size: '22,300 m²',
        services: ['foundations', 'electrical'],
        image: '/img/industrial.jpg',
        imageAlt: 'Interior of a large industrial distribution facility',
        gallery: [
            {src: '/img/foundations.jpg', alt: 'Power-floated warehouse slab'},
            {src: '/img/electrical.jpg', alt: 'Three-phase industrial power installation'},
        ],
        summary:
            'A distribution facility with a laser-levelled slab and three-phase power sized '
            + 'for automated handling equipment installed after handover.',
        challenge:
            'The slab had to meet a flatness tolerance tight enough for very-narrow-aisle '
            + 'racking, over 22,300 m² of reclaimed polder ground that drained badly and '
            + 'settled unevenly. The tenant’s automation contractor also could not '
            + 'confirm final power positions until month nine.',
        solution:
            'We ground-improved the platform and installed an attenuation system before any '
            + 'slab work, then poured in laser-screeded bays with flatness surveyed bay by '
            + 'bay rather than at completion. Power went in as an overhead busbar grid '
            + 'rather than fixed drops, so the late positions became a tap-off exercise '
            + 'instead of a rewire.',
        outcome:
            'Every bay met the specified flatness classification on first survey. The '
            + 'tenant’s automation fit-out started four days after handover.',
        facts: [
            {value: '22,300', label: 'm² of slab'},
            {value: '14', label: 'Months on site'},
            {value: '100%', label: 'Bays passed first survey'},
            {value: '4 days', label: 'Handover to fit-out'},
        ],
        testimonial: {
            quote:
                'Our automation contractor changed the power positions in month nine and it '
                + 'cost us four days, not four weeks, because the busbar had been specified '
                + 'for exactly that. Somebody thought about it before we had to.',
            name: 'Fatima El Amrani',
            role: 'Head of Operations, Noordgate Logistiek',
        },
    },
    {
        slug: 'herengracht-canal-house',
        title: 'Herengracht Canal House',
        category: 'Renovation',
        client: 'Private client',
        location: 'Amsterdam Centrum',
        year: '2025',
        duration: '11 months',
        size: '690 m²',
        services: ['renovation', 'structural'],
        image: '/img/luxury.jpg',
        imageAlt: 'Renovated luxury interior with bespoke joinery',
        gallery: [
            {src: '/img/renovation.avif', alt: 'Finishing works in progress'},
            {src: '/img/structural.jpg', alt: 'Steel beam installed to open up a ground floor'},
        ],
        summary:
            'A full renovation of a seventeenth-century canal house, opening up the ground '
            + 'floor while retaining and restoring the original stair, panelling and '
            + 'ornamental plaster.',
        challenge:
            'The client wanted a contemporary open ground floor inside a rijksmonument '
            + 'whose value lay in its period detail. Three load-bearing walls needed to come '
            + 'out, the original stucco ceilings above them had to survive the process '
            + 'intact, and every intervention needed to clear both the monument consent and '
            + 'the omgevingsvergunning before a tool was lifted.',
        solution:
            'The temporary works were designed to prop off the floor above at close centres '
            + 'so the ceilings were supported continuously rather than spanning between '
            + 'props. Beams went in one at a time over eight weeks, with movement monitored '
            + 'weekly against a baseline survey agreed with Monumenten en Archeologie. '
            + 'Panelling and cornice were removed, catalogued, restored off site and '
            + 'reinstated to their original positions.',
        outcome:
            'All three walls were removed with no cracking to the retained ceilings, and the '
            + 'consent conditions were discharged without a single revision.',
        facts: [
            {value: '3', label: 'Walls removed'},
            {value: '690', label: 'm² renovated'},
            {value: '11', label: 'Months on site'},
            {value: '0mm', label: 'Recorded movement'},
        ],
        testimonial: {
            quote:
                'I was told the ceilings would probably crack and that we should accept it. '
                + 'They did not crack. The propping went in at closer centres than anyone '
                + 'else proposed and it took eight weeks instead of three, and I would make '
                + 'that trade again.',
            name: 'Joost Vermeulen',
            role: 'Homeowner',
        },
    },
    {
        slug: 'amstelplein-retail-centre',
        title: 'Amstelplein Retail Centre',
        category: 'Commercial',
        client: 'Amstel Vastgoedbeheer',
        location: 'Amstelveen',
        year: '2023',
        duration: '22 months',
        size: '28,800 m²',
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
            {value: '28,800', label: 'm² refurbished'},
            {value: '0', label: 'Trading days lost'},
            {value: '11', label: 'Atrium cut segments'},
            {value: '22', label: 'Months on site'},
        ],
        testimonial: {
            quote:
                'Twenty-two months of structural work above our busiest walkway and we did '
                + 'not lose a single trading hour. The hoarding line went up and came down '
                + 'every night without fail. Our tenants never had cause to raise it with us.',
            name: 'Ruben Doerga',
            role: 'Centre Manager, Amstel Vastgoedbeheer',
        },
    },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const projectsForService = (serviceSlug: string) =>
    projects.filter((p) => p.services.includes(serviceSlug))

export const projectCategories = [
    'All', 'Commercial', 'Residential', 'Industrial', 'Renovation',
] as const
