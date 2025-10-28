# 🧭 New Feature Specification — Metronome Page

## Overview

This document describes new feature requirements for the **Metronome** page in **TheTritone.com** web app.  
The goal is to enhance user interaction with a **Drone Note** selector and **keyboard controls** for improved usability.

---

## 🧩 Feature Details

### **1. Drone Note Dropdown**

- **Purpose:** Allow users to select a sustained reference tone (Drone) that plays along with the metronome.  
- **Behavior:**
  - Dropdown includes **chromatic notes for one octave starting from A220 (A3)**.
  - Fixed values — **no user input**, only selection from predefined options.
- **Dropdown Values:**
  ```
  A220, A#233, B247, C262, C#277, D294, D#311, E330, F349, F#370, G392, G#415
  ```
- **Default Selection:** `A220`
- **Position:** Next to or below the tempo control on the Metronome page.
- **Audio:** When activated, the drone plays continuously until stopped.

---

### **2. On-Page Description + Keybindings**

- **Add a short user guide or info box** at the top or bottom of the Metronome widget.  
- **Content Example:**
  ```
  🎵 Metronome Controls:
  - Click or drag the tempo dial to set BPM.
  - Select a Drone note from the dropdown to play a reference pitch.
  - Press [Enter] to start or stop both the metronome and drone.
  ```
- **Style:**  
  - Match current theme (`bg-gray-900`, `text-green-400`, `font-mono`).  
  - Use a subtle rounded container or card with `p-3` padding and small font.

---

### **3. Keyboard Interaction (Enter Key)**

- **Functionality:**
  - When the Metronome page is focused, pressing the **Enter key** toggles:
    - Start/Stop **metronome**.
    - Start/Stop **drone note**.
- **Conditions:**
  - If metronome or drone are already playing → stop both.
  - If both are stopped → start both simultaneously.
- **Implementation Note:**
  - Attach a `keydown` listener on the component mount.
  - Clean up the listener on unmount to prevent leaks.

---

## ⚙️ Technical Notes

- **Language:** JavaScript (no TypeScript)
- **Framework:** React + Vite
- **Styling:** TailwindCSS
- **Icons:** MUI
- **No refactors or style changes** to existing Metronome layout unless required for new elements.
- **Integration:** Drone audio can reuse or extend existing audio context logic from the metronome.

---

## ✅ Acceptance Criteria

1. Dropdown appears and allows selection of notes A220–G#415.  
2. Description box with keybindings is visible and styled according to the current theme.  
3. Pressing **Enter** starts/stops both metronome and drone.  
4. No regression or layout changes from existing design.
