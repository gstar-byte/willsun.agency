#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Playwright Automated Registration & Profile Builder for Mainstream Remote Job Platforms
Uses will@willsun.agency + IMAP Verification Reader + Avatar + 2026 CV PDF
"""
import importlib.util
import json
import os
import re
import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

spec = importlib.util.spec_from_file_location(
    "auto_reg", r"f:\willsun.agency\scripts\auto-register-platforms.py"
)
auto_reg = importlib.util.module_from_spec(spec)
spec.loader.exec_module(auto_reg)

P = auto_reg.PROFILE_DATA
AVATAR_PATH = auto_reg.AVATAR_PATH
CV_PATH = auto_reg.CV_PATH
RESULTS_PATH = r"C:\Users\willp\.gemini\config\willsun_remote_platforms.json"


def register_working_nomads(page, context):
    print("\n=== [1] Registering on Working Nomads (workingnomads.com) ===")
    try:
        page.goto("https://www.workingnomads.com/register/", wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(2500)
        inputs = page.locator("input:visible").all()
        print(f"WorkingNomads visible inputs: {len(inputs)}")
        for inp in inputs:
            name = (inp.get_attribute("name") or "").lower()
            itype = (inp.get_attribute("type") or "").lower()
            placeholder = (inp.get_attribute("placeholder") or "").lower()
            if "email" in name or itype == "email" or "email" in placeholder:
                inp.fill(P["email"])
            elif "username" in name or "user" in placeholder:
                inp.fill(P["username"])
            elif "password" in name or itype == "password":
                inp.fill(P["password"])
            elif "first" in name:
                inp.fill(P["first_name"])
            elif "last" in name:
                inp.fill(P["last_name"])

        # Check terms checkbox if any
        for cb in page.locator("input[type='checkbox']:visible").all():
            if not cb.is_checked():
                cb.check(force=True)

        submit = page.locator("button[type='submit'], input[type='submit']").first
        if submit.count() > 0:
            submit.click()
            page.wait_for_timeout(4000)
            print("WorkingNomads post-submit URL:", page.url)

        # Check IMAP for verification link
        otp, links = auto_reg.fetch_latest_verification_from_imap("workingnomads", wait_sec=8)
        verify_links = [u for u in links if "workingnomads.com" in u and ("confirm" in u or "verify" in u or "activate" in u or "accounts" in u)]
        if verify_links:
            print("Found WorkingNomads verification link:", verify_links[0])
            page.goto(verify_links[0], wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(2500)
            btn = page.locator("button[type='submit'], input[type='submit']").first
            if btn.count() > 0:
                btn.click()
                page.wait_for_timeout(2500)
        return {"platform": "Working Nomads", "url": "https://www.workingnomads.com", "email": P["email"], "password": P["password"], "status": f"Submitted ({page.url})"}
    except Exception as e:
        print("WorkingNomads error:", e)
        return {"platform": "Working Nomads", "url": "https://www.workingnomads.com", "email": P["email"], "password": P["password"], "status": f"Error: {e}"}


def register_weworkremotely(page, context):
    print("\n=== [2] Registering on We Work Remotely (weworkremotely.com) ===")
    try:
        page.goto("https://weworkremotely.com/job-seekers/account/register", wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(2500)
        for inp in page.locator("input:visible").all():
            name = (inp.get_attribute("name") or "").lower()
            iid = (inp.get_attribute("id") or "").lower()
            itype = (inp.get_attribute("type") or "").lower()
            if "first_name" in name or "first" in iid:
                inp.fill(P["first_name"])
            elif "last_name" in name or "last" in iid:
                inp.fill(P["last_name"])
            elif "email" in name or itype == "email":
                inp.fill(P["email"])
            elif "password" in name or itype == "password":
                inp.fill(P["password"])
            elif "title" in name or "headline" in name:
                inp.fill(P["headline"])
            elif "website" in name or "url" in name:
                inp.fill(P["website"])

        for cb in page.locator("input[type='checkbox']:visible").all():
            if not cb.is_checked():
                cb.check(force=True)

        submit = page.locator("button[type='submit'], input[type='submit']").first
        if submit.count() > 0:
            submit.click()
            page.wait_for_timeout(4000)
            print("WWR post-submit URL:", page.url)

        otp, links = auto_reg.fetch_latest_verification_from_imap("weworkremotely", wait_sec=8)
        verify_links = [u for u in links if "weworkremotely" in u and ("confirm" in u or "verify" in u or "auth" in u)]
        if verify_links:
            print("Found WWR verification link:", verify_links[0])
            page.goto(verify_links[0], wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(2500)
        return {"platform": "We Work Remotely", "url": "https://weworkremotely.com", "email": P["email"], "password": P["password"], "status": f"Submitted ({page.url})"}
    except Exception as e:
        print("WWR error:", e)
        return {"platform": "We Work Remotely", "url": "https://weworkremotely.com", "email": P["email"], "password": P["password"], "status": f"Error: {e}"}


def register_contra(page, context):
    print("\n=== [3] Registering / Magic-Link Login on Contra (contra.com) ===")
    try:
        page.goto("https://contra.com/sign-up", wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(3000)
        email_inp = page.locator("input[type='email'], input[name*='email'], input[placeholder*='email' i]").first
        if email_inp.count() > 0:
            email_inp.fill(P["email"])
            btn = page.locator("button[type='submit'], button:has-text('Continue'), button:has-text('Sign up')").first
            if btn.count() > 0:
                btn.click()
                page.wait_for_timeout(4000)
                print("Contra magic-link/OTP triggered! Waiting for email...")
                otp, links = auto_reg.fetch_latest_verification_from_imap("contra", wait_sec=12)
                print("Contra IMAP result -> OTP:", otp, "Links:", links[:3])
                if otp:
                    otp_inputs = page.locator("input[type='text'], input[type='tel'], input[type='number']").all()
                    if len(otp_inputs) == len(otp):
                        for i, ch in enumerate(otp):
                            otp_inputs[i].fill(ch)
                    elif len(otp_inputs) >= 1:
                        otp_inputs[0].fill(otp)
                    page.wait_for_timeout(4000)
                elif links:
                    magic = [u for u in links if "contra" in u.lower()]
                    if magic:
                        page.goto(magic[0], wait_until="domcontentloaded", timeout=20000)
                        page.wait_for_timeout(4000)
        return {"platform": "Contra", "url": "https://contra.com", "email": P["email"], "password": "Magic Link / OTP via will@willsun.agency", "status": f"Reached {page.url}"}
    except Exception as e:
        print("Contra error:", e)
        return {"platform": "Contra", "url": "https://contra.com", "email": P["email"], "password": "Magic Link / OTP", "status": f"Error: {e}"}


def register_himalayas(page, context):
    print("\n=== [4] Registering on Himalayas Remote Talent (himalayas.app) ===")
    try:
        page.goto("https://himalayas.app/join", wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(3000)
        for inp in page.locator("input:visible").all():
            name = (inp.get_attribute("name") or "").lower()
            itype = (inp.get_attribute("type") or "").lower()
            ph = (inp.get_attribute("placeholder") or "").lower()
            if "email" in name or itype == "email" or "email" in ph:
                inp.fill(P["email"])
            elif "password" in name or itype == "password":
                inp.fill(P["password"])
            elif "name" in name or "name" in ph:
                inp.fill(P["full_name"])
        btn = page.locator("button[type='submit'], button:has-text('Continue'), button:has-text('Sign up'), button:has-text('Create')").first
        if btn.count() > 0:
            btn.click()
            page.wait_for_timeout(4000)
            print("Himalayas post-submit URL:", page.url)
        otp, links = auto_reg.fetch_latest_verification_from_imap("himalayas", wait_sec=10)
        if links:
            vlinks = [u for u in links if "himalayas" in u.lower()]
            if vlinks:
                page.goto(vlinks[0], wait_until="domcontentloaded", timeout=20000)
                page.wait_for_timeout(3000)
        return {"platform": "Himalayas.app", "url": "https://himalayas.app", "email": P["email"], "password": P["password"], "status": f"Reached {page.url}"}
    except Exception as e:
        print("Himalayas error:", e)
        return {"platform": "Himalayas.app", "url": "https://himalayas.app", "email": P["email"], "password": P["password"], "status": f"Error: {e}"}


def main():
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1366, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        results.append(register_working_nomads(page, context))
        results.append(register_weworkremotely(page, context))
        results.append(register_contra(page, context))
        results.append(register_himalayas(page, context))

        browser.close()

    with open(RESULTS_PATH, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print("\nSaved registration results to:", RESULTS_PATH)


if __name__ == "__main__":
    main()
