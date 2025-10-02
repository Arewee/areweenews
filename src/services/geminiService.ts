import { GoogleGenAI, Type } from "@google/genai";
import type { NewsItem, UpcomingEvent, DayInfo, Source } from '../types';
import { swedishNameDays } from '../data/nameDays';
import { localEvents } from '../data/localEvents';
import { ALL_SOURCES } from "../types";

// Adhering to the @google/genai coding guidelines.
// The API key is obtained from process.env.API_KEY and is assumed to be pre-configured.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const viralityScoreMetricSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.NUMBER, description: 'Den numeriska poängen (1-100).'},
        explanation: { type: Type.STRING, description: 'En konkret, datadriven förklaring. Exempel: "Ökar med ~40 000 omnämnanden per timme".'}
    },
    required: ['score', 'explanation']
};

const viralityQualitativeMetricSchema = {
    type: Type.OBJECT,
    properties: {
        value: { type: Type.STRING, description: 'Den kvalitativa bedömningen (t.ex. "Hög", "Miljontals").'},
        explanation: { type: Type.STRING, description: 'En konkret, datadriven förklaring. Exempel: "Uppskattningsvis 15+ miljoner exponeringar idag".'}
    },
    required: ['value', 'explanation']
};


const viralityBreakdownSchema = {
    type: Type.OBJECT,
    properties: {
        viralityRate: { ...viralityScoreMetricSchema, description: 'Poäng (1-100) och en konkret förklaring av spridningshastigheten (t.ex. omnämnanden/timme).'},
        engagementRate: { ...viralityScoreMetricSchema, description: 'Poäng (1-100) och en förklaring av engagemanget (t.ex. interaktionsgrad i procent).'},
        estimatedReach: { ...viralityQualitativeMetricSchema, description: 'Kvalitativ bedömning (t.ex. "Miljontals") och en konkret uppskattning av räckvidden (t.ex. "5-7 miljoner unika konton").'},
        impressionVolume: { ...viralityQualitativeMetricSchema, description: 'Kvalitativ bedömning och en konkret uppskattning av exponeringsvolymen (t.ex. "Över 20 miljoner exponeringar idag").'},
        shareVelocity: { ...viralityQualitativeMetricSchema, description: 'Kvalitativ bedömning och en konkret förklaring av delningsaktiviteten (t.ex. "Fördubblats de senaste 24 timmarna").'},
        sentiment: { type: Type.STRING, description: 'Sentimentet. Välj en av: "Positive", "Negative", "Neutral", "Mixed".'},
        keyFactors: { type: Type.STRING, description: 'En kort mening som förklarar de viktigaste drivkrafterna bakom trenden.'}
    },
    required: ['viralityRate', 'engagementRate', 'estimatedReach', 'impressionVolume', 'shareVelocity', 'sentiment', 'keyFactors']
};


const newsItemSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: 'En kort, specifik och faktabaserad rubrik på svenska. Inkludera namn på personer, produkter, etc. Undvik "clickbait".'
        },
        summary: {
            type: Type.STRING,
            description: 'En sammanfattning på 2-3 meningar på svenska. Var konkret och informativ.'
        },
        sourceUrl: {
            type: Type.STRING,
            description: 'En direkt URL till källan.'
        },
        sourceName: {
            type: Type.STRING,
            description: 'Namnet på källan/plattformen där trenden är viral, t.ex. "TikTok", "Reddit", "X".'
        },
        viralityScore: {
            type: Type.NUMBER,
            description: 'En uppskattning av hur viral trenden är just nu på en skala från 1 till 100, där 100 är extremt viral.'
        },
        regions: {
            type: Type.ARRAY,
            description: 'En lista på 1-3 geografiska regioner (kontinenter eller länder) där trenden är mest populär.',
            items: {
                type: Type.STRING
            }
        },
        primaryRegionIcon: {
            type: Type.STRING,
            description: 'En ikon-identifierare baserad på den primära regionen. Välj en av: "GLOBAL", "USA", "EU", "SE".'
        },
        trendDirection: {
            type: Type.STRING,
            description: 'Riktningen på trenden. Välj en av: "UP" (växande), "DOWN" (avtagande), "STABLE" (stabil).'
        },
        currentActivityLevel: {
            type: Type.STRING,
            description: 'Trendens nuvarande status för att ge tidskontext. Välj en av: "NEW" (helt ny trend, < 7 dagar), "PEAKING" (på sin absoluta topp just nu), "RESURGENT" (en äldre trend som fått nytt viralt liv).'
        },
        startDate: {
            type: Type.STRING,
            description: 'Datum då trenden började bli märkbar, i formatet YYYY-MM-DD.'
        },
        viralityHistory: {
            type: Type.ARRAY,
            description: 'En lista med 5-7 siffror (heltal) som representerar viralitetspoängen för de senaste 5-7 dagarna, med den senaste dagen sist. Exempel: [20, 35, 50, 65, 80].',
            items: {
                type: Type.NUMBER
            }
        },
        viralityBreakdown: {
            ...viralityBreakdownSchema,
            description: 'En detaljerad, datadriven uppdelning av viralitetspoängen. Varje mätvärde måste ha en konkret förklaring.'
        }
    },
    required: ['title', 'summary', 'sourceUrl', 'sourceName', 'viralityScore', 'regions', 'trendDirection', 'currentActivityLevel']
};

const upcomingEventSchema = {
    type: Type.OBJECT,
    properties: {
        category: {
            type: Type.STRING,
            description: 'Kategori på svenska. Exempel: Lokalt Norrtälje, Internationellt, Svensk Politik, Tech, Nöje.'
        },
        title: {
            type: Type.STRING,
            description: 'Titel på evenemanget/händelsen på svenska.'
        },
        description: {
            type: Type.STRING,
            description: 'En kort beskrivning av händelsen på svenska.'
        },
        eventDate: {
            type: Type.STRING,
            description: 'Datum och eventuell tid för händelsen, INKLUSIVE ÅR. Format: "Dag DD Mån ÅÅÅÅ, HH:MM" eller "Dag DD Mån ÅÅÅÅ". Exempel: "Tis 28 okt 2024, 19:00" eller "Fre 31 okt 2024".'
        },
        rawDate: {
            type: Type.STRING,
            description: 'Samma datum som eventDate, men i strikt YYYY-MM-DD-format för tillförlitlig sortering. Exempel: "2024-10-28".'
        },
        sourceUrl: {
            type: Type.STRING,
            description: 'En valfri, fungerande och högst relevant URL till en sida med mer information om händelsen. Om ingen bra länk finns, utelämna fältet.'
        }
    },
    required: ['category', 'title', 'description', 'eventDate', 'rawDate']
};

const dayInfoPartialSchema = {
    type: Type.OBJECT,
    properties: {
        themeDay: {
            type: Type.STRING,
            description: "En internationellt erkänd temadag. Annars null."
        },
        weekNumber: {
            type: Type.NUMBER,
            description: "Aktuellt veckonummer i Sverige enligt ISO 8601."
        }
    },
    required: ['weekNumber']
};


export const fetchViralNews = async (excludeTitles: string[] = [], selectedSources: Source[]): Promise<NewsItem[]> => {
    try {
        const exclusionPrompt = excludeTitles.length > 0
            ? ` Följande rubriker har redan visats, så generera helt nya trender som inte finns i den här listan: ${excludeTitles.join(', ')}.`
            : '';
        
        const sourcesPrompt = selectedSources.length > 0 && selectedSources.length < ALL_SOURCES.length
            ? ` Fokusera på trender från följande källor: ${selectedSources.join(', ')}.`
            : ' Sök brett över alla populära sociala medier.';

        const prompt = `Agera som en expert dataanalytiker. Ditt primära uppdrag är att med högsta precision identifiera och returnera de **8 absolut mest virala och betydelsefulla trenderna just nu** som är underrapporterade av traditionella nyhetsmedier.
**KRAV PÅ INNEHÅLL:**
1.  **Antal:** Exakt 8 trender ska returneras.
2.  **Svenskt innehåll:** Exakt 2 av dessa 8 trender MÅSTE ha 'primaryRegionIcon' satt till 'SE'. De andra 6 kan vara från valfri region.
3.  **Sortering:** Sortera hela listan med de 8 trenderna efter 'viralityScore' i fallande ordning (högst poäng först). Resultatet ska reflektera en stabil och aktuell topplista, inte ett slumpmässigt urval.
Målgruppen är svensk.
${sourcesPrompt}

För varje trend, inkludera ALLTID:
1.  En specifik, faktabaserad titel och en kort sammanfattning.
2.  En URL till källan, källans namn, regioner, primär region-ikon, och ett startdatum.
3.  Ett övergripande 'viralityScore' (1-100), en 'trendDirection' ('UP', 'DOWN', 'STABLE'), och en 'viralityHistory' (array med 5-7 siffror).
4.  **Tidskontext:** Ett 'currentActivityLevel' som beskriver trendens nuvarande status. Välj en av: "NEW" (ny < 7 dagar), "PEAKING" (på sin absoluta topp just nu), "RESURGENT" (äldre trend som fått nytt viralt liv).

5.  **Detaljerad & Konkret Analys ('viralityBreakdown'):** Detta är den viktigaste delen. För varje mätvärde, ange både ett värde/poäng OCH en konkret, datadriven förklaring.
    *   **viralityRate:** Numerisk poäng ('score') 1-100 OCH en förklaring som "Ökar med ~X omnämnanden/timme".
    *   **engagementRate:** Numerisk poäng ('score') 1-100 OCH en förklaring som "Hög interaktionsgrad (~X%)".
    *   **estimatedReach:** Kvalitativ term ('value', t.ex. "Miljontals") OCH en förklaring som "Uppskattas nå X-Y miljoner unika konton".
    *   **impressionVolume:** Kvalitativ term ('value', t.ex. "Hög") OCH en förklaring som "Över X miljoner exponeringar idag".
    *   **shareVelocity:** Kvalitativ term ('value', t.ex. "Snabb") OCH en förklaring som "Antalet delningar har fördubblats de senaste X timmarna".
    *   **sentiment:** ('Positive', 'Negative', 'Neutral', 'Mixed').
    *   **keyFactors:** En kort förklarande mening.

All text måste vara på svenska. Var så specifik och datadriven som möjligt i dina förklaringar.${exclusionPrompt}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                