#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
IMAP Automated Verification Code / Magic Link Reader for will@willsun.agency
Reads from C:\\Users\\willp\\.gemini\\config\\willsun_email_config.json
"""
import imaplib
import email
from email.header import decode_header
import json
import re
import sys
import html

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

CONFIG_PATH = r"C:\Users\willp\.gemini\config\willsun_email_config.json"


def decode_str(s):
    if not s:
        return ""
    decoded_parts = decode_header(s)
    result = []
    for content, encoding in decoded_parts:
        if isinstance(content, bytes):
            result.append(content.decode(encoding or "utf-8", errors="replace"))
        else:
            result.append(str(content))
    return "".join(result)


def extract_body(msg):
    text_body = ""
    html_body = ""
    if msg.is_multipart():
        for part in msg.walk():
            ctype = part.get_content_type()
            cdispo = str(part.get("Content-Disposition"))
            if "attachment" in cdispo:
                continue
            payload = part.get_payload(decode=True)
            if not payload:
                continue
            charset = part.get_content_charset() or "utf-8"
            decoded = payload.decode(charset, errors="replace")
            if ctype == "text/plain":
                text_body += decoded + "\n"
            elif ctype == "text/html":
                html_body += decoded + "\n"
    else:
        payload = msg.get_payload(decode=True)
        if payload:
            charset = msg.get_content_charset() or "utf-8"
            decoded = payload.decode(charset, errors="replace")
            if msg.get_content_type() == "text/html":
                html_body = decoded
            else:
                text_body = decoded

    if text_body.strip():
        return text_body.strip(), html_body
    # Strip HTML tags if only HTML body exists
    clean = re.sub(r"<style[^>]*>.*?</style>", " ", html_body, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r"<script[^>]*>.*?</script>", " ", clean, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r"<[^>]+>", " ", clean)
    clean = html.unescape(clean)
    clean = re.sub(r"\s+", " ", clean).strip()
    return clean, html_body


def fetch_latest_emails(limit=5, sender_filter=None):
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    mail = imaplib.IMAP4_SSL(cfg["imap_host"], cfg["imap_port"])
    mail.login(cfg["underlying_gmail"], cfg["app_password"])
    mail.select('"[Gmail]/All Mail"')

    search_criterion = "ALL"
    if sender_filter:
        search_criterion = f'(OR FROM "{sender_filter}" SUBJECT "{sender_filter}")'

    status, data = mail.search(None, search_criterion)
    if status != "OK" or not data or not data[0]:
        mail.logout()
        print("No matching emails found.")
        return

    ids = data[0].split()
    latest_ids = ids[-limit:][::-1]

    for eid in latest_ids:
        res, msg_data = mail.fetch(eid, "(RFC822)")
        if res != "OK":
            continue
        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                subj = decode_str(msg.get("Subject"))
                from_ = decode_str(msg.get("From"))
                to_ = decode_str(msg.get("To"))
                date_ = decode_str(msg.get("Date"))
                body_text, body_html = extract_body(msg)

                # Extract 4-8 digit OTP codes
                otps = re.findall(r"\b\d{4,8}\b", subj + " " + body_text)
                # Filter out common years like 2026
                otps = [c for c in otps if c not in ("2024", "2025", "2026", "2027", "1000")]

                # Extract verification / magic links
                links = re.findall(r"https?://[^\s\"'<>]+", body_html or body_text)
                verify_links = [
                    u for u in links
                    if any(k in u.lower() for k in ("verify", "confirm", "token", "magic", "login", "auth", "code", "contra", "wellfound", "upwork"))
                ]

                print("=" * 70)
                print(f"Date   : {date_}")
                print(f"From   : {from_}")
                print(f"To     : {to_}")
                print(f"Subject: {subj}")
                if otps:
                    print(f"🔑 Potential OTP Codes : {list(dict.fromkeys(otps))[:6]}")
                if verify_links:
                    print(f"🔗 Verification Links  :")
                    for lnk in list(dict.fromkeys(verify_links))[:4]:
                        print(f"   -> {lnk}")
                print("-" * 70)
                print(f"Snippet: {body_text[:500]}")
    mail.logout()


if __name__ == "__main__":
    kw = sys.argv[1] if len(sys.argv) > 1 else None
    fetch_latest_emails(limit=5, sender_filter=kw)
