import type {Content} from '~/data/content/types'
import {nl} from '~/data/content/nl'
import {en} from '~/data/content/en'

const DICTIONARIES: Record<string, Content> = {nl, en}

/**
 * The copy for the active locale, as a typed object.
 *
 * Templates read `c.hero.title`, never a message key, so a rename is a compile
 * error instead of a blank on the page. See i18n/i18n.config.ts for why
 * vue-i18n's own message catalogue is not used for this.
 */
export const useContent = () => {
    const {locale} = useI18n()
    return computed<Content>(() => DICTIONARIES[locale.value] ?? nl)
}
