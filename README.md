# 🏅 Badge.js

**Badge.js** is a lightweight Firebase-based utility for managing user badges — ideal for web apps, Discord bots, or gamified platforms.
It provides simple, modular ESM functions to initialize Firebase and award or retrieve badges using Firestore.

---

## 🚀 Installation

You can directly import the module from your GitHub or CDN-hosted source (ESM compatible):

```html
<script type="module">
  import { initFirebase, badge } from "https://your-domain-or-github.io/Badge.js/main.js";
</script>
```

Or, if bundling locally:

```
/your-app/
 ├── index.html
 ├── main.js
 └── firebaseConfig.js
```

---

## ⚙️ Setup

Initialize Firebase using your web app credentials:

```js
import { initFirebase } from "./main.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
initFirebase(firebaseConfig);
```

---

## 🏷️ Badge Functions

### `badge.award(badgeId, uid)`

Awards a badge to a user.
If the badge doesn’t exist, it creates a new badge document.

```js
const result = await badge.award("early-supporter", "user_abc123");
console.log(result);
/*
{
  badgeId: "early-supporter",
  uid: "user_abc123",
  created: false,
  alreadyAwarded: false,
  status: "awarded"
}
*/
```

**Firestore Structure Example:**

```
badges/
 └── early-supporter
      ├── name: "Early Supporter"
      ├── description: "Joined before v1.0!"
      └── awards: ["user_abc123", "user_xyz789"]
```

---

### `badge.info(badgeId)`

Fetches the full data of a badge.

```js
const info = await badge.info("early-supporter");
console.log(info);
// → { name: "Early Supporter", description: "Joined before v1.0!", awards: [...] }
```

---

## 🧩 API Overview

| Function                    | Description                               |
| --------------------------- | ----------------------------------------- |
| `initFirebase(config)`      | Initializes Firebase (only once)          |
| `getFirestore()`            | Returns active Firestore instance         |
| `getDatabase()`             | Returns active Realtime Database instance |
| `getAuth()`                 | Returns Firebase Auth instance            |
| `badge.award(badgeId, uid)` | Creates or updates a badge entry          |
| `badge.info(badgeId)`       | Retrieves badge details                   |

---

## 🧠 Notes

* Works with Firebase v9+ modular SDK.
* Compatible with modern browsers and bundlers (Vite, Rollup, Webpack).
* Data is stored under the Firestore collection: **`badges/`**.
* Realtime Database is initialized for future support but unused in v1.

---

## 📄 License

MIT © 2025 **SkunkPlatform**
