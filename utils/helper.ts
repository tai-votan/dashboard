export function formatTime(time: number) {
  // Get the integer part of the time (hours)
  const hours = Math.floor(time);

  // Get the fractional part of the time (minutes)
  const minutes = (time % 1) * 60;

  // Format the hours and minutes to two digits
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Combine hours and minutes
  return `${formattedHours}:${formattedMinutes}`;
}
