import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Users, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

// Only a one-way fingerprint of the valid code is stored — the code itself never appears.
const VALID_CODE_HASH = 'a630a72182cbc19982d899f7024008037bc1baad7d06934bea28b7bd2fb3020b';
const hashCode = async (value: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
};

const banks = [
  'Access Bank', 'First Bank', 'GTBank', 'UBA', 'Zenith Bank', 'Kuda Bank',
  'OPay', 'Palmpay', 'Moniepoint', 'Wema Bank', 'Sterling Bank', 'Fidelity Bank',
  'FCMB', 'Union Bank', 'Ecobank', 'Stanbic IBTC', 'Standard Chartered',
  'Polaris Bank', 'Keystone Bank', 'Unity Bank',
];

const Transfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transferType, setTransferType] = useState<'bank' | 'paygo' | null>('bank');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('Access Bank');
  const [amount, setAmount] = useState('');
  const [payIdCode, setPayIdCode] = useState('');
  const [paygoId, setPaygoId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showInvalidDialog, setShowInvalidDialog] = useState(false);

  const balance = (() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? parseFloat(saved) : 180000;
  })();

  const handleSubmit = () => {
    if (!accountName.trim() || accountNumber.length !== 10 || !selectedBank || !amount || !payIdCode) {
      toast({ title: 'Missing Information', description: 'Please fill in all fields correctly.', variant: 'destructive' });
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount > balance) {
      toast({ title: 'Insufficient Balance', description: 'Amount exceeds your available balance.', variant: 'destructive' });
      return;
    }

    setIsVerifying(true);
    setTimeout(async () => {
      const valid = (await hashCode(payIdCode.trim().toUpperCase())) === VALID_CODE_HASH;
      setIsVerifying(false);
      if (!valid) {
        setShowInvalidDialog(true);
        return;
      }

      const newBalance = balance - transferAmount;
      localStorage.setItem('walletBalance', newBalance.toString());

      navigate('/transfer/processing', {
        state: {
          amount,
          accountName,
          accountNumber,
          selectedBank,
          transferType: 'bank',
        },
      });
    }, 2000);
  };

  const handlePaygoTransfer = () => {
    if (!paygoId || !amount) {
      toast({ title: 'Missing Information', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }
    const transferAmount = parseFloat(amount);
    const newBalance = balance - transferAmount;
    localStorage.setItem('walletBalance', newBalance.toString());
    navigate('/transfer/processing', {
      state: { amount, accountName: paygoId, selectedBank: 'PayGo', accountNumber: paygoId, transferType: 'paygo' },
    });
  };

  const renderTransferOptions = () => (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Select Transfer Type</h2>
      <button
        onClick={() => setTransferType('bank')}
        className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-purple-200 transition-colors"
      >
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Building2 className="h-6 w-6 text-purple-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">Bank Transfer</p>
          <p className="text-sm text-muted-foreground">Transfer to any bank account</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </button>
      <button
        onClick={() => setTransferType('paygo')}
        className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-purple-200 transition-colors"
      >
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-green-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">PayGo User</p>
          <p className="text-sm text-muted-foreground">Transfer to another PayGo user</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );

  const renderBankTransfer = () => (
    <div className="px-5 py-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Bank Details</h2>

      <div className="space-y-4">
        <Input
          placeholder="Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="h-14 bg-white border-gray-200 rounded-xl text-base placeholder:text-muted-foreground"
        />

        <Input
          placeholder="Account Number (10 digits)"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
          inputMode="numeric"
          className="h-14 bg-white border-gray-200 rounded-xl text-base placeholder:text-muted-foreground"
        />

        <Select value={selectedBank} onValueChange={setSelectedBank}>
          <SelectTrigger className="h-14 bg-white border-gray-200 rounded-xl text-base">
            <SelectValue placeholder="Select Bank" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {banks.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
          inputMode="numeric"
          className="h-14 bg-white border-gray-200 rounded-xl text-base placeholder:text-muted-foreground"
        />

        <div>
          <Input
            placeholder="PAY ID CODE (Buy PAY ID)"
            value={payIdCode}
            onChange={(e) => setPayIdCode(e.target.value.toUpperCase())}
            className="h-14 bg-white border-gray-200 rounded-xl text-base placeholder:text-muted-foreground"
          />
          <button
            onClick={() => navigate('/buy-pay-id')}
            className="text-[hsl(var(--paygo-purple))] font-semibold text-sm mt-2 hover:underline"
          >
            Buy PAY ID code
          </button>
        </div>
      </div>

      <p className="text-foreground font-bold text-lg mt-6">
        Available Balance: ₦{balance.toLocaleString()}.00
      </p>

      <Button
        onClick={handleSubmit}
        disabled={isVerifying}
        className="w-full h-14 text-lg font-semibold rounded-2xl bg-[hsl(var(--paygo-purple))] hover:bg-purple-700 text-white shadow-lg mt-6"
      >
        {isVerifying ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Verifying...</>
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );

  const renderPaygoTransfer = () => (
    <div className="px-5 py-6 space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-green-800 text-sm">
          <span className="font-semibold">Free Transfer!</span> Transfers to PayGo users are instant and free of charge.
        </p>
      </div>
      <Input
        placeholder="Recipient's PayGo ID"
        value={paygoId}
        onChange={(e) => setPaygoId(e.target.value.toUpperCase())}
        className="h-14 bg-white border-gray-200 rounded-xl text-base"
      />
      <Input
        placeholder="Amount (₦)"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
        inputMode="numeric"
        className="h-14 bg-white border-gray-200 rounded-xl text-base"
      />
      <p className="text-sm text-muted-foreground">Available Balance: ₦{balance.toLocaleString()}.00</p>
      <Button
        onClick={handlePaygoTransfer}
        disabled={!paygoId || !amount}
        className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
      >
        Transfer ₦{amount ? Number(amount).toLocaleString() : '0'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[hsl(var(--paygo-purple))] text-white px-4 py-4 flex items-center gap-4">
        <button
          onClick={() => (transferType ? setTransferType(null) : navigate('/home'))}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">
          {transferType === 'bank' ? 'Transfer To Bank' : transferType === 'paygo' ? 'PayGo Transfer' : 'Transfer'}
        </h1>
      </header>

      <main className="flex-1">
        {!transferType && renderTransferOptions()}
        {transferType === 'bank' && renderBankTransfer()}
        {transferType === 'paygo' && renderPaygoTransfer()}
      </main>

      <AlertDialog open={showInvalidDialog} onOpenChange={setShowInvalidDialog}>
        <AlertDialogContent className="max-w-[320px] mx-auto rounded-2xl p-6">
          <AlertDialogTitle className="sr-only">Invalid PAY ID Code</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground text-base leading-relaxed text-center">
            Invalid PAY ID Code. Please enter a valid PAY ID to proceed with withdrawal.
          </AlertDialogDescription>
          <AlertDialogFooter className="justify-center sm:justify-center mt-4">
            <AlertDialogAction
              onClick={() => setShowInvalidDialog(false)}
              className="bg-transparent text-teal-500 hover:bg-transparent hover:text-teal-600 font-semibold text-lg shadow-none"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Transfer;
