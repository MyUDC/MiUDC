import { auth } from '@/auth.config'
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const session = await auth();
  if (session?.user) { 
    redirect('/home');
  }
  redirect ('/onboarding');
}