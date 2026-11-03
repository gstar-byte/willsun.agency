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
CV_PATH = r"f:\willsun.agency\public\Will_Sun_Remote_CV.pdf"

PROFILE_DATA = {
    "first_name": "Will",
    "last_name": "Sun",
    "full_name": "Will Sun",
    "username": "willsunagency",
    "email": "will@willsun.agency",
    "password": "WillSun#2026!Growth",
    "headline": "Fractional Growth & Monetization Lead | SEO, GEO, Google Ads & Web Building",
    "hourly_rate": "65",
    "website": "https://willsun.agency",
    "location": "Beijing, China",
    "bio": (
        "Results-driven Fractional Growth & Monetization Lead with 16+ years of hands-on experience (since 2010) "
        "building high-converting websites, scaling global user acquisition (Google Ads/PMax/Meta, Affiliate Networks, GEO & Technical SEO), "
        "and driving subscription & ad monetization across B2B/B2C SaaS, cross-border DTC e-commerce, and mobile/PC apps.\n\n"
        "• In-House Global Scale: Direct global growth & monetization for DWG FastView (1.5M+ Global DAU across Mobile, PC & Web; "
        "50M+ users across 100+ countries, 12+ localized domains and 27 PC channels; owning Google Play, App Store & 2Checkout subscription funnels + Python GA4/GSC pipelines).\n"
        "• Fractional & Client Track Record: Fractional SEO & Google Ads consultant for KingCamp Outdoors (kingcampoutdoors.com, +85% non-brand SEO, 3.8x ROAS), "
        "Yoybuy (yoybuy.com, +140% organic traffic, -32% CPA), and B2B industrial leaders AbleTarget (abletarget.com) & UnirCable (unircable.com); "
        "formerly drove 20 consecutive months of GMV growth at US logistics SaaS PostPony, managed global affiliate UA for Clash of Kings, and served as vendor-side ClickBank Affiliate Manager for Perfect Optimizer.\n"
        "• Full-Stack Web Building & Live Product Portfolio: Hands-on execution (no junior handoffs, async-first workflow) across custom Next.js/WordPress/Shopify websites, "
        "market & user persona research, and proprietary platforms including GeoKit.site, A11yKit.site, CADGuide.tools, GstarCademy.com, ChanZong.space, and RamanaMaharshi.space."
    ),
    "skills": [
        "Technical SEO", "Generative Engine Optimization (GEO)", "Google Ads",
        "Conversion Rate Optimization", "SaaS Monetization", "Affiliate Marketing",
        "Google Analytics 4", "Next.js", "WordPress", "Shopify", "Python", "E-Commerce Growth"
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
