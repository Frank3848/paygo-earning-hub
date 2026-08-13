import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import paygoLogo from '@/assets/paygo-logo.png';

const UpgradeConfirming = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || { name: 'Platinum Level' };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate payment verification progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to failed page after "verification"
          setTimeout(() => {
            navigate('/upgrade/failed', { state: { plan } });
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate, plan]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <img 
        src={paygoLogo} 
        alt="PayGo Logo" 
        className="h-16 w-auto mb-8 animate-pulse"
      />

      {/* Loading Spinner */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
        </div>
      </div>

      {/* Status Text */}
      <h2 className="text-2xl font-bold text-white mb-2">Confirming Payment</h2>
      <p className="text-white/80 text-center mb-8">
        Please wait while we verify your {plan.name} upgrade payment...
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-xs bg-white/20 rounded-full h-2 mb-4">
        <div
          className="bg-white h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/60 text-sm">{progress}% Complete</p>
    </div>
  );
};

export default UpgradeConfirming;
