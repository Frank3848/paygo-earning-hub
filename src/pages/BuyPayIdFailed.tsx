import { ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';


const BuyPayIdFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, email, amount } = location.state || { fullName: '', email: '', amount: 6500 };

  const handleTryAgain = () => {
    navigate('/buy-pay-id/payment', { 
      state: { fullName, email, amount } 
    });
  };

  const handleGoToDashboard = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Purple Header */}
      <header className="bg-[hsl(var(--paygo-purple))] px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white">Transaction Failed</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-12 bg-[#f8f9fb]">
        {/* Red X Circle */}
        <div className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center mb-8">
          <X className="h-14 w-14 text-white" strokeWidth={3} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">
          Transaction verification<br />failed!
        </h2>

        {/* Error Message */}
        <p className="text-gray-900 text-center font-medium mb-2">
          Your payment could not be completed.
        </p>
        <p className="text-gray-600 text-center mb-8">
          Reason: No Payment received from you/<br />invalid payment method.
        </p>

        {/* Not Available Option */}
        <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center justify-between">
          <span className="text-gray-900">Not Available</span>
          <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button 
            onClick={handleTryAgain}
            className="w-full h-14 text-lg font-semibold rounded-xl bg-[hsl(var(--paygo-purple))] hover:bg-[hsl(273,82%,50%)] text-white shadow-lg"
          >
            Try Again
          </Button>

          <Button 
            onClick={handleGoToDashboard}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-xl border-2 border-gray-200 text-gray-900 bg-white hover:bg-gray-50"
          >
            Go to Dashboard
          </Button>
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

export default BuyPayIdFailed;
