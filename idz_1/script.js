document.getElementById("calculateBtn").addEventListener("click", function() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const duration = document.getElementById("duration").value;
  const holidaysInput = document.getElementById("holidays").value;
  const result = document.getElementById("result");

  // Перетворення списку свят у масив
  const holidays = holidaysInput.split(",").map(d => d.trim()).filter(Boolean);

  if (!startDate && !endDate && !duration) {
    result.innerHTML = "Введіть хоча б два параметри.";
    return;
  }

  // Якщо є початок і тривалість — рахуємо дату завершення
  if (startDate && duration && !endDate) {
    let end = new Date(startDate);
    let daysCounted = 0;

    while (daysCounted < parseInt(duration)) {
      const dayString = end.toISOString().slice(0,10);
      // Пропускаємо святкові дні
      if (!holidays.includes(dayString)) {
        daysCounted++;
      }
      if (daysCounted < parseInt(duration)) {
            end.setDate(end.getDate() + 1);
      } else {
          break; 
      }
    }

    showResult("Дата завершення: " + end.toISOString().slice(0,10), end);
  }

  // Якщо є завершення і тривалість — рахуємо дату початку
  else if (endDate && duration && !startDate) {
    let start = new Date(endDate);
    let daysCounted = 0;

    while (daysCounted < parseInt(duration)) {
      const dayString = start.toISOString().slice(0,10);
      if (!holidays.includes(dayString)) {
        daysCounted++;
      }
      if (daysCounted < parseInt(duration)) {
            start.setDate(start.getDate() + 1);
      } else {
          break; 
      }
    }

    showResult("Дата початку: " + start.toISOString().slice(0,10), start);
  }

  // Якщо є початок і завершення — рахуємо тривалість
  else if (startDate && endDate && !duration) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let totalDays = 0;

    while (start <= end) {
      const dayString = start.toISOString().slice(0,10);
      if (!holidays.includes(dayString)) {
        totalDays++;
      }
      start.setDate(start.getDate() + 1);
    }

    showResult("Тривалість: " + totalDays + " днів");
  }

  else {
    result.innerHTML = " Вкажіть лише два параметри для обчислення третього.";
  }
});
function clearField(id) {
  document.getElementById(id).value = "";
  document.getElementById("result").innerHTML = "";
}

function showResult(message, date) {
  const result = document.getElementById("result");
  let warning = "";

  if (date && date.getDay() === 0) {
    warning = "<br> Попередження: ця дата припаде на неділю.";
  }

  result.innerHTML = message + warning;
}
