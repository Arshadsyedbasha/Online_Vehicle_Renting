import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Typography, Box } from '@mui/material';

function Carousel() {
  const settings = {
    dots: true, // Display dots for navigation
    infinite: true, // Enable infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Auto-play slides
    autoplaySpeed: 2100, // Auto-play speed (in ms)
  };

  const slides = [
    {
      image: "https://wallpapers.com/images/featured/4k-bike-p5ztqfie3vnj5kkp.jpg",
      quote: "Experience freedom on two wheels with our bike rentals.",
    },
    {
      image: "https://images6.alphacoders.com/395/395529.jpg",
      quote: "Drive your dream car with our flexible rental options.",
    },
    {
      image: "https://pandatechie.in/wp-content/uploads/2021/02/1-3.jpg",
      quote: "Unlock the joy of hassle-free travel with our rentals.",
    },
  ];

  return (
    <Box sx={{ maxWidth: '2000px', margin: '0 auto', paddingTop: '0px' }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: 'relative', height: '400px' }}> {/* Adjust the height here */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Ensure the image covers the container
                borderRadius: '0px',
              }}
            />
            <Typography
              variant="h6"
              align="center"
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter:"blur(5px)",
                padding: '10px',
                borderRadius: '8px',
                maxWidth: '90%', // Ensure the text doesn't overflow
              }}
            >
              {slide.quote}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Carousel;
