import React from "react";
import Slider from "react-slick";
import {motion} from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
    {
        name: "Рижий бородатий чувак",
        rating: 5,
        comment: "🍕 Дуже смачна піца! Швидка доставка і привітний персонал.",
        img: "https://i.pinimg.com/564x/fa/8f/80/fa8f80b461c278398ca7c00d473d8bb2.jpg",
    },
    {
        name: "Володимир М.",
        rating: 4,
        comment: "🔥 Класна атмосфера, смачні страви. Рекомендую всім друзям! Але сайт треба допилити!",
        img: "https://avatars.githubusercontent.com/u/15687102?v=4",
    },
    {
        name: "Дональд Трамп",
        rating: 5,
        comment: "❤️ This is the best restaurant I have ever been to!",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/TrumpPortrait.jpg/250px-TrumpPortrait.jpg",
    },
    {
        name: "Стів Жобс",
        rating: 5,
        comment: "Я б продав Apple за цю піцу!",
        img: "https://www.meme-arsenal.com/memes/3fe6d35d80239450d9e27c27dd0ff014.jpg",
    },
    {
        name: "Хряк",
        rating: 5,
        comment: "Хрю хрю",
        img: "https://media.tenor.com/SkURCXApmE8AAAAe/porc-conversano.png",
    },
    {
        name: "Тарас О.",
        rating: 4,
        comment: "Норм, чому ні. Студентам зайде.",
        img: "/images/1.jpg",
    },
];

const settings = {
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    arrows: false,
    pauseOnHover: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                centerMode: false,
            },
        },
    ],
};

const ReviewsSlider = () => {
    return (
        <motion.div
            className="mt-5"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
        >
            <h2 className="mb-4 text-danger text-center">Відгуки покупців</h2>

            <div className="px-3">
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div key={index} className="px-2">
                            <div className="card review-slide h-100 shadow-sm text-center p-4 mx-auto"
                                 style={{maxWidth: 400}}>
                                <img
                                    src={review.img}
                                    alt={review.name}
                                    className="rounded-circle mx-auto mb-3"
                                    style={{width: "80px", height: "80px", objectFit: "cover"}}
                                />
                                <h5 className="card-title">{review.name}</h5>
                                <p className="text-warning mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <i
                                            key={i}
                                            className={`bi ${i < review.rating ? "bi-star-fill" : "bi-star"}`}
                                        />
                                    ))}
                                </p>
                                <p className="card-text">{review.comment}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </motion.div>
    );
};

export default ReviewsSlider;
