import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, X, CreditCard, Phone, Wallet, Zap, HelpCircle, Eye, EyeOff, Users, ChevronRight, ChevronLeft, ArrowUpRight, Bell, LogOut, Check, User, ArrowDownLeft, Wifi, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { UpgradeDrawer } from '@/components/UpgradeDrawer';
import { BottomNav } from '@/components/BottomNav';
import paygoLogo from '@/assets/paygo-logo.png';
import promoTransactWin from '@/assets/promo-transact-win.jpg';
import promoBasketball from '@/assets/promo-basketball.jpg';
import promoAirtime from '@/assets/promo-airtime.jpg';
import {
  CreditCardIcon,
  TvIcon,
  AirtimeChartIcon,
  DataCabinetIcon,
  HeadphonesIcon,
  GlobeIcon,
  MoneyBagIcon,
  ProfileIcon
} from '@/components/QuickActionIcons';

const onboardingSteps = [
  {
    icon: Gift,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Welcome Bonus',
    description: (
      <>
        You've received a welcome bonus of{' '}
        <span className="font-semibold text-foreground">₦180,000</span>! This amount is already in 
        your account and can be withdrawn after purchasing a PAY ID.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: CreditCard,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Get Your PAY ID',
    description: (
      <>
        To withdraw funds, you'll need to purchase a PAY ID for{' '}
        <span className="font-semibold text-foreground">₦6,500</span>. This is a one-time purchase that unlocks all features of the app.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: Phone,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Airtime & Data',
    description: (
      <>
        You can purchase airtime and data for all major networks directly from the app. Simply select the service, enter the phone number, choose your plan, and complete your purchase.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: Wallet,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Withdrawal Process',
    description: (
      <>
        To withdraw your funds, tap the "Withdraw" button on your dashboard, enter your bank details and PAY ID, and submit your request. Withdrawals are processed within 24 hours.
      </>
    ),
    showQuickLinks: false,
  },
  {
    icon: Zap,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Earn More',
    description: (
      <>
        Explore our app to discover ways to earn more! Refer friends to earn{' '}
        <span className="font-semibold text-foreground">₦500</span> per referral, join our communities, and take advantage of special promotions.
      </>
    ),
    showQuickLinks: true,
  },
];

const quickActions = [
  { IconComponent: CreditCardIcon, label: 'Buy PAY ID', route: '/buy-pay-id' },
  { IconComponent: TvIcon, label: 'Watch', route: '/watch' },
  { IconComponent: AirtimeChartIcon, label: 'Airtime', route: '/airtime' },
  { IconComponent: DataCabinetIcon, label: 'Data', route: '/data' },
  { IconComponent: HeadphonesIcon, label: 'Support', route: '/support' },
  { IconComponent: GlobeIcon, label: 'Group', route: '/communities' },
  { IconComponent: MoneyBagIcon, label: 'Earn More', route: '/earn-more' },
  { IconComponent: ProfileIcon, label: 'Profile', route: '/profile' },
];

const promotions = [
  {
    id: 1,
    image: promoTransactWin,
  },
  {
    id: 2,
    image: promoBasketball,
  },
  {
    id: 3,
    image: promoAirtime,
  },
];

const transactions = [
  {
    id: 1,
    icon: ArrowUpRight,
    iconBg: 'hsl(0 72% 96%)',
    iconColor: 'hsl(0 72% 50%)',
    title: 'Bank Transfer',
    subtitle: 'To GTBank • ****4521',
    amount: '-₦25,000',
    amountColor: 'hsl(0 72% 50%)',
    time: 'Today, 2:14 PM',
  },
  {
    id: 2,
    icon: ArrowDownLeft,
    iconBg: 'hsl(142 72% 94%)',
    iconColor: 'hsl(142 60% 35%)',
    title: 'Transfer Received',
    subtitle: 'From Emeka Obi',
    amount: '+₦50,000',
    amountColor: 'hsl(142 60% 35%)',
    time: 'Today, 11:02 AM',
  },
  {
    id: 3,
    icon: Phone,
    iconBg: 'hsl(210 80% 94%)',
    iconColor: 'hsl(210 80% 45%)',
    title: 'Airtime Purchase',
    subtitle: 'MTN • 0803 456 7890',
    amount: '-₦1,000',
    amountColor: 'hsl(0 72% 50%)',
    time: 'Yesterday, 6:45 PM',
  },
  {
    id: 4,
    icon: Wifi,
    iconBg: 'hsl(270 72% 95%)',
    iconColor: 'hsl(270 72% 50%)',
    title: 'Data Bundle',
    subtitle: 'Airtel • 5GB Plan',
    amount: '-₦2,500',
    amountColor: 'hsl(0 72% 50%)',
    time: 'Yesterday, 3:30 PM',
  },
  {
    id: 5,
    icon: ShoppingBag,
    iconBg: 'hsl(38 100% 93%)',
    iconColor: 'hsl(38 92% 40%)',
    title: 'Welcome Bonus',
    subtitle: 'PayGo Rewards',
    amount: '+₦180,000',
    amountColor: 'hsl(142 60% 35%)',
    time: 'Mar 12, 9:00 AM',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Check if user has completed onboarding before
    return localStorage.getItem('onboardingComplete') !== 'true';
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showBalance, setShowBalance] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [showUpgradeDrawer, setShowUpgradeDrawer] = useState(false);
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? parseFloat(saved) : 180000;
  });
  const totalSteps = 5;

  // Initialize balance in localStorage if not set
  useEffect(() => {
    if (!localStorage.getItem('walletBalance')) {
      localStorage.setItem('walletBalance', '180000');
    }
  }, []);

  // Listen for balance changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('walletBalance');
      if (saved) setBalance(parseFloat(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOnboarding(false);
      localStorage.setItem('onboardingComplete', 'true');
    }
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingComplete', 'true');
  };

  // Auto-rotate promotions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextPromo = () => {
    setCurrentPromo((prev) => (prev + 1) % promotions.length);
  };

  const prevPromo = () => {
    setCurrentPromo((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const currentStepData = onboardingSteps[currentStep - 1];
  const StepIcon = currentStepData?.icon || Gift;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{background: 'hsl(250 30% 97%)'}}>

      {/* === Rich layered background mesh === */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient wash */}
        <div className="absolute inset-0"
          style={{background: 'radial-gradient(ellipse 120% 80% at 50% -10%, hsl(270 72% 60% / 0.18) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 100% 30%, hsl(240 80% 55% / 0.12) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 0% 80%, hsl(290 65% 62% / 0.10) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 50% 100%, hsl(220 70% 60% / 0.08) 0%, transparent 50%)'}}
        />
        {/* Diagonal stripe texture */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{backgroundImage: 'repeating-linear-gradient(135deg, hsl(270 72% 50%) 0px, hsl(270 72% 50%) 1px, transparent 1px, transparent 40px)'}}
        />
        {/* Floating orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full float-orb"
          style={{background: 'radial-gradient(circle, hsl(270 72% 58% / 0.22) 0%, transparent 70%)', filter: 'blur(40px)'}} />
        <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full float-orb"
          style={{background: 'radial-gradient(circle, hsl(240 80% 55% / 0.16) 0%, transparent 70%)', filter: 'blur(32px)', animationDelay: '2s'}} />
        <div className="absolute bottom-32 right-0 w-64 h-64 rounded-full float-orb"
          style={{background: 'radial-gradient(circle, hsl(290 65% 60% / 0.14) 0%, transparent 70%)', filter: 'blur(28px)', animationDelay: '4s'}} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full float-orb"
          style={{background: 'radial-gradient(circle, hsl(260 70% 55% / 0.08) 0%, transparent 70%)', filter: 'blur(50px)', animationDelay: '1s'}} />
      </div>

      {/* Header */}
      <header className="py-4 flex justify-center backdrop-blur-md border-b shadow-sm"
        style={{background: 'hsl(0 0% 100% / 0.72)', borderColor: 'hsl(270 50% 70% / 0.20)'}}>
        <img 
          src={paygoLogo} 
          alt="PayGo Logo" 
          className="h-12 w-auto object-contain animate-swing"
        />
      </header>

      {/* Main Content - Dashboard */}
      <main className="flex-1 px-4 pb-28 pt-4">
        {/* Balance Card */}
        <div className="rounded-2xl p-5 text-white mb-6 shadow-2xl relative overflow-hidden"
          style={{background: 'linear-gradient(135deg, hsl(270 72% 38%) 0%, hsl(262 80% 30%) 40%, hsl(250 85% 25%) 100%)'}}>
          {/* Card inner shimmer orbs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-30"
            style={{background: 'radial-gradient(circle, hsl(280 80% 80%) 0%, transparent 70%)', filter: 'blur(20px)'}} />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-20"
            style={{background: 'radial-gradient(circle, hsl(240 80% 70%) 0%, transparent 70%)', filter: 'blur(16px)'}} />
          {/* Subtle dot grid overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px'}} />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <User className="h-5 w-5 text-white" />
              </button>
              <div>
                <p className="text-base font-medium">Hi, Frank 👋</p>
                <p className="text-white/80 text-sm">Welcome back!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-white/80" />
              <button 
                onClick={() => navigate('/register')}
                className="text-white text-sm font-medium flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
          
          <div className="mb-1">
            <p className="text-white/80 text-sm mb-1">Your Balance</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold">
                {showBalance ? `₦${balance.toLocaleString()}.00` : '••••••••'}
              </p>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white"
              >
                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-white/80 text-sm mt-1">
              Weekly Rewards: <span className="text-white font-medium">₦180,000.00</span>
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <Button 
              variant="secondary" 
              className="flex-1 bg-purple-500/50 hover:bg-purple-500/70 text-white border-0 rounded-full h-11"
              onClick={() => setShowUpgradeDrawer(true)}
            >
              <Check className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 bg-purple-500/50 hover:bg-purple-500/70 text-white border-0 rounded-full h-11"
              onClick={() => navigate('/transfer')}
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Transfer
            </Button>
          </div>
        </div>

        {/* Quick Actions - 8 items in 2 rows */}
        <div className="rounded-2xl p-4 mb-6 shadow-sm"
          style={{background: 'hsl(0 0% 100% / 0.80)', backdropFilter: 'blur(16px)', border: '1px solid hsl(270 50% 80% / 0.20)'}}>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button 
                key={index} 
                className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
                onClick={() => action.route && navigate(action.route)}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-shadow group-hover:shadow-lg"
                  style={{background: 'linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(260 30% 97%) 100%)', border: '1px solid hsl(270 40% 88% / 0.60)'}}>
                  <action.IconComponent />
                </div>
                <span className="text-[11px] font-semibold text-center leading-tight"
                  style={{color: 'hsl(250 20% 35%)'}}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Promotions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold" style={{color: 'hsl(250 30% 20%)'}}>Current Promotions</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{background: 'hsl(270 72% 58% / 0.12)', color: 'hsl(270 72% 42%)'}}>
              {currentPromo + 1} / {promotions.length}
            </span>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden h-52"
            style={{boxShadow: '0 8px 32px hsl(270 60% 40% / 0.20), 0 2px 8px hsl(0 0% 0% / 0.08)'}}>
            {/* Sliding track */}
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentPromo * 100}%)` }}
            >
              {promotions.map((promo, index) => (
                <img
                  key={index}
                  src={promo.image}
                  alt={`Promotion ${index + 1}`}
                  className="w-full flex-shrink-0 h-full object-cover"
                />
              ))}
            </div>

            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 pointer-events-none"
              style={{background: 'linear-gradient(to bottom, transparent 50%, hsl(0 0% 0% / 0.25) 100%)'}} />

            {/* Navigation Arrows */}
            <button 
              onClick={prevPromo}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{background: 'hsl(0 0% 100% / 0.25)', backdropFilter: 'blur(8px)', border: '1px solid hsl(0 0% 100% / 0.30)'}}
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={nextPromo}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{background: 'hsl(0 0% 100% / 0.25)', backdropFilter: 'blur(8px)', border: '1px solid hsl(0 0% 100% / 0.30)'}}
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromo(index)}
                  className="transition-all duration-300"
                  style={{
                    width: index === currentPromo ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: index === currentPromo ? 'white' : 'hsl(0 0% 100% / 0.50)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold" style={{color: 'hsl(250 30% 20%)'}}>Recent Transactions</h3>
            <button className="text-xs font-semibold" style={{color: 'hsl(270 72% 50%)'}}>See all</button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm"
            style={{background: 'hsl(0 0% 100% / 0.80)', backdropFilter: 'blur(16px)', border: '1px solid hsl(270 50% 80% / 0.20)'}}>
            {transactions.map((tx, index) => {
              const TxIcon = tx.icon;
              return (
                <div key={tx.id}
                  className="flex items-center gap-3 px-4 py-3 active:bg-purple-50/50 transition-colors"
                  style={{borderBottom: index < transactions.length - 1 ? '1px solid hsl(270 30% 92% / 0.60)' : 'none'}}>
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{background: tx.iconBg}}>
                    <TxIcon size={18} style={{color: tx.iconColor}} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{color: 'hsl(250 25% 18%)'}}>{tx.title}</p>
                    <p className="text-xs truncate mt-0.5" style={{color: 'hsl(250 15% 55%)'}}>{tx.subtitle}</p>
                  </div>

                  {/* Amount & Time */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{color: tx.amountColor}}>{tx.amount}</p>
                    <p className="text-[10px] mt-0.5" style={{color: 'hsl(250 15% 60%)'}}>{tx.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={handleCloseOnboarding}>
        <DialogContent className="p-0 border-0 max-w-sm mx-auto overflow-hidden bg-transparent shadow-none">
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600 p-6 relative">
              <button 
                onClick={handleCloseOnboarding}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to PayGo, Frank!
              </h2>
              <p className="text-white/90 text-sm mb-4">
                Step {currentStep} of {totalSteps}
              </p>
              {/* Progress Bar */}
              <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 flex-1 rounded-full ${
                      index < currentStep 
                        ? 'bg-white' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Step Icon */}
              <div className={`w-20 h-20 ${currentStepData?.iconBg || 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <StepIcon className={`h-10 w-10 ${currentStepData?.iconColor || 'text-purple-600'}`} />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">
                {currentStepData?.title || 'Welcome'}
              </h3>

              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {currentStepData?.description || 'Welcome to PayGo!'}
              </p>

              {/* Quick Links for Step 5 */}
              {currentStepData?.showQuickLinks && (
                <div className="flex justify-center gap-8 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-pink-500 rounded-full" />
                    </div>
                    <span className="text-sm text-muted-foreground">Communities</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Support</span>
                  </div>
                </div>
              )}

              {/* Next/Get Started Button */}
              <Button 
                onClick={handleNext}
                className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 hover:from-orange-500 hover:via-orange-600 hover:to-pink-600 text-white shadow-lg"
              >
                {isLastStep ? 'Get Started →' : 'Next →'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      {/* Upgrade Drawer */}
      <UpgradeDrawer open={showUpgradeDrawer} onOpenChange={setShowUpgradeDrawer} />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
