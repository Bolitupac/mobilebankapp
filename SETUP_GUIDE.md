# Banking App Setup Guide

This guide will walk you through setting up and deploying your React Native banking application with Supabase database.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Supabase Database Setup](#supabase-database-setup)
4. [Running the Application](#running-the-application)
5. [Testing the App](#testing-the-app)
6. [Deployment Guide](#deployment-guide)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)
- **Expo Go** app on your mobile device
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

---

## Local Development Setup

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React Native
- Expo Router
- Supabase client
- All UI components

### Step 2: Install Supabase Client

The project uses Supabase for database operations. Install the Supabase JavaScript client:

```bash
npm install @supabase/supabase-js
```

---

## Supabase Database Setup

### Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up using GitHub, Google, or email
4. Verify your email address

### Step 2: Create a New Project

1. After logging in, click "New Project"
2. Fill in the project details:
   - **Name**: Choose a name (e.g., "banking-app")
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be created

### Step 3: Get Your API Credentials

1. In your Supabase dashboard, click on "Settings" (gear icon)
2. Navigate to "API" section
3. You will see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJhbGci...`)
4. Copy both values

### Step 4: Configure Environment Variables

1. In the project root directory, create a `.env` file:

```bash
touch .env
```

2. Open the `.env` file and add your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual credentials from Step 3.

**IMPORTANT**: Never commit the `.env` file to Git. It's already included in `.gitignore`.

### Step 5: Run Database Migration

The database migration has already been created. Now you need to apply it:

1. In your Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy the SQL migration from the `supabase/migrations` folder in your project
4. Paste it into the SQL editor
5. Click "Run" to execute the migration

Alternatively, if you have Supabase CLI installed:

```bash
npx supabase db push
```

### Step 6: Add Sample Users (Optional)

To test the app, add sample users to your database:

1. In Supabase dashboard, go to "Table Editor"
2. Select the "users" table
3. Click "Insert row" and add test data:

```sql
INSERT INTO users (account_number, name, email, password, balance)
VALUES
  ('1234567890', 'John Doe', 'john@example.com', '0000', 50000.00),
  ('9876543210', 'Jane Smith', 'jane@example.com', '1234', 75000.00);
```

Or use the SQL Editor:

1. Go to SQL Editor
2. Run this query:

```sql
INSERT INTO users (account_number, name, email, password, balance) VALUES
  ('1234567890', 'John Doe', 'john@example.com', '0000', 50000.00),
  ('9876543210', 'Jane Smith', 'jane@example.com', '1234', 75000.00);
```

---

## Running the Application

### Step 1: Start the Development Server

In your project directory, run:

```bash
npx expo start
```

Or if you prefer:

```bash
npm start
```

You should see a QR code in your terminal.

### Step 2: Open on Your Device

**Option A: Using Expo Go (Recommended for testing)**

1. Open the Expo Go app on your phone
2. Scan the QR code from your terminal
3. The app will load on your device

**Option B: Using Emulator/Simulator**

For Android:
```bash
npm run android
```

For iOS (Mac only):
```bash
npm run ios
```

---

## Testing the App

### Login to Test Account

Use the sample user credentials you created:
- **Account Number**: `1234567890`
- **Password**: `0000`

### Test Features

1. **View Balance**: Check your account balance on the home screen
2. **Deposit Money**: Add money to your account
3. **Transfer Money**:
   - Go to Transfer tab
   - Enter recipient account number: `9876543210`
   - Enter amount and your PIN
   - Complete transfer
4. **Buy Airtime**:
   - Go to Airtime/Data tab
   - Select network, enter phone number and amount
   - Enter PIN to complete
5. **Update Profile**:
   - Go to Profile tab
   - Update name/email
   - Change password/PIN

---

## Deployment Guide

### Deploying to Production

#### Option 1: Expo Application Services (EAS)

EAS is the easiest way to deploy your React Native app.

**Step 1: Install EAS CLI**

```bash
npm install -g eas-cli
```

**Step 2: Login to Expo**

```bash
eas login
```

**Step 3: Configure EAS**

```bash
eas build:configure
```

**Step 4: Build for Android**

```bash
eas build --platform android
```

**Step 5: Build for iOS** (requires Apple Developer account)

```bash
eas build --platform ios
```

**Step 6: Submit to App Stores**

For Google Play Store:
```bash
eas submit --platform android
```

For Apple App Store:
```bash
eas submit --platform ios
```

#### Option 2: Web Deployment

To deploy the web version:

**Step 1: Export for Web**

```bash
npx expo export --platform web
```

**Step 2: Deploy to Hosting**

You can deploy the generated files to:
- **Vercel**: `npx vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **Firebase Hosting**: `firebase deploy`

### Making Your Database Accessible Online

Your Supabase database is already online and accessible! The API credentials you set up in the `.env` file connect to Supabase's cloud infrastructure.

**Important**: Make sure to:
1. Keep your database credentials secure
2. Update your `.env` with production URLs when deploying
3. Enable Row Level Security policies (already done in migration)

---

## Troubleshooting

### Common Issues

#### 1. "Cannot connect to Supabase"

**Solution**:
- Verify `.env` file exists and has correct credentials
- Check your internet connection
- Ensure Supabase project is active (not paused)

#### 2. "Login Failed"

**Solution**:
- Verify account number is exactly 10 digits
- Check password is correct (case-sensitive)
- Ensure user exists in database

#### 3. "Transfer Failed"

**Solution**:
- Verify recipient account exists in database
- Check sufficient balance
- Ensure PIN is correct

#### 4. "Module not found" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 5. Expo app shows white screen

**Solution**:
- Close and reopen the Expo Go app
- Restart the development server
- Clear Expo cache:
```bash
npx expo start -c
```

### Getting Help

If you encounter issues:

1. Check the error message in the terminal
2. Look at the React Native error overlay on your device
3. Check Supabase logs in the dashboard
4. Review the code in `services/userService.ts`

---

## Project Structure

```
banking-app/
├── app/                    # Application screens
│   ├── index.tsx          # Login screen
│   └── tabs/              # Tab navigation screens
│       ├── home.tsx       # Home dashboard
│       ├── transfer.tsx   # Transfer screen
│       ├── airtime.tsx    # Airtime purchase
│       ├── transactions.tsx # Transaction history
│       └── profile.tsx    # User profile
├── services/              # Business logic
│   ├── supabase.ts       # Supabase client setup
│   └── userService.ts    # User operations
├── utils/                 # Utility functions
│   └── transactionStorage.ts # Transaction tracking
├── types/                 # TypeScript definitions
│   └── User.ts           # User type definitions
├── .env                   # Environment variables (create this)
└── package.json          # Dependencies
```

---

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use Row Level Security** (already enabled in migration)
3. **Validate all user inputs** before processing
4. **Use HTTPS** in production (Supabase provides this)
5. **Store passwords securely** (consider hashing in production)
6. **Implement rate limiting** for sensitive operations
7. **Enable 2FA** on your Supabase account

---

## Next Steps

After completing this setup:

1. Customize the UI colors and branding
2. Add more features (bill payments, card management, etc.)
3. Implement push notifications
4. Add biometric authentication
5. Create admin dashboard
6. Add transaction receipts
7. Implement customer support chat

---

## Support

For technical support:
- Expo Documentation: https://docs.expo.dev
- Supabase Documentation: https://supabase.com/docs
- React Native Documentation: https://reactnative.dev

---

## License

This project is for educational purposes. Ensure you comply with all banking regulations in your jurisdiction before deploying to production.

---

**Congratulations!** You now have a fully functional banking application with real database integration. Happy coding!
