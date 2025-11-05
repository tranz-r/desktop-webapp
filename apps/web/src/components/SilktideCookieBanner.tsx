'use client';

import Script from 'next/script';

// Declare gtag and dataLayer types for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    silktideCookieBannerManager?: {
      updateCookieBannerConfig: (config: any) => void;
    };
  }
}

export default function SilktideCookieBanner() {
  // Configuration function
  const initializeSilktide = () => {
    if (typeof window !== 'undefined' && window.silktideCookieBannerManager) {
      const manager = window.silktideCookieBannerManager;

      manager.updateCookieBannerConfig({
        background: {
          showBackground: true
        },
        position: {
          banner: "bottomLeft"  // Add this - options: "center", "bottomLeft", "bottomRight", "bottomCenter"
        },
        cookieIcon: {
          position: "bottomLeft"
        },
        cookieTypes: [
          {
            id: "necessary",
            name: "Necessary",
            description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",
            required: true,
            onAccept: function() {
              console.log('Necessary cookies accepted');
            }
          },
          {
            id: "analytics",
            name: "Analytics",
            description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
            defaultValue: true,
            onAccept: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  analytics_storage: 'granted',
                });
              }
              if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                  'event': 'consent_accepted_analytics',
                });
              }
            },
            onReject: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  analytics_storage: 'denied',
                });
              }
            }
          },
          {
            id: "advertising",
            name: "Advertising",
            description: "<p>These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.</p>",
            onAccept: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                });
              }
              if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                  'event': 'consent_accepted_advertising',
                });
              }
            },
            onReject: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                });
              }
            }
          }
        ],
        text: {
          banner: {
            description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\"/privacy-policy\" target=\"_blank\">Cookie Policy.</a></p>",
            acceptAllButtonText: "Accept all",
            acceptAllButtonAccessibleLabel: "Accept all cookies",
            rejectNonEssentialButtonText: "Reject non-essential",
            rejectNonEssentialButtonAccessibleLabel: "Reject non-essential",
            preferencesButtonText: "Preferences",
            preferencesButtonAccessibleLabel: "Toggle preferences"
          },
          preferences: {
            title: "Customize your cookie preferences",
            description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
            creditLinkText: "Get this banner for free",
            creditLinkAccessibleLabel: "Get this banner for free"
          }
        }
      });
    }
  };

  return (
    <Script
      id="silktide-consent-manager-js"
      src="/cookie-banner/silktide-consent-manager.js"
      strategy="afterInteractive"
      onLoad={initializeSilktide}
    />
  );
}

