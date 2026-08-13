import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';


interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  about: string;
}

const defaultProfile: UserProfile = {
  fullName: "Frank",
  email: "sureplug3848@gmail.com",
  phone: "+234 801 234 5678",
  about: "PayGo user since 2023"
};

const BuyPayId = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Auto-fill from user profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed: UserProfile = JSON.parse(savedProfile);
      setFullName(parsed.fullName || defaultProfile.fullName);
      setEmail(parsed.email || defaultProfile.email);
    } else {
      setFullName(defaultProfile.fullName);
      setEmail(defaultProfile.email);
    }
  }, []);

  const handlePay = () => {
    if (!fullName.trim() || !email.trim()) {
      return;
    }
    
    // Navigate to preparing payment screen with user data
    navigate('/buy-pay-id/preparing', { 
      state: { fullName, email, amount: 6500 } 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Purple Header */}
      <header className="bg-[hsl(var(--paygo-purple))] px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white">Buy PAY ID</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 bg-gray-50">
        {/* Amount Field */}
        <div className="mb-5">
          <label className="block text-base font-semibold text-foreground mb-2">
            Amount
          </label>
          <Input
            value="₦6,500"
            disabled
            className="h-14 text-lg text-muted-foreground bg-white border-gray-200 rounded-xl"
          />
        </div>

        {/* Full Name Field */}
        <div className="mb-5">
          <label className="block text-base font-semibold text-foreground mb-2">
            Full Name
          </label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="h-14 text-lg text-foreground bg-white border-gray-200 rounded-xl"
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-foreground mb-2">
            Your Email Address
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="h-14 text-lg text-foreground bg-white border-gray-200 rounded-xl"
          />
        </div>

        {/* Pay Button */}
        <Button 
          onClick={handlePay}
          disabled={!fullName.trim() || !email.trim()}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-[hsl(var(--paygo-purple))] hover:bg-purple-700 text-white shadow-lg disabled:opacity-50"
        >
          Pay
        </Button>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Your PAY ID will be displayed on the app once your payment is confirmed.
          </p>
          <p className="text-foreground font-semibold">
            PayGo Financial Services LTD
          </p>
        </div>
      </main>

    </div>
  );
};

export default BuyPayId;
