// Supabase Configuration
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://**********.supabase.co";
const supabaseAnonKey =
  "***********";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database table names
export const TABLES = {
  BAHAN_BAKU: "bahan_baku",
  BANNER_IN_STOCK: "banner_in_stock",
  BANNER_OUT_STOCK: "banner_out_stock",
  DIGITAL_IN_STOCK: "digital_in_stock",
  DIGITAL_OUT_STOCK: "digital_out_stock",
  PRODUKSI_IN_STOCK: "produksi_in_stock",
  PRODUKSI_OUT_STOCK: "produksi_out_stock",
  DAILY_REPORTS: "daily_reports",
  IRIDESSE_REPORTS: "iridesse_reports",
  STRAPLESS_REPORTS: "strapless_reports",
  LIPAT_REPORTS: "lipat_reports",
  LEM_PACKING_REPORTS: "lem_packing_reports",
  USERS: "users",
};

// Configuration for offline support
export const SUPABASE_CONFIG = {
  // Enable offline mode fallback to IndexedDB
  enableOfflineMode: true,

  // Sync interval in milliseconds (5 minutes)
  syncInterval: 5 * 60 * 1000,

  // Maximum retry attempts for failed operations
  maxRetries: 3,

  // Retry delay in milliseconds
  retryDelay: 1000,

  // Enable real-time subscriptions
  enableRealtime: true,
};

export default supabase;
