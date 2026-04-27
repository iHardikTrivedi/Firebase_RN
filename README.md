# 📱 Firebase_RN

A **React Native mobile application** using **Firebase Authentication** and **Firebase Realtime Database**, built with **TypeScript** and **Redux Toolkit**.
Supports **Android & iOS** with a clean, production-ready architecture.

🔗 **Repository:** https://github.com/iHardikTrivedi/Firebase_RN

---

## 🚀 Features

- 🔐 Firebase Authentication (Email / Password)
- 📝 Signup with user profile creation
- 🔑 Login with clean, user-friendly error handling
- 📋 Dashboard showing list of users (excluding logged-in user)
- 🔄 Pull-to-refresh user list
- 🧠 Centralized error mapping (no Firebase codes shown)
- 🗂 Redux Toolkit for state management
- 📦 Android APK ready for testing

---

## 🛠 Tech Stack

- React Native
- TypeScript
- Firebase Authentication
- Firebase Realtime Database
- Redux Toolkit
- Android Gradle
- Xcode (iOS)

---

## 📂 Project Structure

<img width="987" height="886" alt="Screenshot 2026-01-20 at 13 13 52" src="https://github.com/user-attachments/assets/b8a5d489-a90a-49c4-bc86-3c9f3ac4f140" />

---

## 🔐 Firebase Configuration

To run the project locally, a Firebase project is required.

Steps:

- Create a Firebase project
- Enable Email/Password Authentication
- Enable Realtime Database
- Add Android and iOS apps in Firebase Console
- Download and add Firebase configuration files to the respective platforms
- User data is stored in Firebase Realtime Database under a users node, using Firebase UID as the key.

---

## ▶️ Running the Application

- Install dependencies using npm.
- Start the Metro bundler before running the application.
- Run the app on Android or iOS using the React Native CLI.

---

## 📦 Android APK Testing

A release APK has been generated for testing purposes.

Testers can install the app by:

- Scanning the provided QR code
- Downloading the APK file
- Allowing installation from unknown sources when prompted
- Installing and launching the app

No Play Store account is required for testing.

---

## ⚠️ Error Handling

All Firebase errors are mapped to clear, user-friendly messages.

Examples:

- Invalid credentials → Invalid email or password
- Email already registered → This email is already registered
- Network issues → Please check your internet connection
- Permission issues → You do not have permission to perform this action

Firebase error codes are never shown to end users.

---

## 🧪 Testing Checklist

- Signup successfully creates a user in Firebase
- Login works with valid credentials
- Logged-in user is excluded from dashboard list
- Pull-to-refresh reloads user list
- Empty, loading, and error states are handled correctly

---

## Code Coverage wiht Jest Unit testing

<img width="1881" height="1162" alt="Screenshot 2026-01-21 at 12 26 40" src="https://github.com/user-attachments/assets/0a5ffdb4-52e2-4bf0-851a-e5f109ea76ec" />

---

## 🧹 Customizations

- Default Android splash screen removed
- Firebase raw error messages hidden
- Production-ready UI states implemented
- Stable Android build configuration used

---

👨‍💻 Author

Hardik Trivedi
Senior Mobile Engineer | iOS Specialist with React Native Expertise
