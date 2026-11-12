# embedio examples

Working contact forms for static and framework sites, backed by [embedio](https://tryembedio.com): a hosted backend for websites. Point a form at embedio and submissions land in a dashboard, with spam filtering, validation and notifications handled for you. No server, API route or database of your own.

Every example posts to the same endpoint:

```
POST https://api.tryembedio.com/f/frm_your_form_key
```

Replace `frm_your_form_key` with your form's key (create a form at [tryembedio.com](https://tryembedio.com/en/signup); the Free plan needs no card). The key is public by design: it only allows sending to that one form.

## Examples

| Folder | What it shows | Guide |
| --- | --- | --- |
| [`nextjs/`](nextjs) | App Router: a zero-JS form in a Server Component, plus a client component that submits with `fetch` | [Next.js guide](https://tryembedio.com/en/forms/nextjs) |
| [`react/`](react) | One component with loading, success and validation-error states | [React guide](https://tryembedio.com/en/forms/react) |
| [`astro/`](astro) | A static Astro component, with an optional in-place submit script | [Astro guide](https://tryembedio.com/en/forms/astro) |
| [`hugo/`](hugo) | A partial and shortcode configured from `hugo.toml` | [Hugo guide](https://tryembedio.com/en/forms/hugo) |
| [`github-pages/`](github-pages) | Plain HTML, a Jekyll include, and a no-reload version using `sdk.js` | [GitHub Pages guide](https://tryembedio.com/en/forms/github-pages) |

## How submissions behave

- **Body formats:** JSON, URL-encoded or multipart. Send JSON (or `Accept: application/json`) to get `{ ok, message, redirectUrl }` back instead of an HTML page.
- **Spam:** a hidden `_gotcha` field is a honeypot; filled-in submissions get a fake success and are not stored. Identical double submits are dropped, and each form has a relaxed / balanced / strict trust level.
- **Redirects:** a hidden `_redirect` field sends people to a page on the same site after submitting. A redirect to any URL can be set per form in the dashboard.
- **Files:** with the Uploads module, a multipart field named `file` (up to 10MB).
- **Errors:** `404 form_not_found`, `422 validation_failed` (with `fields`), `402 monthly_limit_reached`, `413 file_too_large`, `400 invalid_file_type`, and `429` past 20 submissions a minute per IP. Full list in the [API reference](https://tryembedio.com/en/docs/api-reference).

## Links

- Docs: https://tryembedio.com/en/docs
- Pricing: https://tryembedio.com/en/pricing
- X: https://x.com/embedio

## License

MIT
