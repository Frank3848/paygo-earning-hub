import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CountrySelect } from '@/components/CountrySelect';
import { NeedHelp } from '@/components/NeedHelp';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import paygoLogo from '@/assets/paygo-logo.png';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            name: formData.name.trim(),
            country: formData.country,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: 'This email is already registered with PayGo' });
          toast({
            title: 'Email already registered',
            description: 'Please login instead or use a different email.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Registration failed',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      if (data.user && !data.session) {
        toast({
          title: 'Check your email',
          description: 'We sent you a verification link to complete registration.',
        });
      } else if (data.session) {
        toast({
          title: 'Welcome to PayGo!',
          description: 'Registration successful.',
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
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(270_72%_58%/0.15)] blur-3xl float-orb" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[hsl(240_80%_55%/0.12)] blur-3xl float-orb" style={{animationDelay:'3s'}} />
      </div>

      {/* Header */}
      <header className="flex justify-end p-4">
        <NeedHelp />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md animate-[slide-in-right_0.5s_ease-out] glass-card rounded-2xl p-8">
          {/* Logo - Left aligned */}
          <div className="mb-8">
            <img 
              src={paygoLogo} 
              alt="PayGo Logo" 
              className="h-20 w-auto object-contain rounded-xl animate-swing"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Register to continue
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={inputClass('name')}
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            
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
              <CountrySelect
                value={formData.country}
                onValueChange={(value) => handleInputChange('country', value)}
              />
              {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
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

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={inputClass('confirmPassword')}
              />
              {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-medium rounded-xl"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-sm text-center">
            <Link to="/login" className="text-link font-medium hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
