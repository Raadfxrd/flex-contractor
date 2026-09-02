/*
 * PLACEHOLDER CONTENT -- the shape is real, the copy is not. Rewrite the
 * summaries, capabilities and FAQ answers with the firm's actual scope before
 * launch. See "Before launch" in README.md.
 */

export interface Faq {
    question: string
    answer: string
}

export interface Service {
    slug: string
    /** Two-digit ordinal shown as the eyebrow. Matches the homepage sequence. */
    number: string
    title: string
    /** One line. Used on cards, in the nav dropdown and as the meta description. */
    summary: string
    /** Two or three paragraphs for the service page body. */
    body: string[]
    image: string
    imageAlt: string
    capabilities: string[]
    /** What the client actually receives -- the concrete deliverables. */
    deliverables: string[]
    faqs: Faq[]
    /** Slugs from projects.ts. Rendered as "related work". */
    projects: string[]
}

export const services: Service[] = [
    {
        slug: 'foundations',
        number: '01',
        title: 'Foundations & Groundworks',
        summary:
            'Site preparation, excavation, drainage and reinforced concrete substructure '
            + 'for buildings that have to stand for a century.',
        body: [
            'Everything above ground inherits the tolerances set below it. We survey, '
            + 'excavate and pour to the geotechnical report rather than to a standard '
            + 'detail, which is why our substructures rarely become anybody else\'s '
            + 'variation order later in the programme.',
            'Our groundworks crews are directly employed, so the sequence from strip-out '
            + 'to slab is run by one team with one programme. On constrained urban sites '
            + 'we handle the temporary works design, the party wall coordination and the '
            + 'traffic management as part of the package.',
        ],
        image: '/img/foundations.jpg',
        imageAlt: 'Reinforced concrete foundation being poured on a construction site',
        capabilities: [
            'Site clearance and bulk excavation',
            'Piling coordination and pile caps',
            'Reinforced concrete rafts, strips and pads',
            'Underpinning and structural stabilisation',
            'Land drainage, attenuation and below-ground services',
            'Retaining walls and basement tanking',
        ],
        deliverables: [
            'Geotechnical review and foundation options report',
            'Temporary works design and permit coordination',
            'As-built survey of the completed substructure',
            'Concrete cube test results and pour records',
        ],
        faqs: [
            {
                question: 'Do you carry out the ground investigation yourselves?',
                answer:
                    'We appoint and manage a specialist geotechnical consultant, then '
                    + 'design the foundation to their findings. Keeping the investigation '
                    + 'independent of the contractor pouring the concrete is deliberate.',
            },
            {
                question: 'How long does a typical substructure take?',
                answer:
                    'For a standard commercial pad foundation, four to seven weeks from '
                    + 'site setup to slab, weather depending. Underpinning and basement '
                    + 'work run considerably longer and are programmed individually.',
            },
            {
                question: 'Can you work on a constrained or occupied site?',
                answer:
                    'Yes. Roughly a third of our groundworks is on sites that stay '
                    + 'partially operational, which changes the sequencing, the plant '
                    + 'selection and the hours -- all of which we price up front.',
            },
        ],
        projects: ['meridian-office-tower', 'northgate-industrial-park'],
    },
    {
        slug: 'electrical',
        number: '02',
        title: 'Electrical Systems',
        summary:
            'Design, installation, testing and certification of power, lighting and '
            + 'controls across residential, commercial and industrial loads.',
        body: [
            'Our electrical division works from load schedule to final certificate. That '
            + 'means the same team that sizes the incoming supply also commissions the '
            + 'distribution boards, so nothing gets lost in the handover between a design '
            + 'consultant and an installer.',
            'We hold competent-person registration for the work we certify, and every '
            + 'installation leaves site with test results, a distribution schedule and an '
            + 'O&M pack rather than a promise to send them on.',
        ],
        image: '/img/electrical.jpg',
        imageAlt: 'Electrician terminating cables in a distribution board',
        capabilities: [
            'LV distribution and switchgear installation',
            'Containment, small power and lighting',
            'Emergency lighting and fire alarm interfaces',
            'Three-phase industrial power and motor controls',
            'EV charging infrastructure and load management',
            'Periodic inspection, testing and remedial works',
        ],
        deliverables: [
            'Load schedule and distribution board schedules',
            'Electrical installation certificates and test results',
            'As-installed drawings and O&M documentation',
            'Commissioning records for controls and emergency systems',
        ],
        faqs: [
            {
                question: 'Do you take on electrical work as a standalone package?',
                answer:
                    'Yes. Around half our electrical work is subcontracted to us by other '
                    + 'main contractors rather than run through our own projects.',
            },
            {
                question: 'Can you work on a live building?',
                answer:
                    'Routinely. Phased changeovers and out-of-hours switchovers on '
                    + 'occupied commercial premises are a large share of what the division '
                    + 'does. We produce a written switching schedule before any isolation.',
            },
            {
                question: 'Who issues the certification?',
                answer:
                    'We do, directly. The qualifying supervisor who signs the certificate '
                    + 'is on our staff and has visited the installation.',
            },
        ],
        projects: ['northgate-industrial-park', 'harbour-point-residences'],
    },
    {
        slug: 'structural',
        number: '03',
        title: 'Structural Work',
        summary:
            'Steel frame, reinforced concrete and structural alterations -- new frames '
            + 'and interventions into buildings that are already standing.',
        body: [
            'Structural work divides cleanly into two problems: putting up a frame on an '
            + 'empty site, and changing one that is already carrying load. The first is a '
            + 'logistics exercise. The second is a sequencing exercise, and it is where '
            + 'most of the risk on a refurbishment actually sits.',
            'We do both, and we do the temporary works design in-house, which is what lets '
            + 'us commit to a sequence rather than discovering it on site.',
        ],
        image: '/img/structural.jpg',
        imageAlt: 'Structural steel frame under erection against an open sky',
        capabilities: [
            'Structural steel fabrication and erection',
            'In-situ and precast reinforced concrete frames',
            'Load-bearing wall removal and beam insertion',
            'Temporary works design, propping and needling',
            'Composite metal deck and concrete floors',
            'Structural repair, strengthening and remediation',
        ],
        deliverables: [
            'Temporary works design and sequencing drawings',
            'Fabrication drawings and material test certificates',
            'Weld and bolt inspection records',
            'Completion statement from the structural engineer',
        ],
        faqs: [
            {
                question: 'Do you provide the structural engineer?',
                answer:
                    'We can, or we work to a design supplied by the client\'s engineer. '
                    + 'For alterations we usually recommend our own, because the temporary '
                    + 'works and the permanent works need to be designed together.',
            },
            {
                question: 'How disruptive is removing a load-bearing wall?',
                answer:
                    'Less than most people expect, and over a longer period than most '
                    + 'people expect. The propping stays in place while the new beam cures '
                    + 'or the connections are made, which is typically one to three weeks.',
            },
            {
                question: 'Can you strengthen an existing frame rather than replace it?',
                answer:
                    'Frequently the better answer, particularly on change-of-use projects. '
                    + 'We survey the existing structure and price both options.',
            },
        ],
        projects: ['meridian-office-tower', 'crescent-retail-centre'],
    },
    {
        slug: 'renovation',
        number: '04',
        title: 'Finishing & Renovation',
        summary:
            'Fit-out, joinery, decoration and full refurbishment -- the trades the client '
            + 'actually sees and touches every day.',
        body: [
            'Finishing is where a project is judged. It is also the phase most likely to be '
            + 'compressed when earlier stages slip, which is precisely why we programme it '
            + 'from the completion date backwards rather than forwards from the frame.',
            'Our joinery is made to measure rather than adapted from stock, and our snagging '
            + 'list is opened at first fix rather than at handover. Both of those decisions '
            + 'cost more in the middle of a project and less at the end of one.',
        ],
        image: '/img/renovation.avif',
        imageAlt: 'Interior of a renovated room during finishing works',
        capabilities: [
            'Full commercial and residential fit-out',
            'Bespoke joinery, cabinetry and stonework',
            'Plastering, decoration and specialist finishes',
            'Flooring, tiling and ceiling systems',
            'Heritage and period restoration',
            'Phased refurbishment of occupied buildings',
        ],
        deliverables: [
            'Finishes schedule and physical sample boards',
            'Setting-out drawings for joinery and tiling',
            'Progressive snagging list from first fix',
            'Handover pack with warranties and care instructions',
        ],
        faqs: [
            {
                question: 'Can we stay in the building during the work?',
                answer:
                    'Usually yes, with the work phased into zones. It extends the '
                    + 'programme -- typically by twenty to forty percent -- and we say so '
                    + 'at tender rather than at week six.',
            },
            {
                question: 'Do you work with our architect or interior designer?',
                answer:
                    'Yes, and we prefer to be brought in during design rather than after '
                    + 'it. Buildability input at that stage is where the savings are.',
            },
            {
                question: 'How do you handle the snagging list?',
                answer:
                    'It opens at first fix and is reviewed weekly, so handover is a short '
                    + 'list of genuinely recent items rather than a rediscovery of '
                    + 'everything that happened over six months.',
            },
        ],
        projects: ['ashcombe-house', 'harbour-point-residences'],
    },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
