import React from 'react';
import { Link } from 'gatsby';
import Editor from '../components/editor';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

class ReadFilePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      content: ""
    }
  }

  _onChange = (e) => {
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.addEventListener("loadend", (e)=>{
      // console.log(e.target.result);
      let content = e.target.result;
      this.setState({content});
    },false)
    // reader.readAsText(file);
    reader.readAsBinaryString(file); //string
    // reader.readAsArrayBuffer(file); //object
  }

  render(){
    return(
      <div css={css`
        width: 100%;
        padding: 2%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
      `}>
        <Link to='/'>back to Home</Link>
        <div>
          <label htmlFor="foo">Select a markdown file</label>
          <input 
            type="file" 
            name="foo"
            onChange={this._onChange}/>
        </div>
        
        <div css={css`
          width: 100%;
          margin: 50px 0px;
          code {
            width: 50%;
          }
        `}>
          <p>Output the original markdown content as a simple string</p>
          <code>
            {this.state.content}
          </code>
        </div>

        <div>
          <Editor 
            mdString = {this.state.content}
          />
        </div>
      </div>
    )
  }
}
export default ReadFilePage;