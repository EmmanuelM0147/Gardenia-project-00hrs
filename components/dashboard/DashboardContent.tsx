tsx
'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { FarmerDashboard } from '@/components/dashboard/farmer-dashboard';
import { BuyerDashboard } from '@/components/dashboard/buyer-dashboard';

export default function DashboardContent() {
  const supabase = createBrowserClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        redirect('/auth/sign-in');
      }
    };

    checkSession();
  }, []);

  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setUserRole(user.user_metadata.role);
      }
    };

    getUserData();
  }, []);

  if (!user || !userRole) {
    return <div>Loading...</div>; // Or a more appropriate loading indicator
  }

  return (
    <div>
      {userRole === 'farmer' ? (
        <FarmerDashboard user={user} />
      ) : (
        <BuyerDashboard user={user} />
      )}
    </div>
  );
}