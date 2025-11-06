// main.js — Badge.js
// Firebase-based Badge utility module

import {
  initializeApp,
  getApps,
  getApp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {
  getFirestore as _getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

import {
  getDatabase as _getDatabase
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import {
  getAuth as _getAuth
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

console.log("Badge.js v0.1.0");

// --- Firebase Initialization ---
let app;
let db;
let rtdb;
let auth;

/**
 * Initialize or reuse an existing Firebase app.
 * @param {object} configuration - Firebase configuration object.
 * @param {boolean} existingFirebaseScript - If true, assumes Firebase already initialized.
 */
export function initFirebase(configuration, existingFirebaseScript = false) {
  if (getApps().length > 0) {
    app = getApp();
    console.info("ℹ️ Using existing Firebase app:", app.name);
  } else if (!existingFirebaseScript) {
    app = initializeApp(configuration);
    console.info("✅ Initialized new Firebase app:", app.name);
  } else {
    throw new Error("Firebase script not loaded or configuration missing");
  }

  db = _getFirestore(app);
  rtdb = _getDatabase(app);
  auth = _getAuth(app);
}

/**
 * Retrieve the current Firebase app instance, if it exists.
 * @returns {import("firebase/app").FirebaseApp|null}
 */
export function getExistingFirebaseApp() {
  if (getApps().length > 0) {
    return getApp();
  }
  return null;
}

export function getDatabase() {
  if (!rtdb) throw new Error("Firebase not initialized");
  return rtdb;
}

export function getFirestore() {
  if (!db) throw new Error("Firebase not initialized");
  return db;
}

export function getAuth() {
  if (!auth) throw new Error("Firebase not initialized");
  return auth;
}

// --- Badge Utility ---
export const badge = {};

/**
 * Award a badge to a user.
 * @param {string} badgeId - The ID of the badge.
 * @param {string} uid - The user ID receiving the badge.
 */
badge.award = async function (badgeId, uid) {
  if (!db) throw new Error("Firestore not initialized");
  const badgeRef = doc(db, "badges", badgeId);
  const badgeSnap = await getDoc(badgeRef);

  let created = false;
  let alreadyAwarded = false;

  if (!badgeSnap.exists()) {
    await setDoc(badgeRef, { awards: [uid] });
    created = true;
  } else {
    const data = badgeSnap.data();
    if (Array.isArray(data.awards) && data.awards.includes(uid)) {
      alreadyAwarded = true;
    } else {
      await updateDoc(badgeRef, {
        awards: arrayUnion(uid)
      });
    }
  }

  return {
    badgeId,
    uid,
    created,
    alreadyAwarded,
    status: alreadyAwarded
      ? "already_awarded"
      : created
      ? "created_and_awarded"
      : "awarded"
  };
};

/**
 * Fetch information about a badge.
 * @param {string} badgeId - The ID of the badge.
 * @returns {Promise<Object>} Badge info object.
 */
badge.info = async function (badgeId) {
  if (!db) throw new Error("Firestore not initialized");
  const badgeRef = doc(db, "badges", badgeId);
  const badgeSnap = await getDoc(badgeRef);

  if (!badgeSnap.exists()) return null;
  return badgeSnap.data();
};
