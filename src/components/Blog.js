import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import './Blog.css';
import { set } from 'mongoose';

const Blog = ({baseUrl}) => {
  const [likes, setLikes] = useState(0)
  const { id } = useParams();
  const [redirectAfterDelete, setRedirectAfterDelete] = useState('')

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blog/${id}`);
        setBlog(response.data);
        setLikes(response.data.likes)
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [baseUrl, id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const convertIntoMarkup = (txt) => {
    let markupText = txt;

    // Text Formatting (Bold and Italics)
    markupText = markupText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    markupText = markupText.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Text Alignment (Left, Center, Right)
    markupText = markupText.replace(/=>([^=]+)<=/g, '<div style="text-align:center">$1</div>');
    markupText = markupText.replace(/=>([^=]+)=>/g, '<div style="text-align:right">$1</div>');
    markupText = markupText.replace(/<=([^=]+)<=/g, '<div style="text-align:left">$1</div>');

    // Add a Horizontal Rule (hr) for ---
    markupText = markupText.replace(/---/g, '<hr>');

    // Replace (img){URL} with <img> tag
    markupText = markupText.replace(/\(img\){([^}]+)}/g, '<img src="$1" width="300px" height="300px" alt="Enter a valid link" />');

    // Replace (Text){URL} with <a> tag
    markupText = markupText.replace(/\(([^)]+)\){([^}]+)}/g, '<a href="$2" target="_blank">$1</a>');

    // New Line: Replace \n with <br> for line breaks
    markupText = markupText.replace(/\n/g, '<br>');

    return markupText;
  };

  return (
    <div className='singleBlog'>
      <div className="preview" style={blogStyles}>
        <div className="topNav">
          <p>
            {likes}
          </p>
          <button>
              <span className="material-symbols-outlined" onClick={(e)=>{
                setLikes(likes+1)
                axios.patch(`${baseUrl}/blog/${id}`)
                .then(()=>setBlog({...blog, likes: blog.likes+1}))
                .catch((error) => {
                  console.error("Error updating blog:", error);
                });
              }} >thumb_up</span>
          </button>
          <button style={{ opacity: 0.5 , paddingLeft: "1.5em"}}>
            <Link to={`/editor/${id}`}>
              <span className="material-symbols-outlined">edit</span>
            </Link>
          </button>
          <Link to={redirectAfterDelete} >
            <button
              style={{ opacity: 0.5, paddingLeft: "1.5em" }}
              onClick={(e) => {
                if (window.confirm("Are you sure you wish to delete this blog?")) {
                  axios.delete(`${baseUrl}/blog/${id}`)
                  .then(()=>setRedirectAfterDelete('/'))
                    .catch((error) => {
                      console.error("Error deleting blog:", error);
                    });
                }
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </Link>
        </div>
        <div className='content' dangerouslySetInnerHTML={{ __html: convertIntoMarkup(blog.content) }} />
      </div>
    </div>
  );
};

const blogStyles = {
  display: 'block',
  margin: '0 auto',
  padding: '1em',
  overflow: 'auto',
  fontSize: '1.3em',
  boxShadow: '5px 5px 40px #00000054',
};

export default Blog;
