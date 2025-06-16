const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Fungsi untuk memvalidasi password
 * @param {string} password - Password yang akan divalidasi
 * @param {string} confirmPassword - Konfirmasi password
 * @returns {object} Objek hasil validasi
 */
function validatePassword(password, confirmPassword) {
    const validation = {
        isValid: true,
        criteria: {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            match: password === confirmPassword && password !== ''
        },
        messages: []
    };
    
    // Cek setiap kriteria
    if (!validation.criteria.length) {
        validation.messages.push("Password harus memiliki minimal 8 karakter");
    }
    if (!validation.criteria.uppercase) {
        validation.messages.push("Password harus mengandung minimal 1 huruf besar (A-Z)");
    }
    if (!validation.criteria.lowercase) {
        validation.messages.push("Password harus mengandung minimal 1 huruf kecil (a-z)");
    }
    if (!validation.criteria.number) {
        validation.messages.push("Password harus mengandung minimal 1 angka (0-9)");
    }
    if (!validation.criteria.specialChar) {
        validation.messages.push("Password harus mengandung minimal 1 karakter khusus");
    }
    if (!validation.criteria.match) {
        validation.messages.push("Password dan konfirmasi password harus sama");
    }
    
    validation.isValid = Object.values(validation.criteria).every(c => c);
    
    return validation;
}

/**
 * Fungsi untuk meminta input dengan readline
 * @param {string} question Pertanyaan untuk user
 * @returns {Promise<string>} Jawaban dari user
 */
function askQuestion(question) {
    return new Promise((resolve) => {
        readline.question(question, (answer) => {
            resolve(answer);
        });
    });
}

/**
 * Fungsi utama untuk menjalankan validasi
 */
async function runPasswordValidator() {
    console.log("\n=== PROGRAM VALIDASI PASSWORD ===");
    
    // Meminta input dari pengguna
    const password = await askQuestion("Masukkan password Anda: ");
    const confirmPassword = await askQuestion("Konfirmasi password Anda: ");
    
    // Validasi password
    const result = validatePassword(password, confirmPassword);
    
    // Menampilkan hasil
    console.log("\n=== HASIL VALIDASI ===");
    
    if (result.isValid) {
        console.log("✅ Password Anda valid dan aman!");
        console.log("Semua kriteria keamanan telah terpenuhi.");
    } else {
        console.log("❌ Password tidak memenuhi kriteria berikut:\n");
        console.log(result.messages.join("\n"));
        console.log("\nSilakan coba lagi dengan password yang lebih kuat.");
    }
    
    // Tanya pengguna apakah ingin mencoba lagi
    const tryAgain = await askQuestion("\nApakah Anda ingin mencoba lagi? (y/n): ");
    if (tryAgain.toLowerCase() === 'y') {
        await runPasswordValidator();
    } else {
        console.log("Terima kasih telah menggunakan validator password!");
    }
    
    readline.close();
}

// Jalankan program
runPasswordValidator().catch(err => {
    console.error("Terjadi error:", err);
    readline.close();
});