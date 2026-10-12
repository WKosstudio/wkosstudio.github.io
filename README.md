# WKos website

Canonical site: https://wkosstudio.github.io/.

This repository is the editable static website. The current home page, game
catalogue and game pages are authored directly in HTML, CSS and JavaScript.
There is no package manager, source compilation or build command. Some older
legal pages and files under `assets/entries`, `assets/chunks` and `assets/static`
are Webstudio exports. Do not edit those generated bundles to change page text.

GitHub Pages is configured to publish `main` from the repository root. The
existing `.github/workflows/static.yml` also deploys the root on pushes to
`main`. Keep this existing hosting configuration unless a hosting change is
explicitly requested. A push alone does not confirm publication: inspect the
Pages deployment and fetch the public pages afterwards.

For local preview, run `python3 -m http.server 8765 --bind 127.0.0.1` here.

## Car Hero Survivor IO

- EN game: `/games/car-hero-survivor-io/`
- UK game: `/games/car-hero-survivor-io/uk/`
- Privacy: `/carhero/car-hero-survivor-io-privacy/`
- Terms: `/carhero/car-hero-survivor-io-terms/`
- Support: `/carhero/support/`

Use the existing legal URLs: they are already referenced by the studio site.
The Car Hero pages use `assets/site.css` and `assets/carhero.css`. They need no
JavaScript and install no analytics or advertising trackers. EN/UK translations
are separate static pages with canonical and hreflang links. Legal text is EN;
support includes Ukrainian instructions.

Approved source art was read from the game's read-only marketing directory:
`Marketing/Android/GooglePlay/`. Icon B BoldMobile v003 and feature graphics /
seven ordered screenshots per locale from `Screenshots/Uploads/2026-10-12_v002`
are preserved in web formats under `assets/carhero/`. Full screenshots use WebP;
540 × 960 thumbnails reduce initial loading. No artwork was regenerated.

Public studio brand: **WKos**. Support: **wkos.studio@gmail.com**.

Owner-confirmed game order (October 12, 2026): **Sort That Cash!** (Steam)
first, **Car Hero Survivor IO** second, and released **Dice Imprint Quest
Puzzle** third. Use this order on the home page and in the game catalogue.
Use the existing site's game cards, fonts and navigation for presentation.

Owner-confirmed cover placement: use the approved vertical marketing cover
with the approved game-name logo for the home/catalogue links, and the approved
horizontal cover on the game page. Gameplay screenshots belong in the gallery,
not in the main cover slot. Preserve both compositions and readable branding.
Sources: `Marketing/VerticalVideos/Covers/Working/Shorts_B2_Breakout_v001.png`
and `Marketing/YouTube/Trailer/Cover/Working/Cover_B2_Breakout_v002.png`, with
the stacked/wide Onest B v003 logos from `Marketing/Branding/Exports/Logo_v003/`.
The website uses separate artwork/logo layers with the approved v008 placement:
portrait logo 58% wide, left 21%, top 4%; landscape logo 42% wide, left/top 6%.

Contact-button correction: document text-link styling must exclude `.button`.
Primary buttons keep dark `--ink` text on yellow in normal, hover and focus
states; check the email CTA visually as well as checking its mailto address.

Launch data disclosures and unresolved configuration checks are tracked in
[the Car Hero Data safety handoff](docs/carhero-data-safety.md). This is an audit
draft for Console coordination; it is not a submitted release declaration.

## Release facts to check before changing public claims

As of October 12, 2026, the game is unreleased. The store destination is
`https://play.google.com/store/apps/details?id=com.wkos.car.hero.survivor.io`.
The website says pre-registration is being prepared until the public campaign
is confirmed. Do not use a download badge or announce a live campaign based
only on a Console draft. No fixed date or pre-registration reward is promised.

The owner approved planned Google AdMob ads, Firebase Analytics and in-app
purchases in this website chat. The coordinated launch decisions also include
an adult 18+ target audience and Google Play Games profile sign-in with guest
fallback. Audience choice is not the IARC rating. LevelPlay / ironSource is a
possible future integration, not an active provider. Current inspected code
uses local PlayerPrefs, local logging analytics and unfinished billing / ads.
PGS, remote analytics and ad delivery are not implemented in the inspected
pre-release code. Installed SDK packages alone do not prove collection.

Before launch, reconcile the Privacy Policy, in-game notices / consent, Google
Play Data safety and actual shipped SDK configuration. Verify actual Firebase
retention and event configuration, enabled ad networks, privacy controls and
billing flow, including the actual IAP 5.4+ native-store versus cloud-commerce initialization and related identifier processing. Do not claim cloud save, friends, multiplayer, achievements,
leaderboards or a separate WKos account without implementation and approval.
The website privacy text distinguishes present and planned practices. Naming
future mediation does not authorize undisclosed providers or new purposes.

Policies are based on the official Google AdMob, Firebase, Google Play Games,
Unity IAP / ironSource disclosures linked in the public Privacy Policy.
Preserve all other games and their legal pages when making Car Hero changes.
