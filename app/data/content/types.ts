/*
 * The shape of one locale's copy.
 *
 * Every locale file is typed `: Content`, so a missing or misspelled field is
 * a type error rather than an `undefined` that renders as a blank on the page.
 * That is the whole reason copy lives in typed dictionaries instead of a flat
 * vue-i18n message catalogue — see the note in i18n/i18n.config.ts.
 */

export interface Faq {
    question: string
    answer: string
}

/** One of the six things the firm sells. Drives /services and its detail pages. */
export interface ServiceType {
    slug: string
    /** Two-digit ordinal used as the eyebrow. */
    number: string
    title: string
    /** One line. Used on cards and as the page meta description. */
    summary: string
    /** Body paragraphs for the detail page. */
    body: string[]
    /** What the job actually includes. */
    includes: string[]
    faqs: Faq[]
}

/**
 * A capability area, not a single trade.
 *
 * These started as the twelve individual trades listed on the live site, which
 * read as a jobbing specialist -- "we do staircases", "we do door frames" --
 * rather than a firm that takes on a whole renovation. They are grouped into
 * broad areas instead, with every original trade preserved verbatim in
 * `includes` so nothing is lost from the offering.
 */
export interface Specialism {
    slug: string
    title: string
    description: string
    /** The specific trades this area covers. */
    includes: string[]
    /**
     * Only four specialisms carry a photo, and those four become the
     * full-screen story panels on the homepage. The images are 1280px wide, so
     * their `sizes` must cap at 600px — see the note in CLAUDE.md.
     */
    image?: string
    imageAlt?: string
}

export interface ValueProp {
    title: string
    body: string
}

export interface Testimonial {
    quote: string
    /** Attribution exactly as the live site gives it. */
    name: string
}

export interface Content {
    locale: 'nl' | 'en'

    meta: {
        title: string
        description: string
    }

    nav: {
        services: string
        specialisms: string
        about: string
        contact: string
        careers: string
    }

    actions: {
        requestQuote: string
        seeWork: string
        readMore: string
        allSpecialisms: string
        backToServices: string
        backToSpecialisms: string
        callUs: string
        skipToContent: string
        openMenu: string
        closeMenu: string
        switchLanguage: string
    }

    hero: {
        eyebrow: string
        title: string
        lede: string
        scroll: string
    }

    intro: {
        eyebrow: string
        title: string
        body: string
        /**
         * The range statement: high-end through to everyday work. It is what
         * stops the site reading as either a budget outfit or an unaffordable
         * one, and it is the reason the six service types run from a one-day
         * job to a complete renovation.
         */
        range: string
    }

    values: {
        eyebrow: string
        title: string
        items: ValueProp[]
    }

    specialisms: {
        eyebrow: string
        title: string
        lede: string
        /** Shown in the pinned scroller on the homepage. */
        scrollHint: string
        swipeHint: string
        items: Specialism[]
    }

    services: {
        eyebrow: string
        title: string
        lede: string
        includesLabel: string
        faqLabel: string
        faqTitle: string
        otherLabel: string
        items: ServiceType[]
    }

    testimonials: {
        eyebrow: string
        title: string
        /**
         * Shown under the quotes when they are not in the language they were
         * given in. These are real statements from real clients, made in Dutch;
         * presenting an English rendering without saying so would put words in
         * their mouths.
         */
        note?: string
        items: Testimonial[]
    }

    contact: {
        eyebrow: string
        title: string
        lede: string
        phoneLabel: string
        emailLabel: string
        officeLabel: string
        hoursLabel: string
        areaLabel: string
        formTitle: string
    }

    form: {
        name: string
        namePlaceholder: string
        email: string
        emailPlaceholder: string
        phone: string
        phonePlaceholder: string
        projectType: string
        projectTypePlaceholder: string
        other: string
        message: string
        messagePlaceholder: string
        submit: string
        submitting: string
        privacyNote: string
        privacyLink: string
        errors: {
            name: string
            emailMissing: string
            emailInvalid: string
            messageMissing: string
            messageShort: string
            generic: string
        }
        success: {
            eyebrow: string
            title: string
            body: string
            again: string
        }
        unavailable: {
            eyebrow: string
            title: string
            body: string
        }
    }

    about: {
        eyebrow: string
        title: string
        lede: string
        credentialsEyebrow: string
        credentialsTitle: string
        kvkLabel: string
        vatLabel: string
        certificationLabel: string
        insuranceLabel: string
        foundedLabel: string
        areaLabel: string
    }

    careers: {
        eyebrow: string
        title: string
        lede: string
        openRolesEyebrow: string
        noOpenings: string
        speculative: string
        benefitsEyebrow: string
        benefitsTitle: string
        benefits: string[]
    }

    privacy: {
        eyebrow: string
        title: string
        updated: string
        sections: {heading: string, body: string}[]
        contactHeading: string
    }

    cta: {
        eyebrow: string
        title: string
        body: string
    }

    footer: {
        tagline: string
        servicesLabel: string
        companyLabel: string
        contactLabel: string
        followLabel: string
        privacy: string
        rights: string
    }

    error: {
        notFoundTitle: string
        notFoundBody: string
        genericTitle: string
        genericBody: string
        home: string
        specialisms: string
    }
}
