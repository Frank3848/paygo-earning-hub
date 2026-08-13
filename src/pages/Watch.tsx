import { useState } from 'react';
import { ArrowLeft, Play, Clock, Star, Tv, Film, Radio, TrendingUp, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const categories = [
  { icon: Tv, label: 'Live TV', color: 'bg-red-500' },
  { icon: Film, label: 'Movies', color: 'bg-purple-500' },
  { icon: Radio, label: 'Sports', color: 'bg-green-500' },
  { icon: TrendingUp, label: 'Trending', color: 'bg-orange-500' },
];

const featuredContent = [
  {
    id: 1,
    title: 'Premier League Live',
    subtitle: 'Manchester United vs Chelsea',
    duration: 'LIVE',
    rating: '4.8',
    gradient: 'from-green-600 to-green-800',
  },
  {
    id: 2,
    title: 'Nollywood Hits',
    subtitle: 'Latest Nigerian Movies',
    duration: '2h 15m',
    rating: '4.5',
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    id: 3,
    title: 'Music Videos',
    subtitle: 'Top Afrobeats',
    duration: '45m',
    rating: '4.7',
    gradient: 'from-pink-600 to-pink-800',
  },
];

const recentlyAdded = [
  { id: 1, title: 'Action Movie', genre: 'Action', gradient: 'from-red-500 to-orange-500' },
  { id: 2, title: 'Comedy Show', genre: 'Comedy', gradient: 'from-yellow-500 to-amber-500' },
  { id: 3, title: 'Drama Series', genre: 'Drama', gradient: 'from-blue-500 to-indigo-500' },
  { id: 4, title: 'Documentary', genre: 'Documentary', gradient: 'from-teal-500 to-cyan-500' },
];

const Watch = () => {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [idCode, setIdCode] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (idCode.trim().length >= 4) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Please enter a valid ID Code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-800">
        <button onClick={() => navigate('/home')} className="p-1">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Watch</h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto pb-24">
        {!isUnlocked ? (
          /* ID Code Unlock Screen */
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-6">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-3">
              Unlock Watch Features
            </h2>
            <p className="text-gray-400 text-center mb-8 px-4">
              Enter your ID Code to access Live TV, Movies, Sports and more exclusive content.
            </p>
            
            <div className="w-full max-w-sm space-y-4">
              <Input
                type="text"
                placeholder="Enter ID Code"
                value={idCode}
                onChange={(e) => setIdCode(e.target.value)}
                className="h-14 text-lg text-center bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-xl"
              />
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <Button 
                onClick={handleUnlock}
                className="w-full h-14 text-lg font-semibold rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
              >
                Unlock Now
              </Button>
            </div>
            
            <p className="text-gray-500 text-sm mt-6 text-center px-4">
              Don't have an ID Code? Contact support to get your unique access code.
            </p>
          </div>
        ) : (
          <>
            {/* Categories */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {categories.map((cat, index) => (
                <button 
                  key={index}
                  className="flex flex-col items-center gap-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center shadow-lg hover-scale`}>
                    <cat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Featured Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-4">Featured</h2>
              <div className="space-y-3">
                {featuredContent.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`bg-gradient-to-r ${item.gradient} rounded-2xl p-4 relative overflow-hidden shadow-lg hover-scale cursor-pointer animate-fade-in`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-white/80 text-sm">{item.subtitle}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-white/90 text-xs">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1 text-yellow-300 text-xs">
                            <Star className="h-3 w-3 fill-yellow-300" />
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="icon"
                        className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                      >
                        <Play className="h-6 w-6 text-white fill-white" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Added */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-4">Recently Added</h2>
              <div className="grid grid-cols-2 gap-3">
                {recentlyAdded.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`bg-gradient-to-br ${item.gradient} rounded-xl p-4 aspect-video flex flex-col justify-end shadow-lg hover-scale cursor-pointer animate-fade-in relative`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-xl" />
                    <div className="relative">
                      <p className="text-white/70 text-xs">{item.genre}</p>
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Banner */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-center shadow-lg animate-fade-in">
              <h3 className="text-white font-bold text-xl mb-2">More Content Coming Soon!</h3>
              <p className="text-white/80 text-sm">
                We're adding more movies, TV shows, and live channels. Stay tuned!
              </p>
            </div>
          </>
        )}
      </main>

      
    </div>
  );
};

export default Watch;
