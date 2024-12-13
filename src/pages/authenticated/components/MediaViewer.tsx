import React from 'react';
import { fullMediaURL } from '../../../utils/media.utils';
import { ICourseContent } from '../../../interfaces/ICourseContent';

interface IProps {
  media: ICourseContent;
}

const MediaViewer: React.FC<IProps> = ({ media }) => {
  const mediaUrl = fullMediaURL(media.url);

  const renderContent = () => {
    switch (media.type) {
      case 'VIDEO':
        return (
          <div>
            <video 
              controls 
              src={mediaUrl} 
              className="w-full h-auto rounded-md shadow-lg"
              title={media.title}
            >
              Your browser does not support the video tag.
              <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
                Download Video
              </a>
            </video>
            {media.durationInMinutes && (
              <p className="mt-2 text-sm text-gray-500">
                Duration: {media.durationInMinutes} minutes
              </p>
            )}
          </div>
        );
      
      case 'PDF':
        return (
          <div>
            <iframe 
              src={mediaUrl} 
              width="100%" 
              height="400px" 
              className="rounded-md shadow-lg"
              title={media.title}
            >
              This browser does not support PDFs. 
              <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </iframe>
          </div>
        );
      
      default:
        return <div>Unsupported material type</div>;
    }
  };

  return (
    <div className="media-viewer flex flex-col items-center">
      <div 
        className="w-full max-w-xl p-4 bg-white rounded-lg shadow-md"
        style={{ minWidth: '50%', maxWidth: '80%' }} // Adjust for responsiveness
      >
        {media && <h2 className="text-xl font-bold mb-4 text-center">{media.title}</h2>}
        {media?.description && (
          <p className="mb-4 text-gray-600 text-center">{media.description}</p>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default MediaViewer;
