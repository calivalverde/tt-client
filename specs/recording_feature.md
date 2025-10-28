# 🎙️ New Feature Specification — User Recording Functionality

## Overview

This document outlines the implementation of a **user audio recording feature** for **TheTritone.com** web app.  
The goal is to allow musicians to record short clips (up to 30 seconds) directly from their browser, using the built-in microphone.

---

## 🧩 Feature Details

### **1. Recording Functionality**

- **Purpose:**  
  Let the user record short audio clips for practice or self-assessment.

- **Behavior:**
  - User can start and stop a recording using a **“Record”** button.
  - Maximum duration: **30 seconds** per recording.
  - Recording automatically stops when the 30-second limit is reached.
  - After recording, the user can:
    - Play back the recorded clip.
    - Delete or re-record if desired.
  - Recordings are **not uploaded** automatically — only stored locally (in memory or temporary blob).

---

### **2. Microphone Permission**

- **Behavior:**
  - When the user clicks “Record” for the first time, the app must request **microphone access** using the browser’s **native permission dialog**.
  - Use the standard **MediaRecorder API** and **navigator.mediaDevices.getUserMedia({ audio: true })**.
  - If permission is denied, show a clear message:
    > “Microphone access is required to record audio. Please allow access in your browser settings.”

---

### **3. User Interface**

- **Buttons:**
  - 🎙️ **Record / Stop** — toggles between start and stop.
  - ▶️ **Play** — plays back the last recording.
  - 🗑️ **Delete** — clears the current recording.

- **Layout:**
  - Match the current site theme:
    - Background: `bg-gray-900`
    - Text: `text-green-400`
    - Font: `font-mono`
  - Buttons: rounded, `p-2`, glowing border when active.
  - Show a **recording timer** (`00:00 / 00:30`) while recording.

---

### **4. Implementation Notes**

- **APIs Used:**
  - `navigator.mediaDevices.getUserMedia({ audio: true })`
  - `MediaRecorder` for capturing audio
  - `URL.createObjectURL()` for local playback preview

- **Duration Enforcement:**
  - Use a `setTimeout` or `MediaRecorder.stop()` after 30 seconds.
  - Visually indicate when recording time is almost up (e.g., red text or blinking).

- **Cleanup:**
  - Stop and release the microphone stream on component unmount or stop event.

---

## ⚙️ Technical Notes

- **Language:** JavaScript (no TypeScript)
- **Framework:** React + Vite
- **Styling:** TailwindCSS
- **Icons:** MUI
- **Audio Format:** Use default browser format (usually WebM/Opus).
- **No external dependencies** required beyond React and Tailwind.

---

## ✅ Acceptance Criteria

1. App successfully requests and handles microphone permission.  
2. User can record audio for up to **30 seconds**.  
3. Audio playback works immediately after recording.  
4. Recording stops automatically at 30 seconds.  
5. User can delete and re-record.  
6. UI remains consistent with site theme and accessible.  
