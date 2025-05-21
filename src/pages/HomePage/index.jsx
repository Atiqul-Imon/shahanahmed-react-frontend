import React from 'react'
import Hero from '../../components/Hero';
import RecentProject from "../../components/RecentProject"
import HomeBlogcomponent from '../../components/HomeBlogcomponent';
import GitHubStats from '../../components/githubStats';

function Home() {
  return (
    <div className='bg-zinc-900'>
        <Hero />
        <HomeBlogcomponent />
        <RecentProject />
        <GitHubStats />
    </div>
  )
}

export default Home;