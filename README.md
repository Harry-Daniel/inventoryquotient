# Inventory Quotient

A mobile inventory management app built with Expo and React Native. Sign in, browse your stock, add and edit items with photos, and keep a personal restock list of things that are running low.

## Features

- **Accounts** – sign up, sign in, and stay signed in with JWT access/refresh tokens
- **Inventory list** – browse items with their quantity, storage location, and image
- **Add & edit items** – create or update items, including a photo from the device gallery
- **Restock list** – flag items from their detail page and review them all in one place
- **Profile** – view and edit your profile details and picture
- **Offline awareness** – checks network status before fetching data

## Tech Stack

- [Expo](https://expo.dev/) (SDK 54) with [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Zod](https://zod.dev/) for form validation
- AsyncStorage for tokens and the local restock list

## Backend

The app talks to a separate REST API (Djoser-style JWT auth) that exposes:

| Endpoint                   | Purpose                      |
| -------------------------- | ---------------------------- |
| `POST /auth/users/`        | Register                     |
| `POST /auth/jwt/create/`   | Sign in (get tokens)         |
| `POST /auth/jwt/refresh/`  | Refresh the access token     |
| `GET/PATCH /auth/users/me/`| Current user profile         |
| `/inventory/items/`        | List, create, update items   |

The API base URL is set in [`constants.js`](constants.js). To run against your own backend, change `URL` there (commented examples are included for a local server on a physical device or the Android emulator).

## Getting Started

**Prerequisites:** Node.js and npm, plus either the [Expo Go](https://expo.dev/go) app on your phone or an Android/iOS emulator.

```bash
git clone https://github.com/Harry-Daniel/inventoryquotient.git
cd inventoryquotient
npm install
npx expo start
```

Then scan the QR code with Expo Go, or press `a` (Android) / `i` (iOS) to open an emulator.

## Project Structure

```
app/
  auth/            Sign-in and sign-up screens
  (protected)/     Screens that require login: home, item detail,
                   add/edit item, profile, edit profile, restock list
components/        Reusable UI (inventory cards, nav bar, profile menu, ...)
store/             Zustand stores (auth, inventory data, profile)
utility/apiFetch.js  Authenticated fetch with automatic token refresh
constants.js       API base URL and image assets
```

## License

[MIT](LICENSE) © Mawuko Senyo Hayibor
