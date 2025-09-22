# My Goals App 📚

A React Native app built with Expo for tracking learning materials and progress. Features user authentication, material management, and step-by-step guides.

## Features ✨

- **User Authentication**: Sign up and login with Firebase Auth
- **Material Management**: Create, edit, and delete learning materials
- **Step-by-Step Guides**: Break down materials into manageable steps
- **Search Functionality**: Find materials quickly with search
- **Feedback System**: Collect and manage user feedback
- **Protected Routes**: Secure access to authenticated content

## Tech Stack 🛠️

- **React Native** with Expo
- **Firebase** for authentication and database
- **Expo Router** for navigation
- **AsyncStorage** for local data persistence
- **React Context** for state management

## Getting Started 🚀

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Open the app**
   - Scan the QR code with Expo Go app on your phone
   - Or press `i` for iOS simulator / `a` for Android emulator

## Authentication 🔐

The app includes a complete authentication system:

- **Sign Up**: Create new accounts with email and password
- **Sign In**: Login with existing credentials
- **Protected Routes**: All main features require authentication
- **Auto-redirect**: Unauthenticated users are redirected to welcome screen

## App Structure 📁

```
app/
├── auth/
│   ├── login.jsx      # Sign in screen
│   └── signup.jsx     # Sign up screen
├── materials/
│   ├── index.jsx      # All materials list
│   ├── edit.jsx       # Add/edit material
│   └── [id].jsx       # Material details
├── feedbacks/
│   └── index.jsx      # Feedback management
├── index.jsx          # Home screen (protected)
└── welcome.jsx        # Welcome screen (public)

contexts/
├── AuthContext.js     # Authentication state
└── MaterialsContext.js # Materials state

components/
├── MaterialCard.jsx   # Material display component
├── ProtectedRoute.jsx # Route protection wrapper
└── Stepper.jsx        # Step navigation component
```

## Firebase Configuration 🔥

The app uses Firebase for authentication. Make sure your Firebase project is properly configured in `firebaseConfig.js`.

## Features Overview 📋

### Home Screen
- Welcome message with user info
- Search functionality
- Quick access to all features
- Logout option

### Materials Management
- Create new learning materials
- Add step-by-step instructions
- Edit existing materials
- Delete materials
- Search through all materials

### Feedback System
- Submit feedback
- View previous feedback
- Delete feedback entries

## Development 🛠️

The app uses modern React Native patterns:
- Functional components with hooks
- Context API for state management
- File-based routing with Expo Router
- Firebase integration for backend services

## Learn More 📖

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
