import { Card } from "react-bootstrap";

const ImageCard = ({ post }) => {
  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Img variant="top" src={post.media_url} />
      <Card.Body>
        <Card.Text>{post.caption}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
