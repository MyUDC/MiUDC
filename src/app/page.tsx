import { auth } from '@/auth.config'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function RootPage() {
  const session = await auth();
  if (session?.user) { 
    redirect('/home');
  }
  redirect('/onboarding');
}