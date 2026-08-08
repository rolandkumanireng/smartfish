    // Mengambil elemen navbar dari HTML
const navbar = document.getElementById('navbar');

// Memantau pergerakan scroll pada halaman
window.addEventListener('scroll', () => {
    // Jika halaman di-scroll lebih dari 50 pixel ke bawah
    if (window.scrollY > 50) {
        // Tambahkan class "scrolled" ke navbar
        navbar.classList.add('scrolled');
    } else {
        // Jika kembali ke paling atas, hapus class "scrolled"
        navbar.classList.remove('scrolled');
    }
});
