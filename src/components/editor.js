import React from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';
import './editor.css';
import 'draft-js/dist/Draft.css';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
// import components
import InlineStyleControls from '../components/editor.inline';
import BlockStyleControls from '../components/editor.block';

class DraftEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={editorState: EditorState.createEmpty()};
    this.focus = () => this.refs.editor.focus();
    this.onChange=(editorState) => this.setState({editorState});
  }

  _handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      console.log('on tab');
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  componentDidUpdate(prevProps, prevState){
    console.log(prevProps);
    console.log(prevState);
    if(prevProps.mdString !== this.props.mdString){
      
      // ***
      // markdown string to draft raw
      var rawObject = markdownToDraft(this.props.mdString);
      console.log(rawObject);
      let editorState = EditorState.createWithContent(
        convertFromRaw(rawObject)
      );
      this.setState({editorState});
    }
  }

  render(){
    console.log(this.props);
    const {editorState} = this.state;
    // console.log(this.state);
    
    // ***
    // conver raw state into JS object
    let draftRaw = convertToRaw(this.state.editorState.getCurrentContent());
    // console.log(convertToRaw(this.state.editorState.getCurrentContent()));

    // ***
    // convert draft raw (JS object) into Markdown string
    let mdString = draftToMarkdown(draftRaw);
    // console.log(mdString);
    // save the content into a file or database

    // ***
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.

    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div css={css`
        width: 100%;
        padding: 1%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-around;
      `}>
        <div css={css`
          font-size: 1.2rem;
          font-weight: 600;
          padding: 50px 0px;
        `}>NorthOmics Text Editor</div>

        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this._toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this._toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this._handleKeyCommand}
              keyBindingFn={this._mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Start writing ..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}




export default DraftEditor;