#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Automated Remote Talent Platform Registration & Profile Setup for Will Sun
Email: will@willsun.agency
Avatar: f:\\willsun.agency\\public\\will-sun-avatar.jpg
Resume: f:\\willsun.agency\\public\\Will_Sun_Remote_CV_2026.pdf
"""
import imaplib
import email
from email.header import decode_header
import json
import os
import re
import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

EMAIL_CFG_PATH = r"C:\Users\willp\.gemini\config\willsun_email_config.json"
PLATFORMS_OUT_PATH = r"C:\Users\willp\.gemini\config\willsun_remote_platforms.json"
AVATAR_PATH = r"f:\willsun.agency\public\will-sun-avatar.jpg"
CV_PATH = r"f:\willsun.agency\public\Will_Sun_Remote_CV_2026.pdf"

PROFILE_DATA = {
    "first_name": "Will",
    "last_name": "Sun",
    "full_name": "Will Sun",
    "username": "willsunagency",
    "email": "will@willsun.agency",
    "password": "WillSun#2026!Growth",
    "headline": "Fractional Growth Manager | Technical SEO, GEO & AI-Native Engineer",
    "hourly_rate": "65",
    "website": "https://willsun.agency",
    "location": "Beijing, China",
    "bio": (
        "Results-driven Fractional Growth Marketing Manager & AI-Native Technical SEO Consultant with 16+ years of "
        "hands-on experience scaling global organic search, paid acquisition (Google Ads/PMax/Meta), and subscription "
        "monetization across B2B/B2C SaaS, DTC e-commerce, and cross-platform apps.\n\n"
        "• In-House Global Scale: Direct global growth & monetization for DWG FastView (30,000+ overseas PC DAU across "
        "12+ localized domains and 27 channels; owning Google Play, App Store & 2Checkout subscription funnels + Python GA4/GSC pipelines).\n"
        "• Fractional & Client Track Record: Fractional SEO & Google Ads consultant for KingCamp (kingcampoutdoors.com), "
        "Yoybuy (yoybuy.com), and B2B industrial exporters AbleTarget (abletarget.com) & UnirCable (unircable.com); "
        "formerly drove 20 consecutive months of GMV growth at US logistics SaaS PostPony and managed global affiliate UA for Clash of Kings.\n"
        "• Proprietary AI-Native Live Portfolio: Founder & developer of GeoKit.site (Generative Engine Optimization & AI Search Auditor), "
        "A11yKit.site (WCAG 2.2 / ADA Compliance Scanner), CADGuide.tools (45+ interactive engineering calculators scaled to 2,500+ monthly "
        "organic visits), GstarCademy.com, ChanZong.space, and RamanaMaharshi.space.\n"
        "• Bilingual Fluency: B.A. in Business English from Beijing Foreign Studies University (TEM-8 & CATTI-3 certified), "
        "former overseas on-site interpreter in Trinidad & Tobago."
    ),
    "skills": [
        "Technical SEO", "Programmatic SEO", "Generative Engine Optimization (GEO)",
        "Google Ads", "Google Analytics 4", "Python", "Next.js", "WCAG Accessibility",
        "Conversion Rate Optimization", "SaaS Growth", "E-Commerce SEO", "Affiliate Marketing"
    ],
    "portfolio_urls": [
        "https://willsun.agency",
        "https://geokit.site",
        "https://a11ykit.site",
        "https://cadguide.tools",
        "https://gstarcademy.com",
        "https://chanzong.space",
        "https://ramanamaharshi.space",
        "https://www.abletarget.com",
        "https://www.unircable.com",
        "https://www.kingcampoutdoors.com"
    ]
}


def fetch_latest_verification_from_imap(keyword: str, wait_sec: int = 12):
    time.sleep(wait_sec)
    with open(EMAIL_CFG_PATH, "r", encoding="utf-8") as f:
        cfg = json.load(f)
    mail = imaplib.IMAP4_SSL(cfg["imap_host"], cfg["imap_port"])
    mail.login(cfg["underlying_gmail"], cfg["app_password"])
    mail.select('"[Gmail]/All Mail"')
    status, data = mail.search(None, "ALL")
    if status != "OK" or not data or not data[0]:
        mail.logout()
        return None, []
    ids = data[0].split()[-8:][::-1]
    for eid in ids:
        res, msg_data = mail.fetch(eid, "(RFC822)")
        if res != "OK":
            continue
        for part in msg_data:
            if isinstance(part, tuple):
                msg = email.message_from_bytes(part[1])
                subj = str(msg.get("Subject", ""))
                from_ = str(msg.get("From", ""))
                if keyword.lower() not in (subj + " " + from_).lower():
                    continue
                body = ""
                if msg.is_multipart():
                    for p in msg.walk():
                        if p.get_content_type() in ("text/plain", "text/html"):
                            payload = p.get_payload(decode=True)
                            if payload:
                                body += payload.decode(p.get_content_charset() or "utf-8", errors="replace") + "\n"
                else:
                    payload = msg.get_payload(decode=True)
                    if payload:
                        body = payload.decode(msg.get_content_charset() or "utf-8", errors="replace")
                links = re.findall(r"https?://[^\s\"'<>]+", body)
                otps = [c for c in re.findall(r"\b\d{4,8}\b", subj + " " + body) if c not in ("2025", "2026", "2024")]
                mail.logout()
                return (otps[0] if otps else None), links
    mail.logout()
    return None, []


if __name__ == "__main__":
    print("Profile helper loaded successfully.")
