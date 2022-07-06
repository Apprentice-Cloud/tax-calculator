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
  console.log(n);
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
  switch (n) {
    case n <= 147580:
      yearlyTax = 0.1 * n;
      break;
    case 147581 <= n <= 286623:
      yearlyTax = 0.15 * n;
      break;
    case 286624 <= n <= 425666:
      yearlyTax = 0.2 * n;
      break;
    case 425667 <= n <= 564709:
      yearlyTax = 2.5 * n;
      break;
    case n > 564709:
      yearlyTax = 0.3 * n;
      break;
    default:
      alert(`${n} not in any bracket`);
      break;
  }
  console.log(
    `Your monthly tax is ${yearlyTax} calc from a monthly income of ${n}`
  );
  return yearlyTax;
};

// Get Monthly and Yearly Tax

// NHIF Contribution based on monthly salary
const nhifContribution = (monthlyIncome) => {
  let nhifCont;
  switch (monthlyIncome) {
    case 1000 < monthlyIncome <= 5999:
      nhifCont = 150;
      break;
    case 6000 <= monthlyIncome <= 7999:
      nhifCont = 300;
      break;
    case 8000 <= monthlyIncome <= 11999:
      nhifCont = 400;
      break;
    case 12000 <= monthlyIncome <= 14999:
      nhifCont = 500;
      break;
    case 15000 <= monthlyIncome <= 19999:
      nhifCont = 600;
      break;
    case 20000 <= monthlyIncome <= 24999:
      nhifCont = 750;
      break;
    case 25000 <= monthlyIncome <= 29999:
      nhifCont = 850;
      break;
    case 30000 <= monthlyIncome <= 34999:
      nhifCont = 900;
      break;
    case 35000 <= monthlyIncome <= 39999:
      nhifCont = 950;
      break;
    case 40000 <= monthlyIncome <= 44999:
      nhifCont = 1000;
      break;
    case 45000 <= monthlyIncome <= 49999:
      nhifCont = 1100;
      break;
    case 50000 <= monthlyIncome <= 59999:
      nhifCont = 1200;
      break;
    case 60000 <= monthlyIncome <= 69999:
      nhifCont = 1300;
      break;
    case 70000 <= monthlyIncome <= 79999:
      nhifCont = 1400;
      break;
    case 80000 <= monthlyIncome <= 89999:
      nhifCont = 1500;
      break;
    case 90000 <= monthlyIncome <= 99999:
      nhifCont = 1600;
      break;
    case monthlyIncome >= 100000:
      nhifCont = 1700;
      break;
    default:
      alert(`${monthlyIncome} is not on the list`);
      break;
  }
  console.log(
    ` Your NHIF contribution is ${nhifCont} calculated from your monthly Income of ${monthlyIncome}`
  );
  return nhifCont;
};

// NSSF Rates
let oldNSSFRate = 200;

const newNSSFRate = (n) => {
  let newRate;
  if (6000 <= n <= 18000) {
    newRate = 0.6 * n;
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

console.log(totalSalary);

btnCalculate.addEventListener("click", () => {
  showDeductibles();
  //   console.log(salary.value, benefits.value);
  console.log(newNSSF.checked);
  console.log(deductNHIFY.checked);
  console.log(deductNHIFN.checked);
});

const showDeductibles = () => {
  let yourSal = salary.value;
  let yourBenefits = benefits.value;

  let yourTotal;
  let yourPersonalRelief;
  let yourNSSFContribution;
  let taxToPay;

  if (deductNSSFY.checked && oldNSSF.checked) {
    yourNSSFContribution = 200;
  } else if (deductNSSFY.checked && newNSSF.checked) {
    yourNSSFContribution = newNSSFRate(yourSal);
  } else if (deductNSSFN.checked) {
    yourNSSFContribution = 0;
  } else {
    alert("Something not working NSSF part");
  }

  let yourNSSFCont = yourNSSFContribution.toFixed(2);
  let salAfterPen = yourSal - yourNSSFCont;
  let yourTaxableIncome = parseInt(salAfterPen) + parseInt(yourBenefits);
  let removeRelief;
  console.log(yourTaxableIncome);

  if (monthlyPay.checked) {
    totalSalary.textContent = `Ksh ${yourSal}`;
    nssfDeduct.textContent = `Ksh ${yourNSSFCont}`;
    pensionReduced.textContent = `Ksh ${salAfterPen}`;
    benefitsPayed.textContent = `Ksh ${yourBenefits}`;
    taxableKsh.forEach((tax) => {
      tax.textContent = `Ksh ${yourTaxableIncome}`;
    });
    taxToPay = monthlyTaxablePay(yourTaxableIncome);
    taxAccrued.textContent = `Ksh ${taxToPay}`;
    yourPersonalRelief = 2400;
    personalRelief.textContent = `Ksh ${yourPersonalRelief}`;
    removeRelief = taxToPay - yourPersonalRelief;
    taxWithoutRelief.forEach(
      (taxNoRelief) => (taxNoRelief.textContent = `Ksh ${removeRelief}`)
    );
  } else if (yearlyPay.checked) {
    totalSalary.textContent = `Ksh ${yourSal}`;
    nssfDeduct.textContent = `Ksh ${yourNSSFCont}`;
    pensionReduced.textContent = `Ksh ${salAfterPen}`;
    benefitsPayed.textContent = `Ksh ${yourBenefits}`;
    removeRelief = taxToPay - yourPersonalRelief;
    taxableKsh.forEach((tax) => {
      tax.textContent = `Ksh ${yourTaxableIncome}`;
    });
    taxToPay = yearlyTaxablePay(yourTaxableIncome);
    taxAccrued.textContent = `Ksh ${taxToPay}`;
    yourPersonalRelief = 28800;
    personalRelief.textContent = `Ksh ${yourPersonalRelief}`;
    taxWithoutRelief.forEach(
      (taxNoRelief) => (taxNoRelief.textContent = `Ksh ${removeRelief}`)
    );
  } else {
    alert("Something ain't right --month, year");
  }
};
