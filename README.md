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

## Search content and current store availability (October 22, 2026)

This task targets the existing WKosStudio website above. The owner's spoken
"Dabikus" was a voice-input error, not another studio or domain.
The owner confirmed that **Sort That Cash! has no public Steam page yet**.
Do not send wishlist buttons to Steam's home page or invent an App ID.
Until the actual listing is supplied, use the studio newsletter for release
updates and explain that the Steam page is coming soon. Earlier wishlist CTA
instructions below are superseded only where they assume a public listing.

Search research may include reasoned query hypotheses, as requested by the
owner. Label inferred demand and priority as estimates; do not invent measured
search volumes. Sort That Cash!'s primary genre is sorting / organizing /
shelf sorting; cash is its theme. Car Hero's core is vehicle survival with
automatic shooting and roguelite progression. Keep claims tied to verified
mechanics and distinguish website SEO from Google Play ASO and Steam tags.

The dated [search keyword core](docs/search-keyword-core-2026-10-22.json)
records 84 phrase variants in 16 clusters, their sources, implementation
locations and excluded intents. P1/P2 priorities and relative audience reach
are editorial hypotheses, not measured keyword volumes. Most clusters are
covered naturally in page copy; Ukrainian Sort That Cash! terms remain a
research reserve until a full Ukrainian page is requested. Do not paste the
entire core into visible keyword lists or meta keywords.

On October 22, the live Google Play description was checked for Car Hero:
regular sectors introduce their boss on a timer; marked collection nodes are
introduced in the tutorial. The website's older all-sector node-route claim
was corrected. Do not infer release availability from APK mirrors. Keep the
last owner-confirmed pre-registration state until the store or owner clearly
confirms a release for the relevant region.

Owner-confirmed game order (October 12, 2026): **Sort That Cash!** (Steam)
first, **Car Hero Survivor IO** second, and released **Dice Imprint Quest
Puzzle** third. Use this order on the home page and in the game catalogue.
Use the existing site's game cards, fonts and navigation for presentation.

Owner-confirmed catalogue presentation (October 14, 2026): every game card
uses a 2:3 cover (600 × 900 px, matching the Steam capsule). Covers and titles
link to the game's page; Dice Imprint currently links to `/games/#dice-imprint`.
Use the same `More info…` link, platform-only tag and store-button order on
every card on both home and Games. Remove release/development status tags.
Car Hero's card uses `Get it on Google Play` and the existing pre-registration
store URL. This latest card instruction supersedes the older CTA guidance
below; the game's detailed page can still explain pre-registration.
Dice Imprint's cover should have readable game-name branding and cozy pastel
puzzle artwork. Owner correction: preserve the original reference puzzle's
tile geometry, dice-face marks, pip counts and imprint sizes exactly. Do not
invent enlarged imprints or random pip patterns. Add the title plaque and
background decoration; the floating islands and vegetation are approved.
Car Hero keeps its established yellow-car/desert identity
and approved logo, recomposed to fit the shared capsule ratio.

The Car Hero capsule and Dice decoration layer were generated with the built-in
`image_gen` tool. Final covers are 600 × 900 WebP: `assets/carhero/capsule-vertical.webp` and
`assets/dice-imprint/capsule-vertical.webp`. The original Car Hero portrait
and landscape art remain available for the detailed game page. Generation
prompts and references are recorded in `docs/game-card-covers.json`.
The Dice Imprint detail section on `/games/#dice-imprint` also uses this
generated capsule as its main cover, including the mobile preview. Do not
leave the old phone screenshot in that main artwork slot.
Dice's final cover is a native composition of the original screenshot and
`assets/dice-imprint/cover-decoration.webp`. The title is confined to y=2–192
and the decorative islands to y=720–900 on the 600 × 900 canvas. The entire
original game field in y=192–720 is preserved pixel-for-pixel; final Dice
encoding uses lossless WebP. Never substitute the rejected redrawn puzzle.

Owner-confirmed cover placement: home/catalogue links use the new 2:3 capsule
with the approved game-name logo; the game page keeps the approved horizontal
cover. Gameplay screenshots belong in the gallery, not in the main cover slot.
Preserve the detailed page's composition and readable branding.
Sources: `Marketing/VerticalVideos/Covers/Working/Shorts_B2_Breakout_v001.png`
and `Marketing/YouTube/Trailer/Cover/Working/Cover_B2_Breakout_v002.png`, with
the stacked/wide Onest B v003 logos from `Marketing/Branding/Exports/Logo_v003/`.
The website uses separate artwork/logo layers with the approved placement:
portrait logo 58% wide, left 21%, top 4%; landscape logo 42% wide, left/top 6%.

Contact-button correction: document text-link styling must exclude `.button`.
Primary buttons keep dark `--ink` text on yellow in normal, hover and focus
states; check the email CTA visually as well as checking its mailto address.

Launch data disclosures and unresolved configuration checks are tracked in
[the Car Hero Data safety handoff](docs/carhero-data-safety.md). This is an audit
draft for Console coordination; it is not a submitted release declaration.

## Release facts to check before changing public claims

On October 13, 2026, the owner confirmed that Google Play pre-registration is
open. The game is still unreleased. The store destination is
`https://play.google.com/store/apps/details?id=com.wkos.car.hero.survivor.io`.
Use a pre-registration CTA and keep regional availability subject to Google
Play. Do not use a download badge before release. No fixed date or
pre-registration reward is promised.

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
