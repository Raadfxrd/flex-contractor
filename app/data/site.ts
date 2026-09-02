/*
 * ═══════════════════════════════════════════════════════════════════════════
 * STILL INVENTED (must be replaced or removed before launch):
 *   founding year, service area, insurance wording, certifications, and every
 *   figure in `companyStats`.
 *
 * See "Before launch" in README.md for the full checklist.
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const site = {
    name: 'Flex Contractor',
    legalName: 'Flex Contractor B.V.',
    tagline: 'From foundation to finish',
    description:
        'Flex Contractor delivers foundations, electrical, structural work, and '
        + 'finishing and renovation for residential, commercial, and industrial '
        + 'projects across Amsterdam and Noord-Holland.',

    phone: '+31 6 38929808',
    phoneHref: 'tel:+31638929808',
    email: 'info@flexcontractor.com',
    emailHref: 'mailto:info@flexcontractor.com',

    address: {
        street: 'Anna Blamansingel 182',
        postalCode: '1102 SW',
        locality: 'Amsterdam',
        region: 'Noord-Holland',
        country: 'NL',
    },

    hours: 'Monday to Friday, 07:00 – 17:00',
    founded: 2006,

    /*
     * Company registration. `vat` is the BTW-id, in the form NL000000000B01.
     * Both are rendered behind `v-if` in the footer and on the about page, so
     * an empty one is omitted rather than printing a bare label -- and so a
     * legal identifier is never invented just to fill the slot.
     */
    kvk: '77100468',
    vat: '',

    /* PLACEHOLDER */ insurance:
        'CAR and liability cover carried on every project',

    /* PLACEHOLDER -- confirm each of these is actually held before publishing. */
    certifications: ['VCA** certified', 'ISO 9001', 'Bouwgarant affiliated'],

    /* PLACEHOLDER */ serviceArea: [
        'Amsterdam', 'Amstelveen', 'Haarlem', 'Zaanstad', 'Hoofddorp', 'Almere',
    ],

    social: [
        {label: 'LinkedIn', href: 'https://www.linkedin.com/'},
        {label: 'Instagram', href: 'https://www.instagram.com/'},
        {label: 'Facebook', href: 'https://www.facebook.com/'},
    ],
} as const

/*
 * The postal address as it is actually written in the Netherlands: street and
 * number on one line, then postcode and city on the next -- no comma, and the
 * postcode BEFORE the city. That is the opposite of the "City, Region ZIP"
 * order the templates previously hardcoded in three separate places.
 *
 * Derived here rather than repeated per template, so the ordering is a
 * one-line change if the company ever moves country.
 */
export const addressLines = [
    site.address.street,
    `${site.address.postalCode} ${site.address.locality}`,
] as const

/** Primary navigation. Drives the header, the mobile menu and the footer. */
export const primaryNav = [
    {label: 'Services', to: '/services'},
    {label: 'Projects', to: '/projects'},
    {label: 'About', to: '/about'},
    {label: 'Careers', to: '/careers'},
] as const

/* PLACEHOLDER -- every one of these figures is invented. */
export const companyStats = [
    {value: '20+', label: 'Years in business'},
    {value: '480', label: 'Projects delivered'},
    {value: '65', label: 'Trades on staff'},
    {value: '98%', label: 'On-time completion'},
] as const
