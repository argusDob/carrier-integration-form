# 🚚 Carrier Integration Form – Technical Summary

A Vue 3 + Pinia application for creating and editing carrier integrations, designed with modularity, testability, and Clean Code principles in mind.

---

## 📍 Routes Overview

The application includes two main routes for handling carrier integration forms:

| Path              | Name            | Purpose                         |
| ----------------- | --------------- | ------------------------------- |
| `/carrier/create` | `CarrierCreate` | Creates a new carrier form      |
| `/carrier/:id`    | `CarrierEdit`   | Edits an existing carrier by ID |

### 🧠 Design Assumption: Carrier Status Panel is part of the form

It is assumed that the **Carrier Status Panel** (which displays `ONBOARDING`, `ORDERING`, and `MANIFESTING` statuses) is considered an **integral part of the form**.

- Each status field has a `status` value and an `isEditable` flag.
- When `isEditable: true`, the status can be changed via a `SelectButton`.
- When `isEditable: false`, the current status is displayed as a static `Tag`.
  - If the `status` is an empty string (`""`), a placeholder `?` is shown.
- Example:
  - `onboarding.status = ""`
  - `onboarding.isEditable = false`
  - → The panel renders a `Tag` with value `?`

This logic was **not explicitly defined in the task**, but implemented based on the assumption that:

> The status panel reflects part of the persisted and editable form data (read-only or not), and changes in editable statuses should be submitted like any other form field.

### 🔁 Navigation Notes

- Navigating to `/carrier/create` will open an **empty form** pre-filled with default values.
- Navigating to `/carrier/2` (example) will **load form data** for the carrier with ID `2`.

## 🧠 Architecture Highlights

- 🔌 **API Injection via Store**  
  Uses a `.init(service)` pattern in the store to inject services → promotes testability and SOLID.

- 🧪 **Deep Diff on Submit**  
  Submits only changed fields by comparing `formData` vs `originalFormData` using lodash.

- 📦 **Clean State Management**  
  Reset, load, and submit are clearly separated in store actions.

- 📐 **Reusable Components**  
  Each logical unit of the form (e.g., `PricingOptions`, `CarrierInfoSection`) is encapsulated.

- 🔁 **Async Wrapper**  
  `AsyncStateHandler.vue` wraps loading, error, and fallback states for any async section.

- ✅ **Scoped Validation**  
  Lightweight `useFormInputValidator` composable for checking required fields.

  ## Code Style

This project uses [Prettier](https://prettier.io/) for code formatting.

To format the codebase:

---

## 📦 Tech Stack

- Vue 3 + Composition API
- Pinia (Store)
- Vite
- PrimeVue + PrimeFlex
- Lodash (deep comparison)
- SCSS

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   npm run dev


   ## ⚠️ Node Version Requirement
   ```

> This project **has been tested Node.js version `^20.19.0` or `>=22.12.0`**
