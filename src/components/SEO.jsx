import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, image, url }) => {
  const defaultDescription = "Shahan Ahmed's professional portfolio. A data analyst specializing in transforming data into insights and building innovative solutions.";
  const defaultTitle = 'Shahan Ahmed - Data Analyst & Developer';
  const siteName = 'Shahan Ahmed Portfolio';
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title || defaultTitle}</title>
      <meta name='description' content={description || defaultDescription} />
      
      {/* Open Graph tags */}
      <meta property="og:url" content={url || 'https://www.shahanahmed.com/'} />
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || 'https://www.shahanahmed.com/shahan_ahmed.png'} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@shahan24h" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || 'https://www.shahanahmed.com/shahan_ahmed.png'} />
    </Helmet>
  );
};

export default SEO; 