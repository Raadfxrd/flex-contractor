/*
 * Vue I18n is used here ONLY for locale state and routing — not for message
 * lookup. All copy lives in typed dictionaries under app/data/content/, picked
 * by `useContent()`.
 *
 * That split is deliberate. The content is structured (arrays of services,
 * specialisms, testimonials, each with several fields), and a flat message
 * catalogue would turn it into stringly-typed keys like
 * `services.3.faqs.1.answer` with no type checking and no way to see a service
 * as one object. Typed dictionaries keep the shape and fail the build when a
 * locale is missing a field.
 */
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'nl',
    fallbackLocale: 'nl',
    messages: {nl: {}, en: {}},
}))
