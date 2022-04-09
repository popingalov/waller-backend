const getCurrentMonthYear = () => {
  const today = new Date();
  const currentMonth = today.getUTCMonth() + 1;
  const correctedCurrentMonth = currentMonth.toString().padStart(2, "0");
  const currentYear = today.getUTCFullYear();

  return { correctedCurrentMonth, currentYear };
};

module.exports = getCurrentMonthYear;
