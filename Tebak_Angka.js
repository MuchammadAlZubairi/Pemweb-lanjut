// Fungsi utama game tebak angka
function tebakAngka() {
    // Generate angka acak antara 1-100
    const angkaRahasia = Math.floor(Math.random() * 100) + 1;
    let jumlahTebakan = 0;
    let tebakan;
    
    console.log("=== GAME TEBAK ANGKA ===");
    console.log("Saya telah memilih angka antara 1 sampai 100. Coba tebak!");
    
    // Membuat interface untuk input di Node.js
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // Fungsi rekursif untuk meminta tebakan
    const askGuess = () => {
        readline.question("Masukkan tebakan Anda: ", (input) => {
            tebakan = parseInt(input);
            jumlahTebakan++;
            
            // Validasi input
            if (isNaN(tebakan)) {  // <-- This was the error - extra parenthesis
                console.log("Masukkan harus berupa angka!");
                askGuess();
                return;
            }
            
            if (tebakan < 1 || tebakan > 100) {
                console.log("Masukkan angka antara 1 sampai 100!");
                askGuess();
                return;
            }
            
            // Cek tebakan
            if (tebakan === angkaRahasia) {
                console.log(`Jawaban benar! Anda membutuhkan ${jumlahTebakan} kali percobaan untuk menebaknya!`);
                readline.close();
            } else if (tebakan < angkaRahasia) {
                console.log("Jawaban salah, angkanya terlalu kecil, masukkan angka lain!");
                askGuess();
            } else {
                console.log("Jawaban salah, angkanya terlalu besar, masukkan angka lain!");
                askGuess();
            }
        });
    };
    
    // Mulai game
    askGuess();
}

// Jalankan game
tebakAngka();