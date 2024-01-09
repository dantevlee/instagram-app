import { Card } from "react-bootstrap";

const VideoCard = ({ post }) => {

  return (
    <Card style={{ marginBottom: "20px" }}>
      <video src={post.media_url} controls >
      </video>
    <Card.Body>
      <Card.Text>{post.caption}</Card.Text>
    </Card.Body>
  </Card>
  )
 
};

export default VideoCard;