# AI-Powered Hospital Management System (HMS)

A centralized digital platform designed to automate hospital operations, streamline department workflows, and use AI features to improve healthcare efficiency. This project simulates the complex workflows found in major healthcare networks like Apollo, Fortis, and Max Healthcare.

---

## 🚀 Key Modules & Features

*   **Module 1: Authentication** – Secure Login and Session Management using JWT and Refresh Tokens. Patients can register online, while staff accounts are created securely by the Hospital Admin.
*   **Module 2: Patient Management** – Digital profile creation (Demographics, Insurance) and tracking of medical histories (Allergies, Illnesses, Surgeries).
*   **Module 3: Appointment Core** – Booking system with doctor availability checks and live status updates (`Requested` ➔ `Confirmed` ➔ `In Consultation` ➔ `Completed` ➔ `Cancelled`).
*   **Module 4: Doctor Consultation** – Interface for doctors to view patient history, write medical diagnoses, create treatment plans, and issue prescriptions.
*   **Module 5: Electronic Medical Records (EMR)** – Document management system supporting secure uploads and downloads of Lab Reports, X-Rays, and MRIs.
*   **Module 6: Laboratory Management** – Digital testing workflow tracking samples from initial doctor order to lab technician collection, testing, and final report upload.
*   **Module 7: Pharmacy Inventory** – Real-time medication stock tracking, expiry date monitoring, and automated verification before dispensing medicines.
*   **Module 8: Billing & Payments** – Unified invoice generation covering consultation fees, lab tests, pharmacy bills, and room admission charges. Supports UPI, Card, and Cash.
*   **Module 9: Inpatient Admission** – Tracks ward and room assignments, live bed availability, and patient admission/discharge processes.
*   **Module 10: Emergency Management** – Fast-track priority registration queue and instant emergency doctor assignments for critical cases.
*   **Module 11: Notifications System** – Alerts for appointment reminders, ready prescriptions, lab report updates, and critical system issues.
*   **Module 12: Reports & Analytics** – Admin dashboard showing daily patient volumes, total revenue trends, doctor utilization rates, and bed occupancy graphs.

---

## 🤖 Integrated AI Healthcare Features

The system features an AI Assistant available across multiple user roles:
1.  **AI Symptom Analyzer (Patient)**: Analyzes basic symptoms (e.g., fever, cough) to suggest possible conditions, urgency levels, and the correct hospital department.
2.  **AI Medical Record Summarizer (Doctor)**: Summarizes long patient histories into brief highlights (e.g., active chronic diseases, past surgeries, and allergies).
3.  **AI Prescription Explainer (Patient)**: Translates technical medical prescriptions into simple, easy-to-understand language.
4.  **AI Appointment Assistant (Patient)**: Helps patients find open time slots and available medical specialists using conversational text.
5.  **AI Operations Dashboard (Admin)**: Analyzes monthly trends like drops in revenue or patient volume to provide helpful business insights.

---

## 🏗 System Architecture Diagram


## 🧩 Backend Setup (Node.js + Express)

A backend service is initialized in `/backend` with environment config, MongoDB connection, and centralized error handling.

### Backend Folder Structure

```text
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   └── routes/
│       └── index.js
├── .env.example
└── package.json
```

### Run Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Health check endpoint: `GET /api/health`
