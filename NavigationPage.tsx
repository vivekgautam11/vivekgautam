import React from 'react';
import { Camera, Heart, MessageCircle, Sparkles, Play } from 'lucide-react';

interface NavigationPageProps {
  onNavigate: (page: 'game' | 'memories' | 'wishes' | 'message') => void;
}

const NavigationPage: React.FC<NavigationPageProps> = ({ onNavigate }) => {
  const navigationItems = [
    {
      id: 'game',
      title: 'Play Again! 🎮',
      description: 'Want to catch more hearts? Play the game again!',
      icon: <Play className="text-green-500" size={48} />,
      gradient: 'from-green-400 to-blue-500',
      action: () => onNavigate('game')
    },
    {
      id: 'memories',
      title: 'Our Memories 📷',
      description: 'Look through our beautiful moments together',
      icon: <Camera className="text-purple-500" size={48} />,
      gradient: 'from-purple-400 to-pink-500',
      action: () => onNavigate('memories')
    },
    {
      id: 'wishes',
      title: 'Birthday Wishes 🎂',
      description: 'Special birthday messages just for you',
      icon: <Sparkles className="text-yellow-500" size={48} />,
      gradient: 'from-yellow-400 to-orange-500',
      action: () => onNavigate('wishes')
    },
    {
      id: 'message',
      title: 'Special Message 💌',
      description: 'A heartfelt message from me to you',
      icon: <MessageCircle className="text-red-500" size={48} />,
      gradient: 'from-red-400 to-pink-500',
      action: () => onNavigate('message')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            {['🎈', '🎉', '💖', '✨', '🌟'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Heart className="text-red-500 animate-pulse" size={40} fill="currentColor" />
            <Heart className="text-pink-500 animate-pulse" size={32} fill="currentColor" style={{ animationDelay: '0.5s' }} />
            <Heart className="text-red-500 animate-pulse" size={40} fill="currentColor" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            You caught all the hearts! Now explore more surprises! 💕
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">
                    {item.title}
                  </h2>
                  
                  <p className="text-lg opacity-90 mb-6">
                    {item.description}
                  </p>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block font-semibold group-hover:bg-white/30 transition-colors duration-200">
                    Explore →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto shadow-xl">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              This Day is All About You! 🌟
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              I've created this special website to celebrate you and everything wonderful about who you are. 
              Each section holds something special – explore them all and feel how much you mean to me! 💝
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NavigationPage;