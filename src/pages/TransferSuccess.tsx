import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TransferSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = '0', accountName = '', accountNumber = '', selectedBank = '' } = (location.state || {}) as {
    amount?: string; accountName?: string; accountNumber?: string; selectedBank?: string;
  };

  const transactionId = useMemo(
    () => 'TRX' + Math.floor(100000000 + Math.random() * 900000000).toString(),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[hsl(var(--paygo-purple))] text-white px-5 py-4">
        <h1 className="text-xl font-bold">Withdrawal Result</h1>
      </header>

      <main className="flex-1 px-5 py-8 flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-10 w-10 text-green-600" strokeWidth={3} />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Withdrawal Successful!</h2>
        <p className="text-muted-foreground text-center mb-8">
          Your withdrawal has been processed successfully.
        </p>

        {/* Details Card */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          <Row label="Amount:" value={`₦${Number(amount).toLocaleString()}.00`} bold />
          <Row label="Bank:" value={selectedBank || '-'} bold />
          <Row label="Account Number:" value={accountNumber || '-'} bold />
          <Row label="Account Name:" value={accountName || '-'} bold />
          <Row label="Transaction ID:" value={transactionId} bold />
        </div>

        <Button
          onClick={() => navigate('/home')}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white shadow-lg mt-8"
        >
          Back to Dashboard
        </Button>
      </main>
    </div>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between px-5 py-4">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className={`text-foreground text-right ${bold ? 'font-bold' : ''}`}>{value}</span>
  </div>
);

export default TransferSuccess;
