import React from 'react';
import { Carousel, Card } from 'react-bootstrap';

const CarouselCard = ({ post, caption }) => {
  const carouselItems = post.map((p, index) => (
    <Carousel.Item key={index}>
      <img className="d-block w-100" src={p.media_url} />
    </Carousel.Item>
  ));

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Carousel>
        {carouselItems}
      </Carousel>
      <Card.Body>
        <Card.Text>{caption}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CarouselCard;
