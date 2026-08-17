import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { NeedHelp } from '@/components/NeedHelp';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import paygoLogo from '@/assets/paygo-logo.png';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const email = (location.state as { email?: string } | null)?.email ?? '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!email) navigate('/', { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async (value: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: value,
        type: 'email',
      });

      if (error) {
        toast({
          title: 'Invalid code',
          description: 'That code is incorrect or has expired. Please try again.',
          variant: 'destructive',
        });
        setCode('');
        return;
      }

      if (data.session) {
        toast({ title: 'Welcome to PayGo!', description: 'Your email has been verified.' });
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

  const handleResend = async () => {
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) {
        toast({
          title: 'Could not resend code',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      setCooldown(60);
      toast({ title: 'Code sent', description: `We sent a new code to ${email}.` });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(270_72%_58%/0.15)] blur-3xl float-orb" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[hsl(240_80%_55%/0.12)] blur-3xl float-orb" style={{ animationDelay: '3s' }} />
      </div>

      <header className="flex justify-end p-4">
        <NeedHelp />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md animate-[slide-in-right_0.5s_ease-out] glass-card rounded-2xl p-8">
          <div className="mb-8">
            <img src={paygoLogo} alt="PayGo Logo" className="h-20 w-auto object-contain rounded-xl animate-swing" />
          </div>

          <h1 className="text-2xl font-semibold text-foreground mb-2 text-center">Verify your email</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Enter the 6-digit code we sent to <span className="text-foreground font-medium">{email}</span>
          </p>

          <div className="flex justify-center mb-6">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => {
                setCode(value);
                if (value.length === 6) handleVerify(value);
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full h-14 text-base font-medium rounded-xl"
            disabled={loading || code.length !== 6}
            onClick={() => handleVerify(code)}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            className="mt-6 w-full text-sm text-link font-medium hover:underline disabled:opacity-50 disabled:no-underline"
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : resending ? 'Sending...' : 'Resend code'}
          </button>

          <p className="mt-4 text-sm text-center">
            <Link to="/login" className="text-muted-foreground hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default VerifyOtp;
