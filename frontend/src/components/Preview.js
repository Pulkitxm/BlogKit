import React from 'react'
import {Link,useParams} from 'react-router-dom'

const Prview =({preview,setPreview,setText}) => {
  const {id} = useParams();
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
                <div className='right-Btn' style={{display:"flex",transform:"scale(.7)",justifyContent:"space-evenly"}}>
                  <Link to={`/blog/${id}`} >
                    <button>
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </Link>
                  <button onClick={() => setPreview(!preview)}>
                      <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

          }
        </div>
        
        <div className="result"></div>
      </div>
  )
}

export default Prview