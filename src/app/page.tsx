
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from '@/components/firebase-provider';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { auth } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!auth) {
        toast({
            variant: 'destructive',
            title: 'Firebase Not Initialized',
            description: 'The authentication service is not ready. Please wait a moment and try again.',
        });
        setIsLoading(false);
        return;
    }

    if (!email || !password) {
        toast({
            variant: 'destructive',
            title: 'Missing Fields',
            description: 'Please enter both email and password.',
        });
        setIsLoading(false);
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
            title: 'Login Successful',
            description: 'Welcome back!',
        });
        router.push('/dashboard');
        return;
    } catch (error: any) {
        let title = "Login Failed";
        let description = "An unexpected error occurred. Please try again.";

        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                title = "Invalid Credentials";
                description = "The email or password you entered is incorrect. Please check and try again.";
                break;
            case 'auth/invalid-email':
                title = "Invalid Email Format";
                description = "The email address is not formatted correctly.";
                break;
            case 'auth/too-many-requests':
                title = "Too Many Attempts";
                description = "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.";
                break;
            case 'auth/network-request-failed':
                title = "Network Error";
                description = "Could not connect to Firebase. Please check your internet connection.";
                break;
            case 'auth/configuration-not-found':
            case 'auth/api-key-not-valid':
                 title = "FIREBASE CONFIGURATION ERROR";
                 description = "The Firebase configuration is invalid. The application cannot connect to the authentication service.";
                 break;
            default:
                title = "An Unexpected Error Occurred";
                description = `Error: ${error.code} - ${error.message}`;
                console.error("Firebase login error:", error);
                break;
        }
        toast({
            variant: 'destructive',
            title: title,
            description: description,
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
             <div className="flex justify-center items-center gap-2 mb-4">
                <Flame className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text">
                  Sr Algo
                </h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
           <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/signup"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block bg-gradient-to-br from-primary/10 via-background to-background">
        
      </div>
    </div>
  )
}
