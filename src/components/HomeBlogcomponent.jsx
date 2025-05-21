import React, {useEffect, useState} from 'react'; 
import { fetchDataFromApi } from '../../utils/api';
import BlogCard from './BlogCard';

function HomeBlogcomponent() {

 const [blogs, setBlogs] = useState([]);

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const response = await fetchDataFromApi("/api/blog");
      if (response.error) throw new Error(response.message);
     setBlogs(response.data.slice(0, 2));
     
    } catch (err) {
      console.log(err);
    
    }
  };

  fetchBlogs();
}, []);



  return (
    <>
    <div className=" p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center font-primary">
          
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((blog)=>(
            <BlogCard key={blog._id} blog={blog} />
          ))}        </div>
      </div>
    </div>
    
    </>
  )
}

export default HomeBlogcomponent