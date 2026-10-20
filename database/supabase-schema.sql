-- Supabase SQL Schema for PT. GCI Inventory System
-- Execute these commands in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (optional, for user management)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bahan_baku table (untuk stock management)
CREATE TABLE IF NOT EXISTS public.bahan_baku (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    stok INTEGER NOT NULL DEFAULT 0,
    satuan VARCHAR(50) DEFAULT 'pcs',
    kategori VARCHAR(100), -- banner, digital, produksi, etc.
    type VARCHAR(50), -- in, out
    nomor INTEGER,
    tanggal DATE,
    keterangan TEXT,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create specialized stock tables for Banner/Digital/Produksi categories
-- Banner In Stock Table
CREATE TABLE IF NOT EXISTS public.banner_in_stock (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    jenis_kertas VARCHAR(100) NOT NULL,
    ukuran VARCHAR(50) NOT NULL,
    qty_last_month INTEGER DEFAULT 0,
    jumlah_masuk INTEGER DEFAULT 0,
    total INTEGER GENERATED ALWAYS AS (qty_last_month + jumlah_masuk) STORED,
    tanggal DATE NOT NULL,
    remark TEXT,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banner Out Stock Table
CREATE TABLE IF NOT EXISTS public.banner_out_stock (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    jenis_kertas VARCHAR(100) NOT NULL,
    ukuran VARCHAR(50) NOT NULL,
    total_kertas_masuk INTEGER DEFAULT 0,
    tanggal DATE NOT NULL,
    total_keluar_ok INTEGER DEFAULT 0,
    total_keluar_ng INTEGER DEFAULT 0,
    total_keluar INTEGER GENERATED ALWAYS AS (total_keluar_ok + total_keluar_ng) STORED,
    sisa_stock INTEGER GENERATED ALWAYS AS (total_kertas_masuk - total_keluar_ok - total_keluar_ng) STORED,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Digital In Stock Table
CREATE TABLE IF NOT EXISTS public.digital_in_stock (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    jenis_kertas VARCHAR(100) NOT NULL,
    ukuran VARCHAR(50) NOT NULL,
    qty_last_month INTEGER DEFAULT 0,
    tanggal DATE NOT NULL,
    jumlah_kertas_masuk INTEGER DEFAULT 0,
    total INTEGER GENERATED ALWAYS AS (qty_last_month + jumlah_kertas_masuk) STORED,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Digital Out Stock Table
CREATE TABLE IF NOT EXISTS public.digital_out_stock (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    jenis_kertas VARCHAR(100) NOT NULL,
    ukuran VARCHAR(50) NOT NULL,
    total_kertas_masuk INTEGER DEFAULT 0,
    tanggal DATE NOT NULL,
    total_keluar_ok INTEGER DEFAULT 0,
    total_keluar_ng INTEGER DEFAULT 0,
    total_keluar INTEGER GENERATED ALWAYS AS (total_keluar_ok + total_keluar_ng) STORED,
    sisa_stock INTEGER GENERATED ALWAYS AS (total_kertas_masuk - total_keluar_ok - total_keluar_ng) STORED,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Produksi In Stock Table
CREATE TABLE IF NOT EXISTS public.produksi_in_stock (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    jenis_kertas VARCHAR(100) NOT NULL,
    ukuran VARCHAR(50) NOT NULL,
    qty_last_month INTEGER DEFAULT 0,
    tanggal DATE NOT NULL,
    jumlah_kertas_masuk INTEGER DEFAULT 0,
    total INTEGER GENERATED ALWAYS AS (qty_last_month + jumlah_kertas_masuk) STORED,
    remark TEXT,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Produksi Out Stock Table
CREATE TABLE IF NOT EXISTS public.produksi_out_stock (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    jenis_kertas VARCHAR(100) NOT NULL,
    ukuran VARCHAR(50) NOT NULL,
    total_kertas_masuk INTEGER DEFAULT 0,
    tanggal DATE NOT NULL,
    total_keluar_ok INTEGER DEFAULT 0,
    total_keluar_ng INTEGER DEFAULT 0,
    total_keluar INTEGER GENERATED ALWAYS AS (total_keluar_ok + total_keluar_ng) STORED,
    sisa_stock INTEGER GENERATED ALWAYS AS (total_kertas_masuk - total_keluar_ok - total_keluar_ng) STORED,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_reports table (Daily Report Mesin Offset)
CREATE TABLE IF NOT EXISTS public.daily_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    tanggal DATE NOT NULL,
    qty_po INTEGER DEFAULT 0,
    satuan VARCHAR(50) DEFAULT 'PCS', -- PCS, LEMBAR
    jenis_bahan VARCHAR(100), -- HVS 60, HVS 80, DUPLEX 350 G
    jenis_print VARCHAR(50), -- 1 MUKA, 2 MUKA
    jenis_pekerjaan VARCHAR(255),
    client VARCHAR(255),
    spesifikasi VARCHAR(255),
    qty_cetak_ok INTEGER DEFAULT 0,
    qty_cetak_ng INTEGER DEFAULT 0,
    satuan_cetak VARCHAR(50) DEFAULT 'LEMBAR PLANO',
    waktu_start TIME,
    waktu_finish TIME,
    no_spk VARCHAR(100),
    keterangan TEXT,
    status VARCHAR(50) DEFAULT 'SELESAI', -- SELESAI, PENDING, MAINTENANCE
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create iridesse_reports table (Laporan Mesin Iridesse)
CREATE TABLE IF NOT EXISTS public.iridesse_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tanggal DATE NOT NULL,
    start_billing VARCHAR(100),
    no_spk VARCHAR(100),
    nama_client VARCHAR(255),
    nama_pekerjaan VARCHAR(255),
    jenis_kertas VARCHAR(100),
    ukuran_kertas VARCHAR(100),
    jenis_print VARCHAR(50), -- 1 MUKA, 2 MUKA
    jumlah_cetak INTEGER DEFAULT 0,
    ng INTEGER DEFAULT 0,
    time_start TIME,
    time_finish TIME,
    finish_billing VARCHAR(100),
    billing INTEGER DEFAULT 0,
    gap INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'SELESAI', -- SELESAI, PENDING, MAINTENANCE
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create strapless_reports table (Daily Report Mesin Strapless)
CREATE TABLE IF NOT EXISTS public.strapless_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    tanggal DATE NOT NULL,
    operator VARCHAR(255),
    jenis_pekerjaan VARCHAR(255),
    client VARCHAR(255),
    time_start TIME,
    time_finish TIME,
    qty_ok INTEGER DEFAULT 0,
    qty_ng INTEGER DEFAULT 0,
    satuan VARCHAR(50) DEFAULT 'PCS', -- PCS, -
    proses_selanjutnya VARCHAR(255),
    keterangan TEXT,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lipat_reports table (Daily Report Mesin Lipat)
CREATE TABLE IF NOT EXISTS public.lipat_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    tanggal DATE NOT NULL,
    operator VARCHAR(255),
    jenis_pekerjaan VARCHAR(255),
    client VARCHAR(255),
    produk VARCHAR(255),
    terima_dari VARCHAR(255),
    time_start TIME,
    time_finish TIME,
    qty_ok INTEGER DEFAULT 0,
    qty_ng INTEGER DEFAULT 0,
    satuan VARCHAR(50) DEFAULT 'PCS', -- PCS, -
    proses_selanjutnya VARCHAR(255),
    keterangan TEXT,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lem_packing_reports table (Daily Report Mesin Lem Packing Case)
CREATE TABLE IF NOT EXISTS public.lem_packing_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nomor INTEGER NOT NULL,
    tanggal DATE NOT NULL,
    operator VARCHAR(255),
    jenis_pekerjaan VARCHAR(255),
    time_start TIME,
    time_finish TIME,
    qty_ok INTEGER DEFAULT 0,
    qty_ng INTEGER DEFAULT 0,
    no_spk VARCHAR(100),
    keterangan TEXT,
    device_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bahan_baku_nama ON public.bahan_baku(nama);
CREATE INDEX IF NOT EXISTS idx_bahan_baku_kategori ON public.bahan_baku(kategori);
CREATE INDEX IF NOT EXISTS idx_bahan_baku_tanggal ON public.bahan_baku(tanggal);
CREATE INDEX IF NOT EXISTS idx_bahan_baku_created_at ON public.bahan_baku(created_at);

-- Create indexes for specialized stock tables
CREATE INDEX IF NOT EXISTS idx_banner_in_stock_nomor ON public.banner_in_stock(nomor);
CREATE INDEX IF NOT EXISTS idx_banner_in_stock_jenis_kertas ON public.banner_in_stock(jenis_kertas);
CREATE INDEX IF NOT EXISTS idx_banner_in_stock_tanggal ON public.banner_in_stock(tanggal);
CREATE INDEX IF NOT EXISTS idx_banner_in_stock_created_at ON public.banner_in_stock(created_at);

CREATE INDEX IF NOT EXISTS idx_banner_out_stock_nomor ON public.banner_out_stock(nomor);
CREATE INDEX IF NOT EXISTS idx_banner_out_stock_jenis_kertas ON public.banner_out_stock(jenis_kertas);
CREATE INDEX IF NOT EXISTS idx_banner_out_stock_tanggal ON public.banner_out_stock(tanggal);
CREATE INDEX IF NOT EXISTS idx_banner_out_stock_created_at ON public.banner_out_stock(created_at);

CREATE INDEX IF NOT EXISTS idx_digital_in_stock_nomor ON public.digital_in_stock(nomor);
CREATE INDEX IF NOT EXISTS idx_digital_in_stock_jenis_kertas ON public.digital_in_stock(jenis_kertas);
CREATE INDEX IF NOT EXISTS idx_digital_in_stock_tanggal ON public.digital_in_stock(tanggal);
CREATE INDEX IF NOT EXISTS idx_digital_in_stock_created_at ON public.digital_in_stock(created_at);

CREATE INDEX IF NOT EXISTS idx_digital_out_stock_nomor ON public.digital_out_stock(nomor);
CREATE INDEX IF NOT EXISTS idx_digital_out_stock_jenis_kertas ON public.digital_out_stock(jenis_kertas);
CREATE INDEX IF NOT EXISTS idx_digital_out_stock_tanggal ON public.digital_out_stock(tanggal);
CREATE INDEX IF NOT EXISTS idx_digital_out_stock_created_at ON public.digital_out_stock(created_at);

CREATE INDEX IF NOT EXISTS idx_produksi_in_stock_nomor ON public.produksi_in_stock(nomor);
CREATE INDEX IF NOT EXISTS idx_produksi_in_stock_jenis_kertas ON public.produksi_in_stock(jenis_kertas);
CREATE INDEX IF NOT EXISTS idx_produksi_in_stock_tanggal ON public.produksi_in_stock(tanggal);
CREATE INDEX IF NOT EXISTS idx_produksi_in_stock_created_at ON public.produksi_in_stock(created_at);

CREATE INDEX IF NOT EXISTS idx_produksi_out_stock_nomor ON public.produksi_out_stock(nomor);
CREATE INDEX IF NOT EXISTS idx_produksi_out_stock_jenis_kertas ON public.produksi_out_stock(jenis_kertas);
CREATE INDEX IF NOT EXISTS idx_produksi_out_stock_tanggal ON public.produksi_out_stock(tanggal);
CREATE INDEX IF NOT EXISTS idx_produksi_out_stock_created_at ON public.produksi_out_stock(created_at);

CREATE INDEX IF NOT EXISTS idx_daily_reports_tanggal ON public.daily_reports(tanggal);
CREATE INDEX IF NOT EXISTS idx_daily_reports_nomor ON public.daily_reports(nomor);
CREATE INDEX IF NOT EXISTS idx_daily_reports_client ON public.daily_reports(client);
CREATE INDEX IF NOT EXISTS idx_daily_reports_created_at ON public.daily_reports(created_at);

CREATE INDEX IF NOT EXISTS idx_iridesse_reports_tanggal ON public.iridesse_reports(tanggal);
CREATE INDEX IF NOT EXISTS idx_iridesse_reports_nama_client ON public.iridesse_reports(nama_client);
CREATE INDEX IF NOT EXISTS idx_iridesse_reports_no_spk ON public.iridesse_reports(no_spk);
CREATE INDEX IF NOT EXISTS idx_iridesse_reports_created_at ON public.iridesse_reports(created_at);

CREATE INDEX IF NOT EXISTS idx_strapless_reports_tanggal ON public.strapless_reports(tanggal);
CREATE INDEX IF NOT EXISTS idx_strapless_reports_nomor ON public.strapless_reports(nomor);
CREATE INDEX IF NOT EXISTS idx_strapless_reports_operator ON public.strapless_reports(operator);
CREATE INDEX IF NOT EXISTS idx_strapless_reports_client ON public.strapless_reports(client);
CREATE INDEX IF NOT EXISTS idx_strapless_reports_created_at ON public.strapless_reports(created_at);

CREATE INDEX IF NOT EXISTS idx_lipat_reports_tanggal ON public.lipat_reports(tanggal);
CREATE INDEX IF NOT EXISTS idx_lipat_reports_nomor ON public.lipat_reports(nomor);
CREATE INDEX IF NOT EXISTS idx_lipat_reports_operator ON public.lipat_reports(operator);
CREATE INDEX IF NOT EXISTS idx_lipat_reports_client ON public.lipat_reports(client);
CREATE INDEX IF NOT EXISTS idx_lipat_reports_created_at ON public.lipat_reports(created_at);

CREATE INDEX IF NOT EXISTS idx_lem_packing_reports_tanggal ON public.lem_packing_reports(tanggal);
CREATE INDEX IF NOT EXISTS idx_lem_packing_reports_nomor ON public.lem_packing_reports(nomor);
CREATE INDEX IF NOT EXISTS idx_lem_packing_reports_operator ON public.lem_packing_reports(operator);
CREATE INDEX IF NOT EXISTS idx_lem_packing_reports_no_spk ON public.lem_packing_reports(no_spk);
CREATE INDEX IF NOT EXISTS idx_lem_packing_reports_created_at ON public.lem_packing_reports(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bahan_baku ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_in_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_out_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_in_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_out_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produksi_in_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produksi_out_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iridesse_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strapless_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lipat_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lem_packing_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (Allow all for now, you can make it more restrictive later)
-- Users can read all data
CREATE POLICY "Allow read access for all users" ON public.bahan_baku FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.banner_in_stock FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.banner_out_stock FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.digital_in_stock FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.digital_out_stock FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.produksi_in_stock FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.produksi_out_stock FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.daily_reports FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.iridesse_reports FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.strapless_reports FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.lipat_reports FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON public.lem_packing_reports FOR SELECT USING (true);

-- Users can insert data
CREATE POLICY "Allow insert for all users" ON public.bahan_baku FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.banner_in_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.banner_out_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.digital_in_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.digital_out_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.produksi_in_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.produksi_out_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.daily_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.iridesse_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.strapless_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.lipat_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for all users" ON public.lem_packing_reports FOR INSERT WITH CHECK (true);

-- Users can update data
CREATE POLICY "Allow update for all users" ON public.bahan_baku FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.banner_in_stock FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.banner_out_stock FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.digital_in_stock FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.digital_out_stock FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.produksi_in_stock FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.produksi_out_stock FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.daily_reports FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.iridesse_reports FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.strapless_reports FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.lipat_reports FOR UPDATE USING (true);
CREATE POLICY "Allow update for all users" ON public.lem_packing_reports FOR UPDATE USING (true);

-- Users can delete data
CREATE POLICY "Allow delete for all users" ON public.bahan_baku FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.banner_in_stock FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.banner_out_stock FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.digital_in_stock FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.digital_out_stock FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.produksi_in_stock FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.produksi_out_stock FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.daily_reports FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.iridesse_reports FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.strapless_reports FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.lipat_reports FOR DELETE USING (true);
CREATE POLICY "Allow delete for all users" ON public.lem_packing_reports FOR DELETE USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_bahan_baku_updated_at 
    BEFORE UPDATE ON public.bahan_baku 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_in_stock_updated_at 
    BEFORE UPDATE ON public.banner_in_stock 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_out_stock_updated_at 
    BEFORE UPDATE ON public.banner_out_stock 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_digital_in_stock_updated_at 
    BEFORE UPDATE ON public.digital_in_stock 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_digital_out_stock_updated_at 
    BEFORE UPDATE ON public.digital_out_stock 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_produksi_in_stock_updated_at 
    BEFORE UPDATE ON public.produksi_in_stock 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_produksi_out_stock_updated_at 
    BEFORE UPDATE ON public.produksi_out_stock 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_reports_updated_at 
    BEFORE UPDATE ON public.daily_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_iridesse_reports_updated_at 
    BEFORE UPDATE ON public.iridesse_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strapless_reports_updated_at 
    BEFORE UPDATE ON public.strapless_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lipat_reports_updated_at 
    BEFORE UPDATE ON public.lipat_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lem_packing_reports_updated_at 
    BEFORE UPDATE ON public.lem_packing_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing (optional)
-- Bahan Baku Stock
-- INSERT INTO public.bahan_baku (nama, stok, satuan, kategori, type, nomor, tanggal, keterangan) VALUES 
-- ('Banner Indoor 10x5', 100, 'pcs', 'banner', 'in', 1, CURRENT_DATE, 'Stock masuk banner indoor'),
-- ('Banner Outdoor 15x10', 50, 'pcs', 'banner', 'in', 2, CURRENT_DATE, 'Stock masuk banner outdoor'),
-- ('Digital Print A3', 200, 'lembar', 'digital', 'in', 1, CURRENT_DATE, 'Digital print A3 masuk'),
-- ('Kertas HVS 60', 75, 'rim', 'produksi', 'in', 1, CURRENT_DATE, 'Bahan produksi masuk');

-- Daily Reports Sample
-- INSERT INTO public.daily_reports (nomor, tanggal, qty_po, satuan, jenis_bahan, jenis_print, jenis_pekerjaan, client, spesifikasi, qty_cetak_ok, qty_cetak_ng, waktu_start, waktu_finish, no_spk, status) VALUES
-- (1, CURRENT_DATE, 1000, 'PCS', 'HVS 60', '1 MUKA', 'Brosur', 'PT ABC', 'A4 Full Color', 950, 50, '08:00', '17:00', 'SPK-001', 'SELESAI');

-- Iridesse Reports Sample  
-- INSERT INTO public.iridesse_reports (tanggal, start_billing, no_spk, nama_client, nama_pekerjaan, jenis_kertas, ukuran_kertas, jenis_print, jumlah_cetak, ng, time_start, time_finish, finish_billing, billing, gap, status) VALUES
-- (CURRENT_DATE, '12345', 'SPK-IRD-001', 'PT XYZ', 'Business Card', 'Art Paper 310', 'A4', '2 MUKA', 500, 25, '09:00', '15:00', '12850', 505, 5, 'SELESAI');

-- Strapless Reports Sample
-- INSERT INTO public.strapless_reports (nomor, tanggal, operator, jenis_pekerjaan, client, time_start, time_finish, qty_ok, qty_ng, satuan, proses_selanjutnya, keterangan) VALUES
-- (1, CURRENT_DATE, 'Operator A', 'Strapless Brosur', 'PT DEF', '08:30', '16:30', 800, 20, 'PCS', 'Packing', 'Normal production');

-- Lipat Reports Sample
-- INSERT INTO public.lipat_reports (nomor, tanggal, operator, jenis_pekerjaan, client, produk, terima_dari, time_start, time_finish, qty_ok, qty_ng, satuan, proses_selanjutnya, keterangan) VALUES
-- (1, CURRENT_DATE, 'Operator B', 'Lipat Katalog', 'PT GHI', 'Katalog Produk', 'Mesin Offset', '09:00', '17:00', 1200, 30, 'PCS', 'Lem Packing', 'Quality control OK');

-- Lem Packing Reports Sample  
-- INSERT INTO public.lem_packing_reports (nomor, tanggal, operator, jenis_pekerjaan, time_start, time_finish, qty_ok, qty_ng, no_spk, keterangan) VALUES
-- (1, CURRENT_DATE, 'Operator C', 'Lem Packing Box', '10:00', '18:00', 500, 10, 'SPK-LEM-001', 'Packaging selesai tepat waktu');

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.bahan_baku;
ALTER PUBLICATION supabase_realtime ADD TABLE public.banner_in_stock;
ALTER PUBLICATION supabase_realtime ADD TABLE public.banner_out_stock;
ALTER PUBLICATION supabase_realtime ADD TABLE public.digital_in_stock;
ALTER PUBLICATION supabase_realtime ADD TABLE public.digital_out_stock;
ALTER PUBLICATION supabase_realtime ADD TABLE public.produksi_in_stock;
ALTER PUBLICATION supabase_realtime ADD TABLE public.produksi_out_stock;
ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.iridesse_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.strapless_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lipat_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lem_packing_reports;