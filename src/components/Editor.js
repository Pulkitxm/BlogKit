import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./Editor.css";

import Preview from "./Preview";

const Editor = ({ title, author, likes }) => {
  const [preview, setPreview] = useState(false);
  const [text, setText] = useState("");
  const [changes, setChanges] = useState(false);
  const { id } = useParams();
  const editorTextareaRef = useRef(null);
  const baseUrl = "http://localhost:3001";

  const getBlogById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/${id}`);
      return response.data.content;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const content = await getBlogById(id);
        if (content !== null) {
          convertIntoMarkup(null, true, content);
        }
      } else {
        convertIntoMarkup(null, true);
      }
    };

    fetchData();
  }, [id]);

  const convertIntoMarkup = (e, isNew, text = "") => {
    if (text) {
      editorTextareaRef.current.value = text;
      setPreview(true);
    }
    const txt = editorTextareaRef.current.value;
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

    // Replace (img){URL} with <img> tag
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
    // return markupText;
  };

  const insertText = (textToInsert) => {
    const currentText = editorTextareaRef.current.value;
    const selectionStart = editorTextareaRef.current.selectionStart;
    const selectionEnd = editorTextareaRef.current.selectionEnd;
    const newText =
      currentText.substring(0, selectionStart) +
      textToInsert +
      currentText.substring(selectionEnd);
    editorTextareaRef.current.value = newText;
    editorTextareaRef.current.setSelectionRange(
      selectionStart + textToInsert.length,
      selectionStart + textToInsert.length
    );
    convertIntoMarkup(null, true, newText); // Update the .result
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
          {preview ? (
            <>
              <button style={{ opacity: 0.5 }}>
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setPreview(!preview)}>
                <span className="material-symbols-outlined btn-topNav">
                  play_arrow
                </span>
              </button>
            </>
          )}
        </div>
        <textarea
          id="editor"
          ref={editorTextareaRef}
          value={text}
          onChange={(e) => {
            convertIntoMarkup(e);
            setChanges(true);
          }}
        ></textarea>
      </div>
      <Preview preview={preview} setPreview={setPreview} setText={setText} />
      <div
        className="save"
        style={{
          opacity: changes ? "1" : ".6",
          animation: !changes ? "" : "shake .5s 3",
        }}
      >
        <button>
          <span
            className="material-symbols-outlined"
            onClick={(e) => {
              if (changes && text !== "") {
                if (id) {
                  axios
                    .put(`${baseUrl}/blog/${id}`, { content: text })
                    .then(() => {
                      setChanges(false);
                      setTimeout(() => (e.target.innerHTML = "done"), 1000);
                      setTimeout(() => (e.target.innerHTML = "save"), 3000);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  let author, title;
                  author = prompt("Enter your name");
                  title = prompt("Enter the title of your blog");
                  axios
                    .post(`${baseUrl}/blogs`, {
                      author: author||"",
                      content: text,
                      title: title||"Untitled",
                      likes: 0,
                    })
                    .then(() => {
                      setChanges(false);
                      setTimeout(() => (e.target.innerHTML = "done"), 1000);
                      setTimeout(() => (e.target.innerHTML = "save"), 3000);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }
            }}
          >
            save
          </span>
        </button>
      </div>
    </div>
  );
};

export default Editor;
