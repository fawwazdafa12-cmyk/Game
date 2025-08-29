import { useState, useEffect } from 'react';

export function useCountdown(expiryDateString: string) {
    const calculateTimeLeft = () => {
        // Ensure the date is parsed correctly, assuming ISO string inputs
        const targetDate = new Date(expiryDateString);
        const difference = targetDate.getTime() - new Date().getTime();
        
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalHours: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            totalHours: Math.floor(difference / (1000 * 60 * 60)),
            isExpired: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, expiryDateString]);

    return timeLeft;
}
