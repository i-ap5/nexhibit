import { createContext } from 'react';

export const MotionContext = createContext<{ scrollY: number; mouse: { x: number; y: number } }>({
    scrollY: 0,
    mouse: { x: 0, y: 0 }
});
