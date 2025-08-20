import React, { useState } from 'react';
import { Heart, ArrowLeft, ArrowRight, X } from 'lucide-react';

interface MemoriesPageProps {
  onBack: () => void;
}

const MemoriesPage: React.FC<MemoriesPageProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Sample memory photos - replace with actual photos
  const memories = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
      caption: 'You always light up every room 🌟',
      date: '2023'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      caption: 'Your beautiful smile makes everything better 😊',
      date: '2023'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800',
      caption: 'Every moment with you is magical 💫',
      date: '2023'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
      caption: 'You are absolutely stunning 📸',
      date: '2023'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800',
      caption: 'Your grace and beauty inspire me ✨',
      date: '2024'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800',
      caption: 'You make every day feel like a celebration 🌍',
      date: '2024'
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % memories.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? memories.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="mb-6 bg-white/70 hover:bg-white/90 text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ← Back to Navigation
          </button>
          
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Our Beautiful Memories 📷
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Every moment with you is a treasure. Here are some of our favorite memories together! 💝
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={memory.url}
                  alt={memory.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium mb-1">{memory.caption}</p>
                <p className="text-xs opacity-80">{memory.date}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="text-red-400" size={24} fill="currentColor" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full-size image */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2"
              >
                <ArrowLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2"
              >
                <ArrowRight size={24} />
              </button>

              <img
                src={memories[selectedImage].url}
                alt={memories[selectedImage].caption}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-lg font-medium mb-2">
                  {memories[selectedImage].caption}
                </p>
                <p className="text-gray-300 text-sm">
                  {memories[selectedImage].date}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <Heart className="mx-auto mb-4 text-red-500" size={48} fill="currentColor" />
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              Every Memory is Special
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              From the silly moments that make us laugh until we cry, to the quiet times that mean everything – 
              every memory we've created together is a piece of my heart. Here's to many more beautiful moments! 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;