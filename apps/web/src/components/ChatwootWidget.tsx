'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function ChatwootWidget() {
  useEffect(() => {
    // Add CSS animations for Chatwoot widget
    const style = document.createElement('style');
    style.textContent = `
      /* Chatwoot Widget Animations */
      .woot-widget-bubble {
        animation: chatwoot-pulse 1.2s ease-in-out infinite;
        transition: all 0.2s ease;
        transform-origin: center;
      }
      
      .woot-widget-bubble:hover {
        animation-play-state: paused;
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(147, 102, 173, 0.4);
      }
      
      .woot-widget-bubble:active {
        transform: scale(0.95);
      }
      
      /* Pulse animation to draw attention */
      @keyframes chatwoot-pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(147, 102, 173, 0.7);
        }
        50% {
          transform: scale(1.05);
          box-shadow: 0 0 0 10px rgba(147, 102, 173, 0.3);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(147, 102, 173, 0);
        }
      }
      
      /* Bounce animation for first appearance */
      @keyframes chatwoot-bounce {
        0% {
          transform: translateY(100px) scale(0.3);
          opacity: 0;
        }
        50% {
          transform: translateY(-10px) scale(1.05);
          opacity: 1;
        }
        70% {
          transform: translateY(5px) scale(0.95);
        }
        100% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
      
      /* Initial entrance animation */
      .woot--bubble-holder {
        animation: chatwoot-bounce 0.5s ease-out;
      }
      
      /* Text animation */
      #woot-widget--expanded__text {
        animation: chatwoot-text-glow 2s ease-in-out infinite;
        transition: all 0.2s ease;
      }
      
      @keyframes chatwoot-text-glow {
        0%, 100% {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
        50% {
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.3);
        }
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .woot-widget-bubble {
          animation-duration: 1.5s;
        }
        
        .woot-widget-bubble:hover {
          transform: scale(1.05);
        }
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        .woot-widget-bubble,
        .woot--bubble-holder,
        #woot-widget--expanded__text {
          animation: none;
        }
        
        .woot-widget-bubble:hover {
          transform: scale(1.05);
        }
      }
    `;
    
    document.head.appendChild(style);
    
    // Cleanup function
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <Script
      id="chatwoot-sdk"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.chatwootSettings = {"position":"right","type":"expanded_bubble","launcherTitle":"Chat with Us Live"};
          (function(d,t) {
            var BASE_URL="https://chat.tranzrmoves.com";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'U8g78oeppePnabPoK8jWjQzZ',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        `,
      }}
    />
  );
}
