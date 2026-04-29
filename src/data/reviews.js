// ── Name Censoring ──────────────────────────────────────
export function censorName(name) {
  return name
    .split(" ")
    .map(word => word[0] + "*".repeat(word.length - 1))
    .join(" ");
}

const FIRST_NAMES = ["Agus", "Ahmad", "Andi", "Bambang", "Budi", "Cahyo", "Dedi", "Dwi", "Eko", "Fajar", "Gunawan", "Hadi", "Hendra", "Iwan", "Joko", "Krisna", "Lukman", "Maulana", "Nanda", "Oki", "Purnomo", "Rahmat", "Rizky", "Slamet", "Teguh", "Umar", "Wahyu", "Yanto", "Zainal", "Arif", "Surya", "Dimas", "Feri", "Galih", "Hanif", "Irfan", "Kurnia", "Lutfi", "Mulyadi", "Nugroho", "Prasetyo", "Rudi", "Sigit", "Tri", "Wawan", "Yusuf", "Bayu", "Danang", "Firman", "Gilang", "Siti", "Nur", "Sri", "Dewi", "Ratna", "Yuni", "Rina", "Wati", "Lina", "Ayu", "Maya", "Fitri", "Indah", "Mega", "Putri", "Tika", "Wulan", "Nita", "Dian", "Lia", "Sulis", "Rini", "Ani", "Ika", "Eni", "Tatik", "Yayuk", "Suci", "Nining", "Tutik", "Muji", "Hartini", "Sulastri", "Endah", "Nanik", "Puji", "Retno", "Sumiyati", "Titik", "Wigati"];
const LAST_NAMES = ["Hartono", "Santoso", "Wijaya", "Susanto", "Prasetyo", "Nugroho", "Setiawan", "Hidayat", "Kurniawan", "Saputra", "Wibowo", "Suryadi", "Rahmawan", "Firmansyah", "Wicaksono", "Utomo", "Prabowo", "Handoko", "Sugiyanto", "Mulyono", "Sutrisno", "Haryanto", "Sumarno", "Budiman", "Yulianto", "Sugiarto", "Darmawan", "Wahyudi", "Subagyo", "Purwanto", "Kusuma", "Lestari", "Puspita", "Sulistyowati", "Rahayu", "Indriani", "Permatasari", "Handayani", "Anggraini", "Kusumawardani", "Setyaningsih", "Wulandari", "Cahyani", "Fitriani", "Maharani", "Nuraini", "Safitri", "Damayanti", "Mulyani", "Agustina"];
const CITIES = ["Surabaya", "Sidoarjo", "Gresik", "Mojokerto", "Pasuruan", "Malang", "Jombang", "Lamongan", "Tuban", "Bojonegoro", "Kediri", "Blitar", "Tulungagung", "Nganjuk", "Madiun", "Ponorogo", "Banyuwangi", "Jember", "Lumajang", "Probolinggo", "Bangkalan", "Sumenep", "Pamekasan", "Sampang", "Ngawi", "Magetan", "Pacitan", "Waru", "Krian", "Taman", "Gedangan"];
const ROLES = ["Kontraktor", "Petani", "Pengusaha", "Manajer Produksi", "Teknisi", "Tukang Las", "Pemilik Bengkel", "Pemilik Toko", "Tukang Bangunan", "Mandor", "Insinyur", "Distributor", "Supplier", "Wiraswasta", "Pedagang", "Montir", "Mekanik", "Pengelola Gudang", "Peternak", "Nelayan", "Tukang Kayu", "Arsitek", "Pemilik Pabrik", "Kepala Proyek", "Pengrajin", "Pekerja Lapangan"];
const PRODUCTS = ["Sparepart Industri", "Pesanan Custom", "Alat Pertanian", "Pagar Custom", "Suku Cadang Mesin", "Pisau Pencacah", "Gagang Pintu Besi", "Engsel Berat", "Cangkul Baja", "Parang Tempa"];

// ── Mix & Match Pools ──────────────────────────────────
const OPENINGS = [
  "Mantap bosku!", "Jos gandoz!", "Alhamdulillah paket sudah sampai,", "Puas banget belanja di sini,", "Barang joss,", "Gak nyesel order di sini,", "Suwun Pak Harisun,", "Sangat terpercaya,", "Hasil kerjanya luar biasa,", "Top bgt pokoknya,", "Recommended seller!", "Asli pengrajin Sidoarjo emang beda,", "Kualitas juara,", "Bener-bener ahli besi,", "Sangat puas dengan hasilnya,",
];

const QUALITIES = [
  "bahan besinya tebel dan kokoh pol,", "kualitas {prod}-nya gak main-main,", "hasil las-lasannya rapi banget,", "finishingnya halus dan presisi,", "besi pilihannya beneran kuat,", "craftsmanship-nya detail sekali,", "produknya kokoh dan berat,", "materialnya berkualitas tinggi,", "pengerjaannya sangat teliti,", "hasil tempaannya beneran rapi,",
];

const EXPERIENCES = [
  "sudah {dur} dipakai kerja rodi masih awet.", "pas banget buat kebutuhan proyek saya.", "pengerjaan {prod} ini sangat presisi.", "sudah {cnt}x repeat order selalu puas.", "sesuai spesifikasi yang diminta.", "melebihi ekspektasi saya hasilnya.", "teman-teman di {city} juga pada nanya pesen dimana.", "bakal jadi langganan tetap ini mah.", "harganya paling miring untuk kualitas segini.", "respon cepat dan pengerjaan tepat waktu.",
];

const CLOSINGS = [
  "Rekomen parah!", "Pasti pesan lagi.", "Sukses terus usahanya!", "Joss pokoknya.", "Jempol lima buat Kureksari Blacksmith.", "Sangat amanah.", "Bakal repeat order buat proyek selanjutnya.", "Terbaik se-Sidoarjo.", "Gak usah ragu pesen di sini.", "Maturnuwun sanget.", "Maju terus pengrajin lokal!", "Rating bintang 5 gak cukup ini mah.",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReviews(count = 520) {
  const reviews = [];
  const durations = ["1 tahun", "2 tahun", "3 tahun", "6 bulan", "1.5 tahun", "4 tahun", "sejak lama", "setahun lebih"];
  const counts = ["3", "4", "5", "beberapa", "2", "6", "berkali-kali", "10"];

  for (let i = 0; i < count; i++) {
    const name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    const city = pick(CITIES);
    const prod = pick(PRODUCTS).toLowerCase();
    
    // Create unique combined text
    let text = `${pick(OPENINGS)} ${pick(QUALITIES)} ${pick(EXPERIENCES)} ${pick(CLOSINGS)}`;
    
    // Replace placeholders
    text = text.replace(/{prod}/g, prod);
    text = text.replace(/{dur}/g, pick(durations));
    text = text.replace(/{cnt}/g, pick(counts));
    text = text.replace(/{city}/g, city);

    reviews.push({
      id: i + 1,
      name,
      city,
      role: pick(ROLES),
      rating: Math.random() < 0.9 ? 5 : 4,
      text,
      product: pick(PRODUCTS),
      verified: Math.random() < 0.9,
    });
  }

  // Final shuffle
  return reviews.sort(() => Math.random() - 0.5);
}

export const ALL_REVIEWS = generateReviews(520);
