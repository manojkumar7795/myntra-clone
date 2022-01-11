import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const CarouselBase = () => {
    return (
        <Carousel>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src="images/scroll-image.jpg"
                    alt="First slide"
                />

            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src="images/1ffa7ce8-e9e7-4d91-a3b4-84c5c29ca3201634029679110-Mango_Desk_Banner.jpg"
                    alt="Second slide"
                />

            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src="images/8e72c835-de54-4ed9-bc0f-b4914a0d2e721634029406605-Sale-Ends-Midnight-DQ.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src="../images/51a00bce-4842-433c-a931-d3a2ecd28fb21634029631420-Men---s-Top-Wear_Desk--3-.jpg"
                    alt="for slide" />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src="images/430fbc0d-623f-4c54-84c8-bde6505331191633797988468-HU_DK.jpg"
                    alt="five slide" />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src="images/f587a7f7-5e0a-482b-993e-f2c43c3ee9a21633961802543-main-banner-1-dk.gif"
                    alt="six slide" />
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselBase
