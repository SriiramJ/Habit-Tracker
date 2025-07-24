// Validate user
export function validateUser(data) {
  const { username, fullname, email, password } = data;
  if (!username || !fullname || !email || !password) {
    return "All fields (username, fullname, email, password) are required.";
  }
  // simple email regex
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
}

// Validate habit
export function validateHabit(data) {
  const { title } = data;
  if (!title) {
    return "Title is required for a habit.";
  }
  return null;
}

// Validate goal
export function validateGoal(data) {
  const { title } = data;
  if (!title) {
    return " Title is required for a goal.";
  }
  return null;
}

// Validate progress
export function validateProgress(data) {
  if (!data || typeof data !== "object") {
    return "Progress data is required.";
  }
  const { date } = data;
  if (!data) {
    return "Date is required for progress";
  }
  return null;
}

// Validate chat message
export function validateChatMessage(data) {
  if (!data || typeof data !== "object") {
    return "Chat message data is required";
  }
  const { message } = data;
  if (!message) {
    return "Message is required for a chat message";
  }
  return null;
}

// Validate tool usage
export function validateToolUsage(data) {
  if (!data || typeof data !== "object") {
    return "Tool usage data is required.";
  }
  const { toolName } = data;
  if (!toolName) {
    return "Tool name is required for tool usage.";
  }
  return null;
}

// Validate push notification
export function validatePushNotification(body) {
  if (!body || !body.token || !body.title || !body.body) {
    return { success: false, message: "token, title, and body are required" };
  }
  return { success: true };
}

// Validate email notification
export const validateEmailNotification = (data) => {
  if (!data) return { success: false, error: "Request body is missing" };

  const { to, subject, text, html } = data;

  if (!to || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(to)) {
    return { success: false, error: "Invalid email address" };
  }
  if (!subject || typeof subject !== "string") {
    return { success: false, error: "Subject must be a valid string" };
  }
  if (!text && !html) {
    return {
      success: false,
      error: "Email must have either text or HTML content",
    };
  }

  return { success: true };
};

// Validate category
export function validateCategory(data) {
  if (!data || typeof data !== "object") {
    return "Category data is required.";
  }
  const { name } = data;
  if (!name) {
    return "Category name is required.";
  }
  return null;
}

export function validateReward(data) {
  if (!data || typeof data !== "object") {
    return "Reward data is required.";
  }
  const { title } = data;
  if (!title) {
    return "Reward title is required.";
  }
  return null;
}

// User Preference
export function validateUserPreferences(data) {
  if (!data || typeof data !== "object") {
    return "preferences data is required.";
  }
  // Check required fields and types
  if ("notificationTypes" in data && !Array.isArray(data.notificationTypes)) {
    return "notificationTypes must be an array.";
  }
  if ("reminderTimes" in data && !Array.isArray(data.reminderTimes)) {
    return "ReminderTimes must be an array.";
  }
  if ("favoriteTools" in data && !Array.isArray(data.favoriteTools)) {
    return "FavouriteTools must be in an array";
  }
  if (
    "profileVisibility" in data &&
    !["public", "private", "friends"].includes(data.profileVisibility)
  ) {
    return "profileVisibility must be 'public', 'private' or 'friends'";
  }
  if (
    "themePreference" in data &&
    !["light", "dark", "system"].includes(data.themePreference)
  ) {
    return "themePreference must be 'light', 'dark', or 'system'.";
  }
  if (
    "fontSize" in data &&
    !["small", "medium", "large"].includes(data.fontSize)
  ) {
    return "fontSize must be 'small', 'medium', or 'large'.";
  }
  // Add more checks as needed for your fields
  return null;
}
