
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/lib/firebase';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!firstName || !lastName || !email || !password) {
        toast({
            variant: 'destructive',
            title: 'Missing Fields',
            description: 'Please fill out all fields.',
        });
        setIsLoading(false);
        return;
    }
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Sign-up Successful',
          description: 'Welcome! Your account has been created.',
        });
        router.push('/dashboard');
    } catch (error: any) {
        let title = "Sign-up Failed";
        let description = "An unexpected error occurred. Please try again.";

        switch (error.code) {
            case 'auth/email-already-in-use':
                title = "Email Already In Use";
                description = "This email is already registered. Please log in or use a different email.";
                break;
            case 'auth/weak-password':
                title = "Weak Password";
                description = "The password is too weak. Please use a stronger password (at least 6 characters).";
                break;
            case 'auth/invalid-email':
                title = "Invalid Email Format";
                description = "The email address is not formatted correctly.";
                break;
            case 'auth/api-key-not-valid':
                 title = "FIREBASE CONFIGURATION ERROR";
                 description = "The Firebase API Key is invalid. The application cannot connect to the authentication service.";
                 break;
            default:
                title = "An Unexpected Error Occurred";
                description = `Error: ${error.code} - ${error.message}`;
                console.error("Firebase signup error:", error);
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
                        Enter your information to create an account
                    </p>
                </div>
                <form onSubmit={handleSignup} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input 
                            id="first-name" 
                            placeholder="Max" 
                            required 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={isLoading}
                        />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input 
                            id="last-name" 
                            placeholder="Robinson" 
                            required 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={isLoading}
                        />
                        </div>
                    </div>
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
                        <Label htmlFor="password">Password</Label>
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
                        {isLoading ? 'Creating Account...' : 'Create an account'}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/" className="underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
        <div className="hidden bg-muted lg:block bg-gradient-to-br from-primary/10 via-background to-background">
      </div>
    </div>
  )
}
