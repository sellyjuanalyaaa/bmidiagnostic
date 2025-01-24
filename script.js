// Tangkap elemen penting
const navbarToggle = document.getElementById("navbarToggle");
const navbarLinks = document.getElementById("navbarLinks");
const form = document.getElementById("bmiCalculator");
const resultSection = document.getElementById("bmi-result");
const resultText = document.getElementById("result");
const explanationText = document.getElementById("explanation");
const indicator = document.getElementById("indicator");
const resetBtn = document.getElementById("resetBtn");


navbarToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("show");
  });
// Fungsi untuk menghitung BMI
function calculateBMI(weight, height) {
  return (weight / ((height / 100) ** 2)).toFixed(1);
}

// Fungsi untuk menjelaskan hasil BMI
function explainBMI(bmi, age) {
  if (age < 18) {
    return "Perhitungan BMI mungkin tidak akurat untuk anak-anak dan remaja.";
  }
  if (bmi < 18.5) return "Anda berada dalam kategori kekurangan berat badan.";
  if (bmi >= 18.5 && bmi < 24.9) return "Anda memiliki berat badan normal.";
  if (bmi >= 25 && bmi < 29.9) return "Anda berada dalam kategori kelebihan berat badan.";
  return "Anda berada dalam kategori obesitas.";
}

// Fungsi untuk memperbarui posisi grafik BMI
function updateGraph(bmi) {
  let position;
  if (bmi < 18.5) {
    position = (bmi / 18.5) * 25;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    position = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25;
  } else if (bmi >= 25 && bmi < 29.9) {
    position = 50 + ((bmi - 25) / (29.9 - 25)) * 25;
  } else {
    position = 75 + ((bmi - 30) / 10) * 25;
  }

  indicator.style.left = `calc(${Math.min(Math.max(position, 0), 100)}% - 6px)`;
}

// Event listener pada form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseFloat(document.getElementById("age").value);

  if (!gender || !weight || !height || !age) {
    alert("Harap isi semua kolom!");
    return;
  }

  // Hitung BMI
  const bmi = calculateBMI(weight, height);
  const explanation = explainBMI(bmi, age);

  // Tampilkan hasil dan grafik
  resultText.textContent = `BMI Anda: ${bmi}`;
  explanationText.textContent = explanation;
  resultSection.style.display = "block"; // Tampilkan hasil
  updateGraph(bmi); // Update grafik
});

// Event listener pada tombol reset
resetBtn.addEventListener("click", function () {
  // Reset semua input di form
  document.getElementById("bmiCalculator").reset();
  
  // Sembunyikan hasil
  resultSection.style.display = "none";
});

