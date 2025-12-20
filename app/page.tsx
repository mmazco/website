'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BouncingCharacter from './components/BouncingCharacter';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <div className="split-container">
      {/* Dark mode toggle */}
      <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        )}
      </button>

      {/* Bouncing 3D characters */}
      <BouncingCharacter 
        src="/images/3d-kernel-characters copy 3.png" 
        size={140} 
        speed={1.5} 
      />
      <BouncingCharacter 
        src="/images/3d-kernel-characters copy 4.png" 
        size={140} 
        speed={2} 
      />

      {/* Left side - Text content (fixed) */}
      <div className="left-panel">
        <div className="left-content">
          <h1>Maryam Mazraei</h1>
          
          <p className="intro">
            Hi! I'm <a href="https://x.com/mmazco" target="_blank" rel="noopener noreferrer">Maz</a>—serial entrepreneur, former VC, and creative hobbyist. I've spent 10+ years building products across consumer, open source, and sustainability with emerging tech such as AI and blockchain. Find me on <a href="https://x.com/mmazco" target="_blank" rel="noopener noreferrer">X</a>, <a href="https://www.linkedin.com/in/maryam-mazraei/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and <a href="https://github.com/mmazco" target="_blank" rel="noopener noreferrer">Github</a>.
          </p>
          
          <p>
            Got questions, thoughts or want to collaborate? Hit me up on <a href="mailto:hello@mmaz.co">email</a>, DMs on X or book a call <a href="https://calendly.com/maryammaz" target="_blank" rel="noopener noreferrer">here</a> (please state reason for the call).
          </p>

          <h2>Project spotlight</h2>
          
          <p>
            <a href="https://hi-aleph.com/" target="_blank" rel="noopener noreferrer"><strong>Aleph</strong></a>, AI-powered audiobook turning books into conversations. In collaboration with <a href="https://tank.tv/" target="_blank" rel="noopener noreferrer">Tank Magazine</a>, long known for its expertise in cultural curation and Google Deepmind Research Scientist, <a href="https://x.com/arkitus" target="_blank" rel="noopener noreferrer">Ali Eslami</a>.
          </p>
          
          <p>
            <a href="https://mrf.up.railway.app/" target="_blank" rel="noopener noreferrer"><strong>Media Reaction Finder</strong></a>, discover public discussions around any news article or media across web + social.
          </p>
          
          <p>
            <a href="http://world.org/worldvote" target="_blank" rel="noopener noreferrer"><strong>World Vote</strong></a>, a voting mini app implementation for World Foundation in collaboration with Agora Governance and Tools For Humanity.
          </p>
          
          <p>
            <a href="https://www.crowdmuse.xyz/collect/genesis-artifact" target="_blank" rel="noopener noreferrer"><strong>Crowdmuse</strong></a>, decentralised (local) Amazon, onchain ecommerce with revenue splits for creators and brands selling physical products.
          </p>

          <p className="creative-projects">
            <strong>Creative projects:</strong> <Link href="/photography">Photography</Link> · <a href="https://www.youtube.com/@mindmeldpod" target="_blank" rel="noopener noreferrer">Mind Meld podcast</a> · Plastic Labs
          </p>

          <h2>Open Memos</h2>
          
          <p className="memos-intro">
            Open proposals, memos or concepts up for review, hack, grant funding.
          </p>

          <div className="memo-item">
            <a href="https://www.notion.so/3D-and-AI-for-merchandising-to-mitigate-overproduction-138993cee5d08073963ff9a84c200810" target="_blank" rel="noopener noreferrer">
              3D and AI for merchandising to mitigate overproduction
            </a>
            <p className="memo-desc">Accelerating physical product showcasing in the design → production phases</p>
          </div>

          <div className="memo-item">
            <a href="https://www.notion.so/Stables-payment-infra-crypto-s-fintech-moment-138993cee5d080e0b754f99419ff84b7" target="_blank" rel="noopener noreferrer">
              Stables payment infra- crypto's fintech moment
            </a>
            <p className="memo-desc">A review on the benefits of stablecoin payments and memes for crypto's PMF golden child</p>
          </div>

          <div className="memo-item">
            <a href="https://www.notion.so/Chat-to-your-personal-shopper-agent-138993cee5d0807e8f75ea818071e220" target="_blank" rel="noopener noreferrer">
              Chat to your personal shopper (agent)
            </a>
            <p className="memo-desc">Future of commerce and customer online shopping experience disruption with agents</p>
          </div>

          <h2>Publications</h2>
          <p className="publications-item">
            <a href="https://mirror.xyz/crowdmuse.eth" target="_blank" rel="noopener noreferrer">Crowdmuse Mirror</a> publication on social commerce, IP composability, decentralized supply chains
          </p>
          <p className="publications-item">
            <a href="https://medium.com/startup-autopsies" target="_blank" rel="noopener noreferrer">Autopsy Medium</a> and <a href="https://paragraph.xyz/@autopsy" target="_blank" rel="noopener noreferrer">Paragraph</a> publications on failed startups, VC and entrepreneurship, founder stories, data analysis, reports
          </p>

          <h2>Selected talks</h2>
          <ul className="talks-list">
            <li><a href="https://youtu.be/OcpaY65VaoA?si=GCNyBjqlDYzEoHiK" target="_blank" rel="noopener noreferrer">Failure...what we don't talk enough about</a> JAM Product Conference 2019</li>
            <li><a href="https://www.youtube.com/watch?v=PiPRBI7URpI" target="_blank" rel="noopener noreferrer">Startup Sematary</a> CreativeMornings London 2019</li>
            <li><a href="https://youtu.be/SITWNbTlDs8?si=P3p3uGj-BtXcUknw" target="_blank" rel="noopener noreferrer">Changing the face of Ecomm and Retail</a> Avata and MAD Global London Fashion Week Oct 2022</li>
            <li><a href="https://youtu.be/qaHwst73F6I?si=Fohh3tbJISFRur0m" target="_blank" rel="noopener noreferrer">Crowdmuse Gitcoin Grantee interview</a> ETHCC[6] Paris 2023</li>
            <li><a href="https://youtu.be/6QSoRSb44as?si=VbpmnnqC1K0UADh3" target="_blank" rel="noopener noreferrer">Consumer Crypto Needs This One Thing to Scale</a> Mainnet NYC Sept 2023</li>
            <li><a href="https://youtu.be/rasNB-z-Df8?si=dRkF2iGNBIF0Ksup" target="_blank" rel="noopener noreferrer">Consumer Goods: The Most Obvious Opportunity in Crypto</a> Base House Art Basel Miami Dec 2023</li>
            <li><a href="https://youtu.be/UUMvcBVB6W4?si=He1zCc7_L75aYFJi" target="_blank" rel="noopener noreferrer">Headless Brands and IP NFTs with Remix Rights</a> ETHDenver 2024</li>
          </ul>

          <footer className="site-footer">
            <Link href="/playground">Playground</Link>
            <span className="footer-separator">·</span>
            <a href="https://github.com/mmazco/website" target="_blank" rel="noopener noreferrer">Fork website</a>
          </footer>
        </div>
      </div>

      {/* Right side - Visual content */}
      <div className="right-panel">
        <div className="visual-item">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="demo-video"
          >
            <source src="/images/aleph-compressed.mp4" type="video/mp4" />
          </video>
              </div>
        
        <div className="visual-item">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="demo-video"
          >
            <source src="/images/mrf-compressed.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="visual-item">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="demo-video"
          >
            <source src="/images/world-vote-demo.mp4" type="video/mp4" />
          </video>
            </div>
            
        <div className="visual-item">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="demo-video"
          >
            <source src="/images/cm-compressed.mp4" type="video/mp4" />
          </video>
        </div>
            </div>
    </div>
  );
} 
