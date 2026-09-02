import type {Content} from './types'

/*
 * Dutch is the primary locale and the source of truth for wording.
 *
 * PROVENANCE. Most of this is the firm's own copy, lifted verbatim from
 * flexcontractor.nl: the H1 and strapline, the six service names, the eight
 * value propositions, all twelve specialism descriptions, and all three
 * testimonials (which are REAL, with real attributions -- unlike everything
 * that was in this repo before).
 *
 * WRITTEN FOR THIS SITE, and therefore needing sign-off before launch: the six
 * service-type bodies, their `includes` lists and their FAQs; the about,
 * careers and privacy pages. The live site gives only the six service NAMES,
 * so their descriptions are new. They describe real services, but nobody at
 * the firm has approved these words yet.
 */
export const nl: Content = {
    locale: 'nl',

    meta: {
        title: 'Flexcontractor B.V. | Verbouwingen van A tot Z',
        description:
            'Flexcontractor B.V. biedt complete renovatie- en bouwdiensten voor zakelijk '
            + 'en particulier vastgoed in Amsterdam en Noord-Holland. Van planning tot '
            + 'oplevering, met passie voor perfectie.',
    },

    nav: {
        services: 'Diensten',
        specialisms: 'Specialismes',
        about: 'Over ons',
        contact: 'Contact',
        careers: 'Werken bij',
    },

    actions: {
        requestQuote: 'Vrijblijvende offerte',
        seeWork: 'Bekijk specialismes',
        readMore: 'Lees meer',
        allSpecialisms: 'Alle specialismes',
        backToServices: 'Alle diensten',
        backToSpecialisms: 'Alle specialismes',
        callUs: 'Bel ons',
        skipToContent: 'Naar de inhoud',
        openMenu: 'Menu openen',
        closeMenu: 'Menu sluiten',
        switchLanguage: 'Switch to English',
    },

    hero: {
        eyebrow: 'Met passie voor perfectie',
        title: 'Verbouwingen van A tot Z',
        lede: 'Uw betrouwbare partner voor renovatie en bouw.',
        scroll: 'Scroll',
    },

    intro: {
        eyebrow: 'Full service',
        title: 'Full service verbouwingen van zakelijk en particulier vastgoed',
        body:
            'Flexcontractor B.V. biedt complete renovatie- en bouwdiensten voor zowel '
            + 'commerciële als particuliere eigendommen. Wij zorgen voor elk detail van uw '
            + 'project, van planning tot oplevering, met de hoogste kwaliteitsstandaarden.',
    },

    values: {
        eyebrow: 'Waarom Flexcontractor',
        title: 'Acht redenen om met ons te werken',
        items: [
            {title: 'Vertrouwd en ervaren', body: 'Decennialange ervaring in de bouwsector.'},
            {title: 'Geen contracten', body: 'Flexibele diensten zonder langdurige verplichtingen.'},
            {title: 'Uitsluitend maatwerk', body: 'Elke klus is uniek, net als onze oplossingen.'},
            {title: 'Oplossingsgericht', body: 'Oplossingen die perfect passen bij uw wensen.'},
            {title: 'Betrouwbaar en volledig verzekerd', body: 'Uw project is bij ons in veilige handen.'},
            {title: 'Tevredenheid gegarandeerd', body: 'Wij streven altijd naar 100% klanttevredenheid.'},
            {title: 'Volledige ontzorging', body: 'Wij regelen alles, van vergunningen tot afwerking.'},
            {title: 'Eerlijke prijzen', body: 'Transparante en concurrerende tarieven.'},
        ],
    },

    specialisms: {
        eyebrow: 'Onze specialismes',
        title: 'Twaalf vakgebieden',
        lede:
            'Van een enkele trap tot een volledige verbouwing. Elk specialisme wordt '
            + 'uitgevoerd door onze eigen vakmensen.',
        scrollHint: 'Blijf scrollen om alle specialismes te zien',
        swipeHint: 'Swipe of scroll opzij',
        items: [
            {
                slug: 'grindvloer-steentapijt',
                title: 'Grindvloer en steentapijt',
                description:
                    'Flexcontractor B.V. is uw expert voor het aanleggen van duurzame en '
                    + 'stijlvolle grindvloeren en steentapijten. Ideaal voor zowel commerciële '
                    + 'ruimtes als particuliere woningen. Wij bieden een breed scala aan '
                    + 'kleuren en patronen die perfect passen bij uw interieur.',
            },
            {
                slug: 'aanbouw-en-uitbouw',
                title: 'Aanbouw en uitbouw',
                description:
                    'Of u nu meer ruimte wilt creëren voor uw gezin of uw bedrijf wilt '
                    + 'uitbreiden, Flexcontractor B.V. zorgt voor hoogwaardige aanbouw- en '
                    + 'uitbouwprojecten. Van vergunningaanvragen tot de laatste afwerking, wij '
                    + 'regelen alles.',
                image: '/img/verbouwing.jpg',
                imageAlt:
                    'Woning tijdens de sloopfase van een verbouwing, met blootliggend '
                    + 'houtskelet en een ladder',
            },
            {
                slug: 'tuin-of-dakterras',
                title: 'Tuin of dakterras',
                description:
                    'Geniet optimaal van uw buitenruimte met een professioneel aangelegd tuin '
                    + 'of dakterras. Flexcontractor B.V. biedt op maat gemaakte ontwerpen die '
                    + 'uw wensen en budget respecteren, voor een functionele en esthetische '
                    + 'buitenomgeving.',
            },
            {
                slug: 'zwevende-trap',
                title: 'Zwevende trap',
                description:
                    'Voor een moderne en onderhoudsvriendelijke vloer kiest u een zwevende '
                    + 'vloer van Flexcontractor B.V. Geschikt voor zowel woonhuizen als '
                    + 'kantoren, deze vloeren bieden uitstekende isolatie en geluidsdemping.',
            },
            {
                slug: 'traprenovatie',
                title: 'Traprenovatie of nieuwe trap',
                description:
                    'Geef uw trap een nieuw leven met onze traprenovatiediensten, of laat een '
                    + 'volledig nieuwe trap installeren. Flexcontractor B.V. levert vakmanschap '
                    + 'dat zowel veiligheid als stijl garandeert.',
                image: '/img/trap-en-vloer.jpg',
                imageAlt:
                    'Open woonruimte met een houten trap met zwevende treden en een '
                    + 'houten vloer',
            },
            {
                slug: 'alle-soorten-vloeren',
                title: 'Alle soorten vloeren',
                description:
                    'Van parket tot laminaat, Flexcontractor B.V. legt alle soorten vloeren met '
                    + 'precisie en zorg. Wij adviseren u graag over de beste opties voor uw '
                    + 'specifieke situatie en zorgen voor een vakkundige installatie.',
            },
            {
                slug: 'dakopbouw-of-dakkapel',
                title: 'Dakopbouw of dakkapel',
                description:
                    'Verhoog de waarde en functionaliteit van uw woning met een dakopbouw of '
                    + 'dakkapel van Flexcontractor B.V. Onze oplossingen zorgen voor extra '
                    + 'ruimte en lichtinval, afgestemd op uw wensen.',
            },
            {
                slug: 'raam-en-deurkozijnen',
                title: 'Raam- en deurkozijnen',
                description:
                    'Voeg karakter en detail toe aan uw woning met op maat gemaakte raam- en '
                    + 'deurlijsten van Flexcontractor B.V. Onze vakmensen zorgen voor een '
                    + 'perfecte afwerking die bijdraagt aan de uitstraling van uw interieur.',
                image: '/img/afwerking.jpg',
                imageAlt: 'Strakke moderne keuken met lichte kastenwand en houten vloer',
            },
            {
                slug: 'keuken-installatie',
                title: 'Keuken installatie',
                description:
                    'Van ontwerp tot installatie, Flexcontractor B.V. zorgt voor uw '
                    + 'droomkeuken. Wij werken met hoogwaardige materialen en apparatuur om een '
                    + 'functionele en stijlvolle keuken te creëren die perfect bij uw leefstijl '
                    + 'past.',
                image: '/img/keuken.jpg',
                imageAlt:
                    'Moderne keuken met donkere houten kasten, wit werkblad en zwarte '
                    + 'hanglampen',
            },
            {
                slug: 'vloerverwarming',
                title: 'Vloerverwarming',
                description:
                    'Geniet van het comfort van vloerverwarming, geïnstalleerd door '
                    + 'Flexcontractor B.V. Wij bieden energie-efficiënte oplossingen die zorgen '
                    + 'voor een gelijkmatige warmteverdeling in uw woning of kantoor.',
            },
            {
                slug: 'electra-en-loodgieterswerk',
                title: 'Electra en loodgieterswerk',
                description:
                    'Voor betrouwbaar electra en loodgieterswerk kunt u rekenen op de expertise '
                    + 'van Flexcontractor B.V. Of het nu gaat om een complete installatie of '
                    + 'reparatiewerkzaamheden, wij garanderen veiligheid en kwaliteit.',
            },
            {
                slug: 'warmtewinning',
                title: 'Warmtewinning',
                description:
                    'Voor duurzame energieoplossingen zoals warmtepompen en zonneboilers kunt u '
                    + 'bij Flexcontractor B.V. terecht. Wij helpen u de juiste systemen te '
                    + 'kiezen en installeren ze vakkundig voor maximale energiebesparing.',
            },
        ],
    },

    services: {
        eyebrow: 'Onze diensten',
        title: 'Diensten',
        lede:
            'Zes manieren waarop wij werken, van een klus van één dag tot een verbouwing '
            + 'van begin tot eind. De aanpak is steeds dezelfde; alleen de omvang verschilt.',
        includesLabel: 'Wat de dienst omvat',
        faqLabel: 'Veelgestelde vragen',
        faqTitle: 'Voordat u het vraagt',
        otherLabel: 'Andere diensten',
        items: [
            {
                slug: 'verbouwing',
                number: '01',
                title: 'Verbouwing',
                summary:
                    'Het aanpassen van een bestaande ruimte aan een nieuwe indeling, functie '
                    + 'of standaard.',
                body: [
                    'Een verbouwing begint zelden bij een leeg vel. Er staat al iets, er wordt '
                    + 'al gewoond of gewerkt, en de vraag is hoe u van hier naar daar komt '
                    + 'zonder dat het maanden onbruikbaar wordt.',
                    'Wij brengen eerst de bestaande situatie in kaart, inclusief wat er achter '
                    + 'de wanden zit, en pas daarna maken wij een planning. Dat scheelt precies '
                    + 'de verrassingen die een verbouwing duurder maken dan afgesproken.',
                ],
                includes: [
                    'Opname en inventarisatie van de bestaande situatie',
                    'Ontwerp- en indelingsvoorstel',
                    'Vergunningaanvraag waar nodig',
                    'Sloop, opbouw en volledige afwerking',
                    'Eén vaste contactpersoon van start tot oplevering',
                ],
                faqs: [
                    {
                        question: 'Kunnen wij in de woning blijven tijdens de verbouwing?',
                        answer:
                            'Meestal wel, door in zones te werken. Het verlengt de doorlooptijd '
                            + '-- doorgaans met twintig tot veertig procent -- en dat zeggen wij '
                            + 'vooraf, niet halverwege.',
                    },
                    {
                        question: 'Regelen jullie de vergunning?',
                        answer:
                            'Ja. Wij beoordelen of een omgevingsvergunning nodig is en verzorgen '
                            + 'de aanvraag inclusief tekeningen.',
                    },
                ],
            },
            {
                slug: 'renovatie',
                number: '02',
                title: 'Renovatie',
                summary:
                    'Het terugbrengen van een woning of pand naar nieuwstaat, met behoud van '
                    + 'wat goed is.',
                body: [
                    'Renovatie is de kunst van het onderscheid maken tussen wat vervangen moet '
                    + 'worden en wat alleen aandacht nodig heeft. Alles vervangen is duur; te '
                    + 'weinig vervangen is duurder.',
                    'Wij inspecteren per onderdeel -- installaties, vloeren, kozijnen, '
                    + 'afwerking -- en leggen vast wat wij aanraden en waarom, zodat u de '
                    + 'afweging zelf kunt maken.',
                ],
                includes: [
                    'Bouwkundige opname per onderdeel',
                    'Advies over vervangen versus herstellen',
                    'Vernieuwing van installaties waar nodig',
                    'Volledige afwerking en oplevering',
                ],
                faqs: [
                    {
                        question: 'Wat is het verschil met een verbouwing?',
                        answer:
                            'Bij een verbouwing verandert de indeling of de functie. Bij een '
                            + 'renovatie blijft die grotendeels gelijk en gaat het om de staat '
                            + 'van het pand.',
                    },
                ],
            },
            {
                slug: 'restauratie',
                number: '03',
                title: 'Restauratie',
                summary:
                    'Herstel van historisch werk in de oorspronkelijke staat, inclusief de '
                    + 'vergunningen die daarbij horen.',
                body: [
                    'Bij een monument of een pand met karakter is de waarde vaak juist het '
                    + 'detail: het stucwerk, de trap, de kozijnen, de betimmering. Dat vraagt '
                    + 'een andere aanpak dan vervangen.',
                    'Wij inventariseren en documenteren wat behouden moet blijven voordat er '
                    + 'iets wordt verwijderd, en stemmen de aanpak af met de gemeente wanneer '
                    + 'een monumentenvergunning nodig is.',
                ],
                includes: [
                    'Inventarisatie en fotodocumentatie vooraf',
                    'Afstemming met de gemeente en monumentenzorg',
                    'Herstel van stucwerk, betimmering en historische kozijnen',
                    'Terugplaatsing op de oorspronkelijke positie',
                ],
                faqs: [
                    {
                        question: 'Ons pand is een monument. Verandert dat veel?',
                        answer:
                            'Het verandert de vergunningsroute en het bestek, niet de kwaliteit '
                            + 'van het werk. Wij verzorgen de monumentenvergunning naast de '
                            + 'omgevingsvergunning en stemmen de aanpak vooraf af.',
                    },
                ],
            },
            {
                slug: 'kortlopende-opdracht',
                number: '04',
                title: 'Kortlopende opdracht',
                summary:
                    'Een afgebakende klus van een dag tot enkele weken, zonder langlopende '
                    + 'verplichtingen.',
                body: [
                    'Niet elk project is een verbouwing. Een trap, een keuken, een dakkapel of '
                    + 'een vloer is soms precies wat er nodig is -- en dan hoort daar geen '
                    + 'maandenlange planning bij.',
                    'Wij nemen kortlopende opdrachten aan als volwaardige opdracht, met '
                    + 'dezelfde opname, dezelfde prijsafspraak en dezelfde oplevering als een '
                    + 'groot project.',
                ],
                includes: [
                    'Vaste prijs vooraf',
                    'Eén afgebakende scope, geen doorlopend contract',
                    'Uitvoering door onze eigen vakmensen',
                    'Oplevering met opleverlijst',
                ],
                faqs: [
                    {
                        question: 'Is er een minimale opdrachtgrootte?',
                        answer:
                            'Nee. Wij kijken per aanvraag of wij de klus goed kunnen inplannen '
                            + 'en zeggen het eerlijk wanneer een andere partij u sneller helpt.',
                    },
                ],
            },
            {
                slug: 'onderhoud',
                number: '05',
                title: 'Onderhoud',
                summary:
                    'Periodiek en correctief onderhoud aan woningen en zakelijk vastgoed.',
                body: [
                    'Onderhoud is het goedkoopste moment om een probleem op te lossen. Wat nu '
                    + 'een uur kost, kost over drie jaar een verbouwing.',
                    'Wij voeren zowel losse onderhoudsklussen uit als periodiek onderhoud voor '
                    + 'vastgoedbeheerders, met een vaste ploeg die het pand leert kennen.',
                ],
                includes: [
                    'Periodieke inspectie en rapportage',
                    'Correctief onderhoud en reparatie',
                    'Schilderwerk en houtherstel',
                    'Installatiecontrole in samenwerking met onze installateurs',
                ],
                faqs: [
                    {
                        question: 'Werken jullie ook voor vastgoedbeheerders?',
                        answer:
                            'Ja. Voor beheerders werken wij met vaste aanspreekpunten en een '
                            + 'terugkerende ploeg, zodat kennis van het pand niet elke keer '
                            + 'opnieuw opgebouwd hoeft te worden.',
                    },
                ],
            },
            {
                slug: 'volledige-verbouwing',
                number: '06',
                title: 'Volledige verbouwing',
                summary:
                    'Het hele traject in één hand: ontwerp, vergunning, uitvoering en '
                    + 'oplevering.',
                body: [
                    'Bij een volledige verbouwing bent u niet degene die de aannemer, de '
                    + 'installateur, de keukenleverancier en de gemeente op elkaar moet '
                    + 'afstemmen. Dat is precies wat volledige ontzorging betekent.',
                    'Eén planning, één prijsafspraak, één contactpersoon, van de eerste '
                    + 'schets tot de laatste opleverpunt.',
                ],
                includes: [
                    'Ontwerp en indeling',
                    'Vergunningaanvraag en afstemming met de gemeente',
                    'Constructie, installaties en afwerking',
                    'Coördinatie van alle leveranciers',
                    'Oplevering met garantiedocumentatie',
                ],
                faqs: [
                    {
                        question: 'Werken jullie samen met onze architect?',
                        answer:
                            'Graag, en het liefst al tijdens het ontwerp in plaats van erna. '
                            + 'Juist in die fase valt de meeste winst te behalen.',
                    },
                    {
                        question: 'Hoe wordt de prijs vastgesteld?',
                        answer:
                            'Op basis van een opname en een uitgewerkt bestek. Wij prijzen de '
                            + 'onderdelen die het vaakst tot meerwerk leiden juist vooraf door, '
                            + 'zodat de prijs die u krijgt de prijs blijft.',
                    },
                ],
            },
        ],
    },

    testimonials: {
        eyebrow: 'Tevreden klanten',
        title: 'Wat opdrachtgevers zeggen',
        items: [
            {
                quote:
                    'Flexcontractor heeft onze verwachtingen overtroffen met hun '
                    + 'professionaliteit en geduld. Ondanks onze uitdagende wensen is ons '
                    + 'renovatieproject binnen de afgesproken tijd en budget afgerond. We zijn '
                    + 'ontzettend tevreden met het resultaat!',
                name: 'Benovative.nl',
            },
            {
                quote:
                    'Het team van Flexcontractor heeft ons huis volledig gerenoveerd. Ze waren '
                    + 'professioneel, betrouwbaar en leverden werk van hoge kwaliteit. We konden '
                    + 'niet gelukkiger zijn met het resultaat!',
                name: 'Familie de Jong',
            },
            {
                quote:
                    'Onze nieuwe kantoorruimte is precies wat we nodig hadden. Flexcontractor '
                    + 'begreep onze visie en bracht deze tot leven. Hun aandacht voor detail en '
                    + 'klantgerichtheid waren indrukwekkend.',
                name: 'Spinning Top B.V.',
            },
        ],
    },

    contact: {
        eyebrow: 'Contact',
        title: 'Boek een intakegesprek of vraag een offerte aan',
        lede:
            'Vertel ons waar het pand staat en in welke fase u zit. Tekeningen, een globale '
            + 'omschrijving of drie regels over het idee zijn genoeg om te beginnen.',
        phoneLabel: 'Telefoon',
        emailLabel: 'E-mail',
        officeLabel: 'Kantoor',
        hoursLabel: 'Openingstijden',
        areaLabel: 'Werkgebied',
        formTitle: 'Stuur uw projectgegevens',
    },

    form: {
        name: 'Naam *',
        namePlaceholder: 'Jan Jansen',
        email: 'E-mailadres *',
        emailPlaceholder: 'jan@bedrijf.nl',
        phone: 'Telefoonnummer',
        phonePlaceholder: '+31 6 12345678',
        projectType: 'Type project',
        projectTypePlaceholder: 'Kies een type project',
        other: 'Iets anders',
        message: 'Over het project *',
        messagePlaceholder: 'Locatie, globale omvang en in welke fase u zit.',
        submit: 'Aanvraag versturen',
        submitting: 'Versturen…',
        privacyNote: 'Wij reageren binnen één werkdag. Lees ons',
        privacyLink: 'privacybeleid',
        errors: {
            name: 'Vul uw naam in.',
            emailMissing: 'Wij hebben een e-mailadres nodig om te kunnen reageren.',
            emailInvalid: 'Dit lijkt geen volledig e-mailadres.',
            messageMissing: 'Vertel ons kort iets over het project.',
            messageShort: 'Met een paar zinnen kunnen wij uw vraag bij de juiste vakman leggen.',
            generic: 'Er ging iets mis bij het versturen. Probeer het opnieuw.',
        },
        success: {
            eyebrow: 'Verzonden',
            title: 'Dank u — wij hebben uw bericht.',
            body: 'Iemand van het team reageert binnen één werkdag. Is het dringend, bel dan',
            again: 'Nog een bericht sturen',
        },
        unavailable: {
            eyebrow: 'Formulier niet beschikbaar',
            title: 'Dit formulier is nog niet aangesloten.',
            body:
                'Uw bericht is NIET verzonden. Neem in de tussentijd rechtstreeks contact met '
                + 'ons op — wij pakken het direct op.',
        },
    },

    about: {
        eyebrow: 'Over ons',
        title: 'Met passie voor perfectie',
        lede:
            'Flexcontractor B.V. verzorgt verbouwingen, renovaties en onderhoud voor zakelijk '
            + 'en particulier vastgoed in Amsterdam en Noord-Holland.',
        credentialsEyebrow: 'Gegevens',
        credentialsTitle: 'Op papier',
        kvkLabel: 'Kamer van Koophandel',
        vatLabel: 'BTW-identificatienummer',
        certificationLabel: 'Certificering',
        insuranceLabel: 'Verzekering',
        foundedLabel: 'Actief sinds',
        areaLabel: 'Werkgebied',
    },

    careers: {
        eyebrow: 'Werken bij',
        title: 'Werken bij Flexcontractor',
        lede:
            'Wij werken met eigen vakmensen en nemen daarom gestaag aan in plaats van met '
            + 'pieken. Staat de functie die u zoekt er niet bij, stuur uw gegevens dan toch — '
            + 'wij bewaren ze.',
        openRolesEyebrow: 'Openstaande functies',
        noOpenings: 'Geen openstaande vacatures',
        speculative: 'Open sollicitatie sturen',
        benefitsEyebrow: 'Wat wij bieden',
        benefitsTitle: 'De voorwaarden',
        benefits: [
            'In vaste dienst, niet via een uitzendbureau',
            'Arbeidsvoorwaarden volgens de CAO Bouw & Infra',
            'Pensioen via bpfBOUW',
            'VCA en vakcertificering betaald en verlengd',
            'Gereedschap, PBM, bus en reiskostenvergoeding',
            'Overuren uitbetaald, niet opgespaard',
        ],
    },

    privacy: {
        eyebrow: 'Juridisch',
        title: 'Privacybeleid',
        updated: 'september 2026',
        contactHeading: 'Contact',
        sections: [
            {
                heading: 'Welke gegevens wij verzamelen',
                body:
                    'Alleen wat u zelf invult in het contactformulier: uw naam, e-mailadres, '
                    + 'eventueel uw telefoonnummer, een type project en uw bericht. Wij '
                    + 'gebruiken geen analytics, advertentie- of trackingcookies op deze site, '
                    + 'en er staan op geen enkele pagina embeds van derden.',
            },
            {
                heading: 'Waarom wij ze verzamelen',
                body:
                    'Om op uw aanvraag te reageren en, als het een project wordt, het werk uit '
                    + 'te voeren. Dat is het enige doel. Onze grondslag onder de AVG is dat de '
                    + 'verwerking noodzakelijk is om op uw verzoek stappen te zetten voordat '
                    + 'een overeenkomst wordt gesloten. Wij verkopen uw gegevens niet, delen ze '
                    + 'niet voor marketing en zetten u niet op een mailinglijst.',
            },
            {
                heading: 'Hoe ze bij ons terechtkomen',
                body:
                    'Aanvragen worden naar onze mailbox gestuurd via een dienst voor '
                    + 'transactionele e-mail, die daarbij optreedt als verwerker. Uw bericht '
                    + 'wordt niet opgeslagen in een database op deze website. Onze server '
                    + 'bewaart kort per IP-adres wanneer een aanvraag binnenkwam om '
                    + 'geautomatiseerd misbruik van het formulier te beperken; daarin staat '
                    + 'geen berichtinhoud en het wordt binnen enkele minuten gewist.',
            },
            {
                heading: 'Hoe lang wij ze bewaren',
                body:
                    'Aanvragen die niet tot werk leiden worden binnen twaalf maanden uit onze '
                    + 'mailbox verwijderd. Gegevens over projecten die wij hebben uitgevoerd '
                    + 'bewaren wij zolang onze verzekering en wettelijke verplichtingen dat '
                    + 'vragen.',
            },
            {
                heading: 'Uw rechten',
                body:
                    'Op grond van de AVG kunt u opvragen welke gegevens wij van u hebben, ze '
                    + 'laten corrigeren of verwijderen, de verwerking laten beperken of '
                    + 'stopzetten, en een kopie in een overdraagbare vorm opvragen. Wij '
                    + 'reageren binnen één maand. Bent u niet tevreden over de afhandeling, dan '
                    + 'kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.',
            },
        ],
    },

    cta: {
        eyebrow: 'Volgende stap',
        title: 'Boek vandaag een intakegesprek of vraag een offerte aan',
        body:
            'Stuur de tekeningen, het adres van het pand, of drie regels waarin u het idee '
            + 'omschrijft. Wij reageren binnen één werkdag.',
    },

    footer: {
        tagline: 'Met passie voor perfectie',
        servicesLabel: 'Diensten',
        companyLabel: 'Bedrijf',
        contactLabel: 'Contact',
        followLabel: 'Volg ons',
        privacy: 'Privacybeleid',
        rights: 'Alle rechten voorbehouden.',
    },

    error: {
        notFoundTitle: 'Deze pagina bestaat niet.',
        notFoundBody:
            'De pagina is mogelijk verplaatst of de link is verouderd. Onze diensten, '
            + 'specialismes en contactgegevens staan er nog gewoon.',
        genericTitle: 'Er ging iets mis.',
        genericBody:
            'Er is een onverwachte fout opgetreden aan onze kant. Probeer het opnieuw of bel '
            + 'ons rechtstreeks.',
        home: 'Terug naar home',
        specialisms: 'Bekijk specialismes',
    },
}
