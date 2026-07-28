# QueensMonie Sales Dashboard — Agent Context

## Mission

Build the QueensMonie Sales Dashboard from the provided Figma designs in this Vite + React + TypeScript workspace. This is the standalone QueensMonie project; do not reference or modify the legacy TGIPay Merchant Portal workspace.

## Project baseline

- App: `queensmonie-sales-dashboard`
- Stack: React 19, TypeScript, Vite, Tailwind CSS 4, Oxlint
- Entry structure: `src/app/`
- Components: `src/components/`
- Assets: `src/assets/`
- Figma source: [QueensMoni](https://www.figma.com/design/8fhwKaF3z2afR8w72P903o/QueensMoni?node-id=5512-28983)

## Current implementation

- Login route: `src/app/login/page.tsx`
- Login form: `src/components/auth/LoginForm.tsx`
- Auth layout: `src/components/layout/AuthShell.tsx`
- Login copy: `src/constants/login.ts`
- Auth types: `src/types/auth.ts`

The login screen is the first implemented surface. The Sales Dashboard is the next major surface.

## Design direction

- Brand: QueensMonie / Queens Monie.
- Primary brand color: use the existing `--qm-brand`/`qm-brand` token rather than scattering red literals.
- The Sales Dashboard desktop reference is a 1440×1024 artboard.
- Dashboard navigation includes Summary, Accounts Opened, Balance Movements, and KPI & Performance.
- Dashboard content includes relationship-manager profile information and banking/product summary tables.
- Prefer the supplied QueensMonie logo and imagery from `src/assets/`; do not recreate brand assets.

## Font rules

- Put the downloaded app font files in `src/assets/fonts/`.
- Keep the license file in the same directory as the font files.
- Add `@font-face` declarations in the global stylesheet or a clearly named font stylesheet, using the correct font weights and styles.
- Use the supplied font as the app default only after confirming its family name from the font metadata or filename.
- Do not download fonts from the internet or replace a supplied font with a guessed substitute.
- Do not add generated font files to source control if they are not part of the supplied design handoff.

## Implementation rules

- Inspect the existing route/component structure before creating new abstractions.
- Keep page composition in route/page files and reusable UI in `src/components/`.
- Use semantic HTML and accessible labels for form controls, tables, and icon-only buttons.
- Keep responsive behavior intentional: verify mobile, tablet, and the 1440px desktop reference.
- Keep design tokens centralized in the existing styles/configuration instead of repeating values inline.
- Use explicit loading, empty, error, and expanded states; never present fabricated values as live data.
- Keep mock data behind a clearly named fixture/adapter so it can later be replaced by an API.
- Use the existing dependencies before adding new packages.

## Scope guards

- Work only inside this workspace: `/Users/femisilver/dev/work/queens-monie/queens-sales-dashboard`.
- Do not modify `/Users/femisilver/dev/work/tgipay/aws-tgipay-merchant-portals`.
- Do not add authentication/API behavior based only on visual designs.
- Do not commit secrets, private Figma exports, or the raw `.fig` file.
- Do not delete or overwrite user-created assets or components.
- If the Figma design is ambiguous, document the assumption or ask before choosing materially different behavior.

## Start-of-task checklist

1. Read this file and inspect the relevant page/components.
2. Check the Figma frame/state for the requested change.
3. Identify whether the task is visual, behavioral, data, or a combination.
4. Reuse existing tokens, assets, and components where appropriate.
5. Make the smallest scoped change.

## Validation checklist

- Run `npm run build` after implementation changes.
- Run `npm run lint` for changed code.
- Verify the UI at a narrow mobile width and the 1440px desktop reference.
- Check keyboard focus, labels, and accessible names.
- Compare the result with the corresponding Figma frame.
- Report changed files, assumptions, and validation results.

## Prompt template

```md
Task: <specific QueensMonie change>

Figma frame/state:
- <node link or description>

In scope:
- <files/features>

Out of scope:
- <explicit exclusions>

Acceptance criteria:
- <visual and behavioral expectations>

Validation:
- Build, lint, and mobile/desktop comparison.
```
