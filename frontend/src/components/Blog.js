import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const { id } = useParams();
  const baseUrl = 'http://localhost:3001';

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blog/${id}`);
        setBlog(response.data);
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
    <div >
      <div className="preview" style={blogStyles} dangerouslySetInnerHTML={{ __html: convertIntoMarkup(blog.content) }} />
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
