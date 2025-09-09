
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle, signUpWithEmail } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleLoading, setGoogleIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        await signUpWithEmail(email, password);
        toast({
            title: 'Sign-up Successful',
            description: 'Welcome! You can now log in.',
        });
        router.push('/dashboard');
    } catch (error) {
        console.error("Email/Password Signup Error:", error);
        let description = 'An unexpected error occurred. Please try again.';
        if (error instanceof FirebaseError) {
            if (error.code === 'auth/email-already-in-use') {
                description = 'This email is already in use. Please try another email or log in.';
            } else if (error.code === 'auth/weak-password') {
                description = 'The password is too weak. It must be at least 6 characters long.';
            } else if (error.code === 'auth/configuration-not-found') {
                description = 'Email/Password sign-up is not enabled in your Firebase project. Please enable it in the Firebase console.';
            }
        }
        toast({
            variant: 'destructive',
            title: 'Sign-up Failed',
            description,
        });
    } finally {
        setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input 
                  id="first-name" 
                  placeholder="Max" 
                  required 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input 
                  id="last-name" 
                  placeholder="Robinson" 
                  required 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                placeholder="********"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
              {isLoading ? 'Creating account...' : 'Create an account'}
            </Button>
            <Button variant="outline" type="button" className="w-full" onClick={handleGoogleLogin} disabled={isGoogleLoading || isLoading}>
              {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
            </Button>
          </form>
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
