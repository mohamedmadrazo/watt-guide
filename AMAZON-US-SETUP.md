# Amazon Associates US · Setup guide for Watt Guide

> Editorial decision: wattguide.com is a **data-driven calculator site**, not a product review site like hogarconectado.co. Affiliate revenue is **secondary** to AdSense here, and aggressive product placement contradicts the "no installer pitch, no affiliate-ranking trick" brand promise stated in `about.html`.
>
> Strategy: minimal, transparent, opt-in affiliate links only where natural. Disclosure already present in `about.html` lines 61, 65, 87.

## Status at 2026-05-26

| Item | Status |
|---|---|
| Amazon Associates US account | ⏳ Pending user signup at `affiliate-program.amazon.com` |
| Tax interview (W-8BEN) | ⏳ Required since you're ES resident, not US |
| Tag assignment (e.g. `wattguide-20`) | ⏳ Comes with approval |
| Affiliate disclosure in `about.html` | ✅ Already published |
| 3-sale validation requirement | ⏳ Amazon US allows 180 days; tighter than EU |

## When you get your Amazon US tag · 3 surgical insertions

Avoid stuffing affiliate links into 20 pillar articles — it dilutes editorial trust. Instead, do these 3 surgical insertions:

### Insertion 1 · `heat-pump-vs-gas-furnace-2026.html`

After the "Climate zone 4: Cold (Minneapolis)" section conclusion, before the methodology footer. Paste this block (replace `YOUR_TAG_HERE`):

```html
<aside style="margin:48px 0;padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-md);">
  <h4 style="margin-bottom:10px;color:var(--text);font-family:var(--font-display);">Cold-climate heat pumps that meet the IRA $2,000 credit</h4>
  <p style="color:var(--text-muted);font-size:0.92rem;margin-bottom:14px;">Models certified on the NEEP ccASHP list as of May 2026. Affiliate links to Amazon US — full disclosure in <a href="/about.html">about</a>.</p>
  <ul style="list-style:none;padding:0;font-size:0.92rem;color:var(--text-muted);">
    <li style="padding:8px 0;border-bottom:1px solid var(--border);">
      <a href="https://www.amazon.com/s?k=mitsubishi+hyper+heat+ccashp&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">Mitsubishi Hyper Heat (M-Series H2i) → Amazon</a>
    </li>
    <li style="padding:8px 0;border-bottom:1px solid var(--border);">
      <a href="https://www.amazon.com/s?k=mr+cool+universal+heat+pump&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">MrCool Universal Series → Amazon</a>
    </li>
    <li style="padding:8px 0;">
      <a href="https://www.amazon.com/s?k=fujitsu+halcyon+xltl&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">Fujitsu Halcyon XLTL → Amazon</a>
    </li>
  </ul>
</aside>
```

### Insertion 2 · `ev-charging-cost-home-2026.html`

After the "Level 2 charger comparison table" section. Block for EV charger picks:

```html
<aside style="margin:48px 0;padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-md);">
  <h4 style="margin-bottom:10px;color:var(--text);font-family:var(--font-display);">L2 chargers our readers most often ask about</h4>
  <p style="color:var(--text-muted);font-size:0.92rem;margin-bottom:14px;">UL-listed, NEMA 14-50 compatible. Affiliate links to Amazon US.</p>
  <ul style="list-style:none;padding:0;font-size:0.92rem;color:var(--text-muted);">
    <li style="padding:8px 0;border-bottom:1px solid var(--border);">
      <a href="https://www.amazon.com/s?k=tesla+wall+connector+gen+3&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">Tesla Wall Connector Gen 3 → Amazon</a>
    </li>
    <li style="padding:8px 0;border-bottom:1px solid var(--border);">
      <a href="https://www.amazon.com/s?k=chargepoint+home+flex&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">ChargePoint Home Flex (50A) → Amazon</a>
    </li>
    <li style="padding:8px 0;border-bottom:1px solid var(--border);">
      <a href="https://www.amazon.com/s?k=emporia+ev+charger+level+2&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">Emporia EV Charger (cheapest UL-listed) → Amazon</a>
    </li>
    <li style="padding:8px 0;">
      <a href="https://www.amazon.com/s?k=grizzl-e+classic+ev+charger&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">Grizzl-E Classic (Canadian, rugged) → Amazon</a>
    </li>
  </ul>
</aside>
```

### Insertion 3 · `water-heater-tank-vs-tankless-vs-heat-pump-2026.html`

After the heat-pump water heater section conclusion:

```html
<aside style="margin:48px 0;padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r-md);">
  <h4 style="margin-bottom:10px;color:var(--text);font-family:var(--font-display);">Heat-pump water heaters that qualify for HEEHRA rebate</h4>
  <p style="color:var(--text-muted);font-size:0.92rem;margin-bottom:14px;">Energy Star certified, UEF ≥ 3.3. Affiliate links to Amazon US.</p>
  <ul style="list-style:none;padding:0;font-size:0.92rem;color:var(--text-muted);">
    <li style="padding:8px 0;border-bottom:1px solid var(--border);">
      <a href="https://www.amazon.com/s?k=rheem+performance+platinum+hybrid+50+gallon&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">Rheem ProTerra Hybrid 50 gal → Amazon</a>
    </li>
    <li style="padding:8px 0;border-bottom:1px solid var(--border);">
      <a href="https://www.amazon.com/s?k=ao+smith+voltex+heat+pump&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">A. O. Smith Voltex Hybrid → Amazon</a>
    </li>
    <li style="padding:8px 0;">
      <a href="https://www.amazon.com/s?k=ge+geospring+heat+pump+water+heater&tag=YOUR_TAG_HERE" rel="sponsored nofollow noopener" target="_blank" style="color:var(--accent);">GE GeoSpring (budget) → Amazon</a>
    </li>
  </ul>
</aside>
```

## Activation command (PowerShell)

Once you have your real tag (e.g. `wattguide-20`), to activate all three insertions at once:

```powershell
Set-Location "c:\Users\demad\Documents\Claude\Projects\Generador de webs\watt-guide"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$tag = 'wattguide-20'  # replace with your actual tag
$files = @(
  'guides/heat-pump-vs-gas-furnace-2026.html',
  'guides/ev-charging-cost-home-2026.html',
  'guides/water-heater-tank-vs-tankless-vs-heat-pump-2026.html'
)
foreach ($f in $files) {
  $path = Join-Path (Get-Location) $f
  $content = [System.IO.File]::ReadAllText($path, $utf8NoBom)
  $newContent = $content.Replace('YOUR_TAG_HERE', $tag)
  [System.IO.File]::WriteAllText($path, $newContent, $utf8NoBom)
  Write-Output "Activated: $f"
}
```

(Use the .NET `ReadAllText`/`WriteAllText` method — NOT `Get-Content`/`Set-Content` which mangles UTF-8 on Windows PowerShell 5.1. Lesson learned the hard way on hogarconectado v2.0.)

## Why only 3 insertions and not all 20 pillars

The wattguide editorial promise in `about.html` is explicit: **"No installer pitch, no affiliate-ranking trick"**. Aggressively monetizing every pillar with affiliate links would break that promise and erode trust — the same trust that makes the site rank for non-spammy queries.

The 3 insertions selected:
- **Heat pump pillar** → highest-ticket recommendation ($3,000-8,000 unit + $2,000 IRA credit makes it the highest-stakes purchase decision in the catalog)
- **EV charger pillar** → mid-ticket ($300-800) with frequent decision urgency (you bought the EV, now need the charger)
- **Heat pump water heater pillar** → mid-ticket ($1,200-2,500) with active HEEHRA rebate angle

Each insertion appears AFTER the analytical content, not within it — so the data stays untouched by commercial pressure. Reader sees: math → decision tools → "if you decided, here's where to buy".

## Expected revenue from this minimal approach

Mes 6-12 con tráfico orgánico maduro (~5.000 sesiones/mes):
- Wattguide AdSense (RPM $8-15 EN/US tier-1): $80-200/mes
- Amazon US affiliate clicks: 0.3-0.8% of relevant pillar traffic
- Conversion: 4-7% (heat pumps/water heaters have considered purchase cycle)
- Avg commission: $40-150 per sale (3-5% on $1,200-3,000 ticket)
- **Estimated affiliate revenue: $30-150/mes** at maturity

Total wattguide mes 12: ~$200-450/mes combined (AdSense + Amazon).

## What this guide does NOT cover (intentionally)

- **Adding Amazon links to all 20 pillars** — would dilute editorial trust
- **OneLink or geo-router for international visitors** — wattguide is US-focused, not multi-region
- **Banner ads or pop-ups for Amazon Prime** — explicitly against the no-spam promise
- **Reviewing specific brands with affiliate intent** — wattguide is analytical, not product-review

If you ever want to expand to product reviews on wattguide, that's a separate editorial decision — consider it carefully because it changes the brand voice.

## Disclosure already in place

The legal affiliate disclosure is published in three locations:

1. `about.html` line 61-65: editorial transparency block
2. `index.html` line 610 (approx): "Funded by unobtrusive ads and transparent affiliate links"
3. After tag activation: each insertion includes `<a ... rel="sponsored nofollow noopener">` — meets FTC + Amazon Associates Operating Agreement requirements

No additional banner or cookie required — the disclosure is contextual and visible.
