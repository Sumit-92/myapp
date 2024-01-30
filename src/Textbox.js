import React , {useState , useEffect }  from 'react'

export default function Textbox(props) {
       const [text, setText] = useState("") 
       
       const [ wordCount , setWordCount] = useState(0) ;

       const [readTime, setReadTime] = useState(0.00) ;

       const [wordToCount, setWordToCount] = useState('');

       const [wordFrequency, setWordFrequency] = useState(0);

       const handleTextChange = (event)=>{
                    setText(event.target.value) ;
       }
       
       useEffect(() => {

         // update Word Count 
         setWordCount(text.split(/\s+/).filter(word => word !== '').length) ;

         // update reading time 
         setReadTime(wordCount/200) 
       }, [text , wordCount ])
       

       const countWordFrequency = (text, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = text.match(regex);
       return matches ? matches.length : 0;
      };


      
       const capitalizeFirstLetter = () => {
        setText(text.replace(/\b\w/g, (match) => match.toUpperCase())) ;
        props.showAlert( "Converted to Uppercase" , "success")
      };
       
      
       const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(text);
        props.showAlert( "Text Copied" , "success")
      };
      
      const handleFrequencySearch = (e) =>{
          setWordToCount(e.target.value)
          setWordFrequency(countWordFrequency( text , e.target.value))
      }

  return (
    <>
       
    <div className='container' style={{color :props.mode === 'dark' ? 'white' : '#042743' } } >
    <h1 className="col-12 text-center">{props.heading}</h1>
      
      <div className='mb-3'>
      <textarea className="form-control"  rows="8" id='myBox' placeholder='Enter your text' value={text} onChange={handleTextChange} style={{backgroundColor :props.mode === 'dark' ? 'grey' : 'white' , color :props.mode === 'dark' ? 'white' : '#042743'  } }></textarea>
      </div>

      <button type="button" className="btn btn-primary btn-sm my-1 " onClick={handleCopyToClipboard}>Copy to Clipboard</button>
      <button type="button" className="btn btn-primary btn-sm mx-2 my-1" onClick={()=>{setText('')}}>Clear Text</button>
      <button type="button" className="btn btn-success btn-sm mx-2 my-1" onClick={capitalizeFirstLetter}>Capitalize</button>
      <input
          type="text"
          placeholder="Find Frequency of a word"
          value={wordToCount}
          onChange={ handleFrequencySearch}
       />
      <button type="button" className="btn btn-primary btn-sm mx-2 my-1" onClick={()=>setWordToCount("")}>Clear</button>
    </div>

    <div className="container" style={{color :props.mode === 'dark' ? 'white' : 'black' } }>
      <h2>Text Summary</h2>
      <p>Reading time is {readTime} - minutes</p>
      <p>{wordCount} - words</p>
      <p>Frequency of "{wordToCount}": {wordToCount.length && wordFrequency }</p>
    </div> 

    </>
  )
}

