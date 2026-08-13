import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


const BuyPayIdConfirming = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, email, amount } = location.state || { fullName: '', email: '', amount: 6500 };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate confirming payment then show failed (for demo)
    const timer = setTimeout(() => {
      navigate('/buy-pay-id/failed', { 
        state: { fullName, email, amount } 
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [navigate, fullName, email, amount]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Purple Header */}
      <header className="bg-[hsl(var(--paygo-purple))] px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/buy-pay-id/payment')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white">Confirming Payment</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 bg-[#f8f9fb]">
        {/* Orange Circular Spinner */}
        <div className="relative w-32 h-32 mb-8">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '2s' }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f97316"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="62.83 188.49"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Confirming Your<br />Payment
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-center mb-8">
          Please wait while we verify your<br />transaction...
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-gray-800 rounded-full transition-all duration-100"
            style={{ width: `${Math.min(progress, 20)}%` }}
          />
        </div>

        {/* Info Text */}
        <p className="text-gray-500 text-center text-sm mb-2">
          This may take a few moments
        </p>
        <p className="text-gray-500 text-center text-sm">
          Please do not close this page
        </p>

        {/* Footer */}
        <div className="mt-auto pb-8">
          <p className="text-gray-900 font-semibold text-center">
            PayGo Financial Services LTD
          </p>
        </div>
      </main>

    </div>
  );
};

export default BuyPayIdConfirming;
