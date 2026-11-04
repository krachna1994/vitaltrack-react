# VitalTrack — interactive React UI

A mobile-first, interactive front-end built from the supplied **VitalTrack Figma/PDF UX design**. It reproduces the white-and-violet visual language, cards, bottom navigation, charts, and original fitness imagery found in the PDF.

## 1. Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) **20.19+ or 22.12+** (includes npm)
- A current browser such as Chrome, Edge, Firefox, or Safari

Check Node and npm in the VS Code terminal:

```bash
node --version
npm --version
```

## 2. Open the project in VS Code

1. Download and extract the `vitaltrack-react.zip` project.
2. In VS Code, go to **File → Open Folder** and select the extracted `vitaltrack-react` folder.
3. Open **Terminal → New Terminal**.

## 3. Install dependencies and run

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser. The Vite terminal also prints a local URL. For a mobile-like preview, open Chrome DevTools (`F12`), enable **Toggle device toolbar** (`Ctrl+Shift+M` / `Cmd+Shift+M`) and choose an iPhone-style viewport such as `390 × 844`.

The app automatically reloads as you edit `.jsx` or `.css` files.

## 4. Explore the interactions

1. **Welcome → Get Started → Sign Up.** Enter any valid-looking email and a password of at least six characters. This is a **front-end simulation**; no credentials are sent or stored.
2. Complete the **seven onboarding questions**: gender, goal, focus area (multiple selections), height (cm/ft), birth year, weight (kg/lb), and goal weight.
3. Explore **Dashboard** statistics, activity bars, next workouts, and challenges.
4. Tap **Workout** in the bottom navigation, switch filter tabs, open a workout, start it, play/pause the demo timer, switch exercises, and finish to earn sample points.
5. Tap **Challenge**, claim demo challenges, and browse **gift cards**. Gift redemption deducts sample points, but does not issue actual cards.
6. In **Account**, visit **Wearable device**, **Connect with phone**, and **Health measurements**. Pairing and health readings are *simulated*.
7. Use **Account → Reset prototype** to clear all saved demo data and restart.

State such as the onboarding profile, points, rewards and current page is saved to the browser's **localStorage**. It is not synced to an online account.

## 5. Project structure

```text
vitaltrack-react/
├── .vscode/
│   ├── extensions.json
│   └── launch.json
├── public/
│   └── images/               # Optimized photos extracted from the UX PDF
├── src/
│   ├── App.jsx               # All interactive screens, state and navigation
│   ├── data.js               # Workout, rewards, sample chart data
│   ├── main.jsx              # React entry point
│   └── styles.css            # Responsive styles and reference visual system
├── extract_assets.py         # Optional: re-extract photos from the original PDF
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 6. Where to edit things

| Change | File |
| --- | --- |
| Colors, spacing, typography, phone frame | `src/styles.css` (`:root` and related sections) |
| Welcome / authentication / onboarding | `src/App.jsx` (`Welcome`, `Auth`, `OnboardingStep`) |
| Dashboard and activity bar charts | `src/App.jsx` (`Dashboard`, `BarGraph`, `Activities`) |
| Bottom tab bar | `src/App.jsx` (`TabNav`) |
| Workout data and exercise names | `src/data.js` (`WORKOUTS`, `EXERCISES`) |
| Reward values, challenge and gift card definitions | `src/data.js` (`CHALLENGES`, `GIFT_CARDS`) |
| Device connection and mock vitals | `src/App.jsx` (`DeviceConnect`, `VitalsMenu`, `VitalDetail`) |
| Photos | `public/images/*.webp` |

## 7. Production build

```bash
npm run build
npm run preview
```

The deployable static website is created under `dist/`. You can deploy that directory to static hosting (e.g., Netlify, Cloudflare Pages or Vercel).

## 8. What's implemented and what's still a prototype

**Implemented:** responsive React UI, page navigation, input validation, seven-step onboarding, configurable units, BMI estimate, workout timers and completion, progress updates, mock reward collection and redemption, gift card search/sorting, activity chart tabs, device-connected UI state, sample health charts and localStorage persistence.

**Not implemented:** real authentication, cloud data storage, actual exercise tracking, Bluetooth pairing, Apple Health / Health Connect integration, medical device feeds, verified reward eligibility, payment processing, or real gift card issuance. You'll need a secure backend and appropriate platform/device APIs for these. Do not use mock health readings for medical decisions.

**Design-to-implementation notes:** This code is an interactive adaptation, not an exact frame-by-frame Figma export. The original design was mobile-sized; on a desktop browser it appears inside a phone-sized panel. Some sample descriptions and the final exercise steps are filled in to make the flow usable; original wording and images are retained where practical. All extracted photo assets are packaged locally; there are no remote image dependencies. Fonts use Google Fonts when available and system fallbacks otherwise.

## 9. Troubleshooting

- If `npm` is not recognized, install Node.js and reopen the VS Code terminal.
- If port 5173 is in use, Vite may choose 5174: use the actual URL printed in the terminal.
- If the app looks blank, make sure you ran `npm install` and opened the URL served by `npm run dev`, not the `index.html` file directly.
- To reset localStorage: **Account → Reset prototype**, or clear the site data in your browser.
