export async function updateLoginStreak(user) {
  const today = new Date();
  const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null;
  today.setHours(0, 0, 0, 0);

  if (lastLogin) {
    lastLogin.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      user.streak += 1;
    } else if (diffDays > 1) {
      user.streak = 1;
    }
    // If diffDays === 0, do nothing (already logged in today)
  } else {
    user.streak = 1;
  }
  user.lastLoginDate = today;
  await user.save();
}
