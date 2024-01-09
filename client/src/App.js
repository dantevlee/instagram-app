import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import ImageCard from "./components/ImageCard";
import VideoCard from "./components/VideoCard";
import CarouselCard from "./components/CarouselCard";
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [carouselPosts, setCarouselPosts] = useState([]);

  useEffect(() => {
    try {
      axios.get(`https://ig-rest.onrender.com/api/user/posts`).then((res) => {
        setPosts(res.data.data);
      });
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }

  }, []);

  useEffect(() => {
    posts.forEach((p) => {
      if (p.media_type === 'CAROUSEL_ALBUM') {
        try {
          axios.get(`https://ig-rest.onrender.com/api/carousel/posts?id=${p.id}`).then((res) => {
            setCarouselPosts(res.data.data)
          })
        } catch(error){
          console.error("Error fecthing carousel posts: ", error)
        }
      }
    })
  }, [posts])

  const handleFilter = (mediaType) => {
    const filtered = posts.filter((post) => post.media_type === mediaType);
    setFilteredPosts(filtered);
    setFilter(mediaType);
  };

  return (
    <Fragment>
      <h3>Instagram Profile Showcase</h3>
      <h5>Filter Profile Content:</h5>
      <Container>
        <ButtonGroup>
          <Button
            onClick={() => handleFilter("IMAGE")}
            active={filter === "IMAGE"}
            className="mx-2"
          >
            Images
          </Button>
          <Button
            onClick={() => handleFilter("CAROUSEL_ALBUM")}
            active={filter === "CAROUSEL_ALBUM"}
            className="mx-2"
          >
            Carousels
          </Button>
          <Button
            onClick={() => handleFilter("VIDEO")}
            active={filter === "VIDEO"}
            className="mx-2"
          >
            Videos
          </Button>
        </ButtonGroup>
        <Row>
          {filteredPosts.map((post) => (
            <Col key={post.id} md={4}>
              {post.media_type === "IMAGE" && <ImageCard post={post} />}
              {post.media_type === "CAROUSEL_ALBUM" && <CarouselCard post={carouselPosts} caption={post.caption} />}
              {post.media_type === "VIDEO" && <VideoCard post={post} />}
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
}
export default App;
