import React from 'react';
import './ImageHover.css'; // Import the CSS file

function ImageHoverExample() {
  return (
    <div className="image-container">
      <img
        src="https://static.vecteezy.com/system/resources/previews/008/652/562/non_2x/car-rental-social-media-thumbnail-template-flat-cartoon-background-illustration-vector.jpg"
        alt="Hover Effect"
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
}

export default ImageHoverExample;
