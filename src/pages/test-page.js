import React from 'react';
import {Editor, EditorState} from 'draft-js';

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  render(){
    return (
      <div>
        <div>
          This is a test page in React function component
        </div>
        <div style={styles.editor} onClick={this.focusEditor}>
          <Editor
            ref={this.setEditor}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

export default TestPage;