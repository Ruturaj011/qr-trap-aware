import { useState, useEffect } from 'react';
import { TerminalWarning } from '@/components/TerminalWarning';
import { SafeReveal } from '@/components/SafeReveal';

const Index = () => {
  const [showReveal, setShowReveal] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Track visitor count
    const currentCount = parseInt(localStorage.getItem('qr-trap-visits') || '0');
    const newCount = currentCount + 1;
    localStorage.setItem('qr-trap-visits', newCount.toString());
    setVisitCount(newCount);
  }, []);

  return (
    <div className="w-full">
      <TerminalWarning onComplete={() => setShowReveal(true)} />
      {showReveal && <SafeReveal visitCount={visitCount} />}
    </div>
  );
};

export default Index;
