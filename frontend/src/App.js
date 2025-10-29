import React, { useState } from 'react';
import { Shield, Mail, AlertTriangle, CheckCircle, Info, Home, Search, Users } from 'lucide-react';

export default function PhishingDetector() {
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeEmail = async () => {
    if (!email.trim()) {
      setError('Please enter an email to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://email-phishing-detector-3.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze email');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Unable to connect to the detection service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const NavButton = ({ page, icon: Icon, label }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setResult(null);
        setEmail('');
        setError('');
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        currentPage === page
          ? 'bg-blue-500 text-white'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-blue-500/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Phishing Email Detector</h1>
                <p className="text-xs text-blue-300">Student Project</p>
              </div>
            </div>
          </div>
          
          <nav className="flex gap-2">
            <NavButton page="home" icon={Home} label="Home" />
            <NavButton page="detector" icon={Search} label="Detector" />
            <NavButton page="about" icon={Info} label="About" />
            <NavButton page="team" icon={Users} label="Team" />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Email Phishing Detection System
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-6">
                A machine learning-based tool to help identify potentially malicious phishing emails. Created as an academic project to understand email security threats.
              </p>
              <button
                onClick={() => setCurrentPage('detector')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                Try the Detector →
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">ML-Based</div>
                <div className="text-slate-300">Machine learning classification model</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Quick</div>
                <div className="text-slate-300">Fast email analysis</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">Simple</div>
                <div className="text-slate-300">Easy to use interface</div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-500">
                    <span className="text-xl font-bold text-blue-400">1</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-white">Input Email</h4>
                  <p className="text-sm text-slate-400">Copy and paste the email content you want to check</p>
                </div>
                <div className="text-center">
                  <div className="bg-cyan-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-cyan-500">
                    <span className="text-xl font-bold text-cyan-400">2</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-white">ML Analysis</h4>
                  <p className="text-sm text-slate-400">Our model analyzes the text for phishing indicators</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-500">
                    <span className="text-xl font-bold text-green-400">3</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-white">Get Results</h4>
                  <p className="text-sm text-slate-400">Receive classification result instantly</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-300 mb-3">⚠️ Project Disclaimer</h3>
              <p className="text-slate-300 text-sm mb-2">
                This is a student project created for educational purposes. While our model has been trained on phishing email patterns, it may not catch all sophisticated attacks.
              </p>
              <p className="text-slate-300 text-sm">
                Always exercise caution with suspicious emails, verify sender authenticity, and avoid clicking unknown links regardless of what any detection tool says.
              </p>
            </div>
          </div>
        )}

        {/* DETECTOR PAGE */}
        {currentPage === 'detector' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Analyze Email for Phishing
              </h2>
              <p className="text-slate-300">
                Paste the email content below to check if it might be a phishing attempt
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <label className="font-semibold text-white">Email Content</label>
              </div>
              
              <textarea 
                rows={10}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Paste the suspicious email content here...&#x0a;&#x0a;Example:&#x0a;Subject: Urgent: Your account will be suspended&#x0a;&#x0a;Dear customer, we have detected unusual activity on your account..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              />

              {error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-slate-400">
                  {email.length > 0 ? `${email.length} characters` : ''}
                </p>
                <button 
                  onClick={analyzeEmail}
                  disabled={!email.trim() || loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Analyze
                    </>
                  )}
                </button>
              </div>
            </div>

            {result && (
              <div className={`rounded-xl p-6 border-2 ${
                result.prediction === 1 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : 'bg-green-500/10 border-green-500/30'
              }`}>
                {result.prediction === 1 ? (
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ Potential Phishing Detected</h3>
                      <p className="text-slate-200 mb-3">
                        Our model has classified this email as potentially malicious. Be cautious with any links or requests for information.
                      </p>
                      {result.probability && (
                        <div className="bg-slate-900/50 rounded-lg p-3 border border-red-500/20">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">Confidence:</span>
                            <span className="font-bold text-red-400">{(result.probability * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-400 mb-2">✓ Appears Safe</h3>
                      <p className="text-slate-200 mb-3">
                        Our model suggests this email is likely legitimate. However, always verify sender details and be cautious.
                      </p>
                      {result.probability && (
                        <div className="bg-slate-900/50 rounded-lg p-3 border border-green-500/20">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">Confidence:</span>
                            <span className="font-bold text-green-400">{((1 - result.probability) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 bg-blue-500/10 rounded-xl p-5 border border-blue-500/30">
              <h4 className="font-semibold text-white mb-3">Common Phishing Signs:</h4>
              <ul className="space-y-1.5 text-sm text-slate-300">
                <li>• Urgent language demanding immediate action</li>
                <li>• Requests for passwords or personal information</li>
                <li>• Suspicious or mismatched sender addresses</li>
                <li>• Poor grammar and spelling mistakes</li>
                <li>• Generic greetings like "Dear Customer"</li>
              </ul>
            </div>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">About This Project</h2>
              <p className="text-slate-300">An academic initiative to understand email security</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Project Overview</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                This phishing email detector was developed as part of our B.Tech coursework to explore machine learning applications in cybersecurity. The project aims to demonstrate how text classification models can be used to identify potentially malicious emails.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                We trained a machine learning model using a dataset of labeled phishing and legitimate emails. The model analyzes various features in the email text to make its prediction. This is a learning project to understand the fundamentals of email security and ML-based detection systems.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">🎯 Project Goals</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Learn about phishing attack patterns</li>
                  <li>• Implement text classification using ML</li>
                  <li>• Build a functional web application</li>
                  <li>• Understand cybersecurity fundamentals</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">🛠️ Tech Stack</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Python for ML model training</li>
                  <li>• React for frontend interface</li>
                  <li>• Flask/FastAPI for backend API</li>
                  <li>• Natural Language Processing</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30">
              <h4 className="text-lg font-semibold text-amber-300 mb-3">📚 Academic Context</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                This project is part of our curriculum at Indira Gandhi Delhi Technical University for Women (IGDTUW). 
                It combines concepts from Machine Learning, Cybersecurity, and Web Development to create a practical application 
                that addresses real-world security concerns. The primary goal is educational - to understand how ML can be applied 
                to detect patterns in malicious emails.
              </p>
            </div>
          </div>
        )}

        {/* TEAM PAGE */}
        {currentPage === 'team' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Our Team</h2>
              <p className="text-slate-300">Second year B.Tech CSE-AI students</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  I
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Ishita</h3>
                <p className="text-sm text-slate-300 mb-2">B.Tech CSE-AI, 2nd Year</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Advika Sharma</h3>
                <p className="text-sm text-slate-300 mb-2">B.Tech CSE-AI, 2nd Year</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Ananya Kaushik</h3>
                <p className="text-sm text-slate-300 mb-2">B.Tech CSE-AI, 2nd Year</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">About Us</h3>
              <p className="text-slate-300 text-center leading-relaxed max-w-2xl mx-auto">
                We are second-year students pursuing B.Tech in Computer Science and Engineering with specialization in 
                Artificial Intelligence at Indira Gandhi Delhi Technical University for Women (IGDTUW), Delhi. 
                This project represents our effort to apply classroom ML concepts to a practical cybersecurity problem.
              </p>
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-400">
                  <strong className="text-blue-400">Institution:</strong> IGDTUW, Delhi<br />
                  <strong className="text-blue-400">Program:</strong> B.Tech CSE-AI<br />
                  <strong className="text-blue-400">Year:</strong> 2nd Year
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

    
    </div>
  );
}

