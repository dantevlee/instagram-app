import { Card, Image } from "react-bootstrap";
import pic from "../assets/profilepic.JPG";

const VideoCard = ({ post }) => {
  return (
    <Card style={{ marginBottom: "20px", width: "315px" }}>
      <Card.Header>
        <Image
          src={pic}
          roundedCircle
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <span>{post.username}</span>
      </Card.Header>
      <video src={post.media_url} controls></video>
      <Card.Body>
        <Card.Text>{post.caption}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
