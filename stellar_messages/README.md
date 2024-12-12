# Stellar Candidate Assignment: Message Board App

This messaging board is a full-stack application with a **Django** backend and a **React Native** frontend. This guide will help you set up and run the project locally with ease.

## Table of Contents

- Prerequisites
- Project Structure
- Backend Setup
  - Installation
  - Configuration
  - Running the Backend
- Frontend Setup
  - Installation
  - Configuration
  - Running the Frontend
- Troubleshooting
- Generated `requirements.txt`

## Prerequisites

Ensure you have the following tools installed on your machine:

### Backend

- [Python 3.8+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) (optional but recommended)

### Frontend

- [Node.js 14+](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) (for running on mobile devices)
- [Android Studio](https://developer.android.com/studio) and/or [Xcode](https://developer.apple.com/xcode/) (for Android and iOS emulators)

## Project Structure

```
.
├── backend/
│   ├── .env
│   ├── apps/
│   │   ├── posts/
│   │   └── users/
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
├── stellar_messages/
│   ├── __tests__/
│   │   └── App.test.tsx
│   ├── .bundle/
│   │   └── config
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .prettierrc.js
│   ├── .vscode/
│   │   └── .react/
│   ├── .watchmanconfig
│   ├── android/
│   │   ├── .gradle/
│   │   ├── app/
│   │   └── ...
│   ├── app.json
│   ├── App.tsx
│   ├── babel.config.js
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── index.js
│   ├── ios/
│   ├── jest.config.js
│   ├── metro.config.js
│   ├── package.json
│   ├── README.md
│   ├── src/
│   ├── tsconfig.json
│   └── vendor/
```

## Backend Setup

The backend is built with **Django** and provides RESTful APIs for the application.

### Installation

1. **Navigate to the Backend Directory**:

   ```bash
   cd backend
   ```

2. **Create and Activate a Virtual Environment** (optional but recommended):

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install Dependencies**:

   ```bash
   pip install -r backend/requirements.txt
   ```

### Configuration

1. **Set Up Environment Variables**:

   The backend can be configured using environment variables. An example `.env` file is provided.

   - **Locate the `.env` File**:

.env

     ```properties
     SECRET_KEY=your_secret_key
     DEBUG=True
     ALLOWED_HOSTS=localhost,127.0.0.1
     DATABASE_URL=sqlite:///db.sqlite3
     DJANGO_API_KEY=your_api_key_here
     ```

- **Create Your Own `.env` File**:

  ```bash
  cp backend/.env.example backend/.env
  ```

  Replace the placeholder values with your actual configuration as needed.

### Running the Backend

1. **Apply Migrations**:

   ```bash
   python backend/manage.py migrate
   ```

2. **Create a Superuser** (optional, for admin access):

   ```bash
   python backend/manage.py createsuperuser
   ```

3. **Start the Development Server**:

   ```bash
   python backend/manage.py runserver
   ```

   The backend server will be accessible at `http://localhost:8000/`.

## Frontend Setup

The frontend is built with **React Native**, enabling cross-platform mobile application development.

### Installation

1. **Navigate to the Frontend Directory**:

   ```bash
   cd stellar_messages
   ```

2. **Install Dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Configuration

1. **Verify Configuration Settings**:

   Ensure that the frontend is correctly configured to communicate with the backend API. Update any API endpoints as necessary in the frontend configuration files located in

src

.

2. **Optional Environment Variables**:

   If your frontend requires environment variables, ensure they are set up properly. Refer to the `.env` file if available.

### Running the Frontend

1. **Start the Metro Bundler**:

   ```bash
   npm start
   ```

   Or with Yarn:

   ```bash
   yarn start
   ```

2. **Run on Android**:

   Ensure you have an Android emulator running or a device connected.

   ```bash
   npm run android
   ```

   Or with Yarn:

   ```bash
   yarn android
   ```

3. **Run on iOS**:

   Ensure you have Xcode installed and an iOS simulator running.

   ```bash
   npm run ios
   ```

   Or with Yarn:

   ```bash
   yarn ios
   ```

## Troubleshooting

- **Backend Issues**:
  - Ensure all migrations are applied.
  - Verify that the

.env

file has correct configurations.

- Check if the backend server is running without errors.

- **Frontend Issues**:

  - Ensure all Node.js dependencies are installed.
  - Verify that emulators/simulators are set up correctly.
  - If encountering bundling issues, try resetting Metro's cache:

    ```bash
    npm start -- --reset-cache
    ```

    Or with Yarn:

    ```bash
    yarn start --reset-cache
    ```

---

For more information, refer to the [React Native Documentation](https://reactnative.dev/docs/getting-started) and the [Django Documentation](https://docs.djangoproject.com/en/4.0/).
