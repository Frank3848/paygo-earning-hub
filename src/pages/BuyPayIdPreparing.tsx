import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


const BuyPayIdPreparing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, email, amount } = location.state || { fullName: '', email: '', amount: 6500 };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100 over 3 seconds
    const duration = 3000;
    const interval = 30;
    const increment = (100 / duration) * interval;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, []);

  // Navigate only when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      const navigateTimer = setTimeout(() => {
        navigate('/buy-pay-id/payment', { 
          state: { fullName, email, amount } 
        });
      }, 300); // Small delay after completion for visual feedback

      return () => clearTimeout(navigateTimer);
    }
  }, [progress, navigate, fullName, email, amount]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Purple Header */}
      <header className="bg-[hsl(var(--paygo-purple))] px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/buy-pay-id')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white">Buy PAY ID</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 bg-[#f8f9fb]">
        {/* Purple Circular Spinner */}
        <div className="relative w-32 h-32 mb-8">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '2s' }} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e8dcf8"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(273, 82%, 56%)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="62.83 188.49"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Preparing Payment<br />Account
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-center mb-8">
          Please wait while we set up your payment...
        </p>

        {/* Progress Bar - Now synchronized */}
        <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gray-800 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

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

export default BuyPayIdPreparing;
