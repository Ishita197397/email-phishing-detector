import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Mail, Lock, Zap, Home, Info, Award, Search, Users, TrendingUp, Eye, Database, Clock } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkEmail = async () => {
    if (!email.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://email-phishing-detector-3.onrender.com/predict', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Failed to analyze email. Please check if the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      checkEmail();
    }
  };

  const NavButton = ({ page, icon: Icon, label }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setResult(null);
        setEmail('');
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        currentPage === page
          ? 'bg-blue-500 text-white'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PhishGuard AI</h1>
                <p className="text-sm text-blue-300">Student ML Project</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-300">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Secure Analysis</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-2 overflow-x-auto pb-2">
            <NavButton page="home" icon={Home} label="Home" />
            <NavButton page="detector" icon={Search} label="Detector" />
            <NavButton page="about" icon={Info} label="About Us" />
            <NavButton page="why" icon={Award} label="Why Us" />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Protect Yourself from<br />Phishing Attacks
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                A machine learning project by IGDTUW students to detect phishing emails using AI. Analyze suspicious emails and learn about email security.
              </p>
              <button
                onClick={() => setCurrentPage('detector')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-2xl"
              >
                Try Detector Now →
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">ML-Based</div>
                <div className="text-slate-300">Detection System</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">Fast</div>
                <div className="text-slate-300">Real-time Analysis</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">Free</div>
                <div className="text-slate-300">Open Access</div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-500">
                    <span className="text-2xl font-bold text-blue-400">1</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Paste Email</h4>
                  <p className="text-slate-400">Copy and paste the suspicious email content into our analyzer</p>
                </div>
                <div className="text-center">
                  <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-500">
                    <span className="text-2xl font-bold text-cyan-400">2</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">AI Analysis</h4>
                  <p className="text-slate-400">Our machine learning model analyzes patterns and indicators</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                    <span className="text-2xl font-bold text-green-400">3</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Get Results</h4>
                  <p className="text-slate-400">Receive instant feedback on whether the email is safe or malicious</p>
                </div>
              </div>
            </div>

            {/* Threat Statistics */}
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl font-bold mb-4 text-center">⚠️ Why Phishing Detection Matters</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-2 text-red-400">Growing Digital Threat</h4>
                  <p className="text-slate-300">Phishing remains one of the most common cyber attacks, targeting individuals and organizations worldwide through deceptive emails.</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-2 text-orange-400">Student Innovation</h4>
                  <p className="text-slate-300">This project demonstrates how machine learning can be applied to solve real-world cybersecurity challenges.</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Test Our Detector?</h3>
              <p className="text-slate-300 mb-6 text-lg">Try our ML-powered phishing detector and see how it works</p>
              <button
                onClick={() => setCurrentPage('detector')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Launch Detector
              </button>
            </div>
          </div>
        )}

        {/* DETECTOR PAGE */}
        {currentPage === 'detector' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Email Phishing Detector
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Paste any suspicious email content below and our AI will analyze it for phishing indicators in real-time.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition-all">
                <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="font-semibold mb-1">Instant Detection</h3>
                <p className="text-sm text-slate-400">Real-time analysis in milliseconds</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition-all">
                <Shield className="w-8 h-8 text-blue-400 mb-2" />
                <h3 className="font-semibold mb-1">AI-Powered</h3>
                <p className="text-sm text-slate-400">Machine learning accuracy</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition-all">
                <Lock className="w-8 h-8 text-green-400 mb-2" />
                <h3 className="font-semibold mb-1">Privacy First</h3>
                <p className="text-sm text-slate-400">Your data stays secure</p>
              </div>
            </div>

            {/* Main Analysis Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
                <label className="text-lg font-semibold">Email Content</label>
              </div>
              
              <textarea 
                rows={10}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Paste the suspicious email content here...&#x0a;&#x0a;Example:&#x0a;Subject: Urgent: Your account will be suspended&#x0a;&#x0a;Dear valued customer, we have detected unusual activity..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-mono text-sm"
              />
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-slate-400">
                  {email.length > 0 ? `${email.length} characters` : 'Tip: Press Ctrl+Enter to analyze'}
                </p>
                <button 
                  onClick={checkEmail}
                  disabled={!email.trim() || loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Analyze Email
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className={`mt-6 rounded-2xl p-8 shadow-2xl border-2 ${
                result.error 
                  ? 'bg-orange-500/10 border-orange-500/30' 
                  : result.prediction === 1 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : 'bg-green-500/10 border-green-500/30'
              }`}>
                {result.error ? (
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-orange-400 mb-2">Connection Error</h3>
                      <p className="text-slate-300">{result.error}</p>
                    </div>
                  </div>
                ) : result.prediction === 1 ? (
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-red-400 mb-2">⚠️ Phishing Detected!</h3>
                      <p className="text-lg text-slate-200 mb-4">This email appears to be a phishing attempt. Do not click any links or provide personal information.</p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Threat Probability:</span>
                          <span className="text-2xl font-bold text-red-400">{(result.probability * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3 mt-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-1000"
                            style={{width: `${result.probability * 100}%`}}
                          />
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-slate-400">
                        <p className="font-semibold mb-2">Common phishing indicators:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Urgent language demanding immediate action</li>
                          <li>Requests for personal or financial information</li>
                          <li>Suspicious links or attachments</li>
                          <li>Poor grammar or spelling errors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-12 h-12 text-green-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-green-400 mb-2">✓ Email Appears Safe</h3>
                      <p className="text-lg text-slate-200 mb-4">Our analysis suggests this email is likely legitimate. However, always stay vigilant.</p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-green-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Safety Score:</span>
                          <span className="text-2xl font-bold text-green-400">{(100 - result.probability * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3 mt-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000"
                            style={{width: `${100 - result.probability * 100}%`}}
                          />
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-slate-400">
                        <p className="font-semibold mb-1">💡 Pro tip:</p>
                        <p>Even legitimate-looking emails can be dangerous. Always verify sender addresses and hover over links before clicking.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ABOUT US PAGE */}
        {currentPage === 'about' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                About PhishGuard AI
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                A student machine learning project for email security
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-400" />
                  Our Vision
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  As students learning about AI and cybersecurity, we wanted to create something practical that addresses a real-world problem.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Our goal is to demonstrate how machine learning can be applied to detect phishing emails and help people stay safe online.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                  Project Goals
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  This project aims to showcase the potential of supervised learning in cybersecurity while providing a useful tool for email analysis.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  We're constantly learning and improving our model as we progress through our curriculum.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Story</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  PhishGuard AI is a student project developed by three passionate 2nd-year B.Tech Computer Science & Engineering (Artificial Intelligence) students at Indira Gandhi Delhi Technical University for Women (IGDTUW), Delhi.
                </p>
                <p>
                  <span className="font-semibold text-blue-400">Team Members:</span> Ishita, Advika Sharma, and Ananya Kaushik
                </p>
                <p>
                  As part of our machine learning coursework, we wanted to tackle a real-world problem that affects millions of people daily. Phishing attacks have become increasingly sophisticated, and we saw an opportunity to apply our AI knowledge to help detect these threats.
                </p>
                <p>
                  This project combines natural language processing, supervised learning algorithms, and web development to create a practical tool for email security. We trained our model on publicly available phishing email datasets and implemented a user-friendly interface to make the technology accessible to everyone.
                </p>
                <p>
                  While this is an academic project, we're proud of what we've built and hope it demonstrates the potential of AI in cybersecurity. We're continuing to learn and improve the system as we advance in our studies.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
                <Database className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h4 className="text-xl font-semibold mb-2">ML Algorithms</h4>
                <p className="text-slate-400">Trained using supervised learning on phishing datasets</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
                <Users className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <h4 className="text-xl font-semibold mb-2">Student Project</h4>
                <p className="text-slate-400">Built by CSE-AI students at IGDTUW</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h4 className="text-xl font-semibold mb-2">Continuous Learning</h4>
                <p className="text-slate-400">Improving with feedback and new data</p>
              </div>
            </div>
          </div>
        )}

        {/* WHY US PAGE */}
        {currentPage === 'why' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Why Choose PhishGuard AI?
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                A practical demonstration of machine learning in cybersecurity
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Lightning Fast</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Our optimized model provides instant feedback, analyzing email content in seconds so you can make quick security decisions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-cyan-500 p-2 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">ML-Powered Detection</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Our model is trained on real phishing email datasets using supervised learning techniques to identify suspicious patterns and content.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Privacy Focused</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  We don't store your email content. All analysis happens in real-time and data is processed securely.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Open Source Learning</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  This project is part of our learning journey, and we're open to feedback and suggestions for improvement.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">What Makes Us Different</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Purpose-Built AI</h4>
                    <p className="text-slate-400">Our model is specifically designed to detect phishing patterns using natural language processing and classification algorithms.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">🔍</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Pattern Analysis</h4>
                    <p className="text-slate-400">We analyze linguistic patterns, urgency indicators, suspicious requests, and contextual clues in email content.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">🛡️</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">Educational Tool</h4>
                    <p className="text-slate-400">Beyond detection, this project helps users learn about phishing tactics and how to identify suspicious emails.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">💡</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">User-Friendly</h4>
                    <p className="text-slate-400">No technical expertise required. Simply paste email content and get instant, clear results with explanations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Try Our Detector</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
