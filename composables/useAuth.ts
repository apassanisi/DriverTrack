import { useUserStore } from '@/stores/userStore';
import { useSupabase } from '@/composables/useSupabase';
import { Profile } from '@/types';

const setUserAndProfile = async (supabase, user, email, firstName, lastName, isDriver, isAdmin) => {
  const userStore = useUserStore();
  userStore.setUser(user);
  const username = `${firstName.charAt(0)}${lastName}`.toLowerCase();
  const profileData: Profile = {
    id: user.id,
    email,
    username,
    first_name: firstName,
    last_name: lastName,
    is_driver: isDriver,
    is_admin: isAdmin,
  };
  const { error: profileError } = await supabase.from('profiles').insert(profileData);
  if (!profileError) {
    await fetchProfile(email);
  }
};

const signUp = async (email: string, password: string, firstName: string, lastName: string, isDriver: boolean, isAdmin: boolean) => {
  const supabase = useSupabase();
  const { data: user, error } = await supabase.auth.signUp({ email, password });
  if (!error && user) {
    await setUserAndProfile(supabase, user, email, firstName, lastName, isDriver, isAdmin);
    const router = useRouter();
    router.push("/");
  }
  return { user, error };
};

const logIn = async (email: string, password: string) => {
  const supabase = useSupabase();
  const { data: user, error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error && user) {
    const userStore = useUserStore();
    userStore.setUser(user);
    await fetchProfile(email);
  }
  return { user, error };
};

const logOut = async () => {
  const userStore = useUserStore();
  const supabase = useSupabase();
  const { error } = await supabase.auth.signOut();
  if (!error) {
    userStore.clearUserData();
  }
  return { error };
};

const fetchProfile = async (email: string) => {
  const supabase = useSupabase();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();
  if (!error && profile) {
    setProfile(profile);
  }
  return { profile, error };
};

const setProfile = (profileData: Profile) => {
  const userStore = useUserStore();
  userStore.setProfile(profileData);
};

export { signUp, logIn, logOut, fetchProfile };
