

'use client';
import React from "react";
import { FaChevronDown, FaPlay, FaPause, FaCalendarAlt,FaGlobe, FaMapMarkerAlt, FaImages, FaHeart, FaFacebookF, FaTelegramPlane, FaInstagram, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [showRsvpVideo, setShowRsvpVideo] = React.useState(false);
  const [animateRise, setAnimateRise] = React.useState(false);
  const [showKhmerText, setShowKhmerText] = React.useState(false);
  const [khmerTextVisible, setKhmerTextVisible] = React.useState(false);
  const [englishTextVisible, setEnglishTextVisible] = React.useState(false);
  const [calendarButtonVisible, setCalendarButtonVisible] = React.useState(false);
  const [weddingImageVisible, setWeddingImageVisible] = React.useState(false);
  const [day1Visible, setDay1Visible] = React.useState(false);
  const [day2Visible, setDay2Visible] = React.useState(false);
  const [locationVisible, setLocationVisible] = React.useState(false);
  const [locationButtonVisible, setLocationButtonVisible] = React.useState(false);
  const [galleryVisible, setGalleryVisible] = React.useState(false);
  const [wishesVisible, setWishesVisible] = React.useState(false);
  const [loveMessageVisible, setLoveMessageVisible] = React.useState(false);
  
  // Track which elements have already been animated (never reset to false)
  const [khmerTextAnimated, setKhmerTextAnimated] = React.useState(false);
  const [englishTextAnimated, setEnglishTextAnimated] = React.useState(false);
  const [calendarButtonAnimated, setCalendarButtonAnimated] = React.useState(false);
  const [weddingImageAnimated, setWeddingImageAnimated] = React.useState(false);
  const [day1Animated, setDay1Animated] = React.useState(false);
  const [day2Animated, setDay2Animated] = React.useState(false);
  const [locationAnimated, setLocationAnimated] = React.useState(false);
  const [locationButtonAnimated, setLocationButtonAnimated] = React.useState(false);
  const [galleryAnimated, setGalleryAnimated] = React.useState(false);
  const [wishesAnimated, setWishesAnimated] = React.useState(false);
  const [loveMessageAnimated, setLoveMessageAnimated] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [wishes, setWishes] = React.useState<Array<{id?: number, name: string, message: string, created_at: string}>>([]);
  const [isLoadingWishes, setIsLoadingWishes] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', message: '' });
  const [galleryImages] = React.useState([
    '/images/wedding1.jpg', '/images/wedding9.jpg', '/images/wedding9.jpg',
    '/images/wedding9.jpg', '/images/wedding10.jpg', '/images/wedding9.jpg',
    '/images/wedding9.jpg', '/images/wedding10.jpg', '/images/wedding11.jpg'
  ]);
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);
  const [imageTransition, setImageTransition] = React.useState(false);
  
  const khmerRef = React.useRef<HTMLImageElement>(null);
  const englishRef = React.useRef<HTMLImageElement>(null);
  const calendarRef = React.useRef<HTMLAnchorElement>(null);
  const weddingRef = React.useRef<HTMLImageElement>(null);
  const day1Ref = React.useRef<HTMLImageElement>(null);
  const day2Ref = React.useRef<HTMLImageElement>(null);
  const locationRef = React.useRef<HTMLImageElement>(null);
  const locationButtonRef = React.useRef<HTMLAnchorElement>(null);
  const galleryRef = React.useRef<HTMLImageElement>(null);
  const wishesRef = React.useRef<HTMLDivElement>(null);
  const loveMessageRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (!showRsvpVideo && !showKhmerText) {
      setAnimateRise(true);
      const timer = setTimeout(() => setAnimateRise(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showRsvpVideo, showKhmerText]);

  // Scroll-based animation effect
  React.useEffect(() => {
    if (!showKhmerText) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === khmerRef.current && !khmerTextAnimated) {
            setKhmerTextVisible(true);
            setKhmerTextAnimated(true);
          } else if (entry.target === englishRef.current && !englishTextAnimated) {
            setEnglishTextVisible(true);
            setEnglishTextAnimated(true);
          } else if (entry.target === calendarRef.current && !calendarButtonAnimated) {
            setCalendarButtonVisible(true);
            setCalendarButtonAnimated(true);
          } else if (entry.target === weddingRef.current && !weddingImageAnimated) {
            setWeddingImageVisible(true);
            setWeddingImageAnimated(true);
          } else if (entry.target === day1Ref.current && !day1Animated) {
            setDay1Visible(true);
            setDay1Animated(true);
          } else if (entry.target === day2Ref.current && !day2Animated) {
            setDay2Visible(true);
            setDay2Animated(true);
          } else if (entry.target === locationRef.current && !locationAnimated) {
            setLocationVisible(true);
            setLocationAnimated(true);
          } else if (entry.target === locationButtonRef.current && !locationButtonAnimated) {
            setLocationButtonVisible(true);
            setLocationButtonAnimated(true);
          } else if (entry.target === galleryRef.current && !galleryAnimated) {
            setGalleryVisible(true);
            setGalleryAnimated(true);
          } else if (entry.target === wishesRef.current && !wishesAnimated) {
            setWishesVisible(true);
            setWishesAnimated(true);
          } else if (entry.target === loveMessageRef.current && !loveMessageAnimated) {
            setLoveMessageVisible(true);
            setLoveMessageAnimated(true);
          }
        }
      });
    }, observerOptions);

    if (khmerRef.current) observer.observe(khmerRef.current);
    if (englishRef.current) observer.observe(englishRef.current);
    if (calendarRef.current) observer.observe(calendarRef.current);
    if (weddingRef.current) observer.observe(weddingRef.current);
    if (day1Ref.current) observer.observe(day1Ref.current);
    if (day2Ref.current) observer.observe(day2Ref.current);
    if (locationRef.current) observer.observe(locationRef.current);
    if (locationButtonRef.current) observer.observe(locationButtonRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);
    if (wishesRef.current) observer.observe(wishesRef.current);
    if (loveMessageRef.current) observer.observe(loveMessageRef.current);

    return () => observer.disconnect();
  }, [showKhmerText, khmerTextAnimated, englishTextAnimated, calendarButtonAnimated, weddingImageAnimated, day1Animated, day2Animated, locationAnimated, locationButtonAnimated, galleryAnimated, wishesAnimated, loveMessageAnimated]);

  // Auto-play music when component mounts (browser open/refresh)
  React.useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          // Set volume to ensure it's audible
          audioRef.current.volume = 0.7;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // If autoplay is blocked, try to enable it on first user interaction
          console.log('Autoplay prevented by browser, will play on first user interaction', error);
          setIsPlaying(false);
          
          // Listen for any user interaction to start music
          const enableAutoplay = async () => {
            try {
              await audioRef.current?.play();
              setIsPlaying(true);
              document.removeEventListener('click', enableAutoplay);
              document.removeEventListener('touchstart', enableAutoplay);
            } catch (e) {
              console.log('Could not start music:', e);
            }
          };
          
          document.addEventListener('click', enableAutoplay, { once: true });
          document.addEventListener('touchstart', enableAutoplay, { once: true });
        }
      }
    };

    // Small delay to ensure audio is loaded, then attempt autoplay
    const timer = setTimeout(playMusic, 100);
    return () => clearTimeout(timer);
  }, []);

  // Load wishes from Supabase on component mount
  React.useEffect(() => {
    const loadWishes = async () => {
      setIsLoadingWishes(true);
      try {
        const { data: wishes, error } = await supabase
          .from('wedding_wishes')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error loading wishes:', error);
        } else {
          setWishes(wishes || []);
        }
      } catch (error) {
        console.error('Error loading wishes from database:', error);
      } finally {
        setIsLoadingWishes(false);
      }
    };

    loadWishes();
  }, []);

  // Music control function - users can always stop/start music
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Could not play music:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  // Handle wish submission to Supabase
  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, message } = formData;
    
    if (name.trim() && message.trim()) {
      setIsSubmitting(true);
      try {
        const { data, error } = await supabase
          .from('wedding_wishes')
          .insert([
            { 
              name: name.trim(), 
              message: message.trim() 
            }
          ])
          .select()
          .single();
        
        if (error) {
          console.error('Error submitting wish:', error);
          alert('Sorry, there was an error submitting your wish. Please try again.');
        } else {
          // Add the new wish to the local state
          setWishes(prevWishes => [data, ...prevWishes]);
          // Reset form data
          setFormData({ name: '', message: '' });
          alert('Thank you for your beautiful wishes! 💕');
        }
      } catch (error) {
        console.error('Error submitting wish:', error);
        alert('Sorry, there was an error submitting your wish. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Navigation functions
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Gallery functions
  const openGallery = (index: number) => setSelectedImage(index);
  const closeGallery = () => {
    setImageTransition(true);
    setTimeout(() => {
      setSelectedImage(null);
      setImageTransition(false);
    }, 200);
  };
  
  const nextImage = () => {
    setImageTransition(true);
    setTimeout(() => {
      setSelectedImage(prev => prev !== null ? (prev + 1) % galleryImages.length : 0);
      setImageTransition(false);
    }, 150);
  };
  
  const prevImage = () => {
    setImageTransition(true);
    setTimeout(() => {
      setSelectedImage(prev => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0);
      setImageTransition(false);
    }, 150);
  };

  // Keyboard navigation for gallery
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'Escape') {
          closeGallery();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  // When RSVP video ends, show khmer_text.png
  const handleRsvpVideoEnd = () => {
    setShowRsvpVideo(false);
    setShowKhmerText(true);
  };

  return (
    <div className="relative w-full" style={{ background: '#fff' }}>
      {/* Background music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src="/audio/wedding-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music control button - fixed on top right with Gen Z pink vibe */}
      <button
        onClick={toggleMusic}
        className="fixed right-6 top-6 z-50 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full p-3 shadow-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 transform hover:scale-110 animate-pulse"
        style={{ boxShadow: '0 8px 25px rgba(169, 90, 131, 0.4)' }}
      >
        {isPlaying ? (
          <FaPause className="w-5 h-5 text-white drop-shadow-sm" />
        ) : (
          <FaPlay className="w-5 h-5 text-white drop-shadow-sm ml-0.5" />
        )}
      </button>

      {showKhmerText ? (
        // Scrollable content after RSVP video
        <div className="w-full">
          {/* Fixed video background with frame overlay */}
          <div className="fixed inset-0 z-0">
            <div className="bg-black shadow-xl flex items-center justify-center hidden md:flex h-full w-full">
              <video
                className="h-full w-auto object-cover rounded-xl opacity-50"
                src="/videos/main.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="bg-black absolute inset-0 w-full h-full md:hidden">
              <video
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                src="/videos/main.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            {/* Frame overlay on top of video but behind text */}
            <div 
              className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat z-10"
              style={{ 
                backgroundImage: 'url(/images/frame.png)',
                opacity: 1,
                boxShadow: 'none'
              }}
            />
            {/* Light overlay to brighten the video background */}
            <div 
              className="absolute inset-0 h-full w-full z-5"
              style={{ 
                background: 'rgba(125, 72, 100, 1)',
                mixBlendMode: 'overlay'
              }}
            />
          </div>

          {/* Scrollable sections */}
          <div className="relative z-20">
            <section className="min-h-screen flex flex-col items-center justify-center text-white">
              <img
                ref={khmerRef}
                src="/images/khmer_text.png"
                alt="Khmer Text"
                className={`w-[32rem] h-auto mx-auto transition-all duration-600 ease-out ${
                  khmerTextVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
              />
              {/* Arrow under Khmer text */}
              <div className={`mt-8 animate-bounce transition-all duration-600 delay-500 ${
                khmerTextVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                <FaChevronDown className="w-8 h-8 text-white animate-pulse" />
              </div>
            </section>

            <section className="min-h-screen flex flex-col items-center justify-center text-white">
              <img
                ref={englishRef}
                src="/images/english_text.png"
                alt="English Text"
                className={`w-[32rem] h-auto mx-auto transition-all duration-600 ease-out ${
                  englishTextVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
              />
              {/* Calendar button under English text */}
              <a
                ref={calendarRef}
                href="https://calendar.app.google/g5y1ASsxtj5MhScM7"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-transparent p-0 rounded-full flex items-center justify-center mt-8 transition-all duration-600 delay-500 ${
                  calendarButtonVisible ? 'opacity-100 animate-popup transform translate-y-0' : 'opacity-0 transform translate-y-12'
                }`}
                style={{ boxShadow: 'none' }}
              >
                <img
                  src="/images/accept_calendar.png"
                  alt="Add to Calendar"
                  className="w-72 h-72 sm:w-72 sm:h-72 md:w-60 md:h-60 object-contain"
                  style={{ display: 'block' }}
                />
              </a>  </section>

            {/* Wedding image section - mobile size on all devices */}
            <section className="min-h-screen w-full flex items-center justify-center">
              <img
                ref={weddingRef}
                src="/images/wedding1.jpg"
                alt="Wedding Photo"
                className={`w-full max-w-sm h-auto object-cover rounded-lg shadow-lg transition-all duration-1000 ease-out ${
                  weddingImageVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
                style={{ 
                  display: 'block',
                  aspectRatio: '9/16'
                }}
              />
            </section>

            {/* Day 1 section - mobile size */}
            <section className="min-h-screen w-full flex items-center justify-center">
              <img
                ref={day1Ref}
                src="/images/day1.png"
                alt="Day 1"
                className={`w-full max-w-sm h-auto object-cover rounded-lg shadow-lg transition-all duration-600 ease-out ${
                  day1Visible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
                style={{ 
                  display: 'block',
                  aspectRatio: '9/16'
                }}
              />
            </section>

            {/* Day 2 section - full height */}
            <section className="min-h-screen w-full flex items-center justify-center">
              <img
                ref={day2Ref}
                src="/images/day2.png"
                alt="Day 2"
                className={`w-full max-w-sm h-auto object-contain rounded-lg shadow-lg transition-all duration-600 ease-out ${
                  day2Visible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
                style={{ 
                  display: 'block'
                }}
              />
            </section>

            {/* Location section */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center">
              <img
                ref={locationRef}
                src="/images/location_hero.png"
                alt="Location Hero"
                className={`w-full max-w-sm h-auto object-contain rounded-lg shadow-lg transition-all duration-1000 ease-out mb-8 ${
                  locationVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
                style={{ display: 'block' }}
              />
              <a
                ref={locationButtonRef}
                href="https://maps.app.goo.gl/9bA27g3cLg7H3Yqs6?g_st=ii"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-transparent p-0 rounded-full flex items-center justify-center transition-all duration-600 delay-500 ${
                  locationButtonVisible ? 'opacity-100 animate-popup transform translate-y-0' : 'opacity-0 transform translate-y-12'
                }`}
                style={{ boxShadow: 'none' }}
              >
                <img
                  src="/images/location.png"
                  alt="View Location"
                  className="w-72 h-72 sm:w-72 sm:h-72 md:w-60 md:h-60 object-contain"
                  style={{ display: 'block' }}
                />
              </a>
            </section>

            {/* Gallery section */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center px-4">
              <img
                ref={galleryRef}
                src="/images/gallery.png"
                alt="Gallery"
                className={`w-72 h-auto object-contain mb-8 transition-all duration-1000 ease-out ${
                  galleryVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
                style={{ display: 'block' }}
              />
              
              {/* Gallery grid */}
              <div className={`w-full max-w-sm space-y-4 transition-all duration-600 delay-300 ease-out ${
                galleryVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-12'
              }`}>
                {/* Single large image */}
                <div className="w-full h-48 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
                  <img
                    src={galleryImages[0]}
                    alt="Gallery 1"
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                    onClick={() => openGallery(0)}
                  />
                </div>
                
                {/* 3 images row */}
                <div className="flex space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex-1 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
                      <img
                        src={galleryImages[i]}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                        onClick={() => openGallery(i)}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Single image */}
                <div className="w-full h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
                  <img
                    src={galleryImages[4]}
                    alt="Gallery 5"
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                    onClick={() => openGallery(4)}
                  />
                </div>
                
                {/* 2 vertical images */}
                <div className="flex space-x-2">
                  {[5, 6].map(i => (
                    <div key={i} className="flex-1 h-56 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
                      <img
                        src={galleryImages[i]}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                        onClick={() => openGallery(i)}
                      />
                    </div>
                  ))}
                </div>
                
                {/* 4 images grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[7, 8, 0, 1].map((i, index) => (
                    <div key={index} className="h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
                      <img
                        src={galleryImages[i]}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                        onClick={() => openGallery(i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Wishes section */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center px-4">
              <div ref={wishesRef} className="w-full max-w-sm">
                <img
                  src="/images/wishes.png"
                  alt="Wishes"
                  className={`w-72 h-auto object-contain mb-8 mx-auto transition-all duration-1000 ease-out ${
                    wishesVisible 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-12'
                  }`}
                  style={{ display: 'block' }}
                />
                
                {/* Wishes form */}
                <form onSubmit={handleWishSubmit} className={`space-y-4 mb-8 transition-all duration-600 delay-300 ease-out ${
                  wishesVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  />
                  <textarea
                    name="message"
                    placeholder="Your wishes for the couple..."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500'
                    }`}
                  >
                    {isSubmitting ? 'Sending Wishes... 💕' : 'Send Wishes ❤️'}
                  </button>
                </form>
                
                {/* Display wishes */}
                <div className={`space-y-4 transition-all duration-600 delay-500 ease-out ${
                  wishesVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}>
                  {isLoadingWishes ? (
                    <div className="text-center text-white opacity-60 py-8">
                      <p>Loading wishes... ✨</p>
                    </div>
                  ) : wishes.length === 0 ? (
                    <div className="text-center text-white opacity-60 py-8">
                      <p>Be the first to share your wishes! ✨</p>
                    </div>
                  ) : (
                    wishes.map((wish, index) => (
                      <div key={wish.id || index} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-pink-200 font-semibold">😊 {wish.name}</h4>
                          <span className="text-gray-300 text-sm">
                            {new Date(wish.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: '2-digit', 
                              day: '2-digit' 
                            })} | {new Date(wish.created_at).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        <p className="text-black">{wish.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Love Message Section */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center px-4">
              <div ref={loveMessageRef} className="w-full max-w-2xl text-center">
                <div className={`transition-all duration-1000 ease-out ${
                  loveMessageVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                } flex justify-center items-center w-full`}>
                  <div className="bg-none bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/30 shadow-xl w-full max-w-sm mx-auto">
                    <div className="mb-6 text-center">
                      <div className="text-6xl mb-4">💕</div>
                      <h2 className="text-3xl font-bold text-pink-300 mb-6 font-[family-name:var(--font-merriweather)]">
                        From Our Hearts
                      </h2>
                    </div>
                    
                    <p className="text-xl leading-relaxed text-pink-300 mb-8 font-[family-name:var(--font-merriweather)] text-center">
                      &ldquo;Sending a lot of love from both the groom and bride! 
                      <br />
                      Can&rsquo;t wait to celebrate our special day with you!&rdquo;
                    </p>
                    
                    <div className="flex justify-center items-center space-x-4 text-pink-200">
                      <div className="w-12 h-0.5 bg-pink-400 opacity-50"></div>
                      <div className="w-12 h-0.5 bg-pink-400 opacity-50"></div>
                    </div>
                    
                    <div className="mt-6 text-pink-300 font-[family-name:var(--font-merriweather)] text-center">
                      <p className="text-lg font-semibold">With all our love,</p>
                      <p className="text-base opacity-80">The Happy Couple</p>
                    </div>
                  </div>
                </div>  </div>
            </section>

            {/* Credit Section - No Animation */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-transparent">
              <div className="w-full max-w-sm text-center space-y-6">
                <h2 className="text-l font-[family-name:var(--font-merriweather)] mb-8 text-pink-300">E-Invitation by: <a href="https://linhcheu-portfolio.vercel.app/" className="text-pink-100 underline hover:text-pink-300 transition-colors duration-200">Linhcheu Meng</a></h2>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-2 mb-3">
                  <a 
                    href="https://www.facebook.com/linhcheu.meng/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-500/20 backdrop-blur-sm hover:bg-pink-500/30 border border-pink-400/30 rounded-full p-4 transition-all duration-300 hover:scale-110"
                  >
                    <FaFacebookF className="w-6 h-6 text-pink-300" />
                  </a>
                  
                  <a 
                    href="https://t.me/lingcheuu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-500/20 backdrop-blur-sm hover:bg-pink-500/30 border border-pink-400/30 rounded-full p-4 transition-all duration-300 hover:scale-110"
                  >
                    <FaTelegramPlane className="w-6 h-6 text-pink-300" />
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/lingcheuu/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-500/20 backdrop-blur-sm hover:bg-pink-500/30 border border-pink-400/30 rounded-full p-4 transition-all duration-300 hover:scale-110"
                  >
                    <FaInstagram className="w-6 h-6 text-pink-300" />
                  </a>
                  <a
                    href="https://linhcheu-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-500/20 backdrop-blur-sm hover:bg-pink-500/30 border border-pink-400/30 rounded-full p-4 transition-all duration-300 hover:scale-110"
                  >
                    <FaGlobe className="w-6 h-6 text-pink-300" />
                  </a>
                </div>
                
                {/* Contact Number */}
                <div className="text-lg">
                  <p className="text-pink-200 mb-2">Contact Number:</p>
                  <a 
                    href="tel:0965942596" 
                    className="text-pink-300 hover:text-pink-200 font-semibold transition-colors duration-300"
                  >
                    096 59 42 596 / 012 200 967
                  </a>
                </div>
                
                {/* Copyright */}
                <div className="text-sm text-pink-200/70 pt-8 border-t border-pink-400/30">
                  <p>© 2025 Wedding Invitation. All rights reserved.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        // Initial video and button section
        <div className="min-h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center w-full h-full">
            <div
              className="bg-black rounded-xl shadow-xl flex items-center justify-center hidden md:flex"
              style={{
                height: '100vh',
                width: '100vw',
                boxShadow: '',
                position: 'relative',
                zIndex: 0,
              }}
            >
              <video
                className="h-full w-auto object-cover rounded-xl"
                src={showRsvpVideo ? "/videos/hero.mp4" : "/videos/main.mp4"}
                autoPlay
                muted
                playsInline
                style={{ height: '100%', maxHeight: '100vh' }}
                loop={!showRsvpVideo}
                onEnded={handleRsvpVideoEnd}
              />
            </div>
            <video
              className="absolute inset-0 w-full h-full object-cover md:hidden opacity-100"
              src={showRsvpVideo ? "/videos/hero.mp4" : "/videos/main.mp4"}
              autoPlay
              muted
              playsInline
              loop={!showRsvpVideo}
              onEnded={handleRsvpVideoEnd}
            />
          </div>
          
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full text-white text-center px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center w-full">
              {!showRsvpVideo && (
                <>
                  <img
                    src="/images/hero_pic3.png"
                    alt="Wedding Hero"
                    className={`w-200 h-200 -mt-32 mx-auto sm:w-160 sm:h-200 md:w-[48rem] md:h-[72rem] object-contain mb-8 md:mb-6 lg:w-[48rem] lg:h-[48rem] lg:mb-4${animateRise ? ' animate-rise' : ''}`}
                  />
                  <button
                    type="button"
                    className="bg-transparent p-0 rounded-full flex items-center justify-center animate-popup -mt-80 md:mt-20"
                    style={{ boxShadow: 'none' }}
                    onClick={() => {
                      setShowRsvpVideo(true);
                      setShowKhmerText(false);
                    }}
                  >
                    <img
                      src="/images/accept_pic.png"
                      alt="RSVP"
                      className={`w-80 h-132 sm:w-72 sm:h-72 md:w-60 md:h-60 object-contain${animateRise ? ' animate-rise' : ''}`}
                      style={{ display: 'block' }}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Gallery Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 animate-fadeIn">
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={galleryImages[selectedImage]}
              alt={`Gallery ${selectedImage + 1}`}
              className={`max-w-full max-h-[85vh] object-contain rounded-lg transition-all duration-300 ease-in-out ${
                imageTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            />
            
            {/* Close button - minimalist */}
            <button
              onClick={closeGallery}
              className="absolute -top-2 -right-2 text-white hover:text-red-400 transition-colors duration-200 p-2"
            >
              <IoClose className="w-8 h-8" />
            </button>
            
            {/* Previous button - minimalist */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-400 transition-all duration-200 p-3 hover:scale-110"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Next button - minimalist */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-400 transition-all duration-200 p-3 hover:scale-110"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-3 py-1 text-white text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

  {/* Bottom Navigation Bar */}
        {showKhmerText && (
          <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-none bg-opacity-0 backdrop-blur-md rounded-xl px-2 py-2 shadow-lg z-40">  <div className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection(khmerRef)}
              className="flex flex-col items-center space-y-1 p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 group"
            >
              <FaCalendarAlt className="w-6 h-6 text-pink-300 group-hover:text-pink-200 transition-colors" />
              <span className="text-xs text-pink-300 group-hover:text-pink-200 transition-colors">Calendar</span>
            </button>
            
            <button
              onClick={() => scrollToSection(locationRef)}
              className="flex flex-col items-center space-y-1 p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 group"
            >
              <FaMapMarkerAlt className="w-6 h-6 text-pink-300 group-hover:text-pink-200 transition-colors" />
              <span className="text-xs text-pink-300 group-hover:text-pink-200 transition-colors">Location</span>
            </button>
            
            <button
              onClick={() => scrollToSection(galleryRef)}
              className="flex flex-col items-center space-y-1 p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 group"
            >
              <FaImages className="w-6 h-6 text-pink-300 group-hover:text-pink-200 transition-colors" />
              <span className="text-xs text-pink-300 group-hover:text-pink-200 transition-colors">Gallery</span>
            </button>
            
            <button
              onClick={() => scrollToSection(wishesRef)}
              className="flex flex-col items-center space-y-1 p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 group"
            >
              <FaHeart className="w-6 h-6 text-pink-300 group-hover:text-pink-200 transition-colors" />
              <span className="text-xs text-pink-300 group-hover:text-pink-200 transition-colors">Wishes</span>
            </button>
            
            <button
              onClick={() => scrollToSection(loveMessageRef)}
              className="flex flex-col items-center space-y-1 p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 group"
            >
              <FaEnvelopeCircleCheck className="w-6 h-6 text-pink-300 group-hover:text-pink-200 transition-colors" />
              <span className="text-xs text-pink-300 group-hover:text-pink-200 transition-colors">Message</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
