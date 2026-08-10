"""Build the /writing/ section: converts writing/*.md into styled HTML pages.

Usage:  python writing/_build.py   (from the repo root, or anywhere)

- Each .md needs frontmatter: title, description, date (YYYY-MM-DD), status.
- status: draft  -> page is built and shows a DRAFT badge (section itself is
  unlinked from the main nav until launch, so drafts stay effectively hidden).
- Output: writing/<slug>.html per essay + writing/index.html listing.
- The leading '# Title' line in the body is dropped (the template renders the
  frontmatter title).
The underscore filename keeps this script out of any Jekyll-published output.
"""

import re
from datetime import datetime
from pathlib import Path
from string import Template

import markdown

ROOT = Path(__file__).resolve().parent          # .../writing
SITE = "https://robertmcfarlin.com"

# ---------------------------------------------------------------- header/footer
CHROME_HEAD = Template("""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>$page_title</title>
  <meta name="description" content="$description" />
  <link rel="canonical" href="$canonical" />

  <meta property="og:type" content="$og_type" />
  <meta property="og:url" content="$canonical" />
  <meta property="og:title" content="$page_title" />
  <meta property="og:description" content="$description" />
  <meta property="og:image" content="$site/assets/og-card.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="$page_title" />
  <meta name="twitter:description" content="$description" />
  <meta name="twitter:image" content="$site/assets/og-card.png" />
  $extra_meta

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/ds.css" />
  <link rel="stylesheet" href="/css/writing.css" />
  <link rel="icon" href="/assets/mark.svg" type="image/svg+xml" />
</head>
<body>
<div class="site-backdrop" aria-hidden="true"></div>
<div class="solar-light" aria-hidden="true"></div>
<div class="orbital-arc" aria-hidden="true"></div>

<header class="site-header">
  <div class="container" style="padding-top:13px; padding-bottom:13px; display:flex; align-items:center; justify-content:space-between; gap:24px;">
    <a href="/" class="logo" aria-label="Robert McFarlin">
      <img src="/assets/mark-light.svg" alt="" width="30" height="30" />
      <span>
        <span class="name">Robert McFarlin</span>
        <span class="eyebrow-logo" style="display:block; margin-top:1px;">STRATEGY &bull; VALUE</span>
      </span>
    </a>

    <nav class="nav" id="nav">
      <a href="/#principles">Principles</a>
      <a href="/#systems">Experience</a>
      <a href="/#long-bets">Future Outlook</a>
      <a href="/#stack">Toolbox</a>
      <a href="/writing/" class="active">Writing</a>
      <a href="/#contact">Contact</a>
    </nav>

    <div class="nav-actions">
      <a class="btn btn--sm btn--secondary" href="https://www.linkedin.com/in/rdmcfarlin" target="_blank" rel="noopener">LinkedIn</a>
      <button class="nav-mobile-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        <svg class="icon-x" style="display:none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  </div>
</header>
""")

CHROME_FOOT = """
<footer class="site-footer">
  <div class="footer-inner">
    <a href="/" class="logo" style="gap:10px;" aria-label="Robert McFarlin">
      <img src="/assets/mark-light.svg" alt="" width="24" height="24" />
      <span class="name" style="font-size:14px;">Robert McFarlin</span>
    </a>
    <div class="footer-meta">
      &copy; 2026 &middot; Building financial operating systems for the AI age
    </div>
  </div>
</footer>

<script>
(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  var iconMenu = toggle.querySelector('.icon-menu');
  var iconX = toggle.querySelector('.icon-x');
  function setOpen(isOpen) {
    nav.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (iconMenu) iconMenu.style.display = isOpen ? 'none' : '';
    if (iconX) iconX.style.display = isOpen ? '' : 'none';
  }
  toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();
</script>
</body>
</html>
"""

ARTICLE_TMPL = Template("""
<main class="writing-main">
  <article class="article-wrap">
    <div class="article-head">
      <div class="meta">$date_h &middot; $read_time min read$draft_badge</div>
      <h1>$title</h1>
      <p class="article-lede">$description</p>
    </div>
    <hr class="article-rule" />
    <div class="article-body">
$body
    </div>
    <div class="article-footer">
      <a class="back" href="/writing/">&larr; All essays</a>
      <a href="https://www.linkedin.com/in/rdmcfarlin" target="_blank" rel="noopener" class="btn btn--sm btn--secondary">Discuss on LinkedIn</a>
    </div>
  </article>
</main>
""")

INDEX_ROW = Template("""      <a class="essay-row" href="/writing/$slug.html">
        <div class="meta">$date_h<span class="rt">$read_time min read</span></div>
        <div>
          <h3>$title$draft_badge<span class="go">&rarr;</span></h3>
          <p>$description</p>
        </div>
      </a>
""")

INDEX_TMPL = Template("""
<main class="writing-main">
  <div class="index-wrap">
    <span class="eyebrow">Writing</span>
    <h2 style="margin:12px 0 14px;">Essays from the CFO seat.</h2>
    <p style="color:var(--text-secondary); max-width:60ch;">
      Working notes on manufacturing finance, data infrastructure, and the systems that create value &mdash; written from practice, not theory.
    </p>
    <div class="essay-list">
$rows    </div>
  </div>
</main>
""")


def parse_frontmatter(text: str):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.S)
    if not m:
        raise ValueError("missing frontmatter")
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    body = text[m.end():]
    # Drop the leading '# Title' — the template renders the frontmatter title.
    body = re.sub(r"^\s*#\s+[^\n]+\n", "", body, count=1)
    return meta, body


def build():
    md = markdown.Markdown(extensions=["smarty"])
    essays = []

    for f in sorted(ROOT.glob("*.md")):
        meta, body_md = parse_frontmatter(f.read_text(encoding="utf-8"))
        words = len(re.findall(r"\w+", body_md))
        date = datetime.strptime(meta["date"], "%Y-%m-%d")
        essays.append({
            "slug": f.stem,
            "title": meta["title"],
            "description": meta["description"],
            "date": date,
            "date_h": date.strftime("%B %d, %Y").replace(" 0", " "),
            "read_time": max(1, round(words / 220)),
            "draft": meta.get("status", "").lower() == "draft",
            "body_html": md.reset().convert(body_md),
        })

    essays.sort(key=lambda e: (e["date"], e["title"]), reverse=True)

    for e in essays:
        badge = ' <span class="tag">Draft</span>' if e["draft"] else ""
        head = CHROME_HEAD.safe_substitute(
            page_title=f'{e["title"]} — Robert McFarlin',
            description=e["description"],
            canonical=f'{SITE}/writing/{e["slug"]}.html',
            og_type="article",
            site=SITE,
            extra_meta=f'<meta property="article:published_time" content="{e["date"]:%Y-%m-%d}" />',
        )
        page = head + ARTICLE_TMPL.safe_substitute(
            date_h=e["date_h"], read_time=e["read_time"], draft_badge=badge,
            title=e["title"], description=e["description"], body=e["body_html"],
        ) + CHROME_FOOT
        (ROOT / f'{e["slug"]}.html').write_text(page, encoding="utf-8")
        print(f'  built {e["slug"]}.html  ({e["read_time"]} min, draft={e["draft"]})')

    rows = "".join(
        INDEX_ROW.safe_substitute(
            slug=e["slug"], date_h=e["date_h"], read_time=e["read_time"],
            title=e["title"], description=e["description"],
            draft_badge=' <span class="tag">Draft</span>' if e["draft"] else "",
        )
        for e in essays
    )
    head = CHROME_HEAD.safe_substitute(
        page_title="Writing — Robert McFarlin",
        description="Essays on manufacturing finance, data infrastructure, and the AI-age CFO seat.",
        canonical=f"{SITE}/writing/",
        og_type="website",
        site=SITE,
        extra_meta="",
    )
    (ROOT / "index.html").write_text(
        head + INDEX_TMPL.safe_substitute(rows=rows) + CHROME_FOOT, encoding="utf-8"
    )
    print(f"  built index.html  ({len(essays)} essays)")


if __name__ == "__main__":
    build()
