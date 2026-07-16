# watt-guide.com

Independent, data-driven guides and calculators for home electricity costs in the US:
solar payback, heat pumps, EV charging and appliance running costs.

## Stack

- Static HTML5 + CSS3 + vanilla JavaScript (no build step)
- Cloudflare Pages (hosting + CDN)

## Local dev

Serve from the project root (absolute paths require a server, not `file://`):

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Data

Original datasets in `assets/data/` (e.g. the 50-state Solar Payback Index) are
licensed CC BY 4.0. Sources and assumptions are documented on the
[methodology page](https://watt-guide.com/methodology).

## License

Content © 2026 Bruno de Madrazo. Dataset CSVs: CC BY 4.0.
