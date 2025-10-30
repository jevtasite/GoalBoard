import { useState, useEffect } from 'react';

export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobileDevice: false,
    isPortrait: false,
    isPhone: false
  });

  useEffect(() => {
    const detectDevice = () => {
      // Check if device has touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Check user agent for mobile/tablet patterns
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        'android',
        'webos',
        'iphone',
        'ipad',
        'ipod',
        'blackberry',
        'windows phone',
        'mobile',
        'tablet'
      ];

      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));

      // Check for iPad specifically (as it sometimes reports as desktop)
      const isIPad = /ipad|macintosh/.test(userAgent) && hasTouch;

      // Check screen size as additional fallback (but not primary)
      const isSmallScreen = window.innerWidth < 1024;

      // Device is mobile if:
      // 1. Has touch AND mobile user agent, OR
      // 2. Is iPad, OR
      // 3. Has touch AND small screen (catch-all for edge cases)
      const isMobile = (hasTouch && isMobileUA) || isIPad || (hasTouch && isSmallScreen);

      // Check if device is in portrait orientation
      const isPortrait = window.innerHeight > window.innerWidth;

      // Detect if it's a phone (smaller screen, typically under 768px width)
      const isPhoneSize = window.innerWidth < 768;
      const isPhone = isMobile && isPhoneSize;

      setDeviceInfo({
        isMobileDevice: isMobile,
        isPortrait: isPortrait,
        isPhone: isPhone
      });
    };

    detectDevice();

    // Re-detect on resize (for orientation changes)
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  return deviceInfo;
};
