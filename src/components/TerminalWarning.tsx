import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Wifi } from 'lucide-react';

interface TerminalWarningProps {
  onComplete?: () => void;
}

export const TerminalWarning = ({ onComplete }: TerminalWarningProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const lines = [
    '> Scanning network protocols...',
    '> Analyzing device security...',
    '> SECURITY BREACH DETECTED!',
    '> Installing payload: malware_v2.3.exe',
    '> Extracting personal data...',
    '> Uploading files to remote server...',
    '> Installation complete: 87%',
    '> WARNING: Device compromised!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < lines.length - 1) {
          return prev + 1;
        } else {
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 375);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-fg font-mono p-6 flex flex-col justify-center relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-pulse" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border border-terminal-glow/30 p-4 rounded bg-terminal-bg/80">
          <AlertTriangle className="text-terminal-danger animate-pulse" size={24} />
          <div>
            <h1 className="text-terminal-danger text-xl font-bold">SECURITY ALERT</h1>
            <p className="text-terminal-fg/70 text-sm">Unauthorized access detected</p>
          </div>
        </div>

        {/* Terminal output */}
        <div className="bg-black/60 p-6 rounded border border-terminal-glow/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4 text-terminal-fg/80">
            <div className="w-3 h-3 rounded-full bg-terminal-danger"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-warning"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-glow"></div>
            <span className="ml-2 text-sm">Terminal - System Compromised</span>
          </div>
          
          <div className="space-y-2">
            {lines.slice(0, currentLine + 1).map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-terminal-glow">$</span>
                <span className={`${
                  line.includes('BREACH') || line.includes('WARNING') || line.includes('compromised') 
                    ? 'text-terminal-danger' 
                    : line.includes('Installing') || line.includes('Extracting') || line.includes('Uploading')
                    ? 'text-terminal-warning'
                    : 'text-terminal-fg'
                } ${index === currentLine ? 'animate-pulse' : ''}`}>
                  {line}
                </span>
                {index === currentLine && showCursor && (
                  <span className="bg-terminal-glow w-2 h-4 animate-pulse ml-1" />
                )}
              </div>
            ))}
          </div>

          {currentLine >= lines.length - 1 && (
            <div className="mt-6 p-4 border border-terminal-danger bg-terminal-danger/10 rounded">
              <div className="flex items-center gap-2 text-terminal-danger mb-2">
                <Shield className="animate-pulse" size={20} />
                <span className="font-bold">CRITICAL SECURITY BREACH</span>
              </div>
              <p className="text-sm text-terminal-fg/90">
                Your device has been compromised. Personal data is being extracted.
              </p>
              <div className="mt-3 text-xs text-terminal-fg/70">
                <div className="flex items-center gap-2">
                  <Wifi size={16} className="animate-pulse" />
                  <span>Connected to: MALICIOUS_NETWORK_001</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll hint */}
        {currentLine >= lines.length - 1 && (
          <div className="mt-8 text-center animate-bounce">
            <p className="text-terminal-fg/60 text-sm">Scroll down to continue...</p>
            <div className="w-6 h-6 border-2 border-terminal-glow/50 border-t-transparent rounded-full animate-spin mx-auto mt-2" />
          </div>
        )}
      </div>
    </div>
  );
};