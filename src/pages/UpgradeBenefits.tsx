import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';


const planDetails: Record<string, {
  name: string;
  price: string;
  features: string[];
}> = {
  basic: {
    name: 'Basic Level',
    price: '₦6,500',
    features: [
      'Earn ₦500 per referral',
      'Weekly rewards of ₦5,000',
      'Standard customer support',
      'Access to all basic features',
      'Withdraw up to ₦50,000/week',
    ],
  },
  premium: {
    name: 'Premium Level',
    price: '₦15,000',
    features: [
      'Earn ₦1,500 per referral',
      'Weekly rewards of ₦15,000',
      'Priority customer support',
      'No fees on transactions',
      'Exclusive promotions',
      'Withdraw up to ₦200,000/week',
    ],
  },
  vip: {
    name: 'Platinum Level',
    price: '₦10,000',
    features: [
      'Earn ₦2,000 per referral',
      'Weekly rewards of ₦20,000',
      'VIP customer support',
      'No fees on transactions',
      'Exclusive promotions',
      'Daily withdrawal option',
    ],
  },
};

const UpgradeBenefits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planId = location.state?.planId || 'vip';
  const plan = planDetails[planId] || planDetails.vip;

  const handleProceedToPayment = () => {
    navigate('/upgrade/payment', { state: { planId, plan } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 flex items-center gap-4">
        <button onClick={() => navigate('/home')} className="p-1">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Level Benefits</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        {/* Plan Card */}
        <div className="bg-blue-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
              <Zap className="h-10 w-10 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
            </div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-purple-600 mb-6">Benefits & Features</h3>
          
          <div className="space-y-4">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <Button
          onClick={handleProceedToPayment}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-purple-500 hover:bg-purple-600 text-white mb-4"
        >
          Proceed to Payment
        </Button>

        <p className="text-center text-gray-600">
          Your upgrade will be activated immediately after payment is confirmed
        </p>
      </main>

    </div>
  );
};

export default UpgradeBenefits;
