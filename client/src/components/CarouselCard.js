import { Carousel, Card, Image } from "react-bootstrap";
import pic from "../assets/profilepic.JPG";
import { Fragment } from "react";

const CarouselCard = ({ post, caption, username }) => {
  return (
    <Fragment>
      <Card style={{ width: "300px" }}>
        <Card.Header>
          <Image
            src={pic}
            roundedCircle
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span>{username}</span>
        </Card.Header>
        <Carousel>
          {post.map((imageSrc, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={imageSrc} />
              <Card.Body>
                <Card.Text>{caption}</Card.Text>
              </Card.Body>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card>
    </Fragment>
  );
};

export default CarouselCard;
