<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Wavenxt Next.js App Router project. PostHog is initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+) with automatic exception capture and session replay enabled. A server-side PostHog client (`lib/posthog-server.ts`) was added for API route tracking. The Next.js reverse proxy (`/ingest`) was configured in `next.config.ts` to route PostHog events through the EU region endpoint. Environment variables for the PostHog token and host are stored in `.env.local`.

| Event | Description | File |
|---|---|---|
| `contact_form_submitted` | User successfully submits the contact inquiry form | `app/contact/page.tsx` |
| `contact_form_errored` | Contact form submission fails (API error) | `app/contact/page.tsx` |
| `contact_email_sent` | Server successfully sends a contact inquiry email | `app/api/contact/route.ts` |
| `software_request_sent` | Server successfully sends a software request email | `app/api/software-request/route.ts` |
| `webinar_registration_submitted` | User submits the gate form to unlock a webinar video (with user identify) | `app/resources/webinars/[id]/VideoGate.tsx` |
| `webinar_unlocked` | User clicks Watch Now and the webinar video is unlocked | `app/resources/webinars/[id]/VideoGate.tsx` |
| `product_quote_requested` | User clicks Request a Quote on a Butler Matrix product page | `app/products/butler-matrix/[id]/page.tsx` |
| `product_datasheet_downloaded` | User downloads a datasheet on a Butler Matrix product page | `app/products/butler-matrix/[id]/page.tsx` |
| `product_quote_requested` | User clicks Request a Quote on a Digital Attenuator product page | `app/products/digital-attenuators/[id]/page.tsx` |
| `product_datasheet_downloaded` | User downloads a datasheet on a Digital Attenuator product page | `app/products/digital-attenuators/[id]/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://eu.posthog.com/project/111074/dashboard/703032)
- [Contact Form Submissions](https://eu.posthog.com/project/111074/insights/a1Vwr8eo) — daily trend of contact inquiries
- [Webinar Registrations](https://eu.posthog.com/project/111074/insights/5EIqREnh) — daily trend of webinar gate registrations
- [Product Quote Requests](https://eu.posthog.com/project/111074/insights/CVWmDj8E) — quote requests broken down by product category
- [Datasheet Downloads](https://eu.posthog.com/project/111074/insights/ahJUwrib) — daily trend of product datasheet downloads
- [Lead Generation Funnel](https://eu.posthog.com/project/111074/insights/SaakAzwJ) — conversion from product quote request to contact form submission

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
