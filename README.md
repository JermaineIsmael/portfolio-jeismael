# Senior Software Engineer Portfolio

A fast, dependency-free portfolio for a senior software engineer working across enterprise software, Azure, cloud architecture, and applied AI. It is built with semantic HTML, CSS, and vanilla JavaScript so it can be hosted as a static site anywhere.

## Folder structure

```text
index.html
css/styles.css
js/script.js
resume/resume.pdf       # Add your real PDF here
assets/profile/         # Add an optional profile image here
robots.txt
sitemap.xml
```

## Customize

1. Open `js/script.js` and update `portfolioConfig` if your contact details, title, location, or resume path change.
2. Edit `index.html` to refine the biography, experience, platform case studies, certifications, and architecture examples.
3. Replace the initials-based profile treatment in the hero with an `<img>` when you have a professional photo. Keep meaningful alt text.
4. Edit `css/styles.css` variables at the top to change the color system, spacing feel, radius, and maximum width.
5. Add the real PDF at `resume/resume.pdf`. The download links already point there.

The contact form currently uses a `mailto:` fallback to `jeismael1215@gmail.com`. For production, replace the form handler in `js/script.js` with a documented endpoint from a service such as Formspree, Basin, or your own backend. Never put secrets or API keys in this repository.

## Run locally

From the project directory, use any static server. For example, with Python installed:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`. Opening `index.html` directly also works for most browsing, but a local server better matches deployment behavior.

## Deploy with GitHub Pages

1. Create a GitHub repository.
2. Upload the project files, including `index.html` at the repository root.
3. In the repository, open **Settings > Pages**.
4. Choose **Deploy from a branch**, select the default branch and root folder, then save.
5. Update the canonical URL, Open Graph URL, `robots.txt`, and `sitemap.xml` with the published URL.

## Deploy with Azure Static Web Apps

Create an Azure Static Web App in the Azure portal, connect it to the GitHub repository, and choose the repository root as the app location. Leave the API location blank and use an empty output location because this project has no build step. Azure will create a GitHub Actions workflow that publishes changes automatically.

The same files can also be hosted by Netlify, Cloudflare Pages, Amazon S3/CloudFront, or any other static hosting provider.

## Content safety checklist

Before publishing, replace every bracketed placeholder, verify that achievements and metrics are accurate, add only real certifications and employers, and remove any private information. The architecture diagrams are intentionally simplified and should not expose confidential client details.
