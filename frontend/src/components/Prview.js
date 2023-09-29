import React, { useEffect } from 'react'

const Prview =({preview,setPreview,setText}) => {
  
  return (
    <div className="preview" style={{ display: preview ? "block" : "none", padding:preview ? "0 0em 0 1em " : "0" }}>
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
  )
}

export default Prview