/*
  # Create Users Table

  ## Overview
  This migration creates the core users table for the banking application,
  storing all user account information including credentials and balance.

  ## New Tables
  
  ### `users`
  - `id` (uuid, primary key) - Unique identifier for each user
  - `account_number` (text, unique) - 10-digit account number
  - `name` (text) - User's full name
  - `email` (text, unique) - User's email address
  - `password` (text) - User's login password (4-digit PIN)
  - `balance` (numeric) - User's account balance in Naira
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on `users` table
  - Users can only read their own data
  - Users can update their own balance, name, email, and password
  - No public access allowed
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_number text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  balance numeric(12, 2) DEFAULT 0.00 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Create index on account_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_account_number ON users(account_number);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
