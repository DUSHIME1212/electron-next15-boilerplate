// app/page.tsx
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function GhibliSuccessPage() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement[]>([]);
  const kodamasRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cloud animations
      cloudsRef.current.forEach((cloud, i) => {
        gsap.to(cloud, {
          x: i % 2 === 0 ? '100vw' : '-100vw',
          duration: 30 + (i * 10),
          ease: 'none',
          repeat: -1,
          repeatDelay: 0
        });
      });

      // Kodama (spirit) animations
      kodamasRef.current.forEach((kodama, i) => {
        gsap.to(kodama, {
          y: -20,
          duration: 3 + (i * 0.5),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      });

      // Content entrance animation
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Background gradient animation
      gsap.to(mainRef.current, {
        background: 'linear-gradient(to bottom, #e0f2fe, #ecfdf5)',
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleExplore = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => router.push('/dashboard')
    });
  };

  return (
    <div 
      ref={mainRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-sky-100 to-emerald-50"
    >
      {/* Animated clouds */}
      {[...Array(4)].map((_, i) => (
        <div 
          key={`cloud-${i}`}
          ref={el => el && (cloudsRef.current[i] = el)}
          className={`absolute ${i % 2 === 0 ? 'top-1/4 left-0' : 'top-1/3 right-0'} w-full h-${16 + (i * 4)}`}
        >
          <div className={`h-full w-${64 + (i * 16)} bg-white rounded-full opacity-80 shadow-lg`}></div>
        </div>
      ))}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full px-4 text-center">
        <div 
          ref={contentRef}
          className="max-w-2xl p-8 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg border border-white"
        >
          {/* Totoro illustration */}
          <div className="relative mx-auto w-48 h-48 mb-6">
            <div className="absolute inset-0 bg-[url('/totoro.png')] bg-contain bg-no-repeat bg-center"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
            App Ready for Adventure! 🌿
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your Ghibli-inspired desktop app is ready to explore the magical world.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={handleExplore}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50"
            >
              Begin Your Journey
            </button>
            <p className="text-sm text-gray-500 italic">
              The forest spirits welcome you...
            </p>
          </div>
        </div>
      </div>

      {/* Floating kodama spirits */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={`kodama-${i}`}
          ref={el => el && (kodamasRef.current[i] = el)}
          className={`absolute ${i % 2 === 0 ? 'bottom-10' : 'bottom-20'} ${i % 3 === 0 ? 'left-10' : i % 3 === 1 ? 'right-16' : 'left-1/2'} w-${10 + (i * 2)} h-${10 + (i * 2)}`}
        >
          <div className="w-full h-full bg-white rounded-full opacity-90 shadow-md"></div>
        </div>
      ))}

      {/* Subtle leaf particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={`leaf-${i}`}
            className="absolute text-emerald-400 opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 1}rem`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            🍃
          </div>
        ))}
      </div>
    </div>
  );
}