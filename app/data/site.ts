/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PLACEHOLDER BUSINESS DETAILS -- REPLACE EVERY VALUE BEFORE LAUNCH.
 *
 * These are invented. The phone number is the reserved 555 range, the licence
 * and insurance figures are made up, and the address is not a real place.
 * They render in the header, the footer, the contact page and -- importantly --
 * in the LocalBusiness structured data, which is what search engines read to
 * decide whether to show the business in local results. Publishing invented
 * values there is worse than publishing none.
 *
 * See "Before launch" in README.md for the full checklist.
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const site = {
    name: 'Flex Contractor',
    legalName: 'Flex Contractor LLC',
    tagline: 'From foundation to finish',
    description:
        'Flex Contractor delivers foundations, electrical, structural work, and '
        + 'finishing and renovation for residential, commercial, and industrial projects.',

    phone: '+1 (555) 123-4567',
    phoneHref: 'tel:+15551234567',
    email: 'info@flexcontractor.com',
    emailHref: 'mailto:info@flexcontractor.com',

    address: {
        street: '123 Build Street',
        locality: 'Springfield',
        region: 'IL',
        postalCode: '62701',
        country: 'US',
    },

    hours: 'Monday to Friday, 7:00 – 17:00',
    founded: 2004,
    licence: 'IL-GC-104829',
    insurance: 'General liability and workers compensation carried on every project',

    serviceArea: [
        'Springfield', 'Decatur', 'Bloomington', 'Champaign', 'Peoria', 'Jacksonville',
    ],

    social: [
        {label: 'LinkedIn', href: 'https://www.linkedin.com/'},
        {label: 'Instagram', href: 'https://www.instagram.com/'},
        {label: 'Facebook', href: 'https://www.facebook.com/'},
    ],
} as const

/** Primary navigation. Drives the header, the mobile menu and the footer. */
export const primaryNav = [
    {label: 'Services', to: '/services'},
    {label: 'Projects', to: '/projects'},
    {label: 'About', to: '/about'},
    {label: 'Careers', to: '/careers'},
] as const

/** Headline figures. Shown on the homepage and the about page. */
export const companyStats = [
    {value: '20+', label: 'Years in business'},
    {value: '480', label: 'Projects delivered'},
    {value: '65', label: 'Trades on staff'},
    {value: '98%', label: 'On-time completion'},
] as const
