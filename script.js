// Tangkap elemen penting
const navbarToggle = document.getElementById("navbarToggle");
const navbarLinks = document.getElementById("navbarLinks");
const form = document.getElementById("bmiCalculator");
const resultSection = document.getElementById("bmi-result");
const resultText = document.getElementById("result");
const explanationText = document.getElementById("explanation");
const indicator = document.getElementById("indicator");
const resetBtn = document.getElementById("resetBtn");
const disclaimerText = document.getElementById("disclaimer"); // Elemen untuk disclaimer

// Event listener untuk toggle navbar
navbarToggle.addEventListener("click", () => {
  navbarLinks.classList.toggle("show");
});

// Fungsi untuk menghitung BMI
function calculateBMI(weight, height) {
  return (weight / ((height / 100) ** 2)).toFixed(1);
}

// Fungsi untuk menjelaskan hasil BMI dengan detail dan penyakit terkait
function explainBMI(bmi, age) {
  let statusTitle, statusDescription, healthRisks;

  if (age < 18) {
    statusTitle = "Perhatian untuk Anak-anak dan Remaja";
    statusDescription =
      "Perhitungan BMI mungkin tidak akurat untuk anak-anak dan remaja.";
    healthRisks = "Konsultasikan dengan dokter untuk analisis lebih lanjut.";
  } else if (bmi < 18.5) {
    statusTitle = "Kekurangan Berat Badan";
    statusDescription =
      "Anda berada dalam kategori kekurangan berat badan. Disarankan untuk mengkonsultasikan kondisi ini dengan ahli gizi.";
    healthRisks =
      "Kemungkinan penyakit: Anemia, osteoporosis, gangguan kekebalan tubuh, dan malnutrisi.";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    statusTitle = "Berat Badan Normal";
    statusDescription =
      "Anda memiliki berat badan normal. Pertahankan pola makan sehat dan rutin berolahraga.";
    healthRisks = "Risiko penyakit rendah. Pertahankan gaya hidup sehat.";
  } else if (bmi >= 25 && bmi < 29.9) {
    statusTitle = "Kelebihan Berat Badan";
    statusDescription =
      "Anda berada dalam kategori kelebihan berat badan. Cobalah untuk mengatur pola makan dan meningkatkan aktivitas fisik.";
    healthRisks =
      "Kemungkinan penyakit: Tekanan darah tinggi, diabetes tipe 2, penyakit jantung.";
  } else {
    statusTitle = "Obesitas";
    statusDescription =
      "Anda berada dalam kategori obesitas. Sangat disarankan untuk menghubungi ahli gizi atau dokter untuk penanganan lebih lanjut.";
    healthRisks =
      "Kemungkinan penyakit: Diabetes tipe 2, penyakit jantung koroner, sleep apnea, dan osteoarthritis.";
  }

  return { statusTitle, statusDescription, healthRisks };
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
  const { statusTitle, statusDescription, healthRisks } = explainBMI(bmi, age);

  // Tampilkan hasil, deskripsi, dan risiko penyakit
  resultText.textContent = `BMI Anda: ${bmi}`;
  explanationText.textContent = statusTitle;
  document.getElementById("status-title").textContent = statusTitle;
  document.getElementById("status-description").textContent = statusDescription;
  document.getElementById("health-risks").textContent = healthRisks;

  // Tambahkan disclaimer
  disclaimerText.textContent =
    "BMI tidak sepenuhnya mewakili diagnosis menyeluruh dari kesehatan tubuh dan risiko penyakit seseorang. Anda perlu konsultasi lebih lanjut mengenai risiko dan kekhawatiran Anda terkait dengan berat badan Anda.";

  // Tampilkan hasil dan update grafik
  resultSection.style.display = "block";
  updateGraph(bmi);
});

// Event listener pada tombol reset
resetBtn.addEventListener("click", function () {
  // Reset semua input di form
  document.getElementById("bmiCalculator").reset();

  // Sembunyikan hasil
  resultSection.style.display = "none";
});
 // Example JavaScript for additional footer functionality
 const footerLinks = document.querySelectorAll('footer a');
 footerLinks.forEach(link => {
   link.addEventListener('mouseover', () => {
     link.style.textDecoration = 'underline';
   });
   link.addEventListener('mouseout', () => {
     link.style.textDecoration = 'none';
   });
 });
