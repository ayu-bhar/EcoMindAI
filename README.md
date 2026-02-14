# EcoMindAI

EcoMindAI [https://eco-mind-ai-two.vercel.app/]
is an AI-powered community environmental action planner designed to help communities assess their sustainability practices and receive actionable, data-driven recommendations.

## Features

-   **AI-Powered Action Plans**: Generates customized sustainability action plans based on community data.
-   **Community Audits**: Collects data on energy, water, waste, transport, and more.
-   **Interactive Dashboard**: Visualizes community performance metrics.
-   **Chat Assistant**: Provides real-time answers to sustainability questions using Gemini AI.
-   **PDF Reports**: Exports comprehensive action plans and audit results.

## Tech Stack

### Frontend
-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: JavaScript / React 19
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Authentication & Database**: [Firebase](https://firebase.google.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **PDF Generation**: `@react-pdf/renderer`

### Backend
-   **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
-   **Language**: Python
-   **AI Model**: Google Gemini (`google-genai`)
-   **Server**: Uvicorn

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [Python](https://www.python.org/) (v3.9 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd EcoMindAi2
```

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Create a virtual environment (optional but recommended):

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_google_gemini_api_key
LLM_PROVIDER=gemini
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### 3. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the `frontend` directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_MEASUREMENT_ID=your_measurement_id
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1.  **Register/Login**: Create an account to save your community's data.
2.  **Submit Audit**: Fill out the questionnaire about your community's resource usage.
3.  **View Dashboard**: See your customized dashboard with scores and metrics.
4.  **Generate Plan**: Request an AI-generated action plan tailored to your needs.
5.  **Chat with AI**: Ask specific questions about sustainability practices.

## Project Structure

```
EcoMindAi2/
├── backend/                # FastAPI backend
│   ├── agents/             # AI Agents logic
│   ├── core/               # Core configurations (LLM, requests)
│   ├── main.py             # Entry point
│   └── requirements.txt    # Python dependencies
└── frontend/               # Next.js frontend
    ├── app/                # App router pages
    ├── components/         # Reusable UI components
    ├── lib/                # Utilities (Firebase, Analytics)
    └── public/             # Static assets
```
