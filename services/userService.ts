import { supabase } from './supabase';
import type { LoginResult, TransferResult, User } from '../types/User';

let currentUser: User | null = null;

export const loginUser = async (accountNumber: string, password: string): Promise<LoginResult> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('account_number', accountNumber)
      .eq('password', password)
      .maybeSingle();

    if (error) {
      return { success: false, message: 'Database error occurred' };
    }

    if (!data) {
      return { success: false, message: 'Invalid account number or password' };
    }

    currentUser = data;
    return { success: true, message: 'Login successful', user: data };
  } catch (err) {
    return { success: false, message: 'An error occurred during login' };
  }
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const getUserBalance = async (): Promise<number> => {
  if (!currentUser) return 0;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('balance')
      .eq('id', currentUser.id)
      .maybeSingle();

    if (error || !data) return currentUser.balance;

    currentUser.balance = parseFloat(data.balance);
    return currentUser.balance;
  } catch (err) {
    return currentUser.balance;
  }
};

export const depositMoney = async (amount: number): Promise<TransferResult> => {
  if (!currentUser) {
    return { success: false, message: 'No user logged in' };
  }

  try {
    const newBalance = currentUser.balance + amount;

    const { error } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', currentUser.id);

    if (error) {
      return { success: false, message: 'Failed to deposit money' };
    }

    currentUser.balance = newBalance;
    return { success: true, message: 'Deposit successful', newBalance };
  } catch (err) {
    return { success: false, message: 'An error occurred during deposit' };
  }
};

export const transferMoney = async (
  recipientAccountNumber: string,
  amount: number,
  pin: string
): Promise<TransferResult> => {
  if (!currentUser) {
    return { success: false, message: 'No user logged in' };
  }

  if (currentUser.password !== pin) {
    return { success: false, message: 'Incorrect PIN' };
  }

  if (amount <= 0) {
    return { success: false, message: 'Amount must be greater than 0' };
  }

  if (currentUser.balance < amount) {
    return { success: false, message: 'Insufficient funds' };
  }

  if (currentUser.account_number === recipientAccountNumber) {
    return { success: false, message: 'Cannot transfer to your own account' };
  }

  try {
    const { data: recipient, error: recipientError } = await supabase
      .from('users')
      .select('id, balance')
      .eq('account_number', recipientAccountNumber)
      .maybeSingle();

    if (recipientError || !recipient) {
      return { success: false, message: 'Recipient account not found' };
    }

    const senderNewBalance = currentUser.balance - amount;
    const recipientNewBalance = parseFloat(recipient.balance.toString()) + amount;

    const { error: senderError } = await supabase
      .from('users')
      .update({ balance: senderNewBalance })
      .eq('id', currentUser.id);

    if (senderError) {
      return { success: false, message: 'Transfer failed' };
    }

    const { error: recipientUpdateError } = await supabase
      .from('users')
      .update({ balance: recipientNewBalance })
      .eq('id', recipient.id);

    if (recipientUpdateError) {
      await supabase
        .from('users')
        .update({ balance: currentUser.balance })
        .eq('id', currentUser.id);
      return { success: false, message: 'Transfer failed, rolling back' };
    }

    currentUser.balance = senderNewBalance;
    return { success: true, message: 'Transfer successful', newBalance: senderNewBalance };
  } catch (err) {
    return { success: false, message: 'An error occurred during transfer' };
  }
};

export const buyAirtime = async (amount: number, pin: string): Promise<TransferResult> => {
  if (!currentUser) {
    return { success: false, message: 'No user logged in' };
  }

  if (currentUser.password !== pin) {
    return { success: false, message: 'Incorrect PIN' };
  }

  if (amount <= 0) {
    return { success: false, message: 'Amount must be greater than 0' };
  }

  if (currentUser.balance < amount) {
    return { success: false, message: 'Insufficient funds' };
  }

  try {
    const newBalance = currentUser.balance - amount;

    const { error } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', currentUser.id);

    if (error) {
      return { success: false, message: 'Purchase failed' };
    }

    currentUser.balance = newBalance;
    return { success: true, message: 'Airtime purchased', newBalance };
  } catch (err) {
    return { success: false, message: 'An error occurred during purchase' };
  }
};

export const updateUserProfile = async (name: string, email: string): Promise<TransferResult> => {
  if (!currentUser) {
    return { success: false, message: 'No user logged in' };
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({ name, email })
      .eq('id', currentUser.id);

    if (error) {
      return { success: false, message: 'Failed to update profile' };
    }

    currentUser.name = name;
    currentUser.email = email;
    return { success: true, message: 'Profile updated successfully' };
  } catch (err) {
    return { success: false, message: 'An error occurred during update' };
  }
};

export const changeUserPassword = async (newPassword: string): Promise<TransferResult> => {
  if (!currentUser) {
    return { success: false, message: 'No user logged in' };
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({ password: newPassword })
      .eq('id', currentUser.id);

    if (error) {
      return { success: false, message: 'Failed to change password' };
    }

    currentUser.password = newPassword;
    return { success: true, message: 'Password changed successfully' };
  } catch (err) {
    return { success: false, message: 'An error occurred during password change' };
  }
};

export const logoutUser = () => {
  currentUser = null;
};
