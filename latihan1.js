// Fungsi untuk menghitung nilai huruf
function hitungNilaiAkhir(nilai, kehadiran) {
    // Jika kehadiran di bawah 80%, otomatis E
    if (kehadiran < 80) return "E";
  
    // Bobot dari masing-masing Sub CPMK
    const bobot = {
      SC1: 20,
      SC2: 15,
      SC3: 15,
      SC4: 25,
      SC5: 25
    };
  
    // Hitung nilai akhir berdasarkan bobot
    let nilaiAkhir = (
      nilai.SC1 * (bobot.SC1 / 100) +
      nilai.SC2 * (bobot.SC2 / 100) +
      nilai.SC3 * (bobot.SC3 / 100) +
      nilai.SC4 * (bobot.SC4 / 100) +
      nilai.SC5 * (bobot.SC5 / 100)
    );
  
    // Konversi ke nilai huruf
    if (nilaiAkhir >= 80) return "A";
    else if (nilaiAkhir > 72) return "AB";
    else if (nilaiAkhir >= 65) return "B";
    else if (nilaiAkhir >= 60) return "BC";
    else if (nilaiAkhir >= 50) return "C";
    else if (nilaiAkhir >= 40) return "D";
    else return "E";
  }
  
  // Contoh input nilai dan kehadiran
  const nilaiMahasiswa = {
    SC1: 80,
    SC2: 70,
    SC3: 75,
    SC4: 85,
    SC5: 90
  };
  
  const kehadiran = 85;
  
  // Cetak hasil
  const nilaiHuruf = hitungNilaiAkhir(nilaiMahasiswa, kehadiran);
  console.log("Nilai Huruf:", nilaiHuruf);
  