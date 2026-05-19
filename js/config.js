// js/config.js
// Configuración centralizada de Supabase

const SUPABASE_URL = "https://jqlaafffpitkhfhylfxn.supabase.co";
const SUPABASE_KEY = "sb_publishable_DrFa6s-VQaL5r9E4bTn0ig_SD5Zdnl0";

// Headers base para las peticiones fetch a Supabase
const SUPABASE_HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};
