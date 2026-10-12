# Car Hero Survivor IO — Data safety handoff

Audit: October 12, 2026. Package: `com.wkos.car.hero.survivor.io`.
Developer: WKos. Contact: `wkos.studio@gmail.com`.

Installation refresh requested by the owner and completed against Assets,
Packages and Library/PackageCache, including ignored files. Unity IAP is
confirmed installed; the other three plugins were not found in this checkout
at this snapshot. Recheck after any concurrent import finishes.

## Installed versus latest available versions

| SDK | Found in this checkout | Latest stable verified October 12, 2026 | Official source |
| --- | --- | --- | --- |
| Unity IAP | **5.4.4**, manifest + lock + PackageCache | **5.4.4**, registry `dist-tags.latest` | [Unity Package Registry](https://packages.unity.com/com.unity.purchasing) |
| Google Mobile Ads Unity plugin | Not found in Assets, UPM lock or PackageCache | **11.5.0**, September 3, 2026 | [Official release](https://github.com/googleads/googleads-mobile-unity/releases/tag/v11.5.0) |
| Firebase Unity SDK | Plugin not found; only game-matching configuration JSON exists | **13.17.0**, September 17, 2026 | [Official release notes](https://firebase.google.com/support/release-notes/unity) |
| Google Play Games Unity plugin | Not found in Assets, UPM lock or PackageCache | **2.3.0**, September 29, 2026 | [Official release](https://github.com/playgameservices/play-games-plugin-for-unity/releases/tag/v2.3.0) |

Downloaded archives, configured cloud projects and installed-but-unused
packages are different states from initialized release SDKs. Latest release
numbers are reference targets here; no plugin was installed or upgraded by
this website audit. AdMob's Unity plugin version must also be distinguished
from its resolved native Android SDK version.

**Status: launch planning matrix, not a submitted or verified release declaration.**
This audit reads project files and official SDK disclosures. It does not change
Play Console, Firebase, Unity services or the game. No shipped Android artifact,
network trace or operational deletion workflow was available to verify here.

## Confirmed decisions and inspected implementation

| Item | Launch decision | Inspected state |
| --- | --- | --- |
| Audience | Adults 18+ | Audience choice; IARC rating is separate. Do not infer birth-date collection. |
| Advertising | Google AdMob | No Google Mobile Ads imports, plugin/dependency files or delivery implementation found in the inspected game sources. Version and enabled ad formats remain unverified. |
| Analytics | Google Analytics for Firebase | Owner approved. `Assets/google-services.json` now exists and matches the package. Configuration alone is not an installed/initialized SDK. Current `Analytic_Installer` binds `LogAnalyticsFeature`, which prints locally. Firebase SDK version, events, consent and console settings are not verified. |
| Profile | Google Play Games, with guest fallback | `IPlayerAccountProvider` exposes name/avatar; `GuestAccountProvider` returns unsigned-in, empty name and null avatar. No Play Games integration found. No approved friends, achievements, leaderboards or cloud saves. |
| Purchases | Unity IAP → Google Play Billing | Manifest and lock confirm `com.unity.purchasing` **5.4.4**; transitive Services Core **1.18.0**. Catalog/product definitions exist. No actual store connection, receipt validation, grant/confirm or restore flow found. Cloud-commerce/D2C is not approved. |
| Local progress | Guest / local save | `PlayerPrefsGameStateProviderFeature` writes local state and settings. No WKos backend account or cloud save found. |
| Future mediation | Possible Unity LevelPlay / ironSource | Not included as active in the launch declaration. No installed version or enabled networks verified. |

Source paths are relative to the Unity project: `Packages/manifest.json`,
`Packages/packages-lock.json`, `Assets/_GameProject_/Features/Analytic_Feature/`,
`Features/GameState_Feature/`, `Features/InAppPurchases_Feature/` and
`GameFeatures/MainMenu_Feature/`. No Firebase keys or cloud configuration values
are copied into this public repository.

## How to use the matrix

`C` means collection off device; `S` means sharing under Google's form definition.
`N*` requires a verified processor/user-action exception and actual configuration.
`R?` is the conservative required draft until a functioning collection opt-out is
demonstrated; `O?` requires the game to work without supplying that type. A consent
choice for personalized ads alone does not make all advertising data optional.
Across the shipped app, combine providers by data type: one required collection
path prevents calling the entire type optional. Do not classify retained analytics
or advertising profiles as ephemeral. [Google form definitions](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).

These are **conditional launch answers when the named service is enabled**.
They are not evidence of current collection. Exclude disabled future services;
add any actual extra SDK processing found in the release artifact.

## AdMob — planned launch advertising

| Form type | C | S | Ephemeral | Required / optional | Purposes |
| --- | --- | --- | --- | --- | --- |
| Approximate location (IP-derived) | Yes | Yes | No | R? | Advertising or marketing; Analytics; Fraud prevention, security and compliance |
| App interactions (launch/taps/ad views) | Yes | Yes | No | R? | Same purposes |
| Diagnostics | Yes | Yes | No | R? | Same purposes |
| Device or other IDs (ad/app-set/other applicable IDs) | Yes | Yes | No | R? | Same purposes |

Ad-ID collection is configurable, but other identifiers may remain. Inspect the
merged manifest and actual consent/limited-ad behavior. Do not add GPS/precise
location solely because IP-derived location is used. The official disclosure
currently names version 25.5.0; that is the document's reference version, **not
the installed game version**. [Google Mobile Ads Unity disclosure](https://developers.google.com/admob/unity/privacy/play-data-disclosure).

## Google Analytics for Firebase — planned launch analytics

| Form type | C | S | Ephemeral | Required / optional | Purposes |
| --- | --- | --- | --- | --- | --- |
| Device or other IDs (app-instance ID; ad ID if enabled) | Yes | N* / Yes if advertising exports apply | No | R? until complete analytics opt-out verified | Analytics; Advertising or marketing only if used for that purpose |
| Approximate location (coarse IP-derived geography) | Yes | Same sharing condition | No for retained geography | Same collection-control condition | Analytics; advertising only if enabled |
| App interactions (sessions/screens/lifecycle) | Yes | Same sharing condition | No | Same collection-control condition | Analytics |
| Other actions (custom gameplay/upgrade events) | Yes **if implemented** | Same sharing condition | No | Same collection-control condition | Analytics |
| Purchase history (automatic purchase-event parameters) | Yes when purchase events are logged | Same sharing condition | No | Verify purchase and analytics opt-in paths together | Analytics |
| User IDs | Only if `setUserId`, Google Signals or another feature actually supplies them | Configuration-dependent | No | Verify exact feature | Analytics; add advertising only if used |

Audit automatic purchase events, not just custom events. Do not send PGS names,
email addresses or support messages as event parameters. Verify Google Signals,
Google Ads links, audience/key-event exports, Google data-sharing options and
AAID controls before deciding `S`. Firebase Analytics does not by itself establish
Firebase Authentication, Crashlytics, Cloud Messaging or Cloud Save.
[Analytics SDK disclosure](https://support.google.com/analytics/answer/11582702),
[Firebase processing overview](https://firebase.google.com/docs/android/play-data-disclosure).

## Optional Google Play Games — planned external profile

| Form type | C | S | Ephemeral | Required / optional | Purposes |
| --- | --- | --- | --- | --- | --- |
| Name (gamertag/display name) | Yes for enabled profile processing | N* for expected user-initiated profile use; verify further transfers | No | O? only with working guest path | App functionality; Account management for sign-in |
| User IDs (game-scoped player ID) | Yes | Same condition | No | O? for PGS; may become required through another SDK | App functionality; Account management |
| Diagnostics / SDK analytics data | Yes when SDK collects | Verify processor role and transfers | Do not assume ephemeral | May run independently of sign-in; inspect initialization | Analytics; App functionality where applicable |
| Avatar / profile image | Gamer identity includes avatar; inspect actual fields and transport | Do not forward to ads/analytics | Verify | Profile is optional | App functionality |

Map actual SDK analytics payloads to IDs, interactions or performance subtypes
after inspecting the chosen version. Do not check generic Photos, Contacts or
Email collection merely because a profile contains an avatar/name. Equally, do
not assume an arbitrary uploaded avatar is exempt if the game later transmits it.
No friends list, cloud saves, scores or achievements are approved in this scope.
Google permits game-data deletion through Play Games profile controls.
[Play Games SDK disclosure](https://developer.android.com/games/pgs/data-collection).

## Unity IAP 5.4.4 — review native-store versus commerce-service processing

Google Play receives payment-card details directly; the game must not collect
full card numbers. That does not exempt purchase history received by the app.
Do not apply an old pre-5.4 “IAP collects no personal data” statement.

The following is the **published 5.4+ service baseline**, conditional on the
service actually being used. It is not proof that every field is accessed by
this unfinished native-billing integration.

| Form type | C | S | Ephemeral | SDK required baseline | Purpose |
| --- | --- | --- | --- | --- | --- |
| Approximate location | Yes | No | Yes | Required | App functionality; Analytics |
| Email address | Yes | No | Yes | Required | App functionality |
| User IDs / personal identifiers | Yes | No | No | Required | App functionality; Analytics |
| Purchase history | Yes | No | No | Required | App functionality; Analytics |
| Crash logs | Yes | No | No | Required | Analytics |
| Diagnostics / Other app performance data | Yes | No | No | Required | App functionality; Analytics |
| Device or other IDs | Yes | No | No | Required | App functionality; Analytics |

[Unity IAP 5.4+ form disclosure](https://docs.unity.com/en-us/iap/privacy-and-consent/google-play-data-safety).

**Release blocker:** identify the actual enabled native SDK/cloud feature path,
initialization timing, service telemetry and any authentication dependency.
Record why a documented type does or does not apply to the selected path. Do
not turn all rows into No because D2C is not planned, or into Yes just because
the package is installed. A free game with optional purchases does not by
itself prove all IAP SDK processing is optional. Check existing-purchase queries
and initialization before using an app-level Optional answer.

Where IAP commerce services are enabled, installation/session/player identifiers,
device information and country can be involved; authentication and optional
linked analytics may add other processing. The service has no automatic in-game
deletion control; a developer-mediated request path must be established.
[Unity privacy overview and request procedure](https://docs.unity.com/en-us/iap/privacy-and-consent/overview).

## Combined launch draft and the current Console draft

| Console item | Recommendation / remaining verification |
| --- | --- |
| Any data collected/shared | **Yes for the approved launch with these SDKs.** This is a launch assumption, not a declaration for an audited release binary. |
| All collected data encrypted in transit | SDK documents support a **Yes draft**. Verify every shipped/custom endpoint and export before final Yes. |
| Account creation | **No for the current guest + existing Google-profile model.** Reassess if an app/backend/Unity commerce account is introduced. |
| Login using an account made outside the app | **Yes for the planned PGS integration**, optional with guest fallback; not implemented yet. |
| Deletion request mechanism | Published support email/Privacy provide a request entry point for WKos-held support data. Its operation and coverage for launch SDK records are unverified. **Do not finalize either Yes or No until the scope and procedure below are resolved.** |
| Candidate non-ephemeral types | Approximate location, Device or other IDs, App interactions, Diagnostics; custom gameplay adds Other actions; purchase events add Purchase history; PGS adds Name/User IDs. IAP's applicable 5.4+ service path may also require Email address, Crash logs and Other app performance data. |
| Required / optional | Default ad collection and any always-on analytics are not Optional merely because personalization can be declined. PGS profile can be Optional after guest QA. IAP default service requirements may override app-level optionality for overlapping types. |
| Independent security review / badges | No review or badge established by this work; do not claim one. |

Rows for name/profile, purchase history and performance need the actual SDK and
flow audit before submission. Do not fill unknown fields with reassuring No.
The draft Console choices received from the coordinated chat are not treated
as final or independently verified here.

## Deletion, retention and account model

There is already an entry point at
https://wkosstudio.github.io/carhero/support/ and a privacy section at
https://wkosstudio.github.io/carhero/car-hero-survivor-io-privacy/.
An extra account-deletion page would currently imply a WKos account that does
not exist. Reuse support for data requests. External Google-account deletion
belongs to Google; never promise to delete the user's whole Google account.

| Data holder | Current / available action | What launch still needs |
| --- | --- | --- |
| Device/local guest progress | Android Clear storage removes local app state. Android backup must be managed separately. | Confirm actual release reset behavior. Explain that local clearing does not delete provider data. |
| WKos support mailbox | Email request for information previously sent to WKos. | Confirm monitored mailbox, identity verification proportional to the request, deletion process and lawful retention exceptions. Do not send a test email without authorization. |
| Google Play Games | User manages this game's data through their Google Play Games profile. | Add accessible provider instructions when PGS ships. Distinguish disconnect/sign-out from deletion. |
| Firebase Analytics | Provider supports user deletion keyed to an app-instance or configured user identifier. | Securely expose/associate the appropriate identifier, establish developer access, submit a test request, verify handling, and document retention/renewal settings. Clearing FID or calling reset Analytics locally is not proof of server deletion. |
| AdMob / future mediation | Provider privacy controls and applicable data-subject-request routes. | Identify controller/processor responsibility, actual partners and appropriate identifiers; verify request handling and retention in the enabled configuration. |
| IAP / store records | Google controls store/payment records; Unity service requests may require WKos forwarding. | Identify enabled service and legal record exceptions; prove the manual process before promising it. |

The current draft “deletion request: No” should not be justified solely by the
lack of an automatic backend endpoint: Google accepts discoverable email request
mechanisms. Conversely, publishing a mail link does not prove the future SDK
request can be fulfilled. Confirm the operational process and then align the
Console answer with the public policy. [Google deletion-mechanism FAQ](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).

Firebase retention duration and reset-on-new-activity are **not inspected**.
A short supported retention period and no automatic extension are proposed
defaults, not applied settings. Do not publish a specific period until verified.
Analytics app-instance deletion is distinct from deleting Firebase installations.
[GA4 user-deletion API](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/properties/submitUserDeletion),
[retention controls](https://support.google.com/analytics/answer/7667196),
[Firebase identifier distinction](https://firebase.google.com/support/privacy/manage-iids).

## LevelPlay / ironSource — future only

Do not add it to current Console answers merely to leave room for future use.
If activated later, the baseline includes shared approximate location, ad
interaction/Other actions and IDs; Diagnostics is collected, with no sharing
listed in that SDK table. Its listed purposes are advertising, analytics and
fraud/security/compliance; the listed collection is required and non-ephemeral.
Enabled network adapters each require their own audit and privacy disclosures.
[ironSource form disclosure](https://docs.unity.com/en-us/grow/is-ads/legal-resources/google-data-safety-questionnaire).

## Public-document review and submission handoff

- Privacy names the game/WKos and separates current implementation, launch plans
  and future mediation. It includes contact, purposes, provider links, rights,
  retention/deletion, local clearing and international processing.
- Analytics wording has been updated for automatic purchase events and optional
  ad IDs / advertising exports. IAP wording now covers applicable 5.4+ service
  processing without incorrectly limiting it to a future D2C-only feature.
- Terms retain guest/local-save limitations, planned billing, no current
  subscriptions and applicable consumer rights. No confirmed defect requires
  changing those terms in this audit.
- Support remains the request entry point, with clear boundaries between local
  data, WKos-held communications and independent provider records.
- Finalize SDK versions and effective features, audit the release AAB's merged
  manifest/dependencies/network flows, test consent denial/withdrawal and guest
  behavior, establish deletion handling, verify retention, then reconcile all
  per-type Console answers with the published policy and in-game notices.

No Console submission or legal agreement was accepted by this audit. The game
is unreleased. Website deployment succeeded, but direct `github.io` HTTPS
verification from this environment has timed out; keep that limitation separate
from GitHub's successful deployment status.
