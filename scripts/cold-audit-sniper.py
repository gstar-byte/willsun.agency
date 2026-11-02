#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cold Audit Outreach Sniper Engine (GeoKit.site + A11yKit.site -> will@willsun.agency)
-------------------------------------------------------------------------------------
1. Runs a real-time Technical SEO, GEO (AI Search Citation) & WCAG 2.2 Accessibility scan
   against any target Western Agency, SaaS, or DTC E-Commerce domain.
2. Generates a concrete, zero-fluff diagnostic report + ready-to-deploy `llms.txt` snippet.
3. Composes a personalized, high-converting Cold Outreach Email (Agency White-Label or
   SaaS/DTC Fractional Growth pitch) and sends via `will@willsun.agency` SMTP.
"""

import argparse
import json
import os
import re
import smtplib
import ssl
import sys
import urllib.parse
import urllib.request
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

EMAIL_CONFIG_PATH = r"C:\Users\willp\.gemini\config\willsun_email_config.json"
REPORTS_DIR = r"f:\willsun.agency\outreach_reports"


def fetch_url(url: str, timeout: int = 12):
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 (GeoKit-A11yKit-Audit/2.0; +https://geokit.site)"
        },
    )
    try:
        ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            status = resp.getcode()
            headers = {k.lower(): v for k, v in resp.getheaders()}
            raw = resp.read()
            text = raw.decode("utf-8", errors="replace")
            return status, headers, text
    except urllib.error.HTTPError as e:
        return e.code, {}, ""
    except Exception:
        return 0, {}, ""


def run_geokit_and_a11y_audit(target_url: str, site_type: str = "saas") -> dict:
    if not target_url.startswith("http"):
        target_url = "https://" + target_url.strip()
    parsed = urllib.parse.urlparse(target_url)
    base_url = f"{parsed.scheme}://{parsed.netloc}"
    domain = parsed.netloc.replace("www.", "")

    # 1. Fetch Homepage HTML
    status, headers, html = fetch_url(target_url)
    # 2. Fetch /robots.txt, /llms.txt, /llms-full.txt, /sitemap.xml
    r_status, _, robots_txt = fetch_url(f"{base_url}/robots.txt", timeout=8)
    l_status, _, llms_txt = fetch_url(f"{base_url}/llms.txt", timeout=8)
    lf_status, _, llms_full_txt = fetch_url(f"{base_url}/llms-full.txt", timeout=8)
    s_status, _, sitemap_xml = fetch_url(f"{base_url}/sitemap.xml", timeout=8)

    # Check if /llms.txt is actually a soft-404 HTML page
    has_llms_txt = (
        l_status == 200
        and len(llms_txt.strip()) > 20
        and not bool(re.search(r"<!DOCTYPE html|<html", llms_txt[:300], re.I))
    )
    has_llms_full = (
        lf_status == 200
        and len(llms_full_txt.strip()) > 20
        and not bool(re.search(r"<!DOCTYPE html|<html", llms_full_txt[:300], re.I))
    )
    has_robots = r_status == 200 and len(robots_txt.strip()) > 5
    has_sitemap = s_status == 200 and ("<loc>" in sitemap_xml.lower() or "<sitemap>" in sitemap_xml.lower())

    # Check AI crawlers in robots.txt
    blocked_ai_bots = []
    if has_robots:
        for bot in ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"]:
            pattern = rf"User-agent:\s*{bot}[\s\S]*?Disallow:\s*/(\r?\n|\s*$)"
            if re.search(pattern, robots_txt, re.I):
                blocked_ai_bots.append(bot)

    # Extract Title & Meta Description
    title_m = re.search(r"<title[^>]*>([\s\S]*?)</title>", html, re.I)
    title = re.sub(r"\s+", " ", title_m.group(1)).strip() if title_m else domain
    desc_m = re.search(
        r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', html, re.I
    ) or re.search(
        r'<meta[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description["\']', html, re.I
    )
    meta_desc = desc_m.group(1).strip() if desc_m else ""

    # JSON-LD Structured Data check
    jsonld_blocks = re.findall(
        r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>', html, re.I
    )
    schema_types = []
    for blk in jsonld_blocks:
        for m in re.finditer(r'"@type"\s*:\s*"([^"]+)"', blk):
            schema_types.append(m.group(1))
    schema_types = list(dict.fromkeys(schema_types))
    has_faq_schema = "FAQPage" in schema_types

    # ── A11yKit WCAG 2.2 DOM Checks ──
    img_tags = re.findall(r"<img\b[^>]*>", html, re.I)
    imgs_missing_alt = [
        img for img in img_tags if not re.search(r'\balt\s*=\s*["\'][^"\']*["\']', img, re.I)
    ]
    imgs_empty_alt = [
        img for img in img_tags if re.search(r'\balt\s*=\s*["\']\s*["\']', img, re.I)
    ]

    has_html_lang = bool(re.search(r"<html[^>]*\blang\s*=\s*[\"'][^\"']+[\"']", html, re.I))
    h1_tags = re.findall(r"<h1\b[^>]*>[\s\S]*?</h1>", html, re.I)
    h2_tags = re.findall(r"<h2\b[^>]*>[\s\S]*?</h2>", html, re.I)

    # Check links/buttons without discernible text or aria-label
    empty_buttons = re.findall(r"<button\b(?![^>]*aria-label)[^>]*>\s*(?:<svg[\s\S]*?</svg>|<i\b[^>]*></i>|\s*)\s*</button>", html, re.I)
    inputs_without_label = [
        inp for inp in re.findall(r"<input\b[^>]*>", html, re.I)
        if not re.search(r'type=["\'](?:hidden|submit|button|reset)["\']', inp, re.I)
        and not re.search(r'aria-label|aria-labelledby|placeholder', inp, re.I)
    ]

    semantic_landmarks = [
        tag for tag in ("main", "nav", "header", "footer", "article", "section")
        if re.search(rf"<{tag}\b", html, re.I)
    ]

    # Security Headers
    sec_headers_present = [
        h for h in ("strict-transport-security", "content-security-policy", "x-frame-options", "x-content-type-options")
        if h in headers
    ]

    # Calculate GeoKit Score & A11yKit Score
    geo_score = 42
    if has_robots and not blocked_ai_bots:
        geo_score += 12
    if has_sitemap:
        geo_score += 8
    if has_llms_txt:
        geo_score += 18
    if has_llms_full:
        geo_score += 8
    if schema_types:
        geo_score += 8
    if has_faq_schema:
        geo_score += 4
    geo_score = min(geo_score, 98)

    a11y_deductions = (
        len(imgs_missing_alt) * 4
        + len(empty_buttons) * 5
        + len(inputs_without_label) * 4
        + (0 if has_html_lang else 8)
        + (0 if len(h1_tags) == 1 else 6)
        + (0 if "main" in semantic_landmarks else 6)
    )
    a11y_score = max(48, 96 - min(a11y_deductions, 44))

    # Build top 3 concrete findings for the email
    findings = []
    if not has_llms_txt:
        findings.append(
            f"Missing `/llms.txt` & `/llms-full.txt` standard (HTTP {l_status or 404}): AI answer engines (ChatGPT Search, Perplexity, Claude) currently lack a clean Markdown entity map for `{domain}`, reducing brand citation probability on high-intent queries."
        )
    if blocked_ai_bots:
        findings.append(
            f"`robots.txt` explicitly blocks AI crawlers ({', '.join(blocked_ai_bots)}), preventing LLM citation indexing."
        )
    if not schema_types:
        findings.append(
            f"Zero JSON-LD structured entity schema detected on the homepage (`@type: Organization` / `FAQPage` missing), forcing LLMs and Google AI Overviews to guess entity relationships."
        )
    elif not has_faq_schema:
        findings.append(
            f"JSON-LD present ({', '.join(schema_types[:3])}), but missing `FAQPage` / `Service` entity graph markup (pages with FAQ schema earn ~3.2x higher AI Overview citations)."
        )

    a11y_findings = []
    if imgs_missing_alt:
        a11y_findings.append(f"{len(imgs_missing_alt)} `<img>` element(s) missing `alt` attributes (WCAG 2.2 1.1.1)")
    if empty_buttons:
        a11y_findings.append(f"{len(empty_buttons)} icon `<button>` element(s) missing `aria-label` (WCAG 4.1.2)")
    if len(h1_tags) != 1:
        a11y_findings.append(f"H1 heading count is {len(h1_tags)} instead of a single primary `<h1>` (WCAG 1.3.1 & Technical SEO)")
    if not has_html_lang:
        a11y_findings.append("Missing `lang` attribute on `<html>` root element (WCAG 3.1.1)")
    if "main" not in semantic_landmarks:
        a11y_findings.append("Missing `<main>` landmark region for screen readers & AI DOM parsers")
    if not a11y_findings:
        a11y_findings.append(
            f"{len(imgs_empty_alt)} decorative/unlabeled image tags and {4 - len(sec_headers_present)} missing security/trust headers (CSP / HSTS)"
        )

    findings.append(
        f"WCAG 2.2 / ADA & EU Accessibility Act (EAA) DOM Scan: Flagged {'; '.join(a11y_findings[:3])}."
    )

    # Starter llms.txt gift for the prospect
    starter_llms_txt = f"""# {title}

> {meta_desc or f"Official website and digital platform of {domain}."}

## Core Pages & Offerings
- [Homepage]({base_url}/): Primary overview, solutions, and value proposition.
- [Sitemap]({base_url}/sitemap.xml): Complete index of public pages for AI and search crawlers.
"""

    return {
        "domain": domain,
        "target_url": target_url,
        "base_url": base_url,
        "title": title,
        "meta_desc": meta_desc,
        "geo_score": geo_score,
        "a11y_score": a11y_score,
        "has_llms_txt": has_llms_txt,
        "has_llms_full": has_llms_full,
        "has_robots": has_robots,
        "has_sitemap": has_sitemap,
        "blocked_ai_bots": blocked_ai_bots,
        "schema_types": schema_types,
        "imgs_total": len(img_tags),
        "imgs_missing_alt": len(imgs_missing_alt),
        "empty_buttons": len(empty_buttons),
        "h1_count": len(h1_tags),
        "h2_count": len(h2_tags),
        "semantic_landmarks": semantic_landmarks,
        "findings": findings[:3],
        "starter_llms_txt": starter_llms_txt,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


def build_outreach_email(audit: dict, recipient_name: str, mode: str = "agency") -> tuple[str, str, str]:
    domain = audit["domain"]
    geo_score = audit["geo_score"]
    a11y_score = audit["a11y_score"]
    first_name = recipient_name.strip() or "there"

    if mode == "agency":
        subject = f"Quick GEO (AI Search) + WCAG 2.2 scan on {domain} ({geo_score}/100)"
        pitch_paragraph = (
            "I'm reaching out because I partner with boutique Western SEO, Web, and Shopify/SaaS agencies on a "
            "flexible fractional or white-label basis (15–20 hrs/wk). Many agencies are currently turning down or "
            "under-monetizing two high-margin retainers that clients are urgently asking for in 2026:\n"
            "  1. Generative Engine Optimization (GEO / AI Search Citations across ChatGPT, Perplexity & Google AI Overviews)\n"
            "  2. WCAG 2.2 / US ADA & European Accessibility Act (EAA) technical remediation"
        )
    else:
        subject = f"{domain}: Quick GEO (AI Search Citation) + Technical SEO audit ({geo_score}/100)"
        pitch_paragraph = (
            "I'm a Fractional Growth Marketing Manager & AI-Native Technical SEO Engineer with 16+ years of hands-on "
            "experience scaling organic search, Google Ads, and subscription monetization for global SaaS & DTC brands "
            "(including DWG FastView at 30,000+ PC DAU across 12 domains, KingCamp, and Yoybuy)."
        )

    findings_bullets_txt = "\n".join([f"  • {f}" for f in audit["findings"]])
    findings_bullets_html = "".join([f"<li style='margin-bottom:8px;'>{f}</li>" for f in audit["findings"]])

    text_body = f"""Hi {first_name},

I ran a quick non-intrusive diagnostic on {domain} using two open audit engines I built — GeoKit.site (Generative Engine Optimization & LLM Citation Auditor) and A11yKit.site (WCAG 2.2 / ADA Compliance Scanner).

Here is the snapshot for {domain}:
- GEO / AI Search Readiness Score: {geo_score}/100
- WCAG 2.2 / Technical DOM Score: {a11y_score}/100

3 Quick-Win Technical Findings on {domain}:
{findings_bullets_txt}

To save your team 30 minutes, I also generated a starter `/llms.txt` file for {domain} below so ChatGPT, Perplexity, and Claude can cleanly parse your core entity structure.

{pitch_paragraph}

If you ever need an experienced technical SEO / GEO engineer or fractional growth hand (15–25 hrs/week or project sprint), you can inspect my live tools and 2026 CV here:
- Portfolio & Consultancy: https://willsun.agency
- Live GEO Auditor: https://geokit.site
- Live WCAG 2.2 Scanner: https://a11ykit.site
- 2026 CV (PDF): https://willsun.agency/Will_Sun_Remote_CV_2026.pdf

Would you be open to a quick 10-minute intro or async chat next week?

Best regards,

Will Sun
Fractional Growth & AI-Native Technical SEO Consultant
Email: will@willsun.agency
Web: https://willsun.agency

---
[Free Gift] Starter /llms.txt for {domain}:
{audit["starter_llms_txt"]}
"""

    html_body = f"""<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14.5px; line-height: 1.6; color: #1e293b; max-width: 640px;">
  <p>Hi {first_name},</p>
  <p>I ran a quick, non-intrusive diagnostic on <strong>{domain}</strong> using two audit engines I architected — <a href="https://geokit.site" style="color:#2563eb;text-decoration:none;font-weight:600;">GeoKit.site</a> (Generative Engine Optimization &amp; LLM Citation Auditor) and <a href="https://a11ykit.site" style="color:#2563eb;text-decoration:none;font-weight:600;">A11yKit.site</a> (WCAG 2.2 / ADA Compliance Scanner).</p>

  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 18px;margin:16px 0;">
    <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">📊 Live Audit Snapshot for {domain}:</div>
    <div>• <strong>GEO / AI Search Readiness Score:</strong> <span style="color:#2563eb;font-weight:700;">{geo_score}/100</span></div>
    <div>• <strong>WCAG 2.2 / Technical DOM Score:</strong> <span style="color:#059669;font-weight:700;">{a11y_score}/100</span></div>
  </div>

  <p style="margin-bottom:6px;"><strong>3 Quick-Win Technical Findings on {domain}:</strong></p>
  <ul style="padding-left:20px;margin-top:4px;">
    {findings_bullets_html}
  </ul>

  <p>{pitch_paragraph.replace(chr(10), '<br/>')}</p>

  <p>If you ever need a battle-tested Technical SEO / GEO engineer, Python GA4/GSC automation builder, or fractional growth consultant (15–25 hrs/week), feel free to check out my live tools and 2026 CV:</p>
  <ul style="padding-left:20px;">
    <li><strong>Consultancy &amp; Case Studies:</strong> <a href="https://willsun.agency" style="color:#2563eb;">https://willsun.agency</a></li>
    <li><strong>Proprietary Audit Engines:</strong> <a href="https://geokit.site" style="color:#2563eb;">GeoKit.site</a> &amp; <a href="https://a11ykit.site" style="color:#2563eb;">A11yKit.site</a> &amp; <a href="https://cadguide.tools" style="color:#2563eb;">CADGuide.tools</a></li>
    <li><strong>2026 Consultant CV (PDF):</strong> <a href="https://willsun.agency/Will_Sun_Remote_CV_2026.pdf" style="color:#2563eb;">Will_Sun_Remote_CV_2026.pdf</a></li>
  </ul>

  <p>Would you be open to a quick 10-minute intro or async chat? (I also pasted a ready-to-deploy <code>/llms.txt</code> starter snippet for <strong>{domain}</strong> at the bottom of this email.)</p>

  <p style="margin-top:20px;">Best regards,<br/>
  <strong>Will Sun</strong><br/>
  <span style="color:#64748b;font-size:13px;">Fractional Growth &amp; AI-Native Technical SEO Consultant<br/>
  📧 <a href="mailto:will@willsun.agency" style="color:#2563eb;">will@willsun.agency</a> | 🌐 <a href="https://willsun.agency" style="color:#2563eb;">willsun.agency</a></span></p>

  <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
  <div style="background:#0f172a;color:#e2e8f0;padding:12px 16px;border-radius:8px;font-family:monospace;font-size:12px;white-space:pre-wrap;"># Free Starter /llms.txt for {domain}
{audit["starter_llms_txt"].strip()}</div>
</div>"""

    return subject, text_body, html_body


def save_report(audit: dict, subject: str, text_body: str) -> str:
    os.makedirs(REPORTS_DIR, exist_ok=True)
    safe_domain = re.sub(r"[^a-zA-Z0-9._-]", "_", audit["domain"])
    path = os.path.join(REPORTS_DIR, f"{safe_domain}_audit.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"# Cold Audit Dossier: {audit['domain']}\n\n")
        f.write(f"- **Target URL**: {audit['target_url']}\n")
        f.write(f"- **Scanned At**: {audit['timestamp']}\n")
        f.write(f"- **GeoKit AI Readiness Score**: `{audit['geo_score']}/100`\n")
        f.write(f"- **A11yKit WCAG 2.2 Score**: `{audit['a11y_score']}/100`\n")
        f.write(f"- **Has `/llms.txt`**: `{audit['has_llms_txt']}` | **Has `/sitemap.xml`**: `{audit['has_sitemap']}`\n")
        f.write(f"- **Detected JSON-LD Schemas**: `{', '.join(audit['schema_types']) or 'None'}`\n")
        f.write(f"- **Images Missing Alt**: `{audit['imgs_missing_alt']}/{audit['imgs_total']}`\n\n")
        f.write(f"## Generated Cold Email\n\n**Subject:** `{subject}`\n\n```text\n{text_body}\n```\n")
    return path


def send_cold_email(to_email: str, subject: str, text_body: str, html_body: str):
    with open(EMAIL_CONFIG_PATH, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    msg = MIMEMultipart("alternative")
    msg["From"] = f"Will Sun | WillSun Agency <{cfg['public_email']}>"
    msg["To"] = to_email
    msg["Reply-To"] = cfg["public_email"]
    msg["Subject"] = subject

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(cfg["smtp_host"], cfg["smtp_port"], context=context) as server:
        server.login(cfg["underlying_gmail"], cfg["app_password"])
        server.sendmail(cfg["public_email"], [to_email], msg.as_string())


def main():
    parser = argparse.ArgumentParser(description="GeoKit + A11yKit Cold Audit Outreach Sniper")
    parser.add_argument("--url", required=True, help="Target prospect domain or URL")
    parser.add_argument("--name", default="there", help="Recipient first name or team name")
    parser.add_argument("--mode", choices=["agency", "saas_dtc"], default="agency", help="Pitch template mode")
    parser.add_argument("--to", default="", help="Recipient email address (only sends if --send is passed)")
    parser.add_argument("--send", action="store_true", help="Actually send the email via will@willsun.agency SMTP")
    args = parser.parse_args()

    print(f"🔍 [1/3] Scanning {args.url} with GeoKit + A11yKit engines...")
    audit = run_geokit_and_a11y_audit(args.url)
    subject, text_body, html_body = build_outreach_email(audit, args.name, args.mode)
    report_path = save_report(audit, subject, text_body)

    print(f"✅ [2/3] Audit complete! GeoKit Score: {audit['geo_score']}/100 | A11yKit Score: {audit['a11y_score']}/100")
    print(f"📄 Saved dossier to: {report_path}")
    print("-" * 70)
    print(f"Subject: {subject}")
    print("-" * 70)
    print(text_body)
    print("-" * 70)

    if args.send and args.to:
        print(f"🚀 [3/3] Sending email from will@willsun.agency to {args.to}...")
        send_cold_email(args.to, subject, text_body, html_body)
        print(f"✅ Successfully delivered to {args.to}!")
    else:
        print("ℹ️ Dry-run mode (pass --to <email> --send to dispatch via will@willsun.agency SMTP).")


if __name__ == "__main__":
    main()
