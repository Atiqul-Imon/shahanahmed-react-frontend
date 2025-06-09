import React from 'react'
import Hero from '../../components/Hero';

import HomeBlogcomponent from '../../components/HomeBlogcomponent';
import GitHubStats from '../../components/githubStats';
import HuggingFaceContributions from '../../components/HuggingFaceContributions';
import HomeProjectcomponent from '../../components/HomeProjectComponent';
import SocialLinks from '../../components/SocialLinks';

function Home() {
  return (
    <div className='bg-zinc-900'>
        <Hero />
        <HomeBlogcomponent />
        <HomeProjectcomponent />
        <SocialLinks />
        {/* <HuggingFaceContributions /> */}
    </div>
  )
}

export default Home;