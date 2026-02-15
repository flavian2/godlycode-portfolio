# 🌐 Deploy React Portfolio to cPanel

Complete guide for deploying your React portfolio to cPanel shared hosting (like Hostinger, Namecheap, Bluehost, etc.)

## ✅ Yes, You Can Deploy React to cPanel!

React apps become **static files** after building, so they work perfectly on cPanel just like regular HTML sites.

---

## 📋 What You Need

- ✅ cPanel hosting account (any shared hosting)
- ✅ Domain name (can be addon domain or main domain)
- ✅ FTP access or File Manager
- ✅ Your built React app

---

## 🚀 Method 1: File Manager (Easiest)

### Step 1: Build Your React App

On your local computer:

```bash
cd godlycode-portfolio

# Build production version
npm run build
```

This creates a `dist` folder with all your files:
```
dist/
├── index.html
├── assets/
│   ├── index-abc123.js
│   ├── index-xyz789.css
│   └── ...
└── ...
```

### Step 2: Prepare the Files

1. **Navigate to the `dist` folder**
2. **Select ALL files inside** (not the dist folder itself)
3. **Create a ZIP file** called `portfolio.zip`

### Step 3: Upload to cPanel

1. **Login to cPanel**
   - Usually: `yourdomain.com/cpanel` or `yourdomain.com:2083`

2. **Find File Manager**
   - In cPanel, click **"File Manager"**

3. **Navigate to the right folder:**

   **For main domain** (e.g., `godlycode.com`):
   - Go to: `public_html/`

   **For addon domain** (e.g., `portfolio.godlycode.com`):
   - Go to: `public_html/portfolio/` (or your addon domain folder)

   **For subdomain** (e.g., `portfolio.yourdomain.com`):
   - Go to the subdomain folder (usually `public_html/portfolio/`)

4. **Clean the folder:**
   - Delete default files (`index.html`, `cgi-bin`, etc.)
   - **Keep:** `.htaccess` if it exists

5. **Upload your ZIP file:**
   - Click **"Upload"** button
   - Select `portfolio.zip`
   - Wait for upload to complete

6. **Extract the files:**
   - Go back to File Manager
   - Right-click `portfolio.zip`
   - Click **"Extract"**
   - Extract to current directory
   - Delete `portfolio.zip` after extraction

### Step 4: Configure .htaccess for React Router

React Router needs special configuration on Apache (which cPanel uses).

1. In File Manager, create/edit `.htaccess` file in `public_html/` (or your domain folder)

2. Add this code:

```apache
# Enable Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>

# GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

3. **Save the file**

### Step 5: Test Your Site

Visit your domain: `https://yourdomain.com`

✅ Should see your portfolio!
✅ All pages should work
✅ Navigation should work
✅ Animations should work

---

## 🔄 Method 2: FTP Upload (Alternative)

### Step 1: Build Locally

```bash
cd godlycode-portfolio
npm run build
```

### Step 2: Connect via FTP

Use an FTP client like:
- **FileZilla** (recommended - free)
- **WinSCP**
- **Cyberduck**

**FTP Credentials** (find in cPanel):
- **Host:** ftp.yourdomain.com (or IP address)
- **Username:** Your cPanel username
- **Password:** Your cPanel password
- **Port:** 21 (or 22 for SFTP)

### Step 3: Upload Files

1. **Connect to your server**
2. **Navigate to:** `public_html/` (or your domain folder)
3. **Delete old files** (keep .htaccess)
4. **Upload everything from** `dist` folder
5. **Create .htaccess** (same as Method 1)

### Step 4: Test

Visit your domain!

---

## ⚙️ Method 3: Git Deployment (Advanced)

Some cPanel hosts support Git deployment:

### Step 1: Enable Git in cPanel

1. Find **"Git Version Control"** in cPanel
2. Click **"Create"**
3. Clone URL: Your GitHub repository
4. Repository path: `public_html/` or your folder
5. Click **"Create"**

### Step 2: Set Up Build Script

This requires SSH access (not all shared hosts allow this).

If available:
1. SSH into your server
2. Navigate to repository
3. Run:
```bash
npm install
npm run build
cp -r dist/* ../public_html/
```

**Note:** Most shared hosts don't have Node.js, so this method usually doesn't work.

---

## 🔒 Setting Up SSL Certificate

### Option 1: Free SSL (Let's Encrypt)

Most cPanel hosts include free SSL:

1. In cPanel, find **"SSL/TLS Status"**
2. Select your domain
3. Click **"Run AutoSSL"**
4. Wait 5-10 minutes
5. Your site will have `https://`

### Option 2: Manual SSL

1. In cPanel, find **"SSL/TLS"**
2. Click **"Manage SSL Sites"**
3. Select domain
4. Paste SSL certificate (if you have one)
5. Save

---

## 🌍 Custom Domain Setup

### If Using Main Domain

No extra setup needed! Upload to `public_html/`

### If Using Addon Domain

1. In cPanel, find **"Addon Domains"**
2. Click **"Create"**
3. Enter: `portfolio.yourdomain.com`
4. Document root: `public_html/portfolio`
5. Upload files to that folder

### If Using Subdomain

1. In cPanel, find **"Subdomains"**
2. Create subdomain: `portfolio`
3. Document root: `public_html/portfolio`
4. Upload files there

---

## ⚠️ Important: Environment Variables

**Problem:** cPanel can't use `.env` files like Netlify/Vercel

**Solution:** Build with API keys included (⚠️ security risk)

### Better Approach:

1. **Don't include API keys in frontend code**
2. **Create a simple PHP API proxy** on cPanel
3. **Frontend calls your PHP file**
4. **PHP file calls Claude/Venice API**

**Example:**

**Create `api/chat.php` in cPanel:**
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Your API key (stored server-side, safe!)
$apiKey = 'sk-ant-your-key-here';

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-key: ' . $apiKey,
    'anthropic-version: 2023-06-01'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'model' => 'claude-3-5-sonnet-20241022',
    'max_tokens' => 500,
    'messages' => $data['messages']
]));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

**Update `aiService.js`:**
```javascript
async sendToClaude(userMessage) {
  // Call your PHP proxy instead of Claude directly
  const response = await fetch('/api/chat.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: this.messageHistory
    })
  });

  // ... rest of code
}
```

---

## 🔄 Updating Your Site

### After Making Changes:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload new files:**
   - Delete old files from cPanel File Manager
   - Upload new `dist` contents
   - Keep `.htaccess`

3. **Clear browser cache:**
   - Your browser: `Ctrl + F5`
   - Tell visitors to clear cache

### Quick Update Script:

**Create `deploy.sh` locally:**
```bash
#!/bin/bash

# Build
npm run build

# Create zip
cd dist
zip -r ../cpanel-deploy.zip .
cd ..

echo "Upload cpanel-deploy.zip to cPanel File Manager and extract!"
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Page Refresh Shows 404

**Cause:** React Router not configured

**Solution:** Add `.htaccess` rewrite rules (see Step 4 above)

### Issue 2: Blank White Screen

**Cause:** Wrong base path

**Solution:**
1. Check `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/', // For root domain
     // base: '/subfolder/', // If in subfolder
   })
   ```
2. Rebuild: `npm run build`
3. Re-upload

### Issue 3: CSS/JS Not Loading

**Cause:** Wrong path or missing files

**Solution:**
1. Check browser console (F12)
2. Verify all files uploaded
3. Check file permissions (should be 644)

### Issue 4: Images Not Showing

**Cause:** Wrong image paths

**Solution:**
1. Place images in `public/` folder before building
2. Reference as `/image.jpg` not `./image.jpg`
3. Rebuild and upload

---

## 📊 File Structure After Upload

Your cPanel should look like this:

```
public_html/
├── .htaccess          ← IMPORTANT! For React Router
├── index.html         ← Your built React app
├── assets/
│   ├── index-abc.js   ← All React code
│   ├── index-xyz.css  ← All styles
│   └── ...
├── api/               ← Optional: PHP API proxy
│   └── chat.php
└── ...
```

---

## ✅ Pre-Upload Checklist

Before uploading to cPanel:

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview` locally
- [ ] All placeholder URLs updated
- [ ] API keys handled securely (PHP proxy)
- [ ] Images in correct folders
- [ ] `.htaccess` file ready
- [ ] Domain/subdomain created in cPanel
- [ ] SSL certificate enabled

---

## 🎯 Complete Deployment Steps Summary

1. ✅ **Build:** `npm run build`
2. ✅ **ZIP:** Create `portfolio.zip` from `dist` contents
3. ✅ **Upload:** Use cPanel File Manager
4. ✅ **Extract:** In correct folder (`public_html/`)
5. ✅ **Create:** `.htaccess` file for React Router
6. ✅ **Enable:** SSL certificate
7. ✅ **Test:** Visit your domain
8. ✅ **Verify:** All pages work, navigation works

---

## 💰 Cost Comparison

### Free Modern Hosting (Netlify/Vercel):
- ✅ FREE
- ✅ Auto-deploy
- ✅ Free SSL
- ✅ Global CDN
- ✅ Easy updates

### cPanel Shared Hosting:
- 💰 $3-10/month
- 🔧 Manual uploads
- ✅ SSL included (usually)
- 🌍 Single location
- 🔄 Manual updates
- ✅ **Can host PHP projects too**

**Recommendation:**
- Use **Netlify/Vercel** for React portfolio (free, easier)
- Keep cPanel for PHP projects

---

## 🚀 Next Steps

After deploying to cPanel:

1. ✅ Test all pages
2. ✅ Test on mobile
3. ✅ Check SSL certificate
4. ✅ Set up Google Analytics
5. ✅ Share your link!

---

## 🆘 Need Help?

If you encounter issues:

1. **Check .htaccess** - Most common issue
2. **Check browser console** (F12) for errors
3. **Verify file permissions** (644 for files, 755 for folders)
4. **Contact your hosting support** - They can help!

---

**Your portfolio will be live at:** `https://yourdomain.com` 🚀

**From Local → cPanel → World!** 🇳🇬✨
