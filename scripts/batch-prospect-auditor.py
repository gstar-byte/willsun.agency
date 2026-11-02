#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch Prospect Email Discovery & Cold Audit Generator (DRY-RUN ONLY — NO EMAILS SENT)
Scans target Western SEO / Shopify / Web Agencies & SaaS companies, extracts public
contact emails from their website, runs GeoKit + A11yKit audits, and generates
personalized cold email drafts for review.
"""
import importlib.util
import os
import re
import sys
import urllib.parse

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

spec = importlib.util.spec_from_file_location(
    "cold_audit_sniper", r"f:\willsun.agency\scripts\cold-audit-sniper.py"
)
sniper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sniper)

PROSPECTS = [
    {"name": "Ross", "company": "Siege Media (GEO & SEO Agency)", "url": "https://www.siegemedia.com", "mode": "agency", "fallback_email": "ross@siegemedia.com"},
    {"name": "Ryan", "company": "WEBRIS (B2B SEO Agency)", "url": "https://webris.org", "mode": "agency", "fallback_email": "ryan@webris.org"},
    {"name": "Devesh & Benji", "company": "Grow and Convert (Content & SEO Agency)", "url": "https://www.growandconvert.com", "mode": "agency", "fallback_email": "devesh@growandconvert.com"},
    {"name": "Viola", "company": "Flow Agency (B2B SaaS SEO & Paid Search)", "url": "https://www.flow-agency.com", "mode": "agency", "fallback_email": "hello@flow-agency.com"},
    {"name": "Georgios", "company": "Minuttia (B2B SaaS SEO & AI Growth Agency)", "url": "https://minuttia.com", "mode": "agency", "fallback_email": "hello@minuttia.com"},
    {"name": "Alex & David", "company": "Omniscient Digital (B2B SaaS Organic Growth)", "url": "https://beomniscient.com", "mode": "agency", "fallback_email": "hello@beomniscient.com"},
    {"name": "Julian", "company": "Embarque (Product-Led SEO & Programmatic SEO Agency)", "url": "https://www.embarque.io", "mode": "agency", "fallback_email": "julian@embarque.io"},
    {"name": "Jake", "company": "Skale (SaaS SEO & Link Building Agency)", "url": "https://skale.so", "mode": "agency", "fallback_email": "hello@skale.so"},
    {"name": "Rock The Rankings Team", "company": "Rock The Rankings (B2B SaaS SEO Consultant)", "url": "https://www.rocktherankings.com", "mode": "agency", "fallback_email": "justin@rocktherankings.com"},
    {"name": "SimpleTiger Team", "company": "SimpleTiger (SaaS SEO & Paid Media Agency)", "url": "https://www.simpletiger.com", "mode": "agency", "fallback_email": "info@simpletiger.com"},
]


def discover_emails_on_site(base_url: str, domain: str) -> list[str]:
    found = set()
    for path in ["", "/contact", "/about", "/contact-us"]:
        url = base_url.rstrip("/") + path
        status, _, html = sniper.fetch_url(url, timeout=7)
        if status == 200 and html:
            matches = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", html)
            for m in matches:
                m_low = m.lower()
                if any(ext in m_low for ext in (".png", ".jpg", ".svg", ".webp", ".js", ".css", "sentry", "example.com", "wixpress")):
                    continue
                found.add(m_low)
        if found:
            break
    # Prioritize emails matching the target domain
    domain_emails = [e for e in found if domain in e]
    other_emails = [e for e in found if domain not in e]
    return domain_emails + other_emails


def main():
    os.makedirs(sniper.REPORTS_DIR, exist_ok=True)
    dossier_lines = [
        "# 欧美高客单价 SEO / SaaS Agency 第一批精准诊断与邮箱清单（Dry-Run 预览，未发送）\n",
        "> **状态**：仅完成网站 `GeoKit.site` + `A11yKit.site` 实时无感扫描、公开邮箱抓取与定制开发信生成，**未发送任何邮件**。\n",
        "| # | 目标机构 (Company) | 联系人 | 发现/核验邮箱 | GeoKit 评分 | A11yKit 评分 | 是否有 `/llms.txt` | 核心漏洞摘要 | 独立诊断档案 |",
        "|---|---|---|---|---|---|---|---|---|",
    ]
    email_previews = []

    for idx, p in enumerate(PROSPECTS, 1):
        print(f"[{idx}/{len(PROSPECTS)}] Auditing {p['company']} ({p['url']})...")
        audit = sniper.run_geokit_and_a11y_audit(p["url"])
        discovered = discover_emails_on_site(audit["base_url"], audit["domain"])
        best_email = discovered[0] if discovered else p["fallback_email"]
        all_emails_str = ", ".join(list(dict.fromkeys([best_email, p["fallback_email"]] + discovered[:2])))

        subject, text_body, _ = sniper.build_outreach_email(audit, p["name"], p["mode"])
        report_path = sniper.save_report(audit, subject, text_body)
        report_filename = os.path.basename(report_path)

        llms_flag = "✅ 有" if audit["has_llms_txt"] else "❌ 缺失 (404)"
        short_issue = f"缺alt图片:{audit['imgs_missing_alt']} / 空按钮:{audit['empty_buttons']} / Schema:{len(audit['schema_types'])}个"
        dossier_lines.append(
            f"| {idx} | [{p['company']}]({p['url']}) | {p['name']} | `{all_emails_str}` | **{audit['geo_score']}/100** | **{audit['a11y_score']}/100** | {llms_flag} | {short_issue} | [{report_filename}](file:///f:/willsun.agency/outreach_reports/{report_filename}) |"
        )

        email_previews.append(
            f"### {idx}. {p['company']} (`{best_email}`)\n"
            f"- **Subject**: `{subject}`\n"
            f"- **GeoKit Score**: `{audit['geo_score']}/100` | **A11yKit Score**: `{audit['a11y_score']}/100`\n\n"
            f"```text\n{text_body.strip()}\n```\n"
        )

    dossier_content = "\n".join(dossier_lines) + "\n\n---\n\n## 各机构定制开发信全文预览（含赠送给对方的 `/llms.txt` 代码）\n\n" + "\n".join(email_previews)
    out_file = os.path.join(sniper.REPORTS_DIR, "PROSPECT_BATCH_1_DOSSIER.md")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(dossier_content)
    print(f"\n🎉 All {len(PROSPECTS)} agencies audited! Full dossier saved to: {out_file}")


if __name__ == "__main__":
    main()
