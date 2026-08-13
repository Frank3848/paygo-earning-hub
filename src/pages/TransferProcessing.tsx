import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const TransferProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transferData = location.state || {};

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      navigate('/transfer/success', { state: transferData });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, transferData]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Spinner */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
      </div>

      {/* Status Text */}
      <h2 className="text-2xl font-bold text-foreground mb-2">Processing</h2>
      <p className="text-muted-foreground text-center">
        Please wait while we process your withdraw request...
      </p>
    </div>
  );
};

export default TransferProcessing;
