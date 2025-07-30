# HealthCare Doctor Appointment Featuring Admin Dashboard Notifications (Approve/Decline) - Next.js Web Application

This repository contains a Next.js application for managing healthcare appointments, patient data, and notifications. It features a user-friendly interface for patients and an admin dashboard for appointment management, with SMS notifications powered by Twilio and file storage using Appwrite.

![Screenshot 2024-10-03 at 17 46 26](https://github.com/user-attachments/assets/cbf4b819-b692-4a40-b422-12638e169e9d) ![Screenshot 2024-10-03 at 18 46 10](https://github.com/user-attachments/assets/751efebd-2026-43bc-a18a-5aaab140228e) ![Screenshot 2024-10-03 at 18 46 23](https://github.com/user-attachments/assets/5498ff6f-91cd-403d-9806-3c4734106bed) ![Screenshot 2024-10-03 at 18 46 38](https://github.com/user-attachments/assets/b86553f6-a70b-446b-a40f-c1c17607d9de) ![Screenshot 2024-10-03 at 18 48 59](https://github.com/user-attachments/assets/46be502e-8f95-40eb-9009-83f3c1a09bcb) ![Screenshot 2024-10-03 at 18 49 57](https://github.com/user-attachments/assets/f07f1475-1038-485d-9e9d-01c5f17451ad) ![Screenshot 2024-10-03 at 18 56 32](https://github.com/user-attachments/assets/47b5d698-56b3-4f73-b8b5-d0c1636f1432) ![Screenshot 2024-10-04 at 03 55 09](https://github.com/user-attachments/assets/205cf346-88cd-42e2-9a4c-476cc09a3b71) ![Screenshot 2024-10-03 at 20 33 18](https://github.com/user-attachments/assets/45dcb2ed-30f0-4871-b6cc-647799541fe9) ![Screenshot 2024-10-03 at 20 33 49](https://github.com/user-attachments/assets/67e31616-959e-4cf3-9f8c-63717ef14b72)

---

## Project Overview

It is a comprehensive solution for clinics and hospitals to manage patient data, appointments, notifications, and more. It provides:

- User registration and authentication
- Patient profiles and medical details
- Doctor and appointment management
- Admin dashboard for appointment control
- Automated SMS notifications via Twilio
- File storage using Appwrite
- Performance/error monitoring with Sentry
- Responsive design for all devices

**Live-Demo:** [https://healthcare-arnob.vercel.app/](https://healthcare-arnob.vercel.app/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component & API Walkthrough](#component--api-walkthrough)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Environment Variables](#environment-variables)
  - [Appwrite Setup](#appwrite-setup)
  - [Twilio Setup](#twilio-setup)
  - [Sentry Setup](#sentry-setup)
- [Functional Walkthrough](#functional-walkthrough)
- [Code Examples & Reusability](#code-examples--reusability)
- [Troubleshooting & Resources](#troubleshooting--resources)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [Happy Coding! 🎉](#happy-coding-)

---

## Key Features

- **Patient Registration:** Users sign up and create detailed profiles with medical and contact information.
- **Appointment Booking:** Patients schedule appointments with doctors, select time slots, and provide visit reasons.
- **Admin Dashboard:** Admins manage, confirm, schedule, or cancel appointments and view patient records.
- **SMS Notifications:** Patients receive SMS confirmations for appointments using Twilio.
- **File Upload:** Secure upload and storage of files (e.g., patient docs) via Appwrite.
- **Performance Monitoring:** Integrated Sentry for tracking errors and performance.
- **Responsive UI:** Fully responsive for desktop, tablet, and mobile.
- **Form Validation:** Robust validation with Zod and react-hook-form.
- **Modern UI:** Built with Shadcn-UI and TailwindCSS for a clean, professional look.

---

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, TailwindCSS, Shadcn-UI
- **Backend/Services:** Appwrite (Database + Storage), Twilio (SMS), Sentry (Monitoring)
- **Validation:** Zod, react-hook-form
- **Utilities:** clsx, tailwind-merge, Radix UI, Lucide Icons

---

## Project Structure

The project is organized for scalability and maintainability. Here’s a breakdown:

```bash
/app                # Next.js app directory (pages, components, layouts)
  /globals.css      # Global styles
/components         # Reusable UI components (forms, modals, tables, UI elements)
/constants          # Constant values, enums, lists (e.g., doctors, status icons)
/lib                # Utility functions (date formatting, validation, Appwrite config, actions)
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

## Component & API Walkthrough

### Main Components

- **PatientForm:** Handles patient registration and validation. Uses Zod for schema validation and react-hook-form for form state.
- **AppointmentForm:** Schedules, updates, and cancels appointments. Integrates with Appwrite for backend operations.
- **RegisterForm:** Full patient registration with medical and contact details, including file uploads.
- **AppointmentModal:** Modal for scheduling/cancelling appointments, using Radix UI Dialog.
- **FileUploader:** Secure file upload for patient documents, using Appwrite Storage.
- **StatusBadge, StatCard, SubmitButton:** UI elements for status, stats, and actions.
- **ThemeProvider:** Manages dark/light theme using next-themes.

### API & Actions

- **Appwrite Config (`lib/appwrite.config.ts`):** Centralized Appwrite client setup for database, users, messaging, and storage.
- **Actions (`lib/actions/`):** Functions for patient and appointment CRUD operations, using Appwrite SDK.
- **Validation (`lib/validation.ts`):** Zod schemas for form validation, including async checks for email/phone uniqueness.
- **Constants (`constants/index.ts`):** Lists for gender, identification types, doctor names, and default form values.

### Routing

- `/` - Home page with patient registration.
- `/admin` - Admin dashboard for managing appointments.
- `/patients/[userId]/register` - Patient registration page.
- `/patients/[userId]/new-appointment` - Appointment booking page.
- `/patients/[userId]/new-appointment/success` - Success page after booking.

---

## Getting Started

### Installation

1. **Clone the repository:**
  
   ```bash
   git clone https://github.com/arnobt78/HealthCare-Doctor-Appointment--NextJS.git
   cd HealthCare-Doctor-Appointment--NextJS
   ```

2. **Install dependencies:**
  
   ```bash
   npm install
   # or
   yarn install
   ```

---

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

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

### Environment Variables

Create a `.env.local` file in your project root and add:

```env
# APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_DATABASE_ID=
NEXT_PUBLIC_PATIENT_COLLECTION_ID=
NEXT_PUBLIC_DOCTOR_COLLECTION_ID=
NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=123123
```

> Replace the placeholder values with your actual Appwrite credentials.

---

### Appwrite Setup

1. **Sign up at [Appwrite](https://appwrite.io/).**
2. **Create a project** and note the Project ID and API Key.
3. **Create a database** (e.g., `patient-db`) with three collections:
   - `patient`
   - `doctor`
   - `appointment`
4. **Attributes for `patient`:**
   - `email`, `phone`, `irerId`, `name`, `privacyConsent` (Required)
   - `gender`, `birthDate`, `address`, `occupation`, `emergencyContactName`, `emergencyContactNumber`, `primaryPhysician`, `insuranceProvider`, `insurancePolicyNumber`, `allergies`, `currentMedication`, `familyMedicalHistory`, `pastMedicalHistory`, `identificationType`, `identificationNumber`, `identificationDocument`
5. **Attributes for `appointment`:**
   - Relationship: Many-to-One with `patient`
   - `schedule`, `reason`, `note`, `primaryPhysician`, `status`, `cancellationReason`

> See [Appwrite Docs](https://appwrite.io/docs) for full details.

---

### Twilio Setup

1. **Sign up at [Twilio](https://www.twilio.com/).**
2. Get your **Account SID, Auth token, and Sender number**.
3. Add these to your Appwrite project's Messaging > Twilio integration.
4. For Appwrite + Twilio docs, see: [Appwrite Messaging & Twilio](https://appwrite.io/docs/products/messaging/twilio)

---

### Sentry Setup

For error and performance monitoring:

1. **Sign up at [Sentry](https://sentry.io/).**
2. Create a new project and get your DSN.

- [Sentry Official Docs](https://sentry.io/welcome/)

---

## Functional Walkthrough

### 1. Register as a Patient

New users register, fill out medical and contact details, and consent to privacy policies. The registration form uses Zod for validation and react-hook-form for state management.

**Example:**

```tsx
// components/forms/PatientForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation";

const form = useForm({
  resolver: zodResolver(UserFormValidation),
  defaultValues: { name: "", email: "", phone: "" },
});
```

### 2. Book Appointments

Patients view available doctors, select time slots, and provide the reason for their visit. Multiple appointments can be managed. The appointment form integrates with Appwrite for backend operations.

**Example:**

```tsx
// components/forms/AppointmentForm.tsx
import { useForm } from "react-hook-form";
import { getAppointmentSchema } from "@/lib/validation";

const form = useForm({
  resolver: zodResolver(getAppointmentSchema()),
  defaultValues: { schedule: new Date(), reason: "" },
});
```

### 3. Admin Panel

Admins can:

- View all appointments
- Confirm or schedule appointments
- Cancel appointments (with SMS notifications)
- Manage patient records and uploaded documents

**Example:**

```tsx
// app/admin/page.tsx
import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/table/DataTable";

<StatCard type="appointments" count={appointments.scheduledCount} label="Scheduled appointments" />
<DataTable columns={Columns} data={appointments.list} />
```

### 4. Notifications

Patients receive SMS notifications on successful appointment confirmation using Twilio integration via Appwrite Messaging.

**Example:**

```typescript
// lib/appwrite.config.ts
export const messaging = new sdk.Messaging(client);
// Use messaging.send() to trigger SMS notifications
```

### 5. Performance and Error Tracking

Sentry integration monitors errors and performance bottlenecks. All major pages and API routes are instrumented with Sentry.

**Example:**

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### 6. File Upload

Users can upload documents (e.g., insurance, ID) securely using the FileUploader component and Appwrite Storage.

**Example:**

```tsx
// components/FileUploader.tsx
import { storage } from "@/lib/appwrite.config";
const uploadFile = async (file: File) => {
  await storage.createFile(BUCKET_ID, file.name, file);
};
```

---

## Code Examples & Reusability

### Utility Function

```typescript
// lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Patient Form Validation

```typescript
// lib/validation.ts
export const UserFormValidation = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().refine(async (email) => !(await checkEmailExists(email)), "Email already exists"),
  phone: z.string().refine(async (phone) => !(await checkPhoneExists(phone)), "Phone already exists"),
});
```

### Reusing Components

- **CustomFormField:** Use for any form field with validation and custom UI.
- **FileUploader:** Use for uploading files in any form.
- **StatusBadge:** Display status for appointments, patients, etc.

### API Usage

```typescript
// lib/appwrite.config.ts
const client = new sdk.Client();
client.setEndpoint(ENDPOINT!).setProject(NEXT_PUBLIC_PROJECT_ID!).setKey(NEXT_PUBLIC_API_KEY!);
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
```

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

## Conclusion

This project is designed for rapid development and deployment of healthcare management solutions. Its modular structure, reusable components, and integration with modern cloud services make it ideal for clinics, hospitals, and developers looking to build scalable medical applications.

---

## Happy Coding! 🎉

Feel free to use this project repository and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://arnob-mahmud.vercel.app/](https://arnob-mahmud.vercel.app/).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
