import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import ImageCard from "./components/ImageCard";
import VideoCard from "./components/VideoCard";
import CarouselCard from "./components/CarouselCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

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

  const fetchCarouselData = async () => {
    let carouselArray = [];
    let promises = [];

    posts.forEach((p) => {
      if (p.media_type === "CAROUSEL_ALBUM") {
        const promise = axios.get(
          `https://ig-rest.onrender.com/api/carousel/posts?id=${p.id}`
        );

        promises.push(promise);

        promise.then((response) => {
          carouselArray.push(response.data.data);

          if (carouselArray.length === promises.length) {
            let mediaArray = [];
            for (const c of carouselArray) {
              for (const m of c) {
                mediaArray.push(m.media_url);
              }
            }
            setCarouselPosts(mediaArray);
          }
        }).catch((error) => {
          console.error("Error fetching carousel posts: ", error);
        });
      }
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching carousel posts in promise all: ", error);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, [posts]);

  const handleFilter = (mediaType) => {
    const filtered = posts.filter((post) => post.media_type === mediaType);
    setFilteredPosts(filtered);
    setFilter(mediaType);
  };

  return (
    <Fragment>
      <h1>Instagram Profile Showcase</h1>
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <h5>Filter Profile Content:</h5>
          </Col>
          <Col md={6}>
            <ButtonGroup className="btn-group">
              <Button
                onClick={() => handleFilter("IMAGE")}
                active={filter === "IMAGE"}
                className="mx-3"
                variant="dark"
              >
                Images
              </Button>
              <Button
                onClick={() => handleFilter("CAROUSEL_ALBUM")}
                active={filter === "CAROUSEL_ALBUM"}
                className="mx-3"
                variant="dark"
              >
                Carousels
              </Button>
              <Button
                onClick={() => handleFilter("VIDEO")}
                active={filter === "VIDEO"}
                className="mx-3"
                variant="dark"
              >
                Videos
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          {filteredPosts.map((post) => (
            <Col key={post.id} md={3}>
              {post.media_type === "IMAGE" && <ImageCard post={post} />}
              {post.media_type === "CAROUSEL_ALBUM" && (
                <CarouselCard post={carouselPosts} caption={post.caption} username={post.username} />
              )}
              {post.media_type === "VIDEO" && <VideoCard post={post} />}
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
