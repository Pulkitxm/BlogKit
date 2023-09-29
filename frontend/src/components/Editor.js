import React, { useEffect, useState } from "react";

import "./Editor.css";

import Preview from './Prview'

const Editor = ({title,author,likes}) => {
  const [preview, setPreview] = useState(true);
  const [text, setText] = useState(`Pulkit
  **Title:** My Amazing Blog
  
  **Author:** John Doe
  
  **Date:** September 27, 2023
  
  **Introduction:**
 
  (img){https://images.unsplash.com/photo-1683009680116-b5c04463551d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80}

  Welcome to my amazing blog where I share my thoughts and experiences with the world. In this blog post, I'll cover a variety of topics, including technology, travel, and more.
  
  **Heading 1: Technology Trends**
  
  In recent years, technology has advanced at an incredible pace. From the rise of artificial intelligence to the development of self-driving cars, we're living in an exciting time. 
  
  **Heading 2: Travel Adventures**
  
  I've had the privilege of traveling to many beautiful places around the world. One of my favorite destinations is the stunning beaches of Bali. The crystal-clear waters and vibrant culture make it a must-visit location for any traveler.
  
  **Bold and Italics:**
  
  - *Emphasizing important points in your blog is essential.*
  - **Using bold text can grab the reader's attention.**
  
  **Inserting Images:**
  
  **Creating Links:**
  
  Visit the official Bali tourism website [here](https://www.bali.com/) to learn more about this beautiful island.
  
  **Conclusion:**
  
  I hope you enjoyed reading my blog post. Stay tuned for more exciting content in the future!
  
  Remember to use your text editor's features to format and style the content as needed. Enjoy writing your blog!
  `);

  useEffect(() => {
    convertIntoMarkup();
  }, [])

  const convertIntoMarkup = (e) => {
    const txt = (e)?
    e.target.value
    :
    document.querySelector("#editor").value;
    setText(txt);

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
    markupText = markupText.replace(/\n/g, "<br>");

    const result = document.querySelector(".result");
    result.innerHTML = markupText;
  };
  
  const insertText = (textToInsert) => {
    const editorTextarea = document.getElementById("editor");
    const currentText = editorTextarea.value;
    const selectionStart = editorTextarea.selectionStart;
    const selectionEnd = editorTextarea.selectionEnd;
    const newText =
      currentText.substring(0, selectionStart) +
      textToInsert +
      currentText.substring(selectionEnd);
    editorTextarea.value = newText;
    editorTextarea.setSelectionRange(
      selectionStart + textToInsert.length,
      selectionStart + textToInsert.length
    );
    convertIntoMarkup({ target: { value: newText } }); // Update the .result
  };

  const obj = {
    title,
    author,
    content:text,
    likes
  }

  return (
    <div
      className="editContainer"
      style={{ gridTemplateColumns: preview ? "2" : "1" }}
    >
      <div className="editor" style={{ width: preview ? "50%" : "100%" }}>
        <div className="topNav">
          <button onClick={() => insertText("<= --  <=")}>
            <span className="material-symbols-outlined">format_align_left</span>
          </button>
          <button onClick={() => insertText("=> --  <=")}>
            <span className="material-symbols-outlined">
              format_align_center
            </span>
          </button>
          <button onClick={() => insertText("=> --  =>")}>
            <span className="material-symbols-outlined">
              format_align_right
            </span>
          </button>
          <button onClick={() => insertText("---")}>
            <span className="material-symbols-outlined">horizontal_rule</span>
          </button>
          <button onClick={() => insertText("(img){--URL--}")}>
            <span className="material-symbols-outlined">photo_camera</span>
          </button>
          <button onClick={() => insertText("(Text){--URL--}")}>
            <span className="material-symbols-outlined">link</span>
          </button>
          {
            preview?
                <button style={{opacity:.5}} >
                    <span className="material-symbols-outlined">play_arrow</span>
                </button>
            :
                <button onClick={() => setPreview(!preview)}>
                    <span className="material-symbols-outlined">play_arrow</span>
                </button>

          }
        </div>
        <textarea
          id="editor"
          value={text}
          onChange={(e) => convertIntoMarkup(e)}
        ></textarea>
      </div>
      <Preview preview={preview} setPreview={setPreview} setText={setText} />
    </div>
  );
};

export default Editor;