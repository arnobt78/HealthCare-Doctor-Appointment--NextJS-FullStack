# HealthCare--NextJS

![Screenshot 2024-10-03 at 17 46 26](https://github.com/user-attachments/assets/cbf4b819-b692-4a40-b422-12638e169e9d) ![Screenshot 2024-10-03 at 18 46 10](https://github.com/user-attachments/assets/751efebd-2026-43bc-a18a-5aaab140228e) ![Screenshot 2024-10-03 at 18 46 23](https://github.com/user-attachments/assets/5498ff6f-91cd-403d-9806-3c4734106bed) ![Screenshot 2024-10-03 at 18 46 38](https://github.com/user-attachments/assets/b86553f6-a70b-446b-a40f-c1c17607d9de) ![Screenshot 2024-10-03 at 18 48 59](https://github.com/user-attachments/assets/46be502e-8f95-40eb-9009-83f3c1a09bcb) ![Screenshot 2024-10-03 at 18 49 57](https://github.com/user-attachments/assets/f07f1475-1038-485d-9e9d-01c5f17451ad) ![Screenshot 2024-10-03 at 18 56 32](https://github.com/user-attachments/assets/47b5d698-56b3-4f73-b8b5-d0c1636f1432) ![Screenshot 2024-10-04 at 03 55 09](https://github.com/user-attachments/assets/205cf346-88cd-42e2-9a4c-476cc09a3b71) ![Screenshot 2024-10-03 at 20 33 18](https://github.com/user-attachments/assets/45dcb2ed-30f0-4871-b6cc-647799541fe9) ![Screenshot 2024-10-03 at 20 33 49](https://github.com/user-attachments/assets/67e31616-959e-4cf3-9f8c-63717ef14b72)

HealthCare is a full-stack healthcare patient management application designed for clinics and hospitals. Built using Next.js and TypeScript, it streamlines patient registration, appointment scheduling, admin management, notifications, and file uploads—all with a modern, responsive UI.

**Live Demo:** https://healthcare-arnob.vercel.app/

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Environment Variables](#environment-variables)
  - [Appwrite Setup](#appwrite-setup)
  - [Twilio Setup](#twilio-setup)
  - [Sentry Setup](#sentry-setup)
- [Functional Walkthrough](#functional-walkthrough)
- [Code Examples](#code-examples)
- [Troubleshooting & Resources](#troubleshooting--resources)
- [Keywords](#keywords)

---

## Project Overview

**HealthCare--NextJS** enables clinics to manage patient data, appointments, and notifications efficiently. It provides:

- User registration and authentication
- Patient profiles and medical details
- Doctor and appointment management
- Admin dashboard for appointment control
- Automated SMS notifications via Twilio
- File storage using Appwrite
- Performance/error monitoring with Sentry
- Responsive design for all devices

---

## Key Features

- **Patient Registration:** Users can sign up and create detailed profiles.
- **Appointment Booking:** Patients easily schedule appointments with doctors.
- **Admin Dashboard:** Admins manage, confirm, schedule, or cancel appointments.
- **SMS Notifications:** Patients receive SMS confirmations for appointments.
- **File Upload:** Secure upload and storage of files (e.g., patient docs) via Appwrite.
- **Performance Monitoring:** Integrated Sentry for tracking errors and performance.
- **Responsive UI:** Fully responsive for desktop, tablet, and mobile.
- **Form Validation:** Robust validation with Zod.
- **Modern UI:** Built with Shadcn-UI and TailwindCSS.

---

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, TailwindCSS, Shadcn-UI
- **Backend/Services:** Appwrite (Database + Storage), Twilio (SMS), Sentry (Monitoring)
- **Validation:** Zod
- **Utilities:** clsx, tailwind-merge

---

## Project Structure

```
/app                # Next.js app directory (pages, components, layouts)
  /globals.css      # Global styles
/components         # Reusable UI components
/constants          # Constant values, enums, lists (e.g., doctors, status icons)
/lib                # Utility functions (e.g., date formatting, encryption, validation)
/types              # TypeScript type and interface definitions
/public/assets      # Static images, icons, backgrounds
```

**Example File Structure:**
- `tailwind.config.ts` - TailwindCSS configuration
- `types/index.d.ts` - TypeScript types for forms and models
- `lib/utils.ts` - Utility functions (formatting, encryption, etc.)
- `lib/validation.ts` - Zod validation schemas
- `constants/index.ts` - App constants (doctor list, identification types, etc.)

---

## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arnobt78/HealthCare--NextJS.git
   cd HealthCare--NextJS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Visit http://localhost:3000 to view the app.

### Environment Variables

Create a `.env.local` file in your project root and add:
```env
# APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_DATABASE_ID=
NEXT_PUBLIC_PATIENT_COLLECTION_ID=
NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=123123
```
> Replace the placeholder values with your actual Appwrite credentials.

### Appwrite Setup

1. **Sign up at [Appwrite](https://appwrite.io/).**
2. **Create a project** and note the Project ID and API Key.
3. **Create a database** (e.g., `patient-db`) with three collections:
   - `patient`
   - `doctor`
   - `appointment`
4. **Attributes for `patient`:**
   - `email` (Required)
   - `phone` (Required)
   - `irerId` (Required)
   - `name` (Required)
   - `privacyConsent` (Boolean, Required)
   - `gender` (Enum)
   - `birthDate`, `address`, `occupation`, `emergencyContactName`, `emergencyContactNumber`, `primaryPhysician`, `insuranceProvider`, `insurancePolicyNumber`, `allergies`, `currentMedication`, `familyMedicalHistory`, `pastMedicalHistory`, `identificationType`, `identificationNumber`, `identificationDocument`
5. **Attributes for `appointment`:**
   - Relationship: Many-to-One with `patient`
   - `schedule` (Datetime, Required)
   - `reason` (String, Required)
   - `note`, `primaryPhysician` (String, Required), `status`, `cancellationReason`

> See [Appwrite Docs](https://appwrite.io/docs) for full details.

### Twilio Setup

1. **Sign up at [Twilio](https://www.twilio.com/).**
2. Get your **Account SID, Auth token, and Sender number**.
3. Add these to your Appwrite project's Messaging > Twilio integration.
4. For Appwrite + Twilio docs, see: [Appwrite Messaging & Twilio](https://appwrite.io/docs/products/messaging/twilio)

### Sentry Setup

For error and performance monitoring:
- [Sentry Official Docs](https://sentry.io/welcome/)

---

## Functional Walkthrough

1. **Register as a Patient:**  
   New users can register, fill out medical and contact details, and consent to privacy policies.

2. **Book Appointments:**  
   Patients can view available doctors, select time slots, and provide the reason for their visit. Multiple appointments can be managed.

3. **Admin Panel:**  
   Admins can:
   - View all appointments
   - Confirm or schedule appointments
   - Cancel appointments (with SMS notifications)
   - Manage patient records and uploaded documents

4. **Notifications:**  
   - Patients receive SMS notifications on successful appointment confirmation.

5. **Performance and Error Tracking:**  
   - Sentry integration monitors errors and performance bottlenecks.

6. **File Upload:**  
   - Users can upload documents (e.g., insurance, ID) securely.

---

## Code Examples

<details>
<summary><code>tailwind.config.ts</code></summary>

```typescript
import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        green: { 500: "#24AE7C", 600: "#0D2A1F" },
        blue: { 500: "#79B5EC", 600: "#152432" },
        red: { 500: "#F37877", 600: "#3E1716", 700: "#F24E43" },
        light: { 200: "#E8E9E9" },
        dark: {
          200: "#0D0F10", 300: "#131619", 400: "#1A1D21",
          500: "#363A3D", 600: "#76828D", 700: "#ABB8C4"
        }
      },
      fontFamily: { sans: ["var(--font-sans)", ...fontFamily.sans] },
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')"
      },
      // ...more config
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```
</details>

<details>
<summary><code>lib/utils.ts</code></summary>

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date | string) => {
  // returns formatted date/time objects
};
```
</details>

<details>
<summary><code>types/index.d.ts</code></summary>

```typescript
declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface RegisterUserParams {
  name: string;
  email: string;
  phone: string;
  // ...additional fields
}
```
</details>

---

## Troubleshooting & Resources

- **Node.js Installation:** [Download Node.js](https://nodejs.org/en/)
- **Appwrite Docs:** [Appwrite Documentation](https://appwrite.io/docs)
- **Twilio Docs:** [Twilio Messaging](https://appwrite.io/docs/products/messaging/twilio)
- **Sentry Docs:** [Sentry Monitoring](https://sentry.io/welcome/)
- **YouTube Tutorial:** [HealthCare App with Next.js & Appwrite](https://www.youtube.com/watch?v=lEflo_sc82g)
- **CORS Issues with Appwrite:** [Solving CORS Errors](https://www.youtube.com/watch?v=oEpRh9H5l5g)

---

## Keywords

Next.js, HealthCare, Patient Management, Appointment, Twilio, Appwrite, Sentry, TypeScript, TailwindCSS, Shadcn-UI, Zod, Admin Dashboard, File Upload, Responsive Design, SMS Notification, Medical App, Full Stack, Clinic, Hospital, Database, Form Validation, React

---

> **Note:**  
This README preserves all original screenshot images and provides an updated, detailed project overview for easier understanding and onboarding. For further customization or advanced deployment, please consult the official documentation of each integrated technology.
