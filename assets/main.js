// Radio Inputs
let monthlyPay = document.getElementById("pay-month");
let yearlyPay = document.getElementById("pay-year");

// NSSF
let deductNSSFY = document.getElementById("nssf-yes");
let deductNSSFN = document.getElementById("nssf-no");

let newNSSF = document.getElementById("new-nssf");
let oldNSSF = document.getElementById("old-nssf");

// NHIF
let deductNHIFY = document.getElementById("nhif-yes");
let deductNHIFN = document.getElementById("nhif-no");

// Number Inputs
let salary = document.getElementById("sal");
let benefits = document.getElementById("benefits");

let btnCalculate = document.getElementById("btn");

// Get Monthly and Yearly Tax
// n is the addition of salary + benefits
const monthlyTaxablePay = (n) => {
  let monthlyTax;
  n = parseInt(n);
  if (n <= 12298) {
    monthlyTax = 0.1 * n;
  } else if (n >= 12299 && n <= 23855) {
    monthlyTax = 0.15 * n;
  } else if (n >= 23886 && n <= 35472) {
    monthlyTax = 0.2 * n;
  } else if (n >= 35473 && n <= 47059) {
    monthlyTax = 0.25 * n;
  } else if (n > 47059) {
    monthlyTax = 0.3 * n;
  } else {
    alert(`${n} not in any bracket`);
  }
  console.log(
    `Your monthly tax is ${monthlyTax} calc from a monthly income of ${n}`
  );
  return monthlyTax;
};

const yearlyTaxablePay = (n) => {
  let yearlyTax;
  n = parseInt(n);
  if (n <= 147580) {
    yearlyTax = 0.1 * n;
  } else if (n >= 147581 && n <= 286623) {
    yearlyTax = 0.15 * n;
  } else if (n >= 286624 && n <= 425666) {
    yearlyTax = 0.2 * n;
  } else if (n >= 425667 && n <= 564709) {
    yearlyTax = 2.5 * n;
  } else if (n > 564709) {
    yearlyTax = 0.3 * n;
  } else {
    alert(`${n} not in any bracket`);
  }
  console.log(
    `Your yearly tax is ${yearlyTax} calc from a yearly income of ${n}`
  );
  return yearlyTax;
};

// Get Monthly and Yearly Tax

// NHIF Contribution based on monthly salary
const nhifContribution = (monthlyIncome) => {
  let nhifCont;
  if (monthlyIncome > 1000 && monthlyIncome <= 5999) {
    nhifCont = 150;
  } else if (monthlyIncome >= 6000 && monthlyIncome <= 7999) {
    nhifCont = 300;
  } else if (monthlyIncome >= 8000 && monthlyIncome <= 11999) {
    nhifCont = 400;
  } else if (monthlyIncome >= 12000 && monthlyIncome <= 14999) {
    nhifCont = 500;
  } else if (monthlyIncome >= 15000 && monthlyIncome <= 19999) {
    nhifCont = 600;
  } else if (monthlyIncome >= 20000 && monthlyIncome <= 24999) {
    nhifCont = 750;
  } else if (monthlyIncome >= 25000 && monthlyIncome <= 29999) {
    nhifCont = 850;
  } else if (monthlyIncome >= 30000 && monthlyIncome <= 34999) {
    nhifCont = 900;
  } else if (monthlyIncome >= 35000 && monthlyIncome <= 39999) {
    nhifCont = 950;
  } else if (monthlyIncome >= 40000 && monthlyIncome <= 44999) {
    nhifCont = 1000;
  } else if (monthlyIncome >= 45000 && monthlyIncome <= 49999) {
    nhifCont = 1100;
  } else if (monthlyIncome >= 50000 && monthlyIncome <= 59999) {
    nhifCont = 1200;
  } else if (monthlyIncome >= 60000 && monthlyIncome <= 69999) {
    nhifCont = 1300;
  } else if (monthlyIncome >= 70000 && monthlyIncome <= 79999) {
    nhifCont = 1400;
  } else if (monthlyIncome >= 80000 && monthlyIncome <= 89999) {
    nhifCont = 1500;
  } else if (monthlyIncome >= 90000 && monthlyIncome <= 99999) {
    nhifCont = 1600;
  } else if (monthlyIncome >= 100000) {
    nhifCont = 1700;
  } else {
    alert(`${monthlyIncome} is not on the list`);
  }
  console.log(
    ` Your NHIF contribution is ${nhifCont} calculated from your monthly Income of ${monthlyIncome}`
  );
  return nhifCont;
};

const newNSSFRate = (n) => {
  let newRate;
  if (6000 <= n && n <= 18000) {
    newRate = 0.06 * n;
  } else {
    newRate = 2160;
  }
  console.log(`Your NSSF contribution as per the new rates is ${newRate}`);
  return newRate;
};

const output = document.querySelector(".output"),
  totalSalary = output.querySelector(".total--income"),
  nssfDeduct = output.querySelector(".nssf-deduct"),
  pensionReduced = output.querySelector(".income--pension"),
  benefitsPayed = output.querySelector(".benefits--payed"),
  taxableKsh = output.querySelectorAll(".taxable--income"),
  taxAccrued = output.querySelector(".tax-accrued"),
  personalRelief = output.querySelector(".relief"),
  taxWithoutRelief = output.querySelectorAll(".relief--tax"),
  nhifDeduct = output.querySelector(".nhif-contribution"),
  netPay = output.querySelector(".net--pay");

btnCalculate.addEventListener("click", () => {
  showDeductibles();
  output.style.display = "block";
});

const showDeductibles = () => {
  let yourSal = salary.value;
  let yourBenefits = benefits.value;

  let yourPersonalRelief;
  let yourNSSFContribution;
  let taxToPay;

  if (deductNSSFY.checked && oldNSSF.checked && monthlyPay.checked) {
    yourNSSFContribution = 200;
  } else if (deductNSSFY.checked && newNSSF.checked) {
    yourNSSFContribution = newNSSFRate(yourSal);
  } else if (deductNSSFY.checked && oldNSSF.checked && yearlyPay.checked) {
    yourNSSFContribution = 2400;
  } else if (deductNSSFN.checked) {
    yourNSSFContribution = 0;
  } else {
    alert("Something not working NSSF part");
  }

  let yourNSSFCont = yourNSSFContribution.toFixed(2);
  let salAfterPen = yourSal - yourNSSFCont;
  let yourTaxableIncome = (
    parseInt(salAfterPen) + parseInt(yourBenefits)
  ).toFixed(2);
  let removeRelief;
  let nhifDeducted = nhifContribution(yourTaxableIncome);
  let yourTotal;

  if (monthlyPay.checked) {
    totalSalary.textContent = `Ksh ${yourSal}`;
    nssfDeduct.textContent = `Ksh ${yourNSSFCont}`;
    pensionReduced.textContent = `Ksh ${salAfterPen}`;
    benefitsPayed.textContent = `Ksh ${yourBenefits}`;
    taxableKsh.forEach((tax) => {
      tax.textContent = `Ksh ${yourTaxableIncome}`;
    });
    taxToPay = monthlyTaxablePay(yourTaxableIncome).toFixed(2);
    taxAccrued.textContent = `Ksh ${taxToPay}`;
    yourPersonalRelief = 2400;
    personalRelief.textContent = `Ksh ${yourPersonalRelief}`;
    removeRelief = (taxToPay - yourPersonalRelief).toFixed(2);
    taxWithoutRelief.forEach(
      (taxNoRelief) => (taxNoRelief.textContent = `Ksh ${removeRelief}`)
    );
    nhifDeduct.textContent = `Ksh ${nhifDeducted}`;
    yourTotal = (yourTaxableIncome - (removeRelief + nhifDeducted)).toFixed(2);
    netPay.textContent = `Ksh ${yourTotal}`;
  } else if (yearlyPay.checked) {
    totalSalary.textContent = `Ksh ${yourSal}`;
    nssfDeduct.textContent = `Ksh ${yourNSSFCont}`;
    pensionReduced.textContent = `Ksh ${salAfterPen}`;
    benefitsPayed.textContent = `Ksh ${yourBenefits}`;
    removeRelief = taxToPay - yourPersonalRelief;
    taxableKsh.forEach((tax) => {
      tax.textContent = `Ksh ${yourTaxableIncome}`;
    });
    taxToPay = yearlyTaxablePay(yourTaxableIncome).toFixed(2);
    taxAccrued.textContent = `Ksh ${taxToPay}`;
    yourPersonalRelief = 28800;
    personalRelief.textContent = `Ksh ${yourPersonalRelief}`;
    removeRelief = (taxToPay - yourPersonalRelief).toFixed(2);
    taxWithoutRelief.forEach(
      (taxNoRelief) => (taxNoRelief.textContent = `Ksh ${removeRelief}`)
    );
    yourTotal = (yourTaxableIncome - removeRelief).toFixed(2);
    netPay.textContent = `Ksh ${yourTotal}`;
  } else {
    alert("Something ain't right --month, year");
  }
};
