let balance = 95000.50;
let password = "0000"; //default password

//User personal info
let userName = "Dassak Nanbol";
let userEmail = "dassak.nanbol@gmail.com";

// Get current balance
export const getBalance = () => balance;

// Function to validate password
export const validatePassword = (input) => input === password;

// Function to handle transfer
export const transferAmount = (amount, inputPassword) => {
  if (!validatePassword(inputPassword)) return { success: false, message: "Incorrect password" };
  if (amount <= 0) return { success: false, message: "Amount must be greater than 0" };
  if (amount > balance) return { success: false, message: "Insufficient funds" };
  balance -= amount;
  return { success: true, newBalance: balance };
};

// Function to handle airtime purchase
export const buyAirtime = (amount, inputPassword) => {
  if (!validatePassword(inputPassword)) return { success: false, message: "Incorrect password" };
  if (amount <= 0) return { success: false, message: "Amount must be greater than 0" };
  if (amount > balance) return { success: false, message: "Insufficient funds" };
  balance -= amount;
  return { success: true, newBalance: balance };
};

//function to change password
export const changePassword = (newPassword) => {
  password = newPassword;
  return { success: true, message: "Password updated successfully" };
};

//Deposit / Loan money
export const depositAmount = (amount) => {
  balance += amount;
  return balance;
};

//Get user infp
export const getUserInfo = () => {
  return { name: userName, email: userEmail };
};

//update user info (name + email)
export const updateUserInfo = (newName, newEmail) => {
  userName = newName;
  userEmail = newEmail;

  return {
    success: true,
    message: "Profile updated successfully"
  };
};
