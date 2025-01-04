// Ambil elemen dari DOM
const form = document.querySelector('form');
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');

// Tambahkan event listener untuk menangani submit form
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Mencegah halaman reload

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validasi input
    if (!username || !password) {
        alert('Username dan password harus diisi!');
        return;
    }

    try {
        // Kirim data ke server menggunakan fetch API
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Tangani respon dari server
        if (response.ok) {
            const result = await response.json();
            alert(`Login berhasil! Selamat datang, ${result.username}`);
            window.location.href = '/dashboard'; // Redirect ke halaman dashboard
        } else {
            const error = await response.json();
            alert(`Login gagal: ${error.message}`);
        }
    } catch (error) {
        alert('Terjadi kesalahan saat memproses login. Silakan coba lagi.');
        console.error('Error:', error);
    }
});
