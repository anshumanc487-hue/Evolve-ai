# EVOLVE AI — Web starter

An original, Critique AI-inspired personal development dashboard built with Next.js, React, TypeScript, and CSS.

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Currently working

- Responsive dark dashboard and 11 navigation screens
- Habit creation/completion and XP/level progression
- Workout exercise logging
- Meal/calorie logging
- Focus countdown timer
- Challenges and progress overview
- Local photo preview (no uploads)
- Browser localStorage persistence and local data deletion
- AI coach *demo* messages (not connected to an AI provider)

## Not yet production-ready

Authentication, multi-device database sync, real AI chat, vision-based meal/physique/style/posture analysis, subscriptions, social leaderboards, real progress history, and push notifications are not implemented. Do not claim they work. Local data is stored in the browser and can be cleared.

## Production architecture and next steps

1. Create Supabase project; add Auth, PostgreSQL and RLS policies (user ID scoped) for profiles, habits, habit_completions, workout_sessions, exercise_sets, meals, checkins, challenges, and subscriptions.
2. Add authenticated Next.js route handlers for all writes and reads; migrate localStorage demo data to per-user tables.
3. Add server-side AI endpoints for coaching and image analysis. Keep API credentials server-side, add usage limits, consent, validation, image retention/deletion and moderation. Nutrition/physique/posture analysis must communicate uncertainty; avoid diagnosis and appearance ratings.
4. Add Stripe Checkout, webhooks, billing portal and entitlement checks.
5. Implement optional friend requests and opt-in leaderboards with privacy controls and abuse reporting.
6. Add Playwright end-to-end tests, error monitoring, backups, accessibility testing, and deployment.

Note: Web browsers cannot universally block other installed apps. Focus timer is the supported web feature.
