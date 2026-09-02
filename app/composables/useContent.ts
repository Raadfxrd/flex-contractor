import type {Content} from '~/data/content/types'
import {nl} from '~/data/content/nl'
import {en} from '~/data/content/en'

const DICTIONARIES: Record<string, Content> = {nl, en}

/**
 * The language the page is currently SHOWING, which deliberately lags the
 * language in the URL.
 *
 * `locale` flips the instant the route changes, but the outgoing page is still
 * on screen for the length of its leave transition. If copy tracked `locale`
 * directly, that page would repaint in the new language, sit there fully
 * visible, and only then be replaced by the incoming page animating in -- the
 * text swapping, vanishing, and animating back.
 *
 * So copy tracks this instead. app.vue advances it in the transition's
 * `onAfterLeave`, i.e. once the old page has gone and before the new one is
 * created. Everything -- page, header, footer -- changes language in the same
 * beat, and the new copy is only ever seen animating in.
 *
 * `useState`, not a module-level ref: a module ref is shared across requests on
 * the server and would leak one visitor's language into another's.
 */
export const useDisplayLocale = () => {
    const {locale} = useI18n()
    return useState<string>('content-locale', () => locale.value)
}

/**
 * The copy for the language currently on screen, as a typed object.
 *
 * Templates read `c.hero.title`, never a message key, so a rename is a compile
 * error instead of a blank on the page. See i18n/i18n.config.ts for why
 * vue-i18n's own message catalogue is not used for this.
 */
export const useContent = () => {
    const display = useDisplayLocale()
    return computed<Content>(() => DICTIONARIES[display.value] ?? nl)
}
