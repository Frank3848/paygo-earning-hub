import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
}

// Resets per-device data when a different account signs in, so nobody sees another user's details.
const syncLocalData = (u: CurrentUser) => {
  if (localStorage.getItem('currentUserId') !== u.id) {
    localStorage.setItem('currentUserId', u.id);
    localStorage.removeItem('onboardingComplete');
    localStorage.setItem('walletBalance', '180000');
    localStorage.setItem(
      'userProfile',
      JSON.stringify({ fullName: u.fullName, email: u.email, phone: '', about: '' })
    );
  }
};

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const apply = (raw: any) => {
      if (!raw) { setUser(null); return; }
      const u: CurrentUser = {
        id: raw.id,
        email: raw.email ?? '',
        fullName: raw.user_metadata?.name || raw.user_metadata?.full_name || (raw.email ?? '').split('@')[0],
      };
      syncLocalData(u);
      setUser(u);
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => apply(s?.user));
    supabase.auth.getUser().then(({ data }) => apply(data.user));
    return () => sub.subscription.unsubscribe();
  }, []);

  return user;
};
