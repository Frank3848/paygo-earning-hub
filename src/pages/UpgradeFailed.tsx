import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle, RefreshCw, MessageCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';


const UpgradeFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || { name: 'Platinum Level', price: '₦10,000' };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Failed Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle className="h-14 w-14 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 text-center mb-8 max-w-sm">
          We couldn't verify your payment for {plan.name}. Please try again or contact support if you've already made the transfer.
        </p>

        {/* Info Card */}
        <div className="w-full bg-orange-100 border border-orange-300 rounded-xl p-4 mb-8">
          <p className="text-orange-800 text-sm text-center">
            If you've made the payment, please wait a few minutes and try again. Payment verification can take up to 10 minutes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button
            onClick={() => navigate('/upgrade/payment', { state: { plan } })}
            className="w-full h-14 text-lg font-semibold rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={() => navigate('/support')}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-xl border-purple-500 text-purple-600 hover:bg-purple-50"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Contact Support
          </Button>

          <Button
            onClick={() => navigate('/home')}
            variant="ghost"
            className="w-full h-12 text-gray-600"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </main>

    </div>
  );
};

export default UpgradeFailed;
