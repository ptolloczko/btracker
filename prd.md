# Product Requirements Document — btracker (MVP)

## 1. Project Overview

**Product name:** btracker
**Type:** Web application (desktop)
**Goal:** Allow users to manually log blood measurements, view history, and manage records (edit, delete) — all in a single-page interface without authentication.

---

## 2. Problem Statement

People who monitor blood-related metrics (e.g., blood pressure, glucose) need a simple, fast way to log readings and review their history without the complexity of a full medical app. btracker provides a minimal, local-first tool for this purpose.

---

## 3. Scope — MVP

### In scope
- Single-page application (no routing)
- Form to add a new blood record
- List of all saved records (newest first)
- Inline edit of existing records
- Delete a record
- Data stored in browser localStorage
- Desktop layout only

### Out of scope (deferred to v2)
- User authentication / accounts
- Mobile / responsive layout
- Value range indicators (normal/high/low)
- Filtering or searching records
- Data export (CSV, PDF)
- Backend / cloud sync

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + Vite |
| Language | TypeScript |
| UI Components | ShadCN/UI |
| Styling | Tailwind CSS |
| Forms & Validation | React Hook Form + Zod |
| Persistence | localStorage (custom hook) |

---

## 5. Data Model

### BloodRecord

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string (uuid) | yes | Generated on create |
| `date` | string (ISO 8601) | yes | Date and time of measurement |
| `systolic` | number | yes | Blood pressure — upper value (mmHg) |
| `diastolic` | number | yes | Blood pressure — lower value (mmHg) |
| `heartRate` | number | no | Beats per minute |
| `glucose` | number | no | Blood glucose (mg/dL) |
| `notes` | string | no | Free-text note, max 200 chars |
| `createdAt` | string (ISO 8601) | yes | Record creation timestamp |

---

## 6. Functional Requirements

### FR-01 — Add Record
- A form is always visible at the top of the page
- Fields: date/time, systolic, diastolic, heart rate (optional), glucose (optional), notes (optional)
- Validation via Zod: required fields must not be empty, numeric fields must be positive integers
- On submit: record is saved to localStorage and appears at the top of the list
- Form resets to empty after successful submission

### FR-02 — View Records
- All records displayed as a list below the form, ordered newest first
- Each list item shows: date, systolic/diastolic, heart rate (if set), glucose (if set), notes (if set)
- Edit and Delete actions visible per row

### FR-03 — Edit Record (Inline)
- Clicking Edit on a row switches it to editable mode in place
- Fields become inputs pre-filled with current values
- Save button confirms changes and writes back to localStorage
- Cancel button reverts to read mode without saving

### FR-04 — Delete Record
- Clicking Delete on a row shows a ShadCN confirmation dialog (AlertDialog)
- Confirming removes the record from localStorage and from the list

### FR-05 — Persistence
- All records stored in localStorage under the key `btracker_records`
- Records are loaded on page load
- All mutations (add, edit, delete) immediately sync to localStorage

---

## 7. UI / UX Requirements

- Desktop layout, minimum width 1024px
- ShadCN components used throughout: `Card`, `Form`, `Input`, `Button`, `Table`, `AlertDialog`
- Form and list presented on a single page with clear visual separation
- Empty state: when no records exist, display a placeholder message ("No records yet. Add your first one above.")
- No navigation, no modals for the form — keep everything on one screen

---

## 8. Non-Functional Requirements

- Page load < 2s on localhost dev server
- No external API calls — fully offline capable
- TypeScript strict mode enabled
- No console errors or warnings in normal usage

---

## 9. Success Criteria (MVP)

| Criterion | Target |
|---|---|
| User can add a record | Form submits and record appears in list |
| User can edit a record inline | Changes persist after page reload |
| User can delete a record | Record removed from list and localStorage |
| Data survives page refresh | localStorage correctly loaded on mount |

---

## 10. Future Considerations (v2+)

- User authentication (Clerk or Supabase Auth)
- Backend database (Supabase / PlanetScale)
- Mobile-responsive layout
- Charts / trends over time
- Normal range highlighting
- CSV export
- Reminder notifications
