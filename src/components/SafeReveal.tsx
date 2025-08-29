import { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertCircle, QrCode, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SafeRevealProps {
  visitCount: number;
  isLoading?: boolean;
}

export const SafeReveal = ({ visitCount, isLoading = false }: SafeRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('safe-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      id="safe-section" 
      className={`min-h-screen bg-gradient-safe px-6 py-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Relief message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-full shadow-lg mb-6">
            <Shield className="text-safe-accent animate-pulse" size={28} />
            <span className="text-safe-fg font-bold text-xl">You're Safe!</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-safe-fg mb-4">
            This is just a awareness program of community engagement program
          </h1>
          <p className="text-xl text-safe-muted max-w-2xl mx-auto leading-relaxed">
            Congratulations! You've just experienced a QR code security awareness demonstration. 
            No malware was installed, and your device is completely safe.
          </p>
        </div>

        {/* Statistics */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-safe-accent/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-safe-fg">
              <BarChart3 className="text-safe-accent" />
              Campaign Statistics
            </CardTitle>
            <CardDescription>
              Real-time data from this awareness campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-safe-accent mb-2">
              {isLoading ? '...' : visitCount}
            </div>
            <p className="text-safe-muted">
              People have visited this awareness campaign (lifetime total)
            </p>
          </CardContent>
        </Card>

        {/* Educational content */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-white/90 backdrop-blur-sm border-safe-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-safe-fg">
                <AlertCircle className="text-amber-500" />
                The Danger is Real
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-safe-muted">
              <p>
                QR codes can be dangerous when they redirect to malicious websites that:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Install malware on your device</li>
                <li>Steal personal information</li>
                <li>Phish for login credentials</li>
                <li>Subscribe you to premium services</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-safe-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-safe-fg">
                <CheckCircle className="text-safe-accent" />
                Stay Safe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-safe-muted">
              <p>
                Protect yourself by following these best practices:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Check the URL before opening QR codes</li>
                <li>Use a QR scanner with URL preview</li>
                <li>Avoid QR codes from untrusted sources</li>
                <li>Keep your device software updated</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Campaign info */}
        <Card className="bg-safe-accent/10 border-safe-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-safe-fg">
              <Users className="text-safe-accent" />
              Community Engagement Project
            </CardTitle>
            <CardDescription>
              Raising awareness about digital security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-safe-muted">
            <p>
              This awareness campaign is part of a community engagement project designed to educate 
              people about the potential dangers of QR codes and promote safer digital practices.
            </p>
            <p>
              By participating in this demonstration, you've helped us gather valuable data about 
              how people interact with QR codes in public spaces.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <Button className="bg-safe-accent hover:bg-safe-accent/90 text-white">
                <QrCode className="mr-2" size={16} />
                Learn More About QR Safety
              </Button>
              <Button variant="outline" className="border-safe-accent text-safe-accent hover:bg-safe-accent/10">
                Share This Campaign
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-safe-accent/20">
          <p className="text-safe-muted text-sm">
            Thank you for participating in this digital security awareness campaign.
            <br />
            Stay vigilant, stay safe!
          </p>
        </div>
      </div>
    </div>
  );
};