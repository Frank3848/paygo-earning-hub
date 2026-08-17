import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NeedHelp } from '@/components/NeedHelp';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import paygoLogo from '@/assets/paygo-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Login failed',
            description: 'Invalid email or password. Please try again.',
            variant: 'destructive',
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: 'Email not verified',
            description: 'Enter the code we sent you to finish setting up your account.',
          });
          await supabase.auth.resend({ type: 'signup', email: formData.email.trim() });
          navigate('/verify-otp', { state: { email: formData.email.trim() } });
        } else {
          toast({
            title: 'Login failed',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      if (data.session) {
        toast({
          title: 'Welcome back!',
          description: 'Login successful.',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const inputClass = (field: string) =>
    `h-14 bg-card border-input-border placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-0 ${
      errors[field] ? 'border-destructive' : ''
    }`;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[hsl(270_72%_58%/0.15)] blur-3xl float-orb" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[hsl(240_80%_55%/0.12)] blur-3xl float-orb" style={{animationDelay:'3s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[hsl(280_65%_60%/0.07)] blur-2xl float-orb" style={{animationDelay:'1.5s'}} />
      </div>

      {/* Header */}
      <header className="flex justify-end p-4">
        <NeedHelp />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md animate-[slide-in-right_0.5s_ease-out] glass-card rounded-2xl p-8">
          {/* Logo - Right aligned */}
          <div className="mb-8">
            <img 
              src={paygoLogo} 
              alt="PayGo Logo" 
              className="h-20 w-auto object-contain rounded-xl animate-swing"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Login to continue
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={inputClass('email')}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={inputClass('password')}
              />
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-medium rounded-xl"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <GoogleSignInButton label="Continue with Google" />

          {/* Register Link */}
          <p className="mt-6 text-sm text-center">
            <Link to="/" className="text-link font-medium hover:underline">
              Don't have an account? Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
