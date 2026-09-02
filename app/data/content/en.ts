import type {Content} from './types'

/*
 * English translation of nl.ts.
 *
 * Dutch is the source of truth: when copy changes, change it there first and
 * translate afterwards. The `Content` type means a field dropped here is a type
 * error, not a blank space on the page.
 *
 * The testimonials are translations of real Dutch statements, and the page says
 * so via `testimonials.note`. Attributions are left exactly as given.
 */
export const en: Content = {
    locale: 'en',

    meta: {
        title: 'Flexcontractor B.V. | Renovation from A to Z',
        description:
            'Flexcontractor B.V. delivers complete renovation and construction services for '
            + 'commercial and private property across Amsterdam and Noord-Holland. From '
            + 'planning to handover, with a passion for perfection.',
    },

    nav: {
        services: 'Services',
        specialisms: 'Specialisms',
        about: 'About',
        contact: 'Contact',
        careers: 'Careers',
    },

    actions: {
        requestQuote: 'Request a quote',
        seeWork: 'See our specialisms',
        readMore: 'Read more',
        allSpecialisms: 'All specialisms',
        backToServices: 'All services',
        backToSpecialisms: 'All specialisms',
        callUs: 'Call us',
        skipToContent: 'Skip to content',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        switchLanguage: 'Bekijk in het Nederlands',
    },

    hero: {
        eyebrow: 'With a passion for perfection',
        title: 'Renovation from A to Z',
        lede: 'Your reliable partner for renovation and construction.',
        scroll: 'Scroll',
    },

    intro: {
        eyebrow: 'Full service',
        title: 'Full service renovation of commercial and private property',
        body:
            'Flexcontractor B.V. offers complete renovation and construction services for '
            + 'both commercial and private property. We take care of every detail of your '
            + 'project, from planning through to handover, to the highest standards.',
    },

    values: {
        eyebrow: 'Why Flexcontractor',
        title: 'Eight reasons to work with us',
        items: [
            {title: 'Trusted and experienced', body: 'Decades of experience in construction.'},
            {title: 'No contracts', body: 'Flexible services without long-term commitments.'},
            {title: 'Bespoke only', body: 'Every job is unique, and so is our solution.'},
            {title: 'Solution-driven', body: 'Solutions that fit exactly what you need.'},
            {title: 'Reliable and fully insured', body: 'Your project is in safe hands.'},
            {title: 'Satisfaction guaranteed', body: 'We always aim for 100% client satisfaction.'},
            {title: 'Everything handled', body: 'We arrange it all, from permits to finishing.'},
            {title: 'Honest pricing', body: 'Transparent and competitive rates.'},
        ],
    },

    specialisms: {
        eyebrow: 'Our specialisms',
        title: 'Twelve trades',
        lede:
            'From a single staircase to a complete renovation. Every specialism is carried '
            + 'out by our own tradespeople.',
        scrollHint: 'Keep scrolling to move through the specialisms',
        swipeHint: 'Swipe or scroll sideways',
        items: [
            {
                slug: 'grindvloer-steentapijt',
                title: 'Gravel and stone carpet flooring',
                description:
                    'Flexcontractor B.V. is your specialist for durable, elegant gravel floors '
                    + 'and stone carpet. Suited to commercial spaces and private homes alike. We '
                    + 'offer a wide range of colours and patterns to match your interior.',
            },
            {
                slug: 'aanbouw-en-uitbouw',
                title: 'Extensions and additions',
                description:
                    'Whether you want more room for your family or you are expanding your '
                    + 'business, Flexcontractor B.V. delivers high-quality extension work. From '
                    + 'the permit application to the final finish, we arrange everything.',
                image: '/img/verbouwing.jpg',
                imageAlt:
                    'A house mid strip-out during renovation, with exposed timber studs and a '
                    + 'ladder',
            },
            {
                slug: 'tuin-of-dakterras',
                title: 'Garden or roof terrace',
                description:
                    'Make the most of your outdoor space with a professionally built garden or '
                    + 'roof terrace. Flexcontractor B.V. offers bespoke designs that respect '
                    + 'both your wishes and your budget, for an outdoor space that works and '
                    + 'looks the part.',
            },
            {
                slug: 'zwevende-trap',
                title: 'Floating staircase',
                description:
                    'For a modern, low-maintenance floor, choose a floating floor from '
                    + 'Flexcontractor B.V. Suitable for homes and offices alike, these floors '
                    + 'offer excellent insulation and sound damping.',
            },
            {
                slug: 'traprenovatie',
                title: 'Staircase renovation or a new staircase',
                description:
                    'Give your staircase a new life with our renovation service, or have an '
                    + 'entirely new one installed. Flexcontractor B.V. delivers craftsmanship '
                    + 'that guarantees both safety and style.',
                image: '/img/trap-en-vloer.jpg',
                imageAlt:
                    'Open-plan living space with a timber staircase with floating treads and a '
                    + 'wooden floor',
            },
            {
                slug: 'alle-soorten-vloeren',
                title: 'Flooring of every kind',
                description:
                    'From parquet to laminate, Flexcontractor B.V. lays every kind of floor '
                    + 'with precision and care. We are glad to advise on the best option for '
                    + 'your situation and install it properly.',
            },
            {
                slug: 'dakopbouw-of-dakkapel',
                title: 'Roof extension or dormer',
                description:
                    'Add value and usable space to your home with a roof extension or dormer '
                    + 'from Flexcontractor B.V. Our solutions bring extra room and daylight, '
                    + 'tailored to what you need.',
            },
            {
                slug: 'raam-en-deurkozijnen',
                title: 'Window and door frames',
                description:
                    'Add character and detail to your home with bespoke window and door '
                    + 'surrounds from Flexcontractor B.V. Our tradespeople deliver a finish that '
                    + 'lifts the whole interior.',
                image: '/img/afwerking.jpg',
                imageAlt: 'Clean modern kitchen with pale fitted units and a wooden floor',
            },
            {
                slug: 'keuken-installatie',
                title: 'Kitchen installation',
                description:
                    'From design through to installation, Flexcontractor B.V. delivers your '
                    + 'ideal kitchen. We work with high-quality materials and appliances to '
                    + 'create a kitchen that is both practical and elegant, and that fits how '
                    + 'you actually live.',
                image: '/img/keuken.jpg',
                imageAlt:
                    'Modern kitchen with dark timber units, a white worktop and black pendant '
                    + 'lights',
            },
            {
                slug: 'vloerverwarming',
                title: 'Underfloor heating',
                description:
                    'Enjoy the comfort of underfloor heating, installed by Flexcontractor B.V. '
                    + 'We offer energy-efficient systems that spread heat evenly through your '
                    + 'home or office.',
            },
            {
                slug: 'electra-en-loodgieterswerk',
                title: 'Electrical and plumbing',
                description:
                    'For dependable electrical and plumbing work you can rely on the expertise '
                    + 'of Flexcontractor B.V. Whether it is a complete installation or a repair, '
                    + 'we guarantee safety and quality.',
            },
            {
                slug: 'warmtewinning',
                title: 'Heat recovery',
                description:
                    'For sustainable energy solutions such as heat pumps and solar water '
                    + 'heating, come to Flexcontractor B.V. We help you choose the right system '
                    + 'and install it properly for maximum savings.',
            },
        ],
    },

    services: {
        eyebrow: 'Our services',
        title: 'Services',
        lede:
            'Six ways we work, from a one-day job to a renovation taken end to end. The '
            + 'approach is the same each time; only the scale changes.',
        includesLabel: 'What the service includes',
        faqLabel: 'Common questions',
        faqTitle: 'Before you ask',
        otherLabel: 'Other services',
        items: [
            {
                slug: 'verbouwing',
                number: '01',
                title: 'Remodelling',
                summary:
                    'Adapting an existing space to a new layout, a new use, or a new standard.',
                body: [
                    'A remodel rarely starts from a blank sheet. Something is already there, '
                    + 'somebody is already living or working in it, and the question is how you '
                    + 'get from here to there without it being unusable for months.',
                    'We survey the existing situation first, including what sits behind the '
                    + 'walls, and only then draw up a programme. That removes exactly the '
                    + 'surprises that make a remodel cost more than agreed.',
                ],
                includes: [
                    'Survey and inventory of the existing situation',
                    'Design and layout proposal',
                    'Permit application where required',
                    'Strip-out, build-up and full finishing',
                    'One named contact from start to handover',
                ],
                faqs: [
                    {
                        question: 'Can we stay in the property during the work?',
                        answer:
                            'Usually yes, by working in zones. It extends the programme — '
                            + 'typically by twenty to forty percent — and we say so up front, not '
                            + 'halfway through.',
                    },
                    {
                        question: 'Do you arrange the permit?',
                        answer:
                            'Yes. We assess whether an omgevingsvergunning is needed and handle '
                            + 'the application, drawings included.',
                    },
                ],
            },
            {
                slug: 'renovatie',
                number: '02',
                title: 'Renovation',
                summary:
                    'Bringing a home or building back to as-new condition, keeping what is '
                    + 'worth keeping.',
                body: [
                    'Renovation is the art of telling apart what has to be replaced from what '
                    + 'only needs attention. Replacing everything is expensive; replacing too '
                    + 'little is more expensive.',
                    'We inspect element by element — services, floors, frames, finishes — and '
                    + 'set out what we recommend and why, so the judgement stays yours.',
                ],
                includes: [
                    'Element-by-element building survey',
                    'Advice on replacing versus repairing',
                    'Renewal of services where needed',
                    'Full finishing and handover',
                ],
                faqs: [
                    {
                        question: 'How is this different from remodelling?',
                        answer:
                            'A remodel changes the layout or the use. A renovation largely keeps '
                            + 'both and is about the condition of the building.',
                    },
                ],
            },
            {
                slug: 'restauratie',
                number: '03',
                title: 'Restoration',
                summary:
                    'Restoring historic work to its original state, including the consents that '
                    + 'come with it.',
                body: [
                    'In a listed building, or any building with character, the value is often '
                    + 'the detail itself: the plasterwork, the staircase, the frames, the '
                    + 'panelling. That calls for a different approach than replacement.',
                    'We record and document what must be kept before anything is removed, and '
                    + 'agree the approach with the municipality where monument consent is '
                    + 'required.',
                ],
                includes: [
                    'Inventory and photographic record beforehand',
                    'Coordination with the municipality and heritage officers',
                    'Restoration of plasterwork, panelling and historic frames',
                    'Reinstatement in the original positions',
                ],
                faqs: [
                    {
                        question: 'Our building is listed. Does that change much?',
                        answer:
                            'It changes the consent route and the specification, not the standard '
                            + 'of work. We handle the monument consent alongside the '
                            + 'omgevingsvergunning and agree the approach in advance.',
                    },
                ],
            },
            {
                slug: 'kortlopende-opdracht',
                number: '04',
                title: 'Short-term work',
                summary:
                    'A defined job from a single day to a few weeks, with no ongoing '
                    + 'commitment.',
                body: [
                    'Not every project is a renovation. A staircase, a kitchen, a dormer or a '
                    + 'floor is sometimes exactly what is needed — and that should not come with '
                    + 'months of planning attached.',
                    'We take short-term work on as proper work, with the same survey, the same '
                    + 'fixed price and the same handover as a large project.',
                ],
                includes: [
                    'Fixed price agreed up front',
                    'One defined scope, no rolling contract',
                    'Carried out by our own tradespeople',
                    'Handover with a snagging list',
                ],
                faqs: [
                    {
                        question: 'Is there a minimum job size?',
                        answer:
                            'No. We look at each enquiry to see whether we can schedule it '
                            + 'properly, and we say so honestly when someone else will get to you '
                            + 'sooner.',
                    },
                ],
            },
            {
                slug: 'onderhoud',
                number: '05',
                title: 'Maintenance',
                summary:
                    'Planned and reactive maintenance for homes and commercial property.',
                body: [
                    'Maintenance is the cheapest moment to solve a problem. What costs an hour '
                    + 'now costs a renovation in three years.',
                    'We take on both one-off maintenance jobs and planned maintenance for '
                    + 'property managers, with a consistent crew that gets to know the building.',
                ],
                includes: [
                    'Periodic inspection and reporting',
                    'Reactive maintenance and repair',
                    'Decorating and timber repair',
                    'Services checks alongside our own installers',
                ],
                faqs: [
                    {
                        question: 'Do you work for property managers?',
                        answer:
                            'Yes. For managers we work with named contacts and a returning crew, '
                            + 'so knowledge of the building does not have to be rebuilt every '
                            + 'time.',
                    },
                ],
            },
            {
                slug: 'volledige-verbouwing',
                number: '06',
                title: 'Complete renovation',
                summary:
                    'The whole route in one pair of hands: design, permit, build and handover.',
                body: [
                    'On a complete renovation you are not the one coordinating the builder, the '
                    + 'installer, the kitchen supplier and the municipality. That is what having '
                    + 'everything handled actually means.',
                    'One programme, one price agreement, one point of contact, from the first '
                    + 'sketch to the last snagging item.',
                ],
                includes: [
                    'Design and layout',
                    'Permit application and coordination with the municipality',
                    'Structure, services and finishing',
                    'Coordination of every supplier',
                    'Handover with warranty documentation',
                ],
                faqs: [
                    {
                        question: 'Will you work with our architect?',
                        answer:
                            'Gladly, and preferably during the design rather than after it. That '
                            + 'is the stage where the savings are.',
                    },
                    {
                        question: 'How is the price set?',
                        answer:
                            'From a survey and a worked-up specification. We price the elements '
                            + 'most likely to become variations up front, so the price you get is '
                            + 'the price that holds.',
                    },
                ],
            },
        ],
    },

    testimonials: {
        eyebrow: 'Satisfied clients',
        title: 'What clients say',
        note: 'Translated from the original Dutch.',
        items: [
            {
                quote:
                    'Flexcontractor exceeded our expectations with their professionalism and '
                    + 'patience. Despite our demanding requirements, our renovation project was '
                    + 'completed on time and on budget. We are extremely happy with the result!',
                name: 'Benovative.nl',
            },
            {
                quote:
                    'The Flexcontractor team renovated our house completely. They were '
                    + 'professional, dependable and delivered high-quality work. We could not be '
                    + 'happier with the result!',
                name: 'Familie de Jong',
            },
            {
                quote:
                    'Our new office space is exactly what we needed. Flexcontractor understood '
                    + 'our vision and brought it to life. Their attention to detail and focus on '
                    + 'the client were impressive.',
                name: 'Spinning Top B.V.',
            },
        ],
    },

    contact: {
        eyebrow: 'Contact',
        title: 'Book a consultation or request a quote',
        lede:
            'Tell us where the property is and what stage you are at. Drawings, a rough '
            + 'scope, or three lines describing the idea are all enough to start.',
        phoneLabel: 'Phone',
        emailLabel: 'Email',
        officeLabel: 'Office',
        hoursLabel: 'Opening hours',
        areaLabel: 'Service area',
        formTitle: 'Send your project details',
    },

    form: {
        name: 'Name *',
        namePlaceholder: 'Jordan Rivera',
        email: 'Email address *',
        emailPlaceholder: 'jordan@company.com',
        phone: 'Phone number',
        phonePlaceholder: '+31 6 12345678',
        projectType: 'Project type',
        projectTypePlaceholder: 'Select a project type',
        other: 'Something else',
        message: 'About the project *',
        messagePlaceholder: 'Location, rough size, and what stage you are at.',
        submit: 'Send enquiry',
        submitting: 'Sending…',
        privacyNote: 'We reply within one working day. See our',
        privacyLink: 'privacy policy',
        errors: {
            name: 'Please tell us your name.',
            emailMissing: 'We need an email address to reply to.',
            emailInvalid: 'That does not look like a complete email address.',
            messageMissing: 'Please tell us a little about the project.',
            messageShort: 'A sentence or two helps us route this to the right trade.',
            generic: 'Something went wrong sending your message. Please try again.',
        },
        success: {
            eyebrow: 'Message sent',
            title: 'Thank you — we have it.',
            body: 'Someone from the team will reply within one working day. If it is urgent, call us on',
            again: 'Send another message',
        },
        unavailable: {
            eyebrow: 'Form unavailable',
            title: 'This form is not connected yet.',
            body:
                'Your message was NOT sent. Please reach us directly in the meantime — we will '
                + 'pick it up straight away.',
        },
    },

    about: {
        eyebrow: 'About us',
        title: 'With a passion for perfection',
        lede:
            'Flexcontractor B.V. handles remodelling, renovation and maintenance for '
            + 'commercial and private property across Amsterdam and Noord-Holland.',
        credentialsEyebrow: 'Company details',
        credentialsTitle: 'On paper',
        kvkLabel: 'Chamber of Commerce',
        vatLabel: 'VAT identification',
        certificationLabel: 'Certification',
        insuranceLabel: 'Insurance',
        foundedLabel: 'Trading since',
        areaLabel: 'Service area',
    },

    careers: {
        eyebrow: 'Careers',
        title: 'Working at Flexcontractor',
        lede:
            'We employ our tradespeople directly, which means we hire steadily rather than in '
            + 'bursts. If the role you want is not listed, send your details anyway — we keep '
            + 'them on file.',
        openRolesEyebrow: 'Open roles',
        noOpenings: 'No current openings',
        speculative: 'Send a speculative application',
        benefitsEyebrow: 'What we offer',
        benefitsTitle: 'The terms',
        benefits: [
            'Directly employed, not through an agency',
            'Terms under the CAO Bouw & Infra collective agreement',
            'Pension through bpfBOUW',
            'VCA and trade certification paid and renewed',
            'Tools, PPE, a van and a travel allowance',
            'Overtime paid, not banked',
        ],
    },

    privacy: {
        eyebrow: 'Legal',
        title: 'Privacy policy',
        updated: 'September 2026',
        contactHeading: 'Contact',
        sections: [
            {
                heading: 'What we collect',
                body:
                    'Only what you type into the contact form: your name, email address, an '
                    + 'optional phone number, an optional project type, and your message. We use '
                    + 'no analytics, advertising or tracking cookies on this site, and there are '
                    + 'no third-party embeds on any page.',
            },
            {
                heading: 'Why we collect it',
                body:
                    'To reply to your enquiry and, if it becomes a project, to carry out the '
                    + 'work. That is the only purpose. Our legal basis under the AVG (the Dutch '
                    + 'implementation of the GDPR) is that processing is necessary to take steps '
                    + 'at your request before entering into a contract. We do not sell your '
                    + 'information, share it for marketing, or add you to a mailing list.',
            },
            {
                heading: 'How it reaches us',
                body:
                    'Submissions are sent to our email inbox through a transactional email '
                    + 'provider, which acts as our processor. Your message is not written to a '
                    + 'database on this website. Our server keeps a short-lived record of '
                    + 'request timing per IP address to limit automated abuse of the form; it '
                    + 'holds no message content and is discarded within minutes.',
            },
            {
                heading: 'How long we keep it',
                body:
                    'Enquiries that do not lead to work are deleted from our inbox within '
                    + 'twelve months. Records relating to projects we carried out are retained '
                    + 'for as long as our insurance and statutory obligations require.',
            },
            {
                heading: 'Your rights',
                body:
                    'Under the AVG you can ask what we hold about you, ask for it to be '
                    + 'corrected or deleted, ask us to restrict or stop processing it, and ask '
                    + 'for a copy in a portable form. We respond within one month. If you are '
                    + 'not satisfied with how we handled your request, you have the right to '
                    + 'lodge a complaint with the Autoriteit Persoonsgegevens, the Dutch data '
                    + 'protection authority.',
            },
        ],
    },

    cta: {
        eyebrow: 'Next step',
        title: 'Book a consultation today, or request a quote',
        body:
            'Send the drawings, the address of the property, or three lines describing the '
            + 'idea. We will come back within one working day.',
    },

    footer: {
        tagline: 'With a passion for perfection',
        servicesLabel: 'Services',
        companyLabel: 'Company',
        contactLabel: 'Contact',
        followLabel: 'Follow us',
        privacy: 'Privacy policy',
        rights: 'All rights reserved.',
    },

    error: {
        notFoundTitle: 'That page is not here.',
        notFoundBody:
            'The page may have moved, or the link may be out of date. Our services, '
            + 'specialisms and contact details are all still where they were.',
        genericTitle: 'Something went wrong.',
        genericBody:
            'An unexpected error occurred on our side. Please try again, or call us '
            + 'directly.',
        home: 'Back to home',
        specialisms: 'Browse specialisms',
    },
}
