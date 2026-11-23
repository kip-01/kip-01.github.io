# Kiprop Haggai: portfolio website

A multi-page portfolio in plain HTML, CSS and JavaScript. No build step, no tracking, no cookies.

- `index.html`: home, with an interactive contour map, results and selected work
- `projects.html`: all seven projects and proposals, filterable (the filter is kept in the URL, for example `projects.html#proposal`)
- `projects/*.html`: one page per project (JEEP, Resilient Nursery Schools, Kujenga Amani Pamoja, K4RC, Mseto, Joytown, TerraOre)
- `about.html`: experience timeline, skills explorer, credentials, writing
- `contact.html`: email and how I can help

Design file (colour variables and the Home, Projects and Project-detail layouts): https://www.figma.com/design/sWU8Nzq0R0XL7xNmAdtJb6

## Moving between pages

- Cross-document View Transitions: pages fade and slide into each other, and a project's image morphs from its card into the project page (Chrome, Edge and Safari 18.2+; other browsers simply navigate).
- Hover and touch prefetching, plus speculation rules, so pages open almost instantly.
- Sticky navigation with the current page marked, breadcrumbs, previous and next project, and the left and right arrow keys on project pages.

## Publish free on GitHub Pages

1. Settings > Pages.
2. Under **Build and deployment**, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
3. Wait one to two minutes, then open https://kip-01.github.io.

GitHub Free supports Pages on public repositories. Pages is for personal and project sites, not for running a business or taking payments.

## Editing

- Project pages are static HTML. To change a project's text, edit its file in `projects/`.
- Photos live in `assets/img/`. Only add photos of people who have agreed to appear on a public site.
- Colours and type are variables at the top of `assets/css/site.css`.
- Budgets, phone numbers and individuals' details from the source proposals are left out on purpose.
