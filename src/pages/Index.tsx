import { useState, useEffect } from 'react';
import { TerminalWarning } from '@/components/TerminalWarning';
import { SafeReveal } from '@/components/SafeReveal';
import { incrementVisitCount, getVisitCount } from '@/lib/supabase';

const Index = () => {
  const [showReveal, setShowReveal] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track visitor count globally
    const updateVisitCount = async () => {
      try {
        // Check if this device has already been counted
        const hasVisited = localStorage.getItem('qr-trap-visited');
        
        if (!hasVisited) {
          // New visitor - increment global count
          const newCount = await incrementVisitCount();
          setVisitCount(newCount);
          localStorage.setItem('qr-trap-visited', 'true');
        } else {
          // Returning visitor - just get current count
          const currentCount = await getVisitCount();
          setVisitCount(currentCount);
        }
      } catch (error) {
        console.error('Error updating visit count:', error);
        // Fallback to local storage if Supabase fails
        const localCount = parseInt(localStorage.getItem('qr-trap-visits') || '0') + 1;
        localStorage.setItem('qr-trap-visits', localCount.toString());
        setVisitCount(localCount);
      } finally {
        setIsLoading(false);
      }
    };

    updateVisitCount();
  }, []);

  return (
    <div className="w-full">
      <TerminalWarning onComplete={() => setShowReveal(true)} />
      {showReveal && <SafeReveal visitCount={visitCount} isLoading={isLoading} />}
    </div>
  );
};

export default Index;
