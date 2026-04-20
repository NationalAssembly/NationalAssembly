# CEIFT – Central Europe Interwar Freedom Timeline

A student-led international project exploring the history of freedom and democratic progress in Central Europe during the interwar period (1907–1920s).

## About the Project

**CEIFT** is a collaborative initiative between:
- **Kepler Gymnasium** (Gymnázium Jana Keplera), Prague, Czech Republic
- **Bürgerwiese Gymnasium**, Dresden, Germany

The website documents key moments of freedom and democratic development in the region, from male suffrage and women's voting rights to land reform and the formation of the Czechoslovak Republic. It serves as both an educational resource and a historical archive for students, teachers, and researchers interested in this pivotal period of European history.

## Website Structure

```
/en/       – English language versions
/de/       – German language versions
/cz/       – Czech language versions
/timeline/ – Interactive timeline component
/cursor/   – Custom cursor assets
```

## Technical Architecture

### Frontend Stack
- **Vanilla JavaScript** – No external dependencies; handles:
  - Multi-language support with automatic browser language detection
  - Dynamic content loading based on URL parameters
  - Interactive timeline with real-time synchronization via `postMessage` API
  - Responsive navigation with mobile-optimized dropdowns
  - Custom cursor selection and application (stored in `localStorage`)

### Key Features
- **Multilingual Interface** – Automatic language detection with manual override; UI strings in `translations.json`
- **Interactive Timeline** – Embedded iframe (`/timeline/timeline.html`) communicates with parent window via postMessage for height synchronization and event navigation
- **Custom Cursors** – Historical figure-themed cursors stored in `/cursor/` folders, selectable via dropdown, applied dynamically with fallback to system cursor
- **Responsive Design** – Mobile-first approach with hamburger menu for devices ≤ 768px
- **Zero External Tracking** – No cookies, no analytics; all state stored locally in browser (`localStorage`)
- **Source Citation** – Automatic parsing of footnotes from content with formatted bibliography

### File Organization
- **Content pages** – Stored in language-specific directories (`en/`, `de/`, `cz/`) as individual HTML files
- **Timeline data** – `/timeline/data.js` contains all events with multilingual metadata
- **Styling** – Unified `style.css` (no framework) for consistent appearance across languages
- **Configuration** – `cursors.json` lists available custom cursors

## Deployment

- Hosted on **GitHub Pages** – No build process required
- Static site – All content served directly as HTML/CSS/JavaScript
- Minimal latency – Leverages CDN provided by GitHub Pages

## Internationalization (i18n)

### Language Support
- **Automatic Detection** – Browser language preference (fallback: English)
- **Manual Override** – Language selector in header (URL parameter: `?lang=en|de|cz`)
- **Content Localization** – Separate HTML files per language and page
- **UI Translation** – `translations.json` contains all interface strings

Example URL structure:
```
/?lang=cz&page=home
/?lang=en&page=germany_na
```

## License

- **Code** (HTML, CSS, JavaScript): [EUPL 1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12)
- **Content** (text, historical narratives): [CC BY SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Media** (photographs, podcasts): Individual attribution required

## Project Status

⚠️ **Work in Progress** – Many content pages are incomplete or contain placeholder text. The site is under active development; some features may produce errors as content is finalized.

## Contributing

For contributions or inquiries, please refer to the project's GitHub repository.

---

**Last Updated:** April 2026