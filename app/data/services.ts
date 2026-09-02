/*
 * PLACEHOLDER CONTENT -- the shape is real, the copy is not. Rewrite the
 * summaries, capabilities and FAQ answers with the firm's actual scope before
 * launch. See "Before launch" in README.md.
 *
 * The regulatory references are Dutch and load-bearing: NEN 1010 and NEN 3140
 * for electrical installation and inspection, the omgevingsvergunning for
 * consents, monument consent for listed buildings, and the Bouwbesluit for
 * structural requirements. If this copy is ever reused outside the
 * Netherlands, those are the parts that stop being true.
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
            'Piling, excavation, dewatering and reinforced concrete substructure for '
            + 'buildings that have to stand for a century on soft ground.',
        body: [
            'Almost nothing in this part of the country is founded at shallow depth. Made '
            + 'ground over clay and peat, with the water table a metre or two down, means '
            + 'the substructure is a piling and dewatering problem before it is a concrete '
            + 'one. We survey, drive and pour to the sondering and the geotechnical report '
            + 'rather than to a standard detail, which is why our substructures rarely '
            + 'become somebody else\'s meerwerk later in the programme.',
            'Our groundworks crews are directly employed, so the sequence from strip-out to '
            + 'slab is run by one team on one programme. On constrained city sites we handle '
            + 'the temporary works design, the bemaling permit, the neighbour survey and the '
            + 'traffic management as part of the package.',
        ],
        image: '/img/foundations.jpg',
        imageAlt: 'Reinforced concrete foundation being poured on a construction site',
        capabilities: [
            'Site clearance and bulk excavation',
            'Driven and screwed piling, and pile caps',
            'Reinforced concrete rafts, strips and pads',
            'Funderingsherstel — timber and concrete pile foundation repair',
            'Bemaling, land drainage and below-ground services',
            'Sheet piling, retaining walls and basement tanking',
        ],
        deliverables: [
            'Sondering review and foundation options report',
            'Temporary works design and bemaling permit coordination',
            'Pre-construction neighbour survey with photographic baseline',
            'As-built survey, concrete cube results and pile driving records',
        ],
        faqs: [
            {
                question: 'Do you carry out the ground investigation yourselves?',
                answer:
                    'We appoint and manage an independent geotechnical consultant to take '
                    + 'the sonderingen, then design the foundation to their findings. '
                    + 'Keeping the investigation independent of the contractor pouring the '
                    + 'concrete is deliberate.',
            },
            {
                question: 'Our building is on timber piles. Can you assess it?',
                answer:
                    'Yes — foundation repair on historic timber piles is routine work for '
                    + 'us. It starts with an inspection pit and a condition survey, because '
                    + 'the decision between repair, partial replacement and full '
                    + 'onderschoeiing turns entirely on what the pile heads look like.',
            },
            {
                question: 'How long does a typical substructure take?',
                answer:
                    'For a standard commercial piled foundation, six to nine weeks from '
                    + 'site setup to slab, weather depending. Funderingsherstel on an '
                    + 'occupied building runs considerably longer and is programmed '
                    + 'individually.',
            },
        ],
        projects: ['zuidas-office-tower', 'westpoort-logistics-hub'],
    },
    {
        slug: 'electrical',
        number: '02',
        title: 'Electrical Systems',
        summary:
            'Design, installation, testing and certification of power, lighting and '
            + 'controls to NEN 1010, across residential, commercial and industrial loads.',
        body: [
            'Our electrical division works from load schedule to final inspection report. '
            + 'That means the same team that sizes the incoming supply also commissions the '
            + 'distribution boards, so nothing gets lost in the handover between a design '
            + 'consultant and an installer.',
            'Everything we install is tested and documented to NEN 1010, and periodic '
            + 'inspection work to NEN 3140. Every installation leaves site with the '
            + 'inspection report, a distribution schedule and an O&M pack rather than a '
            + 'promise to send them on.',
        ],
        image: '/img/electrical.jpg',
        imageAlt: 'Electrician terminating cables in a distribution board',
        capabilities: [
            'LV distribution and switchgear installation',
            'Containment, small power and lighting',
            'Emergency lighting and fire alarm interfaces',
            'Three-phase industrial power and motor controls',
            'EV charging infrastructure and load balancing',
            'NEN 3140 periodic inspection and remedial works',
        ],
        deliverables: [
            'Load schedule and distribution board schedules',
            'NEN 1010 inspection report and measurement results',
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
                    'Routinely. Phased changeovers and out-of-hours switchovers on occupied '
                    + 'commercial premises are a large share of what the division does. We '
                    + 'produce a written switching schedule before any isolation.',
            },
            {
                question: 'Who signs off the installation?',
                answer:
                    'We do, directly. The inspector who signs the NEN 1010 report is on our '
                    + 'staff and has visited the installation.',
            },
        ],
        projects: ['westpoort-logistics-hub', 'havenkwartier-residences'],
    },
    {
        slug: 'structural',
        number: '03',
        title: 'Structural Work',
        summary:
            'Steel frame, reinforced concrete and structural alterations — new frames and '
            + 'interventions into buildings that are already standing.',
        body: [
            'Structural work divides cleanly into two problems: putting up a frame on an '
            + 'empty site, and changing one that is already carrying load. The first is a '
            + 'logistics exercise. The second is a sequencing exercise, and it is where most '
            + 'of the risk on a refurbishment actually sits.',
            'We do both, and we do the temporary works design in-house, which is what lets '
            + 'us commit to a sequence rather than discovering it on site. Permanent works '
            + 'are designed to the Bouwbesluit and the relevant Eurocodes by a constructeur, '
            + 'ours or yours.',
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
            'Completion statement from the constructeur',
        ],
        faqs: [
            {
                question: 'Do you provide the constructeur?',
                answer:
                    'We can, or we work to a design supplied by your own. For alterations we '
                    + 'usually recommend ours, because the temporary works and the permanent '
                    + 'works need to be designed together.',
            },
            {
                question: 'How disruptive is removing a load-bearing wall?',
                answer:
                    'Less than most people expect, and over a longer period than most people '
                    + 'expect. The propping stays in place while the new beam cures or the '
                    + 'connections are made, which is typically one to three weeks.',
            },
            {
                question: 'Can you strengthen an existing frame rather than replace it?',
                answer:
                    'Frequently the better answer, particularly on transformatie projects '
                    + 'converting offices to housing. We survey the existing structure and '
                    + 'price both options.',
            },
        ],
        projects: ['zuidas-office-tower', 'amstelplein-retail-centre'],
    },
    {
        slug: 'renovation',
        number: '04',
        title: 'Finishing & Renovation',
        summary:
            'Fit-out, joinery, decoration and full refurbishment — including listed '
            + 'buildings and the consents that come with them.',
        body: [
            'Finishing is where a project is judged. It is also the phase most likely to be '
            + 'compressed when earlier stages slip, which is precisely why we programme it '
            + 'from the oplevering date backwards rather than forwards from the frame.',
            'Our joinery is made to measure rather than adapted from stock, and our snagging '
            + 'list is opened at first fix rather than at handover. Both of those decisions '
            + 'cost more in the middle of a project and less at the end of one. On a '
            + 'rijksmonument or gemeentelijk monument we run the consent process and the '
            + 'restoration specification alongside the build.',
        ],
        image: '/img/renovation.avif',
        imageAlt: 'Interior of a renovated room during finishing works',
        capabilities: [
            'Full commercial and residential fit-out',
            'Bespoke joinery, cabinetry and stonework',
            'Plastering, decoration and specialist finishes',
            'Flooring, tiling and ceiling systems',
            'Monument restoration — stucco, panelling and historic joinery',
            'Phased refurbishment of occupied buildings',
        ],
        deliverables: [
            'Finishes schedule and physical sample boards',
            'Setting-out drawings for joinery and tiling',
            'Progressive snagging list from first fix',
            'Oplevering pack with warranties and care instructions',
        ],
        faqs: [
            {
                question: 'Can we stay in the building during the work?',
                answer:
                    'Usually yes, with the work phased into zones. It extends the programme '
                    + '-- typically by twenty to forty percent -- and we say so at tender '
                    + 'rather than at week six.',
            },
            {
                question: 'Our building is a monument. Does that change things?',
                answer:
                    'It changes the consent route and the specification, not the standard of '
                    + 'work. We handle the monument consent alongside the omgevingsvergunning '
                    + 'and agree the restoration approach with the municipality before '
                    + 'anything is removed.',
            },
            {
                question: 'Do you work with our architect or interior designer?',
                answer:
                    'Yes, and we prefer to be brought in during design rather than after it. '
                    + 'Buildability input at that stage is where the savings are.',
            },
        ],
        projects: ['herengracht-canal-house', 'havenkwartier-residences'],
    },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
