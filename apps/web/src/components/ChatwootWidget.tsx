'use client';

import Script from 'next/script';

export default function ChatwootWidget() {
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
