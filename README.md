# watt-guide.com

English energy-cost and electricity-guide site. Monetized via Google AdSense.

## Stack

- HTML5 + CSS3 + vanilla JavaScript
- GSAP + Three.js (animated hero)
- Cloudflare Pages (hosting + CDN)
- Cloudflare Web Analytics (privacy-friendly, no cookies)
- FormSubmit.co (contact + newsletter forms)

## Structure

```
watt-guide/
├── index.html                              # Homepage + animated hero
├── about.html                              # About page
├── contact.html                            # Contact form
├── privacy.html                            # Privacy policy (GDPR/CCPA)
├── cookies.html                            # Cookie policy
├── 404.html                                # Branded not-found page
├── calculator/
│   └── index.html                          # Electricity cost calculator
├── guides/
│   ├── index.html                          # Guides hub
│   ├── how-to-reduce-electricity-bill-2026.html  # Pillar article
│   ├── _template.html                      # Template for new guides
│   └── _appliance-template.html            # Template for comparisons
├── assets/
│   ├── style.css
│   ├── main.js
│   ├── cookie-consent.js                   # GDPR banner + Consent Mode v2
│   ├── cookie-consent.css
│   └── og-image.png                        # 1200x630 OG/Twitter card
├── _headers                                # CSP + HSTS + cache rules
├── _redirects                              # www→apex, legacy paths
├── ads.txt                                 # Google AdSense (fill pub-ID after approval)
├── robots.txt
├── sitemap.xml
├── site.webmanifest                        # PWA
├── favicon.svg
└── README.md
```

## Local dev

No build step. Serve from the project root:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

Absolute paths (`/guides/`, `/assets/`) require serving from the root, not `file://`.

## Deployment (Cloudflare Pages)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial release"
   git branch -M main
   git remote add origin git@github.com:YOUR_USER/watt-guide.git
   git push -u origin main
   ```

2. **Create Cloudflare Pages project**
   - `dash.cloudflare.com` → Workers & Pages → Create → Pages → Connect to Git
   - Repo: `watt-guide`
   - Framework preset: **None**
   - Build command: *(empty)*
   - Build output directory: `/`

3. **Add custom domain** `watt-guide.com` + `www.watt-guide.com` in **Custom domains**.

4. **SSL/TLS:** Full (strict) + Always Use HTTPS ON + Brotli ON.

Full launch playbook in `../LAUNCH.md`.

## Post-launch checklist

- [ ] Enable Cloudflare Web Analytics (uncomment HTML block with real token)
- [ ] Verify Google Search Console via DNS TXT
- [ ] Submit `/sitemap.xml`
- [ ] Apply to AdSense when ≥20 articles + ≥30 days of traffic
- [ ] Replace `pub-XXXXXXXXXXXXXXXX` in `ads.txt` after approval
- [ ] Run `../inject_adsense.py YOUR_PUB_ID` to wire up the AdSense snippet

## Adding a new guide

1. Copy `guides/_template.html` to `guides/your-seo-slug.html`
2. Fill `<!-- TITLE -->`, `<!-- DESC -->`, `<!-- BODY -->`, `<!-- FAQ -->`
3. Update the `BreadcrumbList` + `Article` JSON-LD
4. Add to `sitemap.xml` with today's `<lastmod>`
5. Add a `<article class="guide-card">` in `guides/index.html`
6. `git push` → Cloudflare auto-deploys

## Useful commands

```bash
# Check for broken internal links
python3 -c "
import re, pathlib
root = pathlib.Path('.')
files = {str(p.relative_to(root)) for p in root.rglob('*')}
broken = []
for html in root.rglob('*.html'):
    for m in re.findall(r'(?:href|src)=\"/([^\"#?]+)\"', html.read_text(encoding='utf-8')):
        if m and m not in files:
            broken.append((html.name, m))
print('OK' if not broken else broken)
"

# Validate CSP headers in production
curl -sI https://watt-guide.com/ | grep -i content-security-policy

# Smoke-test the calculator in local
# Open http://localhost:8080/calculator/ and verify real-time results update
```

## License

Proprietary content. Code © 2026 Bruno de Madrazo.
