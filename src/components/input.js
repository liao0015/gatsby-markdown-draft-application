import React from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';


class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.onChange = (evt) => this.setState({value: evt.target.value});
  }
  render() {
    return <input value={this.state.value} onChange={this.onChange} />;
  }
}

export default MyInput;