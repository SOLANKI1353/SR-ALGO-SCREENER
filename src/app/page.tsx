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
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setGoogleIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a network request
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin') {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
        });
      }
      setIsLoading(false);
    }, 500);
  };
  
  const handleGoogleLogin = async () => {
    setGoogleIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: 'Login Successful',
        description: 'Welcome!',
      });
      router.push('/dashboard');
    } catch (error) {
      console.error("Google Login Error:", error);
      let description = 'An unexpected error occurred. Please try again.';
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          description = 'Login process was cancelled. Please try again.';
        } else if (error.code === 'auth/configuration-not-found') {
          description = 'Google Sign-in is not enabled in your Firebase project. Please contact support.';
        }
      }
      toast({
        variant: 'destructive',
        title: 'Google Login Failed',
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
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                  disabled={isLoading || isGoogleLoading}
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
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isGoogleLoading || isLoading}>
              {isGoogleLoading ? 'Signing in...' : 'Login with Google'}
            </Button>
          </div>
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
