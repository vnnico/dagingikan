export const countdownTime = (expiryDate) => {
  const now = new Date();
  const difference = new Date(expiryDate) - now;
  let timeRemaining = {};

  if (difference > 0) {
    timeRemaining = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    // If the countdown is over, set all values to zero
    timeRemaining = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return timeRemaining;
};
