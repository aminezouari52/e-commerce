// HOOKS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// FUNCTIONS
import { getSubs } from "../functions/sub";

// COMPONENTS
import { Gallery } from "react-grid-gallery";

// STYLE
import { Box, Heading, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getSubs().then((c) => {
      setSubs(c.data);
      setLoading(false);
    });
    // populate images
    // subs.map(sub => {
    //   setImages(prevState => {
    //     return [...prevState, {

    //     }]
    //   })
    // })
  }, []);

  const customOverlay = (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="0"
      bottom="0"
      h="100%"
      w="100%"
      background="rgba(0, 0, 0, 0.4)"
    >
      <ArrowForwardIcon color="white" h="100px" w="100px" />
    </Flex>
  );

  const IMAGES = [
    {
      src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 630,
      thumbnailCaption: (
        <div onClick={() => navigate(`/category/slug`)}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              top: "0",
              cursor: "pointer",
            }}
          >
            Shoes
          </div>
        </div>
      ),
      customOverlay,
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1665664652418-91f260a84842?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 854,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              bottom: "0",
            }}
          >
            Jeans
          </div>
        </>
      ),
    },
    {
      src: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 200,
      height: 170,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              top: "0",
            }}
          >
            Suits
          </div>
        </>
      ),
    },
    {
      src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 534,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              top: "0",
            }}
          >
            Sneakers
          </div>
        </>
      ),
    },
    {
      src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 634,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              bottom: "0",
            }}
          >
            Laptops
          </div>
        </>
      ),
    },
    {
      src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 630,
      thumbnailCaption: (
        <div onClick={() => navigate(`/category/slug`)}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              top: "0",
              cursor: "pointer",
            }}
          >
            Shoes
          </div>
        </div>
      ),
      customOverlay,
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1665664652418-91f260a84842?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 854,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              bottom: "0",
            }}
          >
            Jeans
          </div>
        </>
      ),
    },
    {
      src: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 200,
      height: 170,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              top: "0",
            }}
          >
            Suits
          </div>
        </>
      ),
    },
    {
      src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 534,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              top: "0",
            }}
          >
            Sneakers
          </div>
        </>
      ),
    },
    {
      src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      width: 620,
      height: 634,
      customOverlay,
      thumbnailCaption: (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: "0.4",
              cursor: "pointer",
            }}
          ></div>
          <div
            style={{
              color: "#fff",
              padding: "10px",
              fontSize: "51px",
              position: "absolute",
              bottom: "0",
            }}
          >
            Laptops
          </div>
        </>
      ),
    },
  ];

  // add transition to the custom overlay
  document
    .querySelectorAll(".ReactGridGallery_custom-overlay")
    .forEach((el) => {
      el.style.transition = "all .2s ease";
    });

  return (
    <Box my={2}>
      <Heading
        fontSize="3xl"
        backgroundColor="gray.200"
        color="primary.500"
        my={4}
        py={6}
        textAlign="center"
        fontWeight="bold"
      >
        And our sub categories
      </Heading>
      <Gallery rowHeight={350} enableImageSelection={false} images={IMAGES} />
    </Box>
  );
};

export default SubList;
