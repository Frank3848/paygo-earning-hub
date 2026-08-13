import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import paygoLogo from '@/assets/paygo-logo.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6">
        <img 
          src={paygoLogo} 
          alt="PayGo Logo" 
          className="h-20 w-auto object-contain rounded-xl animate-swing"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="animate-fade-in w-full max-w-md">
          {/* Title */}
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center leading-tight">
            Welcome to<br />PayGo!
          </h1>

          {/* Welcome Card */}
          <div className="w-full p-6 bg-card rounded-2xl shadow-sm mb-8">
            <p className="text-foreground text-center text-lg leading-relaxed">
              As a new user, you'll receive a generous welcome bonus of{' '}
              <span className="text-primary font-semibold">₦180,000</span>, which can be 
              withdrawn at any time. Yes, you read that right - it's yours to keep!
            </p>
          </div>

          {/* Continue Button */}
          <Button 
            onClick={() => navigate('/home')}
            className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 hover:from-orange-500 hover:via-orange-600 hover:to-pink-600 text-white shadow-lg"
          >
            Continue to Dashboard
          </Button>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;
