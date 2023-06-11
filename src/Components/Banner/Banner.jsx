import Carousel from "react-bootstrap/Carousel";
import './Banner.css'
function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src="https://img.freepik.com/free-photo/medium-shot-woman-making-music_23-2149130767.jpg?w=1380&t=st=1686459699~exp=1686460299~hmac=c0c703331649fedc51e7e271c4771f8b98fc75cd1aa2cf91cc5ab42580f8b80c"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Wedding and Galals Event</h3>
          <p>If you want to become a great chef, you have to work with great chefs.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src="https://img.freepik.com/free-photo/group-students-playing-double-bass-drum-set-piano_107420-64786.jpg?w=1380&t=st=1686460196~exp=1686460796~hmac=0040d4bc7cd7d7e15daaf504416c97467fef40255603eb33d7d2fa2bbf7fa045"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Special Events </h3>
          <p>Being a chef would be too much hard work.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src="https://static.seibertron.com/images/toys/files/154/hasbro-cliffjumper-138.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Cooking Class</h3>
          <p>
            I always knew I wanted to be a chef.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
