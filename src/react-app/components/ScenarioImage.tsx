import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Image } from 'lucide-react';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ScenarioImageProps {
  src: string;
  alt: string;
}

export const ScenarioImage: FC<ScenarioImageProps> = ({ src, alt }) => {
  return (
    <div className="mb-6 flex justify-center items-center scenario-image-container">
      <div 
        className="rounded-lg overflow-hidden shadow-md" 
        style={{ 
          display: 'inline-block', 
          lineHeight: 0, 
          fontSize: 0,
          verticalAlign: 'top' // Add this to help with alignment
        }}
      >
        <LazyLoadImage
          src={src}
          alt={alt}
          effect="blur"
          className="max-w-full rounded-lg block"
          style={{ 
            maxHeight: '400px', 
            width: 'auto', 
            height: 'auto', 
            display: 'block',
            margin: 0,
            padding: 0,
            verticalAlign: 'top' // Add this to help with alignment
          }}
          wrapperProps={{
            style: {
              lineHeight: 0,
              display: 'block',
              margin: 0,
              padding: 0,
              fontSize: 0,
              verticalAlign: 'top' // Add this to help with alignment
            }
          }}
          wrapperClassName="m-0 p-0 leading-none"
          placeholder={
            <div className="animate-pulse flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg">
              <Image size={48} className="text-gray-400" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ScenarioImage;
