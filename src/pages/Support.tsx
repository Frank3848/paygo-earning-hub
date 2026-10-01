import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const Support = () => {
  const navigate = useNavigate();

  const handleLiveChat = () => {
    // Open chat assistant or navigate to chat
    const chatButton = document.querySelector('[data-chat-trigger]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  const handleWhatsApp = () => {
    window.open('https://whatsapp.com/channel/0029VbC26CNIyPtZ6INWW90U', '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-200">
        <button aria-label="Go back" onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Support</h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-6">How can we help you?</h2>

        {/* Live Chat Card */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-5">
          <div className="mb-1">
            <h3 className="text-xl font-bold text-foreground">Live Chat</h3>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <MessageCircle className="h-8 w-8 text-foreground flex-shrink-0 mt-1" />
            <p className="text-muted-foreground text-base leading-relaxed">
              Chat with our support team directly in the app
            </p>
          </div>
          
          <Button 
            onClick={handleLiveChat}
            className="w-full h-14 text-lg font-semibold rounded-full bg-purple-500 hover:bg-purple-600 text-white gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Start Live Chat
          </Button>

          <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
            Our support agents are available to assist you with any questions or issues.
          </p>
        </div>

        {/* WhatsApp Support Card */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="mb-1">
            <h3 className="text-xl font-bold text-foreground">Chat on WhatsApp</h3>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <MessageCircle className="h-8 w-8 text-foreground flex-shrink-0 mt-1" />
            <p className="text-muted-foreground text-base leading-relaxed">
              Chat with our support team on WhatsApp for quick assistance
            </p>
          </div>
          
          <Button 
            onClick={handleWhatsApp}
            className="w-full h-14 text-lg font-semibold rounded-full bg-green-500 hover:bg-green-600 text-white gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </Button>
        </div>
      </main>

      
    </div>
  );
};

export default Support;
