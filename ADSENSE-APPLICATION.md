# AdSense application step-by-step · watt-guide.com

> Operational guide to apply for Google AdSense and activate monetization on watt-guide.com. Designed to be executed in one sitting when ready. Total time: ~45 minutes of user work + 1-4 weeks of Google review.

## Current prerequisite status (2026-05-26)

| AdSense requirement | Status | Notes |
|---|---|---|
| Original editorial content ≥ 10 pieces | ✅ | 20+ guides published with original methodology |
| Legal pages complete | ✅ | `privacy.html`, `cookies.html`, `about.html`, `contact.html` |
| `ads.txt` at HTTPS root | ✅ | With placeholder `pub-XXXXXXXXXXXXXXXX` ready to replace |
| Sitemap.xml accessible | ✅ | Submitted to Google Search Console and Bing Webmaster |
| Schema.org on guides | ✅ | Article + BreadcrumbList + FAQPage across all 20 guides |
| Affiliate disclosure visible | ✅ | In `about.html` (Amazon US tag activation pending — see AMAZON-US-SETUP.md) |
| Mobile usability 100% | ✅ | Verifiable at `search.google.com/test/mobile-friendly` |
| HTTPS forced | ✅ | Cloudflare Pages + `_headers` with HSTS |
| Minimum organic traffic | ⏳ | Not strictly required but recommended to wait 2-4 weeks after publishing |
| Privacy controls (CCPA/GDPR) | ⏳ | Custom consent active; replace with Funding Choices after approval |

**Technical verdict**: the site meets all formal requirements. Only timing and the click-the-button decision remain.

## When to apply — the decision

Google rejects more applications for "insufficient content / low unique value" than for technical errors. The site has 20+ original guides with real methodology (data sources cited: EIA, NREL, DSIRE, NEEP) and clear authorship — passes any reasonable bar. What adds margin is **demonstrating real organic traffic**.

Three typical scenarios:

| Scenario | Recommendation | Time to first revenue |
|---|---|---|
| **Apply today** (no organic traffic yet) | Medium rejection risk: Google cites "low traffic" in ~30% of denials | 1-3 weeks if approved first try; 4-8 if you must reapply |
| **Wait 2-3 weeks** (let Google + Bing index all 20 guides, get first organic impressions) | Low risk, typically approved first try | 4-6 weeks total |
| **Wait 30+ days with ≥200 visits/day** | Almost always approved first try | 6-10 weeks total |

**Recommendation**: scenario 2. Apply around **2026-06-15** (~3 weeks after publishing). By then the 20 guides will be indexed in GSC, there will be real impressions, and the application enters with metrics in its favor. No added work in the meantime — just write new guides if topics emerge.

**Special note for watt-guide.com**: the US market has **AdSense RPM tier-1** ($8-15) — 3-5× higher than Spain. This is the higher-leverage site for AdSense revenue. Worth waiting until the site has real traffic to maximize tier classification (Google grades sites partly by initial traffic quality).

## Application step-by-step (30 minutes)

### 1. Create AdSense account

1. Go to `https://www.google.com/adsense/`
2. Click **Get started** → sign in with `demadrazobruno@gmail.com` (the account where you want payments)
3. Paste the site: `https://watt-guide.com`
4. Country: **Spain** (you are a Spanish tax resident — important for W-8BEN form later)
5. Language: **English**
6. Accept terms
7. Click **Start using AdSense**

> ⚠️ **Critical**: even though watt-guide.com targets US readers, your AdSense account is created from Spain because that is where you pay taxes. Google applies tax treaty US-Spain (15% withholding instead of 30%) — but only if you submit the W-8BEN form correctly. Don't lie about the country here.

### 2. Connect the site (ownership verification)

AdSense asks you to paste a `<script>` snippet into the `<head>` of the homepage — but **it's already done**: the `adsbygoogle.js` script is embedded in `index.html` and across all 20 guides with `{{ADSENSE_CLIENT}}` as a placeholder.

What's missing is **replacing the placeholder with the real publisher ID**:

1. In AdSense, the dashboard shows your Publisher ID. Format: `pub-1234567890123456` (16 digits after `pub-`).
2. **Copy the full ID** (including the `pub-` prefix).
3. From the repo root in PowerShell, run the substitution script:

```powershell
Set-Location "c:\Users\demad\Documents\Claude\Projects\Generador de webs\watt-guide"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$pubId = 'pub-XXXXXXXXXXXXXXXX'  # <-- paste your real publisher ID here
$files = Get-ChildItem -Recurse -Include *.html,ads.txt
foreach ($f in $files) {
  $content = [System.IO.File]::ReadAllText($f.FullName, $utf8NoBom)
  if ($content -match 'pub-XXXXXXXXXXXXXXXX|\{\{ADSENSE_CLIENT\}\}') {
    $newContent = $content.Replace('{{ADSENSE_CLIENT}}', $pubId).Replace('pub-XXXXXXXXXXXXXXXX', $pubId)
    [System.IO.File]::WriteAllText($f.FullName, $newContent, $utf8NoBom)
    Write-Output "Updated: $($f.FullName)"
  }
}
```

**Important**: use `[System.IO.File]::ReadAllText/WriteAllText` with `UTF8NoBom`, NOT `Get-Content`/`Set-Content -Encoding utf8` (which mangles UTF-8 special characters on PowerShell 5.1 — lesson learned the hard way on the Amazon tag activation).

4. Commit + push:

```powershell
git add -A
git commit -m "feat: activate AdSense publisher ID across all pages and ads.txt"
git push
```

5. Cloudflare Pages auto-deploys in 60-90 seconds.
6. Back in AdSense → click **Verify**. Google finds the `<meta name="google-adsense-account">` and/or the inline script, marks verification as done.

### 3. Tax and payment information

1. AdSense asks for payment details. Select **Individual** (most creators) or **Business** if you have an autónomo / SL setup.
2. Real postal address (Google sends a physical PIN to that address when you reach the $10 threshold — keep track of where you'll receive it).
3. Tax information: as a Spanish resident, Google requires DNI/NIE. **W-8BEN form is auto-generated** for the US-Spain tax treaty (15% withholding instead of 30%).
4. Bank account for payments: Spanish IBAN, SWIFT optional.

Optional fields (editable later): payment profile name, alias.

### 4. Submit for review

1. Click **Request site review**.
2. Google shows: "We're reviewing your site. This usually takes a few days but can take up to 2 weeks".
3. Close the tab. Nothing more to do until the response.

## During review (2-14 days) — what NOT to do

- ❌ DO NOT publish major design changes (triggers re-analysis and resets the queue)
- ❌ DO NOT add redirects, popups, or anything Google could interpret as a "deceptive pattern"
- ❌ DO NOT buy low-quality traffic. If you buy Meta/Google Ads for SEO purposes, that's fine; bot traffic disqualifies you
- ❌ DO NOT install other ad networks (Ezoic, Mediavine, Raptive) before getting AdSense approval
- ✅ DO keep writing new content (doesn't affect the review)
- ✅ DO share the site on social media (social signals add up)
- ✅ DO respond to comments if any (engagement signal)

## Post-approval — activation checklist

Google notifies by email: "Welcome to AdSense. Your site is approved".

### 1. Generate ad units (10 minutes)

1. AdSense → **Ads** → **By ad unit** → **Create new ad unit**.
2. Create **6 ad units** (the 6 placeholders in the repo). For each, save the slot ID AdSense provides (format `1234567890`):

| Internal slot | AdSense type | Size |
|---|---|---|
| `AD_SLOT_HOME_LEADERBOARD` | Display | Responsive |
| `AD_SLOT_HOME_INFEED` | In-article | Fluid |
| `AD_SLOT_GUIDES_INFEED` | Display | Responsive |
| `AD_SLOT_SIDEBAR` | Display | 300×600 |
| `AD_SLOT_IN_ARTICLE_1` | In-article | Fluid |
| `AD_SLOT_IN_ARTICLE_2` | Display | Responsive |
| `AD_SLOT_MULTIPLEX` | Multiplex | Default |

(Verify exact placeholder names with `grep -r "{{AD_SLOT" .` — they may differ slightly from this list.)

### 2. Substitute placeholders in the code

```powershell
Set-Location "c:\Users\demad\Documents\Claude\Projects\Generador de webs\watt-guide"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

# Dictionary: placeholder name → real AdSense slot ID
$slots = @{
  'AD_SLOT_HOME_LEADERBOARD' = '1111111111'   # <-- replace
  'AD_SLOT_HOME_INFEED'      = '2222222222'
  'AD_SLOT_GUIDES_INFEED'    = '3333333333'
  'AD_SLOT_SIDEBAR'          = '4444444444'
  'AD_SLOT_IN_ARTICLE_1'     = '5555555555'
  'AD_SLOT_IN_ARTICLE_2'     = '6666666666'
  'AD_SLOT_MULTIPLEX'        = '7777777777'
}

$files = Get-ChildItem -Recurse -Include *.html
foreach ($f in $files) {
  $content = [System.IO.File]::ReadAllText($f.FullName, $utf8NoBom)
  $changed = $false
  foreach ($key in $slots.Keys) {
    $placeholder = "{{$key}}"
    if ($content.Contains($placeholder)) {
      $content = $content.Replace($placeholder, $slots[$key])
      $changed = $true
    }
  }
  if ($changed) {
    [System.IO.File]::WriteAllText($f.FullName, $content, $utf8NoBom)
    Write-Output "Updated: $($f.Name)"
  }
}
```

Commit + push:
```powershell
git add -A
git commit -m "feat: activate AdSense ad slot IDs across all pages"
git push
```

### 3. Activate Funding Choices (CMP — required even for US site)

Required for compliance with CCPA (California) and GDPR (if any EU traffic spills over). Replaces the current custom consent.

1. AdSense → **Privacy & messaging** → **GDPR / CCPA messages** → **Create message**.
2. Select: "Show a message on my site".
3. Languages: English (primary).
4. Buttons: "Accept all" + "Manage options" + "Reject all" (mandatory since 2024).
5. Logo: the watt-guide favicon.
6. Click **Publish**.
7. AdSense provides a `<script>` snippet with your Funding Choices ID. Replace the current custom consent code in `index.html` and the 20 guides with this script.

### 4. Activate Auto Ads — Anchor mobile only

1. AdSense → **Ads** → **By site** → `watt-guide.com` → **Edit**.
2. Enable **Auto ads** → **Anchor only** (disable Vignette, In-page, Multiplex auto-formats — we use manual placement).
3. Frequency: default.
4. Save.

### 5. Verify `ads.txt`

Once the publisher ID is in `ads.txt` (step 2 of the application), AdSense automatically verifies it within 24-48 hours. Status appears green in AdSense → **Account** → **Account settings** → **ads.txt**.

## Common errors and how to avoid them

| Error | Cause | Solution |
|---|---|---|
| Rejected for "insufficient content" | Few articles or thin content | Already mitigated: 20+ guides with >1500 words each |
| Rejected for "difficult navigation" | Poorly linked legal pages | Footer must link `privacy`, `cookies`, `about`, `contact` — already done |
| Rejected for "deceptive behavior" | Fake buttons, intrusive popups, "click here" near ads | Verify no CTA pseudo-imitates an ad |
| Rejected for "duplication" | Spun or mass-translated content | All content is original — N/A |
| Approved but "shows no ads" | `ads.txt` not verified or slots have no traffic | Wait 24-48h after activation, check Policy Center |
| Blank ad slots | CMP returns no consent, slots misconfigured, AdBlock | Test in incognito with AdBlock disabled |

## KPIs to monitor in month 1

| KPI | Where to find it | Target month 1 |
|---|---|---|
| **RPM** (revenue per 1k pageviews) | AdSense → Reports | $8-15 (US is tier-1) |
| **CTR** | AdSense → Reports | 1.2-2.0% acceptable |
| **Viewability** | AdSense → Optimization | > 60% |
| **CLS** post-ads | PageSpeed Insights / GSC Core Web Vitals | ≤ 0.1 |
| **Policy violations** | AdSense → Policy Center | 0 |
| **ads.txt status** | AdSense → Account → ads.txt | Green (authorized) |

If RPM drops below $5 sustained, check:
1. Any policy violation?
2. Does the CMP return consent or reject all users?
3. Is traffic from low-CPC countries (LATAM via Spanish search overlap) instead of US? — watt-guide's English content should attract mostly US/UK/AU readers.

## Quick reference order of operations

When approval lands, the exact commands in order:

1. Replace publisher ID → section "Application step-by-step → 2"
2. Replace slot IDs → section "Post-approval → 2"
3. Verify ads.txt → automatic, wait 24h
4. Activate Funding Choices → section "Post-approval → 3"
5. Activate Auto Ads Anchor → section "Post-approval → 4"

Full flow from approval to first revenue: ~2 hours of work + 24-48h of waiting.

## Combined ad + affiliate strategy reminder

This site uses a **secondary affiliate model** (see [AMAZON-US-SETUP.md](AMAZON-US-SETUP.md)). The editorial promise — "no installer pitch, no affiliate-ranking trick" — means AdSense is the primary revenue and Amazon affiliate links only appear in 3 surgical insertions (heat-pump, EV-charging, water-heater pillars).

Expected revenue at maturity (month 6-12, ~5,000 sessions/month):
- AdSense (RPM $8-15 US tier-1): $80-200/month
- Amazon US affiliate: $30-150/month
- **Combined: ~$200-450/month** when both are active

This is the higher-leverage of your two sites for AdSense specifically. Worth the careful timing on application.
