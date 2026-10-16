# Amandi Chamathsara – Portfolio

A static portfolio site (HTML, CSS, JavaScript). No build step or dependencies.

## Publish on GitHub Pages

Your CV already links to `https://amandi1221.github.io/Amandi1221/`, so the repository name is `Amandi1221`.

1. Create a repository named **Amandi1221** on GitHub (or open your existing one).
2. Upload everything in this folder to the root of the repository (`index.html`, `css/`, `js/`, `assets/`).
3. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose the `main` branch and the `/ (root)` folder, then save.
4. After a minute or two the site is live at `https://amandi1221.github.io/Amandi1221/`.

## Editing

- Text and links: `index.html`
- Colours (light and dark): the `:root` and `:root[data-theme="dark"]` blocks at the top of `css/style.css`
- Your email address for the contact form: `CONTACT_EMAIL` at the top of `js/script.js`
- Logo: `assets/logo.svg` (also used as the browser tab icon; the header and footer use an inline copy in `index.html`)
- Replace the CV: `assets/cv/Amandi_Chamathsara_CV.pdf`

## Contact form (important, one-time step)

The "Get in touch" form sends messages to your Gmail through FormSubmit (free, no account needed).

1. Publish the site on GitHub Pages first (the form does not work when you open `index.html` from your computer).
2. Open your live site, fill in the form and send one test message.
3. FormSubmit emails you an **activation link** the first time. Open your Gmail (check Spam too) and click **Activate Form**.
4. After that, every message from the site arrives in your inbox. Reply to the visitor with your normal Reply button.
