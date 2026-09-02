import {createError, defineEventHandler, getRequestIP, readBody, setResponseStatus} from 'h3'

interface ContactPayload {
    name?: string
    email?: string
    phone?: string
    projectType?: string
    message?: string
    /** Honeypot -- see ContactForm.vue. Must arrive empty. */
    companyWebsite?: string
}

/*
 * A very small fixed-window limiter. In-memory, so it resets on redeploy and is
 * per-instance rather than global -- which is the right trade for a contact
 * form: it stops a single client hammering the endpoint without adding a
 * datastore dependency. Move it to a shared store if this ever runs on more
 * than one instance and the abuse is real.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, {count: number, resetAt: number}>()

const rateLimited = (ip: string): boolean => {
    const now = Date.now()
    const entry = hits.get(ip)

    if (!entry || now > entry.resetAt) {
        hits.set(ip, {count: 1, resetAt: now + WINDOW_MS})

        // Opportunistic sweep so the map cannot grow without bound.
        if (hits.size > 5000) {
            for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key)
        }
        return false
    }

    entry.count += 1
    return entry.count > MAX_PER_WINDOW
}

const clean = (value: unknown, max: number): string =>
    typeof value === 'string' ? value.trim().slice(0, max) : ''

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody<ContactPayload>(event)

    /*
     * Honeypot first, and it answers 200 rather than an error. A bot that gets
     * a 400 learns the field is checked and drops it on the next pass; one that
     * gets a success never finds out. Nothing is sent either way.
     */
    if (clean(body?.companyWebsite, 200)) {
        return {ok: true}
    }

    const ip = getRequestIP(event, {xForwardedFor: true}) ?? 'unknown'
    if (rateLimited(ip)) {
        throw createError({
            statusCode: 429,
            data: {code: 'rate_limited', message: 'Too many messages. Please try again later.'},
        })
    }

    const name = clean(body?.name, 200)
    const email = clean(body?.email, 320)
    const phone = clean(body?.phone, 60)
    const projectType = clean(body?.projectType, 60)
    const message = clean(body?.message, 5000)

    /*
     * Re-validated here rather than trusting the client check. The browser
     * validation exists to give a fast, well-placed error message; it is not a
     * gate, because the endpoint is reachable without it.
     */
    const invalid: string[] = []
    if (!name) invalid.push('name')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) invalid.push('email')
    if (message.length < 20) invalid.push('message')

    if (invalid.length) {
        throw createError({
            statusCode: 400,
            data: {
                code: 'invalid',
                fields: invalid,
                message: 'Some required details are missing or incomplete.',
            },
        })
    }

    const {resendApiKey, contactToEmail, contactFromEmail} = config

    /*
     * No delivery configured. Answer 503 with a machine-readable code so the
     * form can say plainly that the message was NOT sent and show the phone
     * number instead. The one thing this must never do is return success.
     */
    if (!resendApiKey || !contactToEmail || !contactFromEmail) {
        console.warn(
            '[contact] Delivery is not configured — message NOT sent. Set '
            + 'NUXT_RESEND_API_KEY, NUXT_CONTACT_TO_EMAIL and NUXT_CONTACT_FROM_EMAIL.',
        )
        setResponseStatus(event, 503)
        throw createError({
            statusCode: 503,
            data: {
                code: 'not_configured',
                message: 'The contact form is not connected yet.',
            },
        })
    }

    const lines = [
        `Name:         ${name}`,
        `Email:        ${email}`,
        `Phone:        ${phone || '—'}`,
        `Project type: ${projectType || '—'}`,
        '',
        message,
    ].join('\n')

    try {
        await $fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {Authorization: `Bearer ${resendApiKey}`},
            body: {
                from: contactFromEmail,
                to: [contactToEmail],
                // reply_to so hitting reply in the inbox goes to the enquirer.
                reply_to: email,
                subject: `Website enquiry — ${name}`,
                text: lines,
            },
        })
    } catch (error) {
        console.error('[contact] Delivery failed:', error)
        throw createError({
            statusCode: 502,
            data: {
                code: 'delivery_failed',
                message: 'We could not send your message just now. Please try again.',
            },
        })
    }

    return {ok: true}
})
