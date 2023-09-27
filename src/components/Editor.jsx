import React, { useEffect, useState } from "react";

import "./Editor.css";

const Editor = () => {
  const [preview, setPreview] = useState(false);
  const [text, setText] = useState('');

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
      <div className="preview" style={{ display: preview ? "block" : "none" }}>
        
      <div className="topNav">
          <p>Preview</p>
          {
            !preview?
                <button style={{opacity:.5}} >
                    <span className="material-symbols-outlined">close</span>
                </button>
            :
                <button onClick={() => setPreview(!preview)}>
                    <span className="material-symbols-outlined">close</span>
                </button>

          }
        </div>
        
        <div className="result"></div>
      </div>
    </div>
  );
};

export default Editor;