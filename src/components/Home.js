import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const baseUrl = 'http://localhost:3001';
  const blogServices = {
    getAll: async () => {
      try {
        return await axios.get(`${baseUrl}/blogs`);
      } catch (error) {
        throw error;
      }
    },
    
    getBlogsForAuthor: async (author) => {
      try {
        return await axios.get(`${baseUrl}/author/${author}/blogs`);
      } catch (error) {
        throw error;
      }
    },
    
    getBlogById: async (id) => {
      try {
        return await axios.get(`${baseUrl}/${id}`);
      } catch (error) {
        throw error;
      }
    },
  };

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from your service when the component mounts
    const fetchBlogs = async () => {
      try {
        const response = await blogServices.getAll();
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [blogServices]);

  const convertIntoMarkup = (txt) => {

    let markupText = txt;

    // Text Formatting (Bold and Italics)
    markupText = markupText.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"); // Replace **text** with <strong>text</strong> for bold
    markupText = markupText.replace(/\*([^*]+)\*/g, "<em>$1</em>"); // Replace *text* with <em>text</em> for italics

    // Text Alignment (Left, Center, Right)
    // Center-align text enclosed within => and <=
    markupText = markupText.replace(
      /=>([^=]+)<=/g,
      '<div style="text-align:center">$1</div>'
    );

    // Right-align text enclosed within => and =>
    markupText = markupText.replace(
      /=>([^=]+)=>/g,
      '<div style="text-align:right">$1</div>'
    );

    // Left-align text enclosed within <= and <=
    markupText = markupText.replace(
      /<=([^=]+)<=/g,
      '<div style="text-align:left">$1</div>'
    );

    // Add a Horizontal Rule (hr) for ---
    markupText = markupText.replace(/---/g, "<hr>");
    markupText = markupText.replace(/\n/g, '<br>');

    // Replace <URL> with <img> tag
    // markupText = markupText.replace(/<([^>]+)>/g, '<a href="$1" target="_blank"><img src="$1" width="300px" height="300px" alt="Insert a Correct url" /></a>');
    markupText = markupText.replace(
      /\(img\){([^}]+)}/g,
      '<img src="$1" width="300px" height="300px" alt="Enter a valid link" />'
    );

    // Replace (Text){URL} with <a> tag
    markupText = markupText.replace(
      /\(([^)]+)\){([^}]+)}/g,
      '<a href="$2" target="_blank">$1</a>'
    );

    // New Line: Replace \n with <br> for line breaks
    return markupText;
  };
  
  return (
    <div className='home'>
        <div className="blogs">
        {blogs.map((blog) => {
          return(
              <div key={blog._id} className='blog' style={{fontSize:"1.3em"}} >
                <Link to={`/blog/${blog._id}`} key={blog._id} >
                  <div style={{marginBottom:"1em"}} >
                    Title : <b>{blog.title}</b>
                    <br/>
                    Author : <b>{blog.author}</b>
                    <br/>
                    <div style={{display:"flex",alignItems:"center",height:"1.5em",fontSize:"1.2em"}}>
                      {blog.likes}
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: convertIntoMarkup(blog.content) }} className='blogContent' >
                  </div>
                </Link>
              </div>
          )
        })}
        </div>
    </div>
  );
};

export default Home;
