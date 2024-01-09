import { Card, Image } from "react-bootstrap";
import pic from '../assets/profilepic.JPG'; 

const ImageCard = ({ post }) => {
  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Header>
        <Image
          src={pic}
          roundedCircle
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <span>{post.username}</span>
      </Card.Header>
      <Card.Img variant="top" src={post.media_url} />
      <Card.Body>
        <Card.Text>{post.caption}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
