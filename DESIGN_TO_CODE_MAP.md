# VitalTrack PDF → React implementation map

| PDF page(s) | UX reference | Implementation |
| --- | --- | --- |
| 1 | Brand splash | `Brand` component / account brand |
| 2 | Welcome / Get started / Log in | `Welcome` |
| 3 | Create account | `Auth` (sign up / log in demo) |
| 4 | Gender question | `OnboardingStep` step 1 |
| 5 | Main goal | `OnboardingStep` step 2 |
| 6 | Focus area | `OnboardingStep` step 3 |
| 7 | Height selector | `OnboardingStep` step 4 |
| 8 | Birth year | `OnboardingStep` step 5 |
| 9 | Current weight and BMI | `OnboardingStep` step 6 |
| 10 | Goal weight and BMI alert | `OnboardingStep` step 7 |
| 11–12 | Dashboard, activity, cards | `Dashboard`, `StatsStrip`, `BarGraph`, `FeatureCard` |
| 13 | Workout catalog and navigation | `Workouts`, `WorkoutTile`, `TabNav` |
| 14 | Workout cover and start | `WorkoutDetail` |
| 15 | Exercise list | `WorkoutSession` (timer and exercises) |
| 16 | Activity chart and stats | `Activities` |
| 17 | Rewards and challenges | `Challenges` |
| 18 | Gift cards | `GiftCards`, `ConfirmModal` |
| 19–20 | Wearable / phone connection | `DeviceConnect` (simulated) |
| 21 | Health metrics menu | `VitalsMenu` |
| 22 | Heart rate | `VitalDetail` (heart) |
| 23 | spO₂ | `VitalDetail` (spo2) |
| 24 | Temperature | `VitalDetail` (temp) |
| 25 | Distance | `VitalDetail` (distance) |

All named components are in `src/App.jsx`. Screens, sample challenge data, and extracted image paths are in `src/data.js`. Visual styling is in `src/styles.css`.

**Approximation note:** This is a responsive React adaptation, rather than a pixel-perfect export from Figma. It includes UI-only interactions and sample data; sensor access, identity, medical accuracy, reward validation, and online gift card issuance would require additional infrastructure.
