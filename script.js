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
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");


const enabledarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
}

const disabledarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
}

if (darkmode === "active") {
  enabledarkmode();
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  if (darkmode !== "active") {
    enabledarkmode();
  } else {
    disabledarkmode();
  }
});
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
// Fungsi untuk validasi input
function validateInput(gender, weight, height, age) {
  if (!gender) {
    alert("Harap isi kolom gender!");
    return false;
  }

  if (!age || age <= 0 || age > 100) {
    alert(`Umur harus antara 1 hingga 100 tahun. Nilai yang diinputkan adalah ${age || "kosong"}.`);
    return false;
  }

  if (!height || height <= 0 || height > 200) {
    alert(`Tinggi badan harus antara 1 hingga 200 cm. Nilai yang diinputkan adalah ${height || "kosong"}.`);
    return false;
  }

  if (!weight || weight <= 0 || weight > 200) {
    alert(`Berat badan harus antara 1 hingga 200 kg. Nilai yang diinputkan adalah ${weight || "kosong"}.`);
    return false;
  }

  // Jika semua validasi terpenuhi
  return true;
}
// Event listener pada form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseFloat(document.getElementById("age").value);

  // Panggil fungsi validasi
  const isValid = validateInput(gender, weight, height, age);
  if (!isValid) return; // Jika tidak valid, hentikan proses

  // Hitung BMI
  const bmi = calculateBMI(weight, height);
  const { statusTitle, statusDescription, healthRisks } = explainBMI(bmi, age);

  // Tampilkan hasil, deskripsi, dan risiko penyakit
  document.getElementById("result").textContent = `BMI Anda: ${bmi}`;
  document.getElementById("status-title").textContent = statusTitle;
  document.getElementById("status-description").textContent = statusDescription;
  document.getElementById("health-risks").textContent = healthRisks;
  resultSection.style.display = "block";

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
  form.reset();

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
 
 // Example JavaScript for smooth scrolling
 console.log('Scroll Event Triggered');
 console.log('Checking elements:', document.querySelectorAll('.scroll-animation'));

 // Fungsi untuk memeriksa apakah elemen berada di dalam viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Fungsi untuk menangani animasi fade-in
function handleScrollFadeIn() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add('show'); // Tambahkan kelas 'show' saat elemen terlihat
    }
  });
}

// Event listener untuk scroll dan saat halaman selesai dimuat
window.addEventListener('scroll', handleScrollFadeIn);
window.addEventListener('load', handleScrollFadeIn);

