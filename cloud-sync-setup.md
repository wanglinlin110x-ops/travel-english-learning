# Cloud progress setup

The H5 keeps working with local progress when cloud sync is not configured.

## 1. Create the Supabase project

Create a Supabase project and open its SQL Editor. Run the complete contents of `supabase-schema.sql`.

## 2. Configure authentication

- Enable anonymous sign-ins.
- Keep email OTP or magic-link authentication enabled.
- Enable manual identity linking so an anonymous learner can bind an email.
- Set the Site URL to `https://wanglinlin110x-ops.github.io/travel-english-learning/`.
- Add the same GitHub Pages URL to the allowed redirect URLs.

## 3. Add the public browser configuration

Open `cloud-config.js` and fill in the Project URL and Publishable Key:

```js
window.TRAVEL_ENGLISH_CLOUD = Object.freeze({
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabasePublishableKey: "YOUR_PUBLISHABLE_KEY"
});
```

The Publishable Key is intended for browser use. Never place a `service_role` key in this project.

## 4. Verify

- Open the GitHub Pages link in a private browser window.
- The status should change from `连接中` to `已同步`.
- Complete one learning item and refresh the page.
- Bind an email, open the verification link, and confirm the same progress appears after signing in on another device.
