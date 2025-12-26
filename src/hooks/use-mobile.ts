import { useState, useEffect } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const mediaQuery = window.matchMedia('(max-width: 768px)');

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
            ];

            const isMobileUA = mobileKeywords.some((keyword) =>
                userAgent.includes(keyword)
            );

            const isMobileDevice =
                mediaQuery.matches || (isMobileUA && window.innerWidth <= 768);

            setIsMobile(isMobileDevice);
        };

        checkIsMobile();

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleChange = () => checkIsMobile();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        }

        window.addEventListener('resize', checkIsMobile);

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            }
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
}
