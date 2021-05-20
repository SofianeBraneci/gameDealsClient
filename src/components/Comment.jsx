import React from "react";
import { Comment } from "semantic-ui-react";

const DealComment = ({ text, author, date }) => (
  <Comment.Group>
    <Comment>
      <Comment.Content>
        <Comment.Author>{author}</Comment.Author>
        <Comment.Metadata>
          <span>on {date}</span>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
      </Comment.Content>
    </Comment>
  </Comment.Group>
);
export default DealComment;
