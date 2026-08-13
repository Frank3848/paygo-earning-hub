import { useState } from 'react';
import { Check, Crown, Star, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useNavigate } from 'react-router-dom';

interface UpgradeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₦6,500',
    icon: Star,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    features: [
      'Access to all basic features',
      'Withdraw up to ₦50,000/week',
      'Standard support',
    ],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₦15,000',
    icon: Crown,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    features: [
      'All Basic features',
      'Withdraw up to ₦200,000/week',
      'Priority support',
      'Exclusive promotions',
    ],
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '₦30,000',
    icon: Zap,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    features: [
      'All Premium features',
      'Unlimited withdrawals',
      '24/7 VIP support',
      'Early access to new features',
      'Double referral bonus',
    ],
    popular: false,
  },
];

export const UpgradeDrawer = ({ open, onOpenChange }: UpgradeDrawerProps) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgrade = () => {
    if (selectedPlan) {
      // Store selected plan and navigate to upgrade benefits
      localStorage.setItem('selectedPlan', selectedPlan);
      onOpenChange(false);
      navigate('/upgrade/benefits', { state: { planId: selectedPlan } });
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-center pb-2">
          <DrawerTitle className="text-2xl font-bold">Upgrade Your Account</DrawerTitle>
          <DrawerDescription>
            Choose a plan to unlock premium features
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto">
          <div className="space-y-3">
            {plans.map((plan) => {
              const PlanIcon = plan.icon;
              const isSelected = selectedPlan === plan.id;

              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${plan.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <PlanIcon className={`h-6 w-6 ${plan.iconColor}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <span className="font-bold text-purple-600">{plan.price}</span>
                      </div>

                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <DrawerFooter className="pt-2">
          <Button
            onClick={handleUpgrade}
            disabled={!selectedPlan}
            className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
          >
            Continue with Upgrade
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full h-12 rounded-xl">
              Maybe Later
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
