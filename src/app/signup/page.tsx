"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleLoading, setGoogleIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: 'Sign-up Successful',
        description: 'Welcome!',
      });
      router.push('/dashboard');
    } catch (error) {
      console.error("Google Login Error:", error);
      let description = 'An unexpected error occurred. Please try again.';
       if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          description = 'Sign up process was cancelled. Please try again.';
        } else if (error.code === 'auth/configuration-not-found') {
          description = 'Google Sign-in is not enabled in your Firebase project. Please contact support.';
        }
      }
      toast({
        variant: 'destructive',
        title: 'Google Sign-up Failed',
        description,
      });
    } finally {
      setGoogleIsLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center items-center gap-2">
             <Flame className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Sr Algo</CardTitle>
          </div>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Create an account</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
              {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
