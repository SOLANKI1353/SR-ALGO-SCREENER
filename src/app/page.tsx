"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'admin') {
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password.',
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    try {
        await signInWithGoogle();
        router.push('/dashboard');
    } catch (error) {
        console.error("Google Login Error:", error);
        let title = 'Google Login Failed';
        let description = 'An unexpected error occurred. Please try again.';

        if (error instanceof FirebaseError) {
            title = `Firebase Error (${error.code})`;
            switch(error.code) {
                case 'auth/configuration-not-found':
                    description = "Google Sign-In is not enabled in your Firebase console. Please go to Authentication -> Sign-in method and enable the Google provider.";
                    break;
                case 'auth/cancelled-popup-request':
                case 'auth/popup-closed-by-user':
                    title = 'Login Canceled';
                    description = 'You closed the login window before completing the process. Please try again.';
                    break;
                case 'auth/popup-blocked':
                    title = 'Popup Blocked';
                    description = 'Your browser blocked the Google Sign-In popup. Please allow popups for this site and try again.';
                    break;
                default:
                    description = `An unknown Firebase error occurred: ${error.message}`;
                    break;
            }
        }
        
        toast({
            variant: 'destructive',
            title: title,
            description: description,
            duration: 9000,
        });
    } finally {
        setIsSigningIn(false);
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
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="admin"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSigningIn}>
              Login
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isSigningIn}>
              {isSigningIn ? 'Signing in...' : 'Login with Google'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
