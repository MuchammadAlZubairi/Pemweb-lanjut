function hitungNilaiAkhir(nilaiSC1, nilaiSC2, nilaiSC3, nilaiSC4, nilaiSC5, persentaseKehadiran) {
    // Validasi input
    if (persentaseKehadiran < 0 || persentaseKehadiran > 100) {
        return "Persentase kehadiran tidak valid";
    }
    
    // Cek kondisi kehadiran
    if (persentaseKehadiran < 80) {
        return "E (Kehadiran di bawah 80%)";
    }
    
    // Hitung nilai akhir dengan bobot
    const nilaiAkhir = (nilaiSC1 * 0.20) + 
                       (nilaiSC2 * 0.15) + 
                       (nilaiSC3 * 0.15) + 
                       (nilaiSC4 * 0.25) + 
                       (nilaiSC5 * 0.25);
    
    // Konversi ke nilai huruf
    if (nilaiAkhir >= 80) {
        return "A";
    } else if (nilaiAkhir > 72 && nilaiAkhir < 80) {
        return "AB";
    } else if (nilaiAkhir >= 65 && nilaiAkhir < 72) {
        return "B";
    } else if (nilaiAkhir >= 60 && nilaiAkhir < 65) {
        return "BC";
    } else if (nilaiAkhir >= 50 && nilaiAkhir < 60) {
        return "C";
    } else if (nilaiAkhir >= 40 && nilaiAkhir < 50) {
        return "D";
    } else {
        return "E";
    }
}

const nilaiSC1 = 82;
const nilaiSC2 = 78;
const nilaiSC3 = 69;
const nilaiSC4 = 65;
const nilaiSC5 = 30;
const kehadiran = 85;

const nilaiHuruf = hitungNilaiAkhir(nilaiSC1, nilaiSC2, nilaiSC3, nilaiSC4, nilaiSC5, kehadiran);
console.log(`Nilai Akhir: ${nilaiHuruf}`);