import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'
const ImageGenerator = () => {

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);

    const ImageGenerator = async () =>{
        if (inputRef.current.value===""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "k0e6aO_2cbS1SymTKW0BBajIUNrLyqV6rh1AcK2Qdf1oZi9jfla04d7KYIT3BlbkFJY6Yrz5lDoWHUH0BRX6bqzHC8UmTBiZpGuptFWPXz_6BnPFtGD0mcp0dKcA",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        let data_array =data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }

  return (
    <div className='ai-image-generator'>
       <div className="header">Ai image <span>generator</span></div>
       <div className="img-loading">
        <div className="image">
            <img src={image_url==="/"?default_image:image_url} alt="" />
        </div>
        <div className="loading">
              <div className={loading?"loading-bar full":"loading-bar"}></div>
              <div className={loading?"loading-text":"display-none"}>Loadingg...</div>
       </div>
       </div>
       <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see'/>
        <div className="generate-btn" onClick={()=>{ImageGenerator()}}>Generate</div>
       </div>
    </div>
  )
}

export default ImageGenerator