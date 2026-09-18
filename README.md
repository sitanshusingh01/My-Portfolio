# Sitanshu Singh Portfolio

A clean, responsive portfolio built for Data Analyst and Business Analyst roles. It covers my background, skills, experience, projects, resume, and contact details in one place.


Live website: [https://sitanshusingh01.github.io/My-Portfolio/](https://sitanshusingh01.github.io/My-Portfolio/)

## About Me

I am Sitanshu Singh, a Computer Science and Data Analytics undergraduate at IIT Patna. My work focuses on data cleaning, exploratory analysis, SQL reporting, KPI dashboards, and business insight communication using Python, SQL, Excel, and Power BI.

## Tech Stack

- HTML
- CSS
- JavaScript

## Features

- Hero section with clear analyst positioning
- Responsive layout for desktop, tablet, and mobile screens
- Project cards with problem, approach, impact, live links, GitHub links, and a screenshot gallery
- ATS friendly skills and experience sections
- Embedded downloadable resume PDF
- Contact form that opens a prepared email draft.
- Light and dark theme support
- GitHub Pages ready static deployment

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
├── .nojekyll
└── assets
    ├── Sitanshu_Singh_IITP.pdf
    ├── avatar.jpg
    ├── portfolio-workspace.png
    └── screenshots
        ├── food-delivery
        └── plasticnet
```

## Run Locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deployment

This portfolio is ready for GitHub Pages.

1. Push the final code to the `main` branch.
2. Confirm `index.html` is in the repository root.
3. Confirm `styles.css`, `script.js`, and `assets/` use relative paths.
4. Keep `.nojekyll` in the root so GitHub Pages serves the static files directly.
5. In GitHub, go to **Settings > Pages**.
6. Set **Source** to `main` and **Folder** to `/root`.
7. Save and verify the live site:

```text
https://sitanshusingh01.github.io/My-Portfolio/
```

## Screenshots

Project screenshots live under `assets/screenshots/`, grouped by project (`food-delivery/`, `plasticnet/`), with a full size and a thumbnail version of each image. They're wired into the "Screenshots" button on each project card, which opens a lightweight in-page lightbox (see `openLightbox` in `script.js`).

## Contact

- Email: [official.sitanshu369@gmail.com](mailto:official.sitanshu369@gmail.com)
- GitHub: [https://github.com/sitanshusingh01](https://github.com/sitanshusingh01)
- LinkedIn: [https://linkedin.com/in/sitanshusingh01](https://linkedin.com/in/sitanshusingh01)
- Portfolio: [https://sitanshusingh01.github.io/My-Portfolio/](https://sitanshusingh01.github.io/My-Portfolio/)
