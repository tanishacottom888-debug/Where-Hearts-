// supabase.js - CONNECTION FILE
// DO NOT CHANGE THESE - Your credentials are already set

const SUPABASE_URL = "https://cggskooljrjacgjnxotc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Ge37Z1zdP79Vb19GobMCCg_9PVkXSlT";

// Create Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============ MEMBERS FUNCTIONS ============
async function addMember(memberData) {
  const { data, error } = await supabaseClient
    .from('members')
    .insert([memberData])
    .select();
  if (error) throw error;
  return data;
}

async function getMembers() {
  const { data, error } = await supabaseClient
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function updateMember(id, memberData) {
  const { data, error } = await supabaseClient
    .from('members')
    .update(memberData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

async function deleteMember(id) {
  const { error } = await supabaseClient
    .from('members')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// ============ REGISTRATIONS FUNCTIONS ============
async function addRegistration(registrationData) {
  const { data, error } = await supabaseClient
    .from('registrations')
    .insert([registrationData])
    .select();
  if (error) throw error;
  return data;
}

async function getRegistrations() {
  const { data, error } = await supabaseClient
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// ============ ADMIN AUTH FUNCTIONS ============
// Note: You need to create an admin user in Supabase Auth first
async function adminLogin(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });
  if (error) throw error;
  return data;
}

async function adminLogout() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
}

async function getCurrentAdmin() {
  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error) return null;
  return user;
}

// Check if admin is logged in
async function requireAdmin() {
  const user = await getCurrentAdmin();
  if (!user) {
    window.location.href = 'admin-login.html';
    return false;
  }
  return true;
}
