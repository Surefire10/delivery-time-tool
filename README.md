## 🕒 Delivery Time Tool
A small tool that calculates available delivery timeslots based on cart items, with consideration for product types (e.g., fresh, external, in-stock), time of day, and weekends.

This project is structured using Clean Architecture to demonstrate separation of concerns, testability, and maintainability.

### ✨ Features
Calculates available delivery slots up to 14 business days in advance.

Business logic varies based on:

Product type (fresh, external, in-stock)

Time of order

Day of the week (e.g., weekends excluded)

Marks some time slots as "green" (eco-friendly delivery).

### 🧱 Architecture
This project follows Clean Architecture, as described by Uncle Bob. Here’s how the layers are represented:

               [ Interface Adapters ]
                     API Routes
                         ↓
                [ Application Layer ]
     Use Cases → Repository Interfaces
                         ↓
                  [ Infrastructure ]
          Repository Implementations (Mocked)
                         ↓
                  [ Domain Entities ]


### 📁 Folder Structure

├── app/api/timeslots/route.ts         #Controller (Interface Adapter)
├── core/
│   ├── application/
│   │   ├── repositories/              #Repo interfaces
│   │   └── usecases/                  #Business use cases
│   ├── entities/
│   │   └── models/                    #Domain models
│   └── infrastructure/
│       └── repositories/              #Repo implementations
└── lib/                               #Sample/mock data

### 🧠 Clean Architecture Breakdown
Interface Adapters ->	API routes (Next.js app/api) that call use cases
Application Layer	-> Core business logic (usecases/) and data interfaces (repositories/)
Domain Entities	-> Simple, pure models (e.g., Product)
Infrastructure	-> implements repository interfaces with mock/static data

### 📦 Technologies
Next.js (App Router)

TypeScript

date-fns for date utilities

No database (uses static mock data for simplicity)

### 🛠️ How to Use

npm install
npm run dev
Visit: http://localhost:3000/api/timeslots?product-ids=1&product-ids=2

Example Request
GET /api/timeslots?product-ids=1&product-ids=2


Example Response
[
  {
    "day": "2025-06-27T00:00:00.000Z",
    "availableTimeslots": [
      {
        "timeslot": "2025-06-27T08:00:00.000Z",
        "green": true,
        "greenType": "Recyclable packaging"
      },
      ...
    ]
  }
]

### 🧪 Future Improvements
Add unit tests for use cases and slot calculation

Replace mock data with a real database or API

Build a frontend interface to consume the timeslots

### 🧠 Why Clean Architecture?
This structure makes it easy to:

Replace infrastructure without touching core logic

Unit test business rules without dealing with frameworks

Reuse use cases across HTTP, CLI, mobile, etc.

Built by me as a Clean Architecture practice project ;(

