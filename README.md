
SunnahSmile — Full Shop (Sandbox)

This package contains a small 3-page shop ready for GitHub Pages deployment.
Pages: index.html (Home), catalogue.html (3-product catalogue), about.html (About Us).

Quick Upload Guide (visual steps written):
1) Create a GitHub account at https://github.com (if you don't have one).
2) Create a NEW repository named exactly: yourusername.github.io
   - Click the green 'New' button on your GitHub dashboard.
   - Set repository name to yourusername.github.io (replace yourusername).
3) On the repo page, click 'Add file' → 'Upload files'.
4) Drag-and-drop the contents of this ZIP (index.html and the assets/ folder).
   - Important: upload the files inside the folder so index.html is at the repo root.
5) Scroll down and click 'Commit changes'.
6) Wait ~1 minute then visit: https://yourusername.github.io

Notes:
- PayPal is configured for SANDBOX testing (client-id=sb). To accept real payments, replace the PayPal SDK script tag in each HTML file with your live client ID:
  <script src="https://www.paypal.com/sdk/js?client-id=YOUR_LIVE_CLIENT_ID&currency=GBP"></script>

- To test PayPal sandbox payments: create sandbox buyer and seller accounts at https://developer.paypal.com and use the sandbox buyer to checkout.

- If you want, I can also prepare Netlify-ready files and a serverless function to capture orders in a Google Sheet.
