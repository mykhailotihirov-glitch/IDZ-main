document.getElementById("calculateBtn").addEventListener("click", function() {
  const balance = parseFloat(document.getElementById("balance").value);
  const currentDateInput = document.getElementById("currentDate").value;
  const tariff = parseFloat(document.getElementById("tariff").value);
  const paymentDay = parseInt(document.getElementById("paymentDay").value);
  const result = document.getElementById("result");

  if (!balance || !currentDateInput || !tariff || !paymentDay) {
    result.innerHTML = "Заповніть усі поля!";
    return;
  }

  let currentDate = new Date(currentDateInput);

  // Визначаємо на скільки місяців вистачить балансу
  let monthsCovered = Math.floor(balance / tariff);
  let nextPaymentDate = new Date(currentDate);
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + monthsCovered);
  nextPaymentDate.setDate(paymentDay);

  // Якщо баланс ідеально не ділиться, то потрібно поповнити до цієї дати
  if (balance % tariff !== 0) {
    result.innerHTML = `
      Балансу вистачить до <b>${nextPaymentDate.toISOString().slice(0, 10)}</b>.
      <br>Потрібно поповнити рахунок до цього числа.
    `;
  } else {
    result.innerHTML = `
      Баланс вистачить рівно до <b>${nextPaymentDate.toISOString().slice(0, 10)}</b>.
    `;
  }
});
