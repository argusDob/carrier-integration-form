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

## 🚀 CI/CD & Deployment Flow

This project uses **GitHub Actions** with a Git Flow branching strategy.

### Branch Strategy

- **develop** → Integration branch (receives merges from feature branches)
- **staging** → QA branch (triggers preview deployment)
- **main** → Production branch (triggers production deployment)

---

### Workflows

#### 1. `ci.yml` — Continuous Integration

**Trigger:** Pull Requests to `develop`, `staging`, or `main`  
**What it does:**

- Installs dependencies and verifies the project builds successfully
- (Optional) Runs lint checks and unit tests

**Purpose:** Prevents broken code from entering key branches.

---

#### 2. `deploy-preview.yml` — Preview Deployment (Staging & PRs)

**Trigger:** Push to the `staging` branch or any Pull Request.  
**What it does:**

- Builds the app with:
  - `VITE_BASE=./` → ensures assets load correctly from subpaths
  - `VITE_FORCE_HASH=1` → enables Vue Router hash mode to avoid 404s
- Generates `404.html` (SPA fallback)
- Deploys to GitHub Pages under the `github-pages` environment
- Prints a **Preview URL** in the workflow logs

**Where to find the Preview URL:**

- **Actions tab** → open the run → `deploy` job → “Print preview URL”
- **Settings → Environments → github-pages** → Recent deployments → _View deployment_

---

#### 3. `deploy-production.yml` — Production Deployment

**Trigger:** Push to the `main` branch  
**What it does:**

- Builds the app with:
  - `VITE_BASE=/carrier-integration-form/` → correct subpath for the production site
  - `VITE_FORCE_HASH=0` → enables history mode (clean URLs)
- Generates `404.html` (SPA fallback)
- Deploys to the live GitHub Pages site

**Production URL:**

### Development Flow

1. **Feature development:**
   - Create a `feature/my-feature` branch
   - Open a PR → `develop` → CI checks run
2. **QA:**
   - Open PR `develop` → `staging`
   - After merge → preview deployment is available for testing
3. **Release:**
   - Open PR `staging` → `main`
   - After merge → production deployment & GitHub Release (via `release-please`)

---

### Release Management

This project uses [`release-please`](https://github.com/google-github-actions/release-please-action) for automated:

- **Semantic version bump**
- **Git tag** (e.g. `v1.0.0`)
- **GitHub Release** with generated changelog
