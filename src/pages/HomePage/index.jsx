import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import HomeProjectComponent from "../../components/HomeProjectComponent";
import SEO from "../../components/SEO";

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Shahan Ahmed - Data Analyst & Developer Portfolio"
        description="Welcome to the portfolio of Shahan Ahmed, a skilled data analyst and developer specializing in data visualization, insights, and innovative web solutions. Explore my projects and get in touch."
      />
      <Hero />
      <HomeProjectComponent />
    </>
  );
};

export default HomePage;