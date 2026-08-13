import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const EarnMore = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    window.open('https://bluepay.example.com/signup', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-pink-300 flex flex-col">
      {/* Header - Transparent on gradient */}
      <header className="flex items-center gap-4 p-4">
        <button onClick={() => navigate('/home')} className="p-1">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Earn More</h1>
      </header>

      {/* Content - Full gradient background */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        {/* Main Title */}
        <h2 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">BluePay</h2>
        
        {/* Description */}
        <div className="text-center space-y-8 mb-12">
          <p className="text-white text-xl font-medium leading-relaxed">
            Take your earnings to the next level with BluePay.
          </p>
          
          <p className="text-white text-lg leading-relaxed">
            Access exclusive features and higher earning opportunities.
          </p>
          
          <p className="text-white text-lg leading-relaxed">
            Join thousands of users already maximizing their income.
          </p>
        </div>

        {/* Sign Up Button */}
        <Button 
          onClick={handleSignUp}
          className="w-full max-w-sm h-16 text-xl font-bold rounded-2xl bg-purple-600/70 hover:bg-purple-600/90 text-white shadow-xl border-0 backdrop-blur-sm gap-2"
        >
          Sign Up Now
          <ExternalLink className="h-5 w-5" />
        </Button>
      </main>

      
    </div>
  );
};

export default EarnMore;
