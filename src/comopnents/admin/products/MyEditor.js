import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { ContentState } from 'draft-js';
import { convertFromHTML } from 'draft-js';

let description = {}
class MyEditor extends Component {
  constructor(props) {
    super(props)
  }


  state = {
    editorState: EditorState.createEmpty(),
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  render() {
    let { editorState } = this.state

    //initial data set 
    description.data = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    // db data set
    if (this.props.description && editorState.getCurrentContent().blockMap.size <= 1) {
      const blocksFromHTML = convertFromHTML(this.props.description);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      editorState = EditorState.createWithContent(content);
    }
    // Draft reset after data is updated 
    else if (!this.props.description) {
      editorState = EditorState.createEmpty()
    }
    return (
      <div className='descriptionContainer'>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}
export { MyEditor, description }
