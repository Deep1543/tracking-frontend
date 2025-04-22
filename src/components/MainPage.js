import React, { useState, useEffect } from 'react';
import image1 from '../images/marathon1.jpg';
import image2 from '../images/marathon2.jpg';
import image3 from '../images/marathon3.jpg';
import image4 from '../images/marathon4.jpg';
import image5 from '../images/marathon5.jpg';

const MainPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3, image4, image5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-8">
        <div className="relative w-full max-w-4xl mx-auto h-[500px] rounded-lg shadow-2xl overflow-hidden">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Marathon ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-contain bg-white
                transition-opacity duration-700 ease-in-out
                ${currentImage === index ? 'opacity-100' : 'opacity-0'}`}
              onError={(e) => {
                console.error(`Error loading image ${index}:`, e);
                e.target.style.display = 'none';
              }}
            />
          ))}

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                  ${currentImage === index
                    ? 'bg-white scale-110 shadow-lg'
                    : 'bg-gray-400 bg-opacity-50 hover:bg-opacity-75'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Register Now Button */}
        <div className="flex justify-center mt-6">
          <a
            href="/RegisterForm"
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg 
                       hover:bg-blue-700 transition-all duration-300"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
