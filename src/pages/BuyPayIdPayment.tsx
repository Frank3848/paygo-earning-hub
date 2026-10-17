import { useState, useRef } from 'react';
import { ArrowLeft, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'sonner';

const BuyPayIdPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullName, email, amount } = location.state || { fullName: 'Frank', email: 'sureplug3848@gmail.com', amount: 6500 };
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accountNumber = '7056998378';
  const bankName = 'Moniepoint MFB';
  const accountName = 'Joshua Agu Bitrus';

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    toast.success('Account number copied!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleConfirmTransfer = () => {
    if (!uploadedFile) {
      toast.error('Please upload your payment receipt before confirming');
      return;
    }
    navigate('/buy-pay-id/confirming', { 
      state: { fullName, email, amount } 
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* Purple Header */}
      <header className="bg-[hsl(var(--paygo-purple))] px-4 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/buy-pay-id')}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white">PAY ID Payment</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-5 overflow-y-auto pb-32">
        {/* Orange Warning Note */}
        <div className="bg-[hsl(var(--paygo-note))] border border-[hsl(var(--paygo-note-border))] rounded-xl p-4 mb-4">
          <p className="text-[hsl(var(--paygo-note-foreground))] text-sm font-medium leading-relaxed">
            Please transfer the exact amount to the account below and upload your receipt
          </p>
        </div>

        {/* Blue Info Card */}
        <div className="bg-[hsl(var(--paygo-info))] border border-[hsl(var(--paygo-info-border))] rounded-xl p-4 mb-5">
          <p className="text-[hsl(var(--paygo-info-foreground))] text-sm">
            You are purchasing a <span className="font-bold">PAY ID</span> for <span className="font-bold">{fullName}</span> - Amount: <span className="font-bold">₦{amount.toLocaleString()}</span>
          </p>
        </div>

        {/* Transfer Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Transfer to this account
          </h3>

          {/* Account Number */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Account Number</p>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <span className="text-lg font-bold text-blue-600">{accountNumber}</span>
              <button 
                onClick={handleCopyAccountNumber}
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Bank Name */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Bank Name</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <span className="text-lg font-semibold text-gray-900">{bankName}</span>
            </div>
          </div>

          {/* Account Name */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Account Name</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <span className="text-lg font-semibold text-gray-900">{accountName}</span>
            </div>
          </div>
        </div>

        {/* Amount to Transfer */}
        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Amount to Transfer</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <span className="text-2xl font-bold text-gray-900">₦{amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Email Display */}
        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Your Email Address</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <span className="text-gray-500">{email}</span>
          </div>
        </div>

        {/* Upload Receipt */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Payment Receipt</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,.pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors"
          >
            {uploadedFile ? (
              <>
                <FileText className="h-10 w-10 text-blue-500 mb-2" />
                <span className="text-sm text-gray-600">{uploadedFile.name}</span>
              </>
            ) : (
              <>
                <FileText className="h-10 w-10 text-blue-300 mb-2" />
                <span className="text-sm text-gray-500">Tap to upload payment receipt</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f9fb] px-4 pb-6 pt-3">
        {/* Confirm Button */}
        <Button 
          onClick={handleConfirmTransfer}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-[hsl(var(--paygo-purple))] hover:bg-[hsl(273,82%,50%)] text-white shadow-lg mb-3"
        >
          Confirm Transfer
        </Button>

        {/* Footer */}
        <p className="text-gray-900 font-semibold text-center">
          PayGo Financial Services LTD
        </p>
      </div>

    </div>
  );
};

export default BuyPayIdPayment;
