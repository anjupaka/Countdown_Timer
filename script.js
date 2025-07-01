const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");

let countdownInterval;

startBtn.addEventListener("click", () => {
  const datetimeInput = document.getElementById("datetime").value;
  const targetDate = new Date(datetimeInput);
  const alarmSound = new Audio("alarm.wav");

  // Check for valid future date
  if (!datetimeInput || targetDate <= new Date()) {
    messageEl.textContent = "Please select a valid future date and time.";
    return;
  }

  messageEl.textContent = "";

  // Clear any previous timer
  if (countdownInterval) clearInterval(countdownInterval);

  // Start countdown
  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      alarmSound.play();
      countdownEl.innerHTML = "<h2>⏰ Time's up!</h2>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);

  // Reset display
  countdownEl.innerHTML = `
    <div><span id="days">00</span><p>Days</p></div>
    <div><span id="hours">00</span><p>Hours</p></div>
    <div><span id="minutes">00</span><p>Minutes</p></div>
    <div><span id="seconds">00</span><p>Seconds</p></div>
  `;

  // Clear message and input
  messageEl.textContent = "";
  document.getElementById("datetime").value = "";
});
