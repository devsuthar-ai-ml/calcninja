# CalcNinja - Copy-Paste Commands for Deployment 🚀

All commands ready to copy and paste. Just replace YOUR_USERNAME with your GitHub username!

---

## STEP 1: Setup Git Locally (One-time only)

Open PowerShell and navigate to CalcNinja folder:

```powershell
cd "C:\Users\devsu\OneDrive\Desktop\CalcNinja"
```

Configure your Git identity (do this once):

```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your.email@gmail.com"
```

---

## STEP 2: Initialize Git Repository

Run these commands in PowerShell (in CalcNinja folder):

```powershell
git init

git add .

git commit -m "CalcNinja - Complete financial calculator website for India"

git branch -M main
```

---

## STEP 3: Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `calcninja`
3. Description: `India's best free financial calculator website`
4. Select **Public**
5. Click **Create repository**
6. Copy the HTTPS URL (looks like: `https://github.com/YOUR_USERNAME/calcninja.git`)

---

## STEP 4: Push to GitHub

Run this command (replace YOUR_USERNAME):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/calcninja.git

git push -u origin main
```

If it asks for password/token:
- Username: `YOUR_USERNAME`
- Password: Go to GitHub Settings → Developer Settings → Personal Access Tokens → Create token → Copy-paste

**Expected output:**
```
Enumerating objects: XX, done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Code is now on GitHub!**

---

## STEP 5: Deploy to Vercel

1. Go to **https://vercel.com/new**
2. Click **Import GitHub repository**
3. Paste: `https://github.com/YOUR_USERNAME/calcninja`
4. Click **Import**
5. Select framework: **"Other"** (it's static HTML)
6. Leave all options as default
7. Click **Deploy**

Wait 2-3 minutes...

✅ **Your site is live at:** `https://calcninja.vercel.app`

---

## STEP 6: Verify on Google Search Console

1. Go to **https://search.google.com/search-console**
2. Click **URL Prefix**
3. Enter: `https://calcninja.vercel.app`
4. Click **Continue**
5. Download HTML verification file
6. Add to CalcNinja root folder

Run these commands:

```powershell
git add .

git commit -m "Add Google Search Console verification"

git push
```

Wait 2-3 minutes for Vercel to redeploy.

Back in Search Console, click **Verify**.

✅ **Ownership verified!**

Then submit sitemap:

1. Left sidebar → **Sitemaps**
2. URL: `https://calcninja.vercel.app/sitemap.xml`
3. Click **Submit**

---

## STEP 7: Apply for Google AdSense

1. Go to **https://adsense.google.com**
2. Click **Sign Up**
3. Website: `https://calcninja.vercel.app`
4. Follow verification process
5. Accept all terms

Google will send verification code. Add to index.html:

```html
<!-- In <head> section of index.html -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CODE"
     crossorigin="anonymous"></script>
```

After approval, deploy:

```powershell
git add .

git commit -m "Add Google AdSense code"

git push
```

✅ **AdSense will start showing ads and earning money!**

---

## STEP 8: Register Affiliate Programs

### Groww Affiliate

```
1. Visit: https://groww.in/partner → Affiliate Program
2. Sign up
3. Get referral link: https://groww.in/?ref=YOUR_CODE
4. Update in DEPLOY.md and footer
5. Deploy:
```

```powershell
git add .
git commit -m "Update Groww affiliate link"
git push
```

### Zerodha Affiliates

```
1. Visit: https://zerodha.com/affiliates
2. Sign up
3. Get referral link
4. Update in footer
5. Deploy:
```

```powershell
git add .
git commit -m "Update Zerodha affiliate link"
git push
```

### PolicyBazaar Affiliate

```
1. Visit: https://policybazaar.com/partners
2. Sign up → Affiliate program
3. Get tracking code
4. Update in footer
5. Deploy:
```

```powershell
git add .
git commit -m "Update PolicyBazaar affiliate code"
git push
```

---

## STEP 9: Share on Social Media

### Reddit

1. Go to **https://reddit.com/r/indiainvestments**
2. Create account
3. Click **"Create Post"**
4. Title: `"I built a free financial calculator website for Indians - Check out CalcNinja!"`
5. URL: `https://calcninja.vercel.app`
6. Post

### Quora

1. Go to **https://quora.com**
2. Search: **"How to calculate EMI"**
3. Click **"Answer question"**
4. Write answer (500+ words ideal)
5. End with: "I built a [free EMI calculator](https://calcninja.vercel.app) - might help!"
6. Repeat for 5-10 questions

### Twitter

```
Tweet example:

"Just launched CalcNinja 🥷 - Free financial calculators for Indians!

EMI, SIP, Tax, GST, FD, PPF, and 10+ more tools

Completely free, works offline, Hindi support included

Check it out: calcninja.vercel.app

#FinanceIndia #IndiaInvestement"
```

---

## STEP 10: Monitor & Earn

### Check Google Analytics

```
1. Visit: https://analytics.google.com
2. Go to your CalcNinja property
3. See real-time visitors
4. Check traffic sources
```

### Check AdSense Earnings

```
1. Visit: https://adsense.google.com
2. Dashboard shows daily earnings
3. Target: ₹500+ for payment
```

### Check Affiliate Commissions

```
1. Groww Dashboard: See sign-ups
2. Zerodha Dashboard: See account openings
3. PolicyBazaar Dashboard: See insurance sales
```

---

## Common Git Commands (Reference)

```powershell
# See current status
git status

# See commit history
git log

# Make changes and push
git add .
git commit -m "Your message here"
git push

# Pull latest from GitHub (if editing elsewhere)
git pull
```

---

## Troubleshooting

### Git command not found
```powershell
# Install Git from: https://git-scm.com/download/win
# Then restart PowerShell
```

### Git authentication fails
```
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Click "Generate new token"
3. Select: repo, workflow
4. Generate → Copy token
5. In PowerShell, paste token when asked for password
```

### Vercel deployment fails
```
1. Check if code is on GitHub with: git push
2. Check if GitHub repo is public
3. Wait 5 minutes and retry
4. Check Vercel logs for errors
```

### Google Search Console says domain not verified
```
1. Make sure HTML verification file exists on site
2. Wait 2-3 min after git push (Vercel redeploy)
3. Try "Verify" again
4. If still fails, use alternative verification: NAmerserver or TXT record
```

### AdSense rejection with "Not approved"
```
1. Check if you have Privacy, Terms, Disclaimer pages (you do!)
2. Make sure content is original (not copied)
3. Wait 30 days and reapply
4. Common reasons: New domain, suspicious traffic, incomplete legal pages
```

---

## Success Checklist ✅

- [ ] Code pushed to GitHub
- [ ] Deployed on Vercel (live URL)
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] AdSense applied
- [ ] Groww affiliate registered
- [ ] Zerodha affiliate registered
- [ ] Posted on Reddit
- [ ] Posted on Quora (5+ answers)
- [ ] Tweeted daily tips
- [ ] Monitored first 100 visitors
- [ ] Earned first ₹100 (AdSense + Affiliate)
- [ ] Updated your friends that you built this! 🎉

---

## Timeline

| Day | Task | Status |
|-----|------|--------|
| Day 1 | Push to GitHub + Deploy Vercel | ✅ 15 min |
| Day 2 | Verify Search Console | ✅ 5 min |
| Day 3 | Apply for AdSense | ✅ 10 min |
| Day 4 | Register Affiliate Programs | ✅ 10 min |
| Day 5-10 | Share on Reddit, Quora, Twitter | ✅ Daily |
| Week 2 | Monitor analytics | ✅ Start getting traffic |
| Week 3-4 | Get AdSense approval | ✅ Start earning |
| Month 2+ | Grow traffic, increase earnings | 🚀 Passive income! |

---

## Expected Revenue Timeline

```
Month 1:      ₹0    (Building traffic)
Month 2:      ₹0    (Waiting for AdSense approval)
Month 3:      ₹600  (2000 visitors + AdSense + Affiliate)
Month 6:      ₹2,500 (8000 visitors)
Month 12:     ₹10,000 (20000 visitors)
Year 2:       ₹50,000+ (Passive income!)
```

---

## Need Help?

- **Git help:** `git help COMMAND` (e.g., `git help push`)
- **Vercel docs:** https://vercel.com/docs
- **GitHub docs:** https://docs.github.com
- **Email:** Put your email in QUICK_START.md when you're lost

---

**You've got this! 🚀 Copy-paste these commands and you'll be live in 30 minutes!**
