# Message Board App

<div align="center">

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

</div>

## Overview

A full-stack message board application showcasing modern development practices with React Native and Django. Project implements features like real-time messaging, user authentication, and responsive mobile-first design.

## Tech Stack

### Frontend

- React Native for cross-platform mobile development
- TypeScript for type-safe code
- Jest for testing
- Mobile-first responsive design

### Backend

- Django REST Framework
- SQLite database
- Token-based authentication
- RESTful API design

## Key Features

- 📱 Cross-platform mobile support (iOS & Android)
- 🔐 Secure user authentication
- 💬 Real-time message board functionality
- 🎨 Clean, intuitive user interface
- 🔄 RESTful API architecture
- ✨ TypeScript for enhanced code reliability

## Getting Started

### Prerequisites

- Node.js 14+
- Python 3.8+
- React Native CLI
- Android Studio or Xcode

### Installation

1. Clone the repository

```bash
git clone https://github.com/yacobalemneh/message-board-app.git
cd message-board-app
```

2. Backend setup

```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. Frontend setup

```bash
cd stellar_messages
npm install
# For iOS
npm run ios
# For Android
npm run android
```

## Project Structure

```
.
├── backend/           # Django backend
│   ├── apps/         # Django applications
│   └── backend/      # Core backend configuration
└── stellar_messages/ # React Native frontend
    ├── src/          # Source code
    ├── __tests__/    # Test files
    └── ios/ & android/
```

## Development Practices

- Type-safe development with TypeScript
- Component-based architecture
- RESTful API design principles
- Comprehensive testing setup
- Clean code practices
- Modern ES6+ JavaScript features

## Screenshots

[Consider adding screenshots of your app here]

## Future Enhancements

- Push notifications
- Message threading
- Rich text support
- User profiles
- Message search functionality

## Connect With Me

- GitHub: [@yacobalemneh](https://github.com/yacobalemneh)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
