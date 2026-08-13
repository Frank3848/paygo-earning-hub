import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

const UpgradePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || { name: 'Platinum Level', price: '₦10,000' };
  
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accountNumber = '1002550677';
  const bankName = 'Sparkle';
  const accountName = 'Frank Joseph';

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    toast.success('Account number copied!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleConfirmPayment = () => {
    if (!receiptImage) {
      toast.error('Please upload your payment receipt');
      return;
    }
    // Navigate to confirming page
    navigate('/upgrade/confirming', { state: { plan } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">{plan.name} Payment</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        {/* Notice Card */}
        <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 mb-4">
          <p className="text-orange-800 font-medium">
            Please transfer the exact amount to the account below and upload your receipt
          </p>
        </div>

        {/* Upgrade Info Card */}
        <div className="bg-purple-100 border border-purple-300 rounded-xl p-4 mb-6">
          <p className="text-purple-800">
            You are upgrading to <span className="font-bold">{plan.name}</span> - Amount: <span className="font-bold text-purple-600">{plan.price}</span>
          </p>
        </div>

        {/* Bank Details Card */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Transfer to this account</h3>
          
          {/* Account Number */}
          <div className="mb-4">
            <p className="text-gray-500 mb-2">Account Number</p>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xl font-bold text-purple-600">{accountNumber}</span>
              <button
                onClick={handleCopyAccountNumber}
                className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Copy className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Bank Name */}
          <div className="mb-4">
            <p className="text-gray-500 mb-2">Bank Name</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <span className="text-lg font-semibold text-gray-900">{bankName}</span>
            </div>
          </div>

          {/* Account Name */}
          <div>
            <p className="text-gray-500 mb-2">Account Name</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <span className="text-lg font-semibold text-gray-900">{accountName}</span>
            </div>
          </div>
        </div>

        {/* Upload Receipt Section */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Payment Receipt</h3>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {receiptImage ? (
            <div className="relative">
              <img
                src={receiptImage}
                alt="Receipt"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <button
                onClick={handleUploadClick}
                className="mt-3 text-purple-600 font-medium"
              >
                Change Image
              </button>
            </div>
          ) : (
            <button
              onClick={handleUploadClick}
              disabled={isUploading}
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-400 transition-colors"
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-gray-500">
                {isUploading ? 'Uploading...' : 'Tap to upload receipt'}
              </span>
            </button>
          )}
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmPayment}
          disabled={!receiptImage}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50"
        >
          I Have Made Payment
        </Button>
      </main>

    </div>
  );
};

export default UpgradePayment;
