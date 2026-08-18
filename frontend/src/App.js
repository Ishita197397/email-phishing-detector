import React, { useState, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EmailScanner from './components/EmailScanner';
import AnalysisProgress from './components/AnalysisProgress';
import ThreatAssessment from './components/ThreatAssessment';
import ThreatIndicatorCard from './components/ThreatIndicatorCard';
import EmailBreakdown from './components/EmailBreakdown';
import AIAnalysisTerminal from './components/AIAnalysisTerminal';
import ThreatExplanation from './components/ThreatExplanation';
import SecurityStats from './components/SecurityStats';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function generateMockAnalysis(emailText) {
  const text = emailText.toLowerCase();

  const hasUrgency = /urgent|immediately|suspend|expire|verify|confirm|action required|deadline|limited time|act now/i.test(text);
  const hasCredentialRequest = /password|credential|verify your account|confirm your identity|update your information|login|sign in|ssn|social security|credit card|bank account/i.test(text);
  const hasSuspiciousLinks = /http[s]?:\/\/[^\s]+/.test(emailText);
  const hasSpoofing = /paypal|microsoft|apple|amazon|google|netflix|bank|irs|tax|security team|support team|account team|billing/i.test(text);
  const hasGrammarIssues = /dear (valued|esteemed|beloved|customer|user|member)|kindly|do the needful|you have been selected/i.test(text);
  const hasSocialEngineering = /confidential|secret|private|don't tell|between us|trust me|guarantee|winner|congratulations|selected|chosen/i.test(text);
  const hasEmotionalPressure = /fear|worry|panic|consequence|penalty|legal|police|arrest|lawsuit|criminal/i.test(text);

  let score = 0;
  let classification = 'safe';

  if (hasUrgency) score += 20;
  if (hasCredentialRequest) score += 25;
  if (hasSuspiciousLinks) score += 15;
  if (hasSpoofing) score += 10;
  if (hasGrammarIssues) score += 10;
  if (hasSocialEngineering) score += 12;
  if (hasEmotionalPressure) score += 8;

  score = Math.min(score + Math.floor(Math.random() * 10), 98);
  score = Math.max(score, 5);

  if (score >= 60) classification = 'phishing';
  else if (score >= 30) classification = 'suspicious';
  else classification = 'safe';

  const confidence = Math.min(85 + Math.floor(Math.random() * 14), 99);

  const indicators = [];
  if (hasUrgency) indicators.push({ type: 'urgency', severity: 'high', title: 'URGENCY DETECTED', description: 'Creates pressure to act immediately with time-sensitive language.' });
  else indicators.push({ type: 'urgency', severity: 'safe', title: 'NO URGENCY', description: 'No time pressure language detected.' });

  if (hasCredentialRequest) indicators.push({ type: 'content', severity: 'high', title: 'CREDENTIAL HARVESTING', description: 'Requests personal credentials or sensitive information.' });
  else indicators.push({ type: 'content', severity: 'safe', title: 'NO CREDENTIAL REQUEST', description: 'No requests for personal information detected.' });

  if (hasSuspiciousLinks) indicators.push({ type: 'url', severity: 'medium', title: 'URLS DETECTED', description: 'Contains embedded links that may lead to external destinations.' });
  else indicators.push({ type: 'url', severity: 'safe', title: 'NO SUSPICIOUS URLS', description: 'No embedded URLs detected in the content.' });

  if (hasSpoofing) indicators.push({ type: 'spoofing', severity: 'medium', title: 'BRAND IMPERSONATION', description: 'References trusted organizations which may indicate spoofing.' });
  else indicators.push({ type: 'spoofing', severity: 'safe', title: 'NO IMPERSONATION', description: 'No brand impersonation patterns detected.' });

  if (hasSocialEngineering) indicators.push({ type: 'pattern', severity: 'high', title: 'SOCIAL ENGINEERING', description: 'Language matches known social engineering attack patterns.' });
  if (hasGrammarIssues) indicators.push({ type: 'sender', severity: 'medium', title: 'SUSPICIOUS LANGUAGE', description: 'Contains language patterns common in mass phishing campaigns.' });

  if (hasEmotionalPressure) indicators.push({ type: 'content', severity: 'medium', title: 'EMOTIONAL MANIPULATION', description: 'Uses emotional language to bypass rational decision-making.' });

  if (classification === 'safe' && indicators.length < 3) {
    indicators.push({ type: 'pattern', severity: 'safe', title: 'CLEAN PATTERN', description: 'No known phishing patterns detected in content structure.' });
  }

  const reasons = [];
  if (classification === 'phishing') {
    if (hasUrgency) reasons.push('Uses urgent language to pressure the recipient into immediate action.');
    if (hasCredentialRequest) reasons.push('Requests personal credentials or financial information under suspicious pretenses.');
    if (hasSuspiciousLinks) reasons.push('Contains links that may redirect to malicious or impersonated websites.');
    if (hasSpoofing) reasons.push('References known brand names to establish false legitimacy.');
    if (hasSocialEngineering) reasons.push('Employs social engineering techniques consistent with known phishing campaigns.');
    if (hasEmotionalPressure) reasons.push('Uses emotional manipulation to override critical thinking.');
    if (reasons.length === 0) reasons.push('Multiple behavioral and linguistic indicators suggest this is a phishing attempt.');
  } else if (classification === 'suspicious') {
    if (hasUrgency) reasons.push('Contains time-pressure language that warrants caution.');
    if (hasSuspiciousLinks) reasons.push('Includes links that should be verified before clicking.');
    if (hasSpoofing) reasons.push('References external organizations — verify the sender independently.');
    if (reasons.length === 0) reasons.push('Some linguistic patterns suggest this email should be reviewed carefully.');
  } else {
    reasons.push('No significant phishing indicators were detected in the analyzed content.');
    reasons.push('The language and structure are consistent with legitimate communication.');
    reasons.push('No credential harvesting patterns or malicious URLs were found.');
  }

  const senderDomain = hasSpoofing ? 'suspicious-domain.com' : 'unknown';
  const senderReputation = hasSpoofing ? 'Unverified' : 'Unknown';
  const spoofRisk = hasSpoofing ? 'Medium' : 'Low';
  const linkCount = hasSuspiciousLinks ? emailText.match(/http[s]?:\/\/[^\s]+/g)?.length || 0 : 0;
  const suspiciousLinks = hasSuspiciousLinks ? Math.min(linkCount, 3) : 0;

  return {
    classification,
    score,
    confidence,
    indicators,
    reasons,
    breakdown: {
      sender: [
        { label: 'DOMAIN', value: senderDomain, status: hasSpoofing ? 'warning' : 'neutral' },
        { label: 'REPUTATION', value: senderReputation, status: hasSpoofing ? 'warning' : 'neutral' },
        { label: 'SPOOFING RISK', value: spoofRisk, status: hasSpoofing ? 'warning' : 'safe' },
      ],
      urls: [
        { label: 'NUMBER OF LINKS', value: String(linkCount), status: linkCount > 0 ? 'warning' : 'safe' },
        { label: 'SUSPICIOUS LINKS', value: String(suspiciousLinks), status: suspiciousLinks > 0 ? 'danger' : 'safe' },
        { label: 'DOMAIN ANOMALIES', value: hasSuspiciousLinks ? 'Unverified destinations' : 'None detected', status: hasSuspiciousLinks ? 'warning' : 'safe' },
      ],
      content: [
        { label: 'URGENCY', value: hasUrgency ? 'Detected' : 'Not detected', status: hasUrgency ? 'danger' : 'safe' },
        { label: 'CREDENTIAL REQUEST', value: hasCredentialRequest ? 'Detected' : 'Not detected', status: hasCredentialRequest ? 'danger' : 'safe' },
        { label: 'SOCIAL ENGINEERING', value: hasSocialEngineering ? 'Detected' : 'Not detected', status: hasSocialEngineering ? 'danger' : 'safe' },
        { label: 'SUSPICIOUS LANGUAGE', value: hasGrammarIssues || hasEmotionalPressure ? 'Detected' : 'Not detected', status: hasGrammarIssues || hasEmotionalPressure ? 'warning' : 'safe' },
      ],
    },
  };
}

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [analysisState, setAnalysisState] = useState('idle');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isPhishing, setIsPhishing] = useState(false);

  const scannerRef = useRef(null);
  const resultsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const threatIntelRef = useRef(null);

  const handleNavigate = useCallback((section) => {
    setCurrentSection(section);
    if (section === 'scanner') {
      setAnalysisState('idle');
      setAnalysisResult(null);
      setTimeout(() => {
        scannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (section === 'how-it-works') {
      setTimeout(() => {
        howItWorksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (section === 'threat-intel') {
      setTimeout(() => {
        threatIntelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const handleScan = useCallback((emailText) => {
    setAnalysisState('analyzing');

    const mockResult = generateMockAnalysis(emailText);
    setIsPhishing(mockResult.classification === 'phishing');

    setTimeout(() => {
      setAnalysisResult(mockResult);
      setAnalysisState('results');
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 4000);
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setAnalysisState('results');
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleReset = useCallback(() => {
    setAnalysisState('idle');
    setAnalysisResult(null);
    scannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen bg-cyber-bg circuit-bg relative">
      <div className="scanline-overlay" />

      <div className="relative z-10">
        <Navbar onNavigate={handleNavigate} currentSection={currentSection} />

        {/* Hero */}
        <Hero onNavigate={handleNavigate} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          {/* Scanner */}
          <div ref={scannerRef}>
            <EmailScanner onScan={handleScan} isLoading={analysisState === 'analyzing'} />
          </div>

          {/* Analysis Progress */}
          {analysisState === 'analyzing' && (
            <AnalysisProgress isPhishing={isPhishing} onComplete={handleAnalysisComplete} />
          )}

          {/* Results */}
          {analysisState === 'results' && analysisResult && (
            <div ref={resultsRef} className="space-y-2 animate-slide-up">
              <ThreatAssessment
                classification={analysisResult.classification}
                score={analysisResult.score}
                confidence={analysisResult.confidence}
              />

              <ThreatIndicatorCard indicators={analysisResult.indicators} />

              <EmailBreakdown breakdown={analysisResult.breakdown} />

              <AIAnalysisTerminal
                classification={analysisResult.classification}
                confidence={analysisResult.confidence}
              />

              <ThreatExplanation
                classification={analysisResult.classification}
                reasons={analysisResult.reasons}
              />

              {/* Reset Button */}
              <div className="py-8 text-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-cyber-border text-cyber-muted-text font-label text-xs tracking-wide-label uppercase hover:border-safe hover:text-safe transition-all duration-200"
                >
                  Analyze Another Email
                </button>
              </div>
            </div>
          )}

          {/* Always Visible Sections */}
          <div ref={threatIntelRef}>
            <SecurityStats />
          </div>
          <div ref={howItWorksRef}>
            <HowItWorks />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
