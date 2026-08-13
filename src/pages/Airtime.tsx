import { useState } from 'react';
import { ArrowLeft, Phone, Check } from 'lucide-react';
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

const amounts = [100, 200, 500, 1000, 2000, 5000];

const Airtime = () => {
  const navigate = useNavigate();
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handlePurchase = () => {
    if (!selectedNetwork || !phoneNumber || !finalAmount) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Airtime of ₦${finalAmount} purchased for ${phoneNumber} on ${selectedNetwork.toUpperCase()}!`);
      navigate('/home');
    }, 2000);
  };

  const isValid = selectedNetwork && phoneNumber.length >= 10 && finalAmount && finalAmount >= 50;

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
      <main className="flex-1 px-4 py-6">
        {/* Title Card */}
        <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl p-5 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Buy Airtime</h1>
              <p className="text-white/80 text-sm">Instant recharge for all networks</p>
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
                onClick={() => setSelectedNetwork(network.id)}
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

        {/* Amount Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Select Amount</h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                  selectedAmount === amount && !customAmount
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                ₦{amount.toLocaleString()}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₦</span>
            <Input
              type="text"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value.replace(/\D/g, ''));
                setSelectedAmount(null);
              }}
              className="h-14 text-lg bg-white border-gray-200 rounded-xl pl-10"
            />
          </div>
        </div>

        {/* Summary */}
        {isValid && (
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">₦{finalAmount?.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Purchase Button */}
        <Button 
          onClick={handlePurchase}
          disabled={!isValid || isProcessing}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white shadow-lg disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Buy Airtime${finalAmount ? ` - ₦${finalAmount.toLocaleString()}` : ''}`
          )}
        </Button>
      </main>
    </div>
  );
};

export default Airtime;