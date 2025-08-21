========================================
SR Algo Screener - Setup Guide
========================================

1. Upload Files
---------------
- Upload the whole package into InfinityFree File Manager.
- Folder structure:
    /htdocs/index.html
    /htdocs/api/*.php
    /htdocs/api/install.sql

2. Database Setup
-----------------
- In InfinityFree Control Panel -> MySQL Databases, create a new database.
- Note down:
    - MySQL Host (example: sql301.epizy.com)
    - MySQL Username (example: epiz_12345678)
    - MySQL Password (you set this)
    - Database Name (example: epiz_12345678_algo)

- Open phpMyAdmin -> select your database -> Import -> upload install.sql

3. Configure db.php
-------------------
- Edit /api/db.php and fill in your DB host, username, password, database name.
- Example:
    $host = "sql301.epizy.com";
    $user = "epiz_12345678";
    $pass = "your_db_password";
    $dbname = "epiz_12345678_algo";

4. Test Backend
---------------
- Open in browser:
    https://yourdomain/api/market.php
    https://yourdomain/api/proxy.php?url=https://www.nseindia.com/api/live-analysis-variations?index=gainers
    https://yourdomain/api/auth.php?action=signup

5. Test Frontend
----------------
- Visit:
    https://yourdomain/index.html

6. Notes
--------
- NSE API has strict rate-limit. If NSE blocks, market.php will fallback to demo data.
- proxy.php only allows URLs from nseindia.com for security.
- auth.php creates JWT tokens for login.
- pnl.php allows P&L entry, listing, and CSV export.
- fo.php provides demo expiry and strike data.
- sectors.php returns sector mapping for heatmap.

========================================
Done! Your SR Algo Screener is ready 🚀
========================================
