declare module 'react-lazy-load-image-component' {
  import * as React from 'react';
  
  export interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    afterLoad?: () => void;
    beforeLoad?: () => void;
    delayMethod?: 'debounce' | 'throttle';
    delayTime?: number;
    effect?: string;
    placeholder?: React.ReactNode;
    placeholderSrc?: string;
    threshold?: number;
    useIntersectionObserver?: boolean;
    visibleByDefault?: boolean;
    wrapperClassName?: string;
    wrapperProps?: Object;
  }

  export interface LazyComponentProps {
    afterLoad?: () => void;
    beforeLoad?: () => void;
    delayMethod?: 'debounce' | 'throttle';
    delayTime?: number;
    placeholder?: React.ReactNode;
    threshold?: number;
    useIntersectionObserver?: boolean;
    visibleByDefault?: boolean;
  }

  export interface TrackWindowScrollProps {
    delayMethod?: 'debounce' | 'throttle';
    delayTime?: number;
    useIntersectionObserver?: boolean;
  }

  export class LazyLoadImage extends React.Component<LazyLoadImageProps> {}
  export function trackWindowScroll<P extends TrackWindowScrollProps>(
    Component: React.ComponentType<P>
  ): React.ComponentType<P>;
  export class LazyComponent extends React.Component<LazyComponentProps> {}
}

declare module 'react-lazy-load-image-component/src/effects/blur.css';
declare module 'react-lazy-load-image-component/src/effects/black-and-white.css';
declare module 'react-lazy-load-image-component/src/effects/opacity.css';
