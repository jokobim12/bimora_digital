-- ====================================================
-- SUPABASE DATABASE SCHEMA FOR BIMORA DIGITAL
-- Copy and run this script in Supabase SQL Editor
-- ====================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INT NOT NULL,
    original_price INT NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews INT DEFAULT 0,
    badge TEXT,
    "desc" TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    preview_slug TEXT,
    available BOOLEAN DEFAULT TRUE,
    color TEXT,
    thumbnail TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. INVITATIONS TABLE (Wedding Data)
CREATE TABLE IF NOT EXISTS invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    template_type TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Groom
    groom_name TEXT NOT NULL,
    groom_nickname TEXT NOT NULL,
    groom_parents TEXT,
    groom_photo TEXT,
    
    -- Bride
    bride_name TEXT NOT NULL,
    bride_nickname TEXT NOT NULL,
    bride_parents TEXT,
    bride_photo TEXT,
    
    couple_photo TEXT,
    wedding_date DATE NOT NULL,
    akad_time TEXT NOT NULL,
    resepsi_time TEXT NOT NULL,
    location_name TEXT NOT NULL,
    location_address TEXT NOT NULL,
    maps_embed TEXT NOT NULL,
    maps_link TEXT NOT NULL,
    
    -- Assets
    music_url TEXT,
    gifts JSONB DEFAULT '[]'::jsonb,
    stories JSONB DEFAULT '[]'::jsonb,
    gallery JSONB DEFAULT '[]'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. WISHES TABLE (Guestbook / RSVP)
CREATE TABLE IF NOT EXISTS wishes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invitation_slug TEXT REFERENCES invitations(slug) ON DELETE CASCADE,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    attendance TEXT NOT NULL,
    time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY, -- e.g., ORD-1001
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    product_name TEXT NOT NULL,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK (status IN ('Menunggu Pembayaran', 'Diproses', 'Selesai', 'Dibatalkan')),
    total_price INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. APP SETTINGS TABLE
CREATE TABLE IF NOT EXISTS app_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Single row configuration
    wa_number TEXT NOT NULL,
    instagram TEXT NOT NULL,
    service_hours TEXT NOT NULL,
    wa_message_default TEXT NOT NULL
);

-- 6. ABOUT US TABLE
CREATE TABLE IF NOT EXISTS about_us (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    desc_short TEXT NOT NULL,
    story_title TEXT NOT NULL,
    story1 TEXT NOT NULL,
    story2 TEXT NOT NULL,
    story3 TEXT NOT NULL,
    values JSONB DEFAULT '[]'::jsonb,
    team JSONB DEFAULT '[]'::jsonb
);

-- 7. PORTFOLIOS TABLE
CREATE TABLE IF NOT EXISTS portfolios (
    id TEXT PRIMARY KEY,
    couple TEXT NOT NULL,
    template TEXT NOT NULL,
    date TEXT NOT NULL,
    slug TEXT REFERENCES invitations(slug) ON DELETE SET NULL,
    category TEXT NOT NULL
);

-- 8. ORDER STEPS TABLE
CREATE TABLE IF NOT EXISTS order_steps (
    id TEXT PRIMARY KEY,
    num TEXT NOT NULL,
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    icon_type TEXT NOT NULL,
    action_text TEXT,
    action_link TEXT
);

-- ====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_steps ENABLE ROW LEVEL SECURITY;

-- 1. Products Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write access to products" ON products FOR ALL TO authenticated USING (true);

-- 2. Invitations Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read access to invitations" ON invitations FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write access to invitations" ON invitations FOR ALL TO authenticated USING (true);

-- 3. Wishes Policies (Public Read/Write/Insert)
CREATE POLICY "Allow public select access to wishes" ON wishes FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to wishes" ON wishes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated admin delete access to wishes" ON wishes FOR DELETE TO authenticated USING (true);

-- 4. Orders Policies (Admin Read/Write)
CREATE POLICY "Allow authenticated admin read access to orders" ON orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated admin write access to orders" ON orders FOR ALL TO authenticated USING (true);

-- 5. App Settings Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read access to app_settings" ON app_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write access to app_settings" ON app_settings FOR ALL TO authenticated USING (true);

-- 6. About Us Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read access to about_us" ON about_us FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write access to about_us" ON about_us FOR ALL TO authenticated USING (true);

-- 7. Portfolios Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read access to portfolios" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write access to portfolios" ON portfolios FOR ALL TO authenticated USING (true);

-- 8. Order Steps Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read access to order_steps" ON order_steps FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write access to order_steps" ON order_steps FOR ALL TO authenticated USING (true);

-- ====================================================
-- SEED INITIAL DATA (DUMMY DATA)
-- ====================================================

-- Seed Products
INSERT INTO products (id, name, category, price, original_price, rating, reviews, badge, "desc", features, preview_slug, available, color) VALUES
(1, 'Adat Jawa Premium – Gelap Megah', 'Adat Jawa', 149000, 199000, 5.00, 48, 'Terlaris', 'Desain luhur dengan ornamen gunungan wayang kulit, animasi megah, latar gelap berkelas, dan iringan gending Jawa klasik.', '["Countdown Hari H", "Love Story Timeline", "Galeri 15 Foto", "Kustom Musik MP3", "Maps Interaktif", "Form RSVP"]'::jsonb, 'bimantara-clara', TRUE, 'from-stone-900 to-stone-800'),
(5, 'Adat Jawa Premium – Cerah Jawa', 'Adat Jawa', 149000, 199000, 5.00, 32, 'Baru', 'Keindahan tradisi Jawa dalam balutan warna cerah yang hangat, luhur, bersih, anggun, dengan ornamen gunungan, dan iringan gending Jawa.', '["Countdown Hari H", "Love Story Timeline", "Galeri 15 Foto", "Kustom Musik MP3", "Maps Interaktif", "Form RSVP"]'::jsonb, 'prabowo-ayu', TRUE, 'from-orange-100 to-amber-50 text-amber-800'),
(2, 'Modern Emerald Gold – Minimalis Elegan', 'Modern', 129000, 169000, 4.00, 23, 'Segera Hadir', 'Perpaduan hijau emerald dengan emas yang bersih, modern, dan berkesan mewah tanpa kesan berlebihan.', '["Countdown Hari H", "Galeri 10 Foto", "Maps Interaktif", "Form RSVP", "Musik Latar"]'::jsonb, NULL, FALSE, 'from-emerald-900 to-emerald-800'),
(3, 'Nuansa Islami – Putih Sakral', 'Islami', 139000, 179000, 5.00, 15, 'Segera Hadir', 'Desain suci bernuansa Islam dengan kaligrafi Arab, ornamen arabesque, warna putih & emas lembut.', '["Countdown Hari H", "Kaligrafi Bismillah", "Galeri 12 Foto", "Maps Interaktif", "Form RSVP"]'::jsonb, NULL, FALSE, 'from-amber-950 to-amber-900'),
(4, 'Sunda Tradisional – Mekar Parahyangan', 'Sunda', 149000, 189000, 5.00, 0, 'Segera Hadir', 'Kecantikan tradisi Sunda dalam digital – motif kain batik Parahyangan dengan warna biru indigo elegan.', '["Countdown Hari H", "Love Story", "Galeri 12 Foto", "Maps Interaktif", "Form RSVP"]'::jsonb, NULL, FALSE, 'from-indigo-900 to-indigo-800')
ON CONFLICT (id) DO NOTHING;

-- Seed Invitations (Jawa Gelap & Jawa Cerah)
INSERT INTO invitations (slug, template_type, is_active, groom_name, groom_nickname, groom_parents, groom_photo, bride_name, bride_nickname, bride_parents, bride_photo, couple_photo, wedding_date, akad_time, resepsi_time, location_name, location_address, maps_embed, maps_link, music_url, gifts, stories, gallery) VALUES
('bimantara-clara', 'jawa', TRUE, 
 'Bimantara Al Rasyid, S.Kom.', 'Bimantara', 'Putra Pertama dari Bapak Ahmad & Ibu Siti', '/assets/mempelai/groom.png',
 'Claraveliana Putri, S.Pd.', 'Claraveliana', 'Putri Kedua dari Bapak Budi & Ibu Ani', '/assets/mempelai/bride.png',
 '/assets/mempelai/mempelai.png', '2026-08-15', '08:00 - 10:00 WIB', '11:00 - 14:00 WIB', 
 'Gedung Graha Saba Buana', 'Jl. Letjen Suprapto No.80B, Sumber, Kec. Banjarsari, Kota Surakarta, Jawa Tengah 57137', 
 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.195029419177!2d110.80624027476343!3d-7.553683692460142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16efe15db5e1%3A0x6bcfd35bcfa2ebf9!2sGedung%20Graha%20Saba%20Buana!5e0!3m2!1sid!2sid!4v1700000000000', 
 'https://maps.app.goo.gl/9Zc1zG29XvH2T1x27', '/music/jawa.mp3',
 '[{"bank": "BCA", "name": "Bimantara Al Rasyid", "number": "1234567890"}, {"bank": "Mandiri", "name": "Claraveliana Putri", "number": "0987654321"}]'::jsonb,
 '[{"desc": "Kami pertama kali bertemu di sebuah acara seminar teknologi di Kota Surakarta. Pertemuan singkat yang berkesan.", "title": "Pertama Bertemu", "year": "2022"}, {"desc": "Setelah dua tahun berteman baik, kami memutuskan untuk menjalin komitmen serius untuk melangkah ke jenjang pernikahan.", "title": "Menjalin Komitmen", "year": "2024"}, {"desc": "Hari di mana kami mengikat janji suci pernikahan di hadapan Allah SWT dan dipersatukan dalam ikatan keluarga.", "title": "Pernikahan Agung", "year": "2026"}]'::jsonb,
 '[]'::jsonb
),
('prabowo-ayu', 'jawa_cerah', TRUE, 
 'Raden Mas Prabowo Utomo, S.T.', 'Prabowo', 'Putra Kedua dari Bapak Haryo & Ibu Ratih\nSurakarta, Jawa Tengah', '/assets/mempelai/groom.png',
 'Diah Ayu Sekar Arum, S.Hum.', 'Ayu', 'Putri Pertama dari Bapak Joko & Ibu Widowati\nSurakarta, Jawa Tengah', '/assets/mempelai/bride.png',
 '/assets/mempelai/mempelai.png', '2026-09-20', '09:00 - 11:00 WIB', '12:00 - 15:00 WIB', 
 'Sasana Wira Bakti', 'Jl. Slamet Riyadi No.120, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57142', 
 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.195029419177!2d110.80624027476343!3d-7.553683692460142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16efe15db5e1%3A0x6bcfd35bcfa2ebf9!2sGedung%20Graha%20Saba%20Buana!5e0!3m2!1sid!2sid!4v1700000000000', 
 'https://maps.app.goo.gl/9Zc1zG29XvH2T1x27', '/music/jawa.mp3',
 '[{"bank": "BCA", "name": "Raden Mas Prabowo", "number": "9876543210"}, {"bank": "Mandiri", "name": "Diah Ayu Sekar Arum", "number": "1234567890"}]'::jsonb,
 '[{"desc": "Kami diperkenalkan oleh kerabat dekat keluarga di Keraton Surakarta. Sejak saat itu kami mulai berkomunikasi intens.", "title": "Awal Perkenalan", "year": "2023"}, {"desc": "Pertemuan keluarga besar untuk melamar secara resmi dilaksanakan dengan adat Jawa penuh kekeluargaan.", "title": "Lamaran Resmi", "year": "2025"}, {"desc": "Penyatuan cinta kasih kami dalam ikatan suci pernikahan di hadapan keluarga besar tercinta.", "title": "Pernikahan Suci", "year": "2026"}]'::jsonb,
 '[]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Wishes
INSERT INTO wishes (invitation_slug, name, text, attendance, time) VALUES
('bimantara-clara', 'Keluarga Raden Mas Haryo', 'Selamat menempuh hidup baru Bimantara & Claraveliana. Semoga senantiasa diberikan kelancaran sampai hari H dan menjadi keluarga yang sakinah mawaddah warahmah.', 'hadir', '1/6/2026 08:12'),
('bimantara-clara', 'Anissa & Rian', 'Barakallahulakum wa baraka alaikum wa jamaa bainakuma fii khoir. Selamat ya guys! Akhirnya pelaminan juga.', 'hadir', '1/6/2026 07:45')
ON CONFLICT DO NOTHING;

-- Seed App Settings
INSERT INTO app_settings (id, wa_number, instagram, service_hours, wa_message_default) VALUES
(1, '6281234567890', 'jokobim12', 'Senin – Sabtu, 08:00 – 21:00 WIB', 'Halo Bimora Digital! Saya tertarik untuk memesan template undangan digital. Boleh konsultasi lebih lanjut?')
ON CONFLICT (id) DO NOTHING;

-- Seed About Us
INSERT INTO about_us (id, title, subtitle, desc_short, story_title, story1, story2, story3, values, team) VALUES
(1, 'Tentang Bimora Digital', 'Siapa Kami', 'Bimora Digital lahir dari kecintaan terhadap budaya Nusantara dan teknologi modern — menghadirkan undangan pernikahan digital yang elegan, bermakna, dan mudah dijangkau.', 'Dibangun dari Semangat Budaya & Teknologi', 'Bimora Digital didirikan dengan misi sederhana: membuat undangan pernikahan digital yang benar-benar cantik, bermakna, dan terjangkau untuk semua kalangan masyarakat Indonesia.', 'Kami percaya bahwa setiap momen pernikahan layak dirayakan dengan cara terbaik. Melalui desain yang memadukan kekayaan tradisi Nusantara dengan estetika digital modern, kami hadir untuk membuat hari spesial Anda semakin berkesan.', 'Sejak berdiri, kami telah membantu lebih dari 200 pasangan dari berbagai penjuru Indonesia mengabadikan undangan pernikahan mereka secara digital — dan perjalanan ini baru saja dimulai.', '[{"desc": "Setiap undangan kami kerjakan dengan sepenuh hati, memastikan detail terkecil pun tersampaikan dengan indah.", "iconType": "heart", "title": "Penuh Dedikasi"}, {"desc": "Kami tidak berkompromi soal kualitas. Setiap template dirancang dengan standar desain tertinggi.", "iconType": "star", "title": "Kualitas Premium"}, {"desc": "Tim CS kami siap membantu Anda dalam waktu singkat, mulai dari konsultasi hingga revisi.", "iconType": "rocket", "title": "Respon Cepat"}]'::jsonb, '[{"ig": "@jokobim12", "name": "Joko Bimantara", "role": "Founder & Designer"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed Order Steps
INSERT INTO order_steps (id, num, title, "desc", icon_type, action_text, action_link) VALUES
('step-1', '01', 'Pilih Template Desain', 'Pilih desain terbaik yang sesuai dengan tema pernikahan Anda di halaman katalog Produk. Kami memiliki varian Adat Jawa Premium, Modern Minimalis, dan Islami Sakral.', 'sparkles', 'Lihat Katalog', '/produk'),
('step-2', '02', 'Hubungi Kami via WhatsApp', 'Klik tombol pesan pada desain pilihan Anda untuk langsung terhubung dengan admin kami melalui WhatsApp. Sampaikan jika ada permintaan kustomisasi khusus.', 'chatbubble', 'Chat Admin', 'https://wa.me/6281234567890?text=Halo%20Bimora%20Digital,%20saya%20ingin%20pesan%20undangan%20digital'),
('step-3', '03', 'Kirim Data Pernikahan', 'Isi formulir data pernikahan yang kami sediakan secara lengkap. Mulai dari detail mempelai, akad nikah, resepsi, galeri foto, kisah cinta, hingga data kado digital.', 'document', NULL, NULL),
('step-4', '04', 'Proses Pengerjaan & Revisi', 'Kami akan memproses undangan Anda dalam waktu 1x24 jam. Anda akan menerima link draf undangan untuk ditinjau, dan kami berikan revisi gratis hingga hasil benar-benar sempurna.', 'images', NULL, NULL),
('step-5', '05', 'Pelunasan & Undangan Siap Sebar!', 'Setelah desain disetujui, lakukan pembayaran. Kami akan mengaktifkan link resmi undangan Anda yang siap disebarkan ke keluarga, kerabat, dan teman-teman tercinta.', 'card', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- Seed Portfolios
INSERT INTO portfolios (id, couple, template, date, slug, category) VALUES
('port-1', 'Bimantara & Claraveliana', 'Adat Jawa Premium', 'Agustus 2026', 'bimantara-clara', 'Adat Jawa'),
('port-2', 'Ahmad & Siti Nur', 'Adat Jawa Premium', 'Juli 2026', NULL, 'Adat Jawa'),
('port-3', 'Bagas & Dewi Ayu', 'Adat Jawa Premium', 'Juni 2026', NULL, 'Adat Jawa'),
('port-4', 'Rizky & Fitria', 'Modern Emerald', 'Mei 2026', NULL, 'Modern'),
('port-5', 'Hendra & Rini', 'Adat Jawa Premium', 'April 2026', NULL, 'Adat Jawa'),
('port-6', 'Dimas & Laras', 'Nuansa Islami', 'Maret 2026', NULL, 'Islami')
ON CONFLICT (id) DO NOTHING;
