import { useState } from 'react';
import { ArrowLeft, Wifi, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import paygoLogo from '@/assets/paygo-logo.png';

const networks = [
  { id: 'mtn', name: 'MTN', color: 'bg-yellow-400', textColor: 'text-yellow-900' },
  { id: 'glo', name: 'Glo', color: 'bg-green-500', textColor: 'text-white' },
  { id: 'airtel', name: 'Airtel', color: 'bg-red-500', textColor: 'text-white' },
  { id: '9mobile', name: '9mobile', color: 'bg-green-600', textColor: 'text-white' },
];

const dataPlans: Record<string, { id: string; name: string; price: number; validity: string }[]> = {
  mtn: [
    { id: 'mtn-1', name: '1GB', price: 300, validity: '1 Day' },
    { id: 'mtn-2', name: '2GB', price: 500, validity: '2 Days' },
    { id: 'mtn-3', name: '3GB', price: 1000, validity: '30 Days' },
    { id: 'mtn-4', name: '5GB', price: 1500, validity: '30 Days' },
    { id: 'mtn-5', name: '10GB', price: 3000, validity: '30 Days' },
    { id: 'mtn-6', name: '20GB', price: 5000, validity: '30 Days' },
  ],
  glo: [
    { id: 'glo-1', name: '1.25GB', price: 200, validity: '1 Day' },
    { id: 'glo-2', name: '2.5GB', price: 500, validity: '2 Days' },
    { id: 'glo-3', name: '4.1GB', price: 1000, validity: '30 Days' },
    { id: 'glo-4', name: '7.2GB', price: 1500, validity: '30 Days' },
    { id: 'glo-5', name: '10GB', price: 2500, validity: '30 Days' },
    { id: 'glo-6', name: '18GB', price: 4000, validity: '30 Days' },
  ],
  airtel: [
    { id: 'airtel-1', name: '1GB', price: 300, validity: '1 Day' },
    { id: 'airtel-2', name: '2GB', price: 500, validity: '2 Days' },
    { id: 'airtel-3', name: '3GB', price: 1000, validity: '30 Days' },
    { id: 'airtel-4', name: '4.5GB', price: 1500, validity: '30 Days' },
    { id: 'airtel-5', name: '10GB', price: 3000, validity: '30 Days' },
    { id: 'airtel-6', name: '20GB', price: 5000, validity: '30 Days' },
  ],
  '9mobile': [
    { id: '9mobile-1', name: '1GB', price: 200, validity: '1 Day' },
    { id: '9mobile-2', name: '1.5GB', price: 500, validity: '30 Days' },
    { id: '9mobile-3', name: '2GB', price: 1000, validity: '30 Days' },
    { id: '9mobile-4', name: '4.5GB', price: 1500, validity: '30 Days' },
    { id: '9mobile-5', name: '11GB', price: 3000, validity: '30 Days' },
    { id: '9mobile-6', name: '15GB', price: 4000, validity: '30 Days' },
  ],
};

const Data = () => {
  const navigate = useNavigate();
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlans = selectedNetwork ? dataPlans[selectedNetwork] : [];
  const selectedPlanData = currentPlans.find(p => p.id === selectedPlan);

  const handlePurchase = () => {
    if (!selectedNetwork || !phoneNumber || !selectedPlanData) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`${selectedPlanData.name} data purchased for ${phoneNumber} on ${selectedNetwork.toUpperCase()}!`);
      navigate('/home');
    }, 2000);
  };

  const isValid = selectedNetwork && phoneNumber.length >= 10 && selectedPlanData;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <img 
            src={paygoLogo} 
            alt="PayGo Logo" 
            className="h-10 w-auto object-contain"
          />
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 overflow-auto">
        {/* Title Card */}
        <div className="bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl p-5 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Wifi className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Buy Data</h1>
              <p className="text-white/80 text-sm">Affordable data bundles for all networks</p>
            </div>
          </div>
        </div>

        {/* Network Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Select Network</h2>
          <div className="grid grid-cols-4 gap-3">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => {
                  setSelectedNetwork(network.id);
                  setSelectedPlan(null);
                }}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  selectedNetwork === network.id
                    ? 'border-purple-500 shadow-md'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className={`w-full aspect-square ${network.color} rounded-lg flex items-center justify-center mb-2`}>
                  <span className={`text-xs font-bold ${network.textColor}`}>{network.name}</span>
                </div>
                {selectedNetwork === network.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Phone Number</h2>
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
            className="h-14 text-lg bg-white border-gray-200 rounded-xl"
          />
        </div>

        {/* Data Plans */}
        {selectedNetwork && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Select Data Plan</h2>
            <div className="grid grid-cols-2 gap-3">
              {currentPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPlan === plan.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-bold text-gray-900 text-lg">{plan.name}</p>
                  <p className="text-purple-600 font-semibold">₦{plan.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{plan.validity}</p>
                  {selectedPlan === plan.id && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4 text-purple-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {isValid && selectedPlanData && (
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Data Plan</span>
              <span className="font-semibold text-gray-900">{selectedPlanData.name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Validity</span>
              <span className="font-semibold text-gray-900">{selectedPlanData.validity}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">₦{selectedPlanData.price.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Purchase Button */}
        <Button 
          onClick={handlePurchase}
          disabled={!isValid || isProcessing}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800 text-white shadow-lg disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Buy Data${selectedPlanData ? ` - ₦${selectedPlanData.price.toLocaleString()}` : ''}`
          )}
        </Button>
      </main>
    </div>
  );
};

export default Data;