import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReviewsSlider from "../../components/ReviewsSlider";

const HomePage = () => {
    return (
        <div className="container mt-5 text-center">

            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="display-4 mb-4 text-danger">
                    Ласкаво просимо до Старої Піцерії!
                </h1>
                <p className="lead mb-4">
                    Смачна їжа швидко і зручно. Обирайте свої улюблені страви та замовляйте онлайн.
                </p>
                <div className="d-flex justify-content-center gap-3 mb-5">
                    <Link to="/categories" className="btn btn-danger btn-lg">
                        Переглянути меню
                    </Link>
                    <Link to="/cart" className="btn btn-outline-danger btn-lg">
                        Перейти до кошика
                    </Link>
                </div>
            </motion.div>

            <motion.div
                className="row mb-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
            >
                <h2 className="mb-4 text-danger">Атмосфера нашої піцерії</h2>

                {[
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqPYqxUWOjIK_5Pdy6WhnTjYcByTqP1KrCSTqo_Z0EiiuH3aqBzUoFY1aZ2fLRyisjlV3B4guRVbXesaJ6GF9rMeYlCUfy9v5MQed4Hlbl5zxuoG6mWcjTfXOaocyK1-ZD8IrM=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqdsDdrerieMwDp23rFf_bUf5tCQxxiaSzkLLhIFh9kOynw09FY78Mcxns1BOpCWKU8h7owneItBOxwW2FivsqB37jZORU1umktNL5MJmjWc5x_53PNAaUrh9DdmnHEL01jHmUAaw=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqbrvWs69QmppMhnxwvAl19dzyHriWVU-iOYabVSf1CY2w0xPAgP4yG3j99dkKay4KUFJ_lnVGCsoJryW0c9By0i9TS6fnUx9VDu-wOsP562RsEIEbF44SidqKzi87TBo1GoIjRUw=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npQ6EXIy_97bQE8bDUC0O9PI7D7MKbOzhTV0IwCiiDMtN2iwYeSdJHdPreSZwt04Aw4PCiQ4DXcPsLVhC-AoMW_UvwdSXTZl_jt9q0A2AdlXVmZAsfZfXSaiYVnExb167mE9fWi=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nptWJZwJE_Eb0mO59LYkkEflzgHrO5mVKi_K1SB3YnbeP0LtYkc485XV94pAFgCRuNR_LnqekWKgjyBJWBnv18hbZP9L05V2MhywEzDlgVoBeVQ55MxAdvar6YtKlGUDUrtFvGuqg=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr382GhdBxEwjaE8SOUqHhKbfzP3wYpnVfsvyswd138RAtJaDLVVfOdHUb7UeRU05Vi6oaG1Abc7SZVrhsXObKU2GEwe9vbPGqc2T1KK5m4WnYiJIM0Hc9aaL13aCrNTgggL8aL=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noEIoLzkU-XJ3-dlqWdrgrFSZrz6ZIuvnelNAFpOFl7wVgAdM3kwDVb6it7UyR4F4ZaZpk_m5WI8CfTFRgjzH15mS8j3gAW8_pQiSkVzyg4pdk7apzdOHYcxM7piWyadeK17kOYmA=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nobxPMbRGFoIwLB0XLi0UpyEGO7JGZIzXotGHErUxN6UyS7E3URFOkPXwlD9V8ebYu65sZCxnPyIF_BAhuqSSBmMTJoZ36Nn1bzTSYD304zBCjIgZ4DraHbOo1xuX6gTDmcu4tv=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq6BmTVxM-p68zBfUmbLgzwalnBcZbIVeT20Xpfjy2XFiHqhMCl2SiwJHtKIfHeZv1V-NJPa_CQUApgOIILpV0Csl_HCA3GCM0XSJe70FfewAnkgwyn0RL8bUeecqRVYtlDAuo-Aw=s1360-w1360-h1020-rw',
                    '/images/2.jpg',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq9ZiDgvDP-RgIRBq14VLrgi2SpmRPkJwee72UMC5XX8Q-8HIv_66pQijIIO8yeS5k46NBftdx3Xe7ixKMiiyEw-HmH-CxWi1V_g11ukAP-0O5SH1SbyGQ9C2UiV20mfH9rXOJoEA=s1360-w1360-h1020-rw',
                    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4notqcLxnAUAQo25AK1FXziiUFv_CPqUh9y__mUazN_ijqfEjBoAloTD8MSFPKlfhMpYSWOPZMdYtWxYaIAV_qJVycER9Z3pJOLuX55LV7FLlba9busrVHuGsthP8CS8B-1hJ6ym=s1360-w1360-h1020-rw'
                ].map((src, idx) => (
                    <div className="col-md-4 mb-4" key={idx}>
                        <div
                            style={{
                                height: '250px',
                                overflow: 'hidden',
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        >
                            <img
                                src={src}
                                alt={`Фото ${idx + 1}`}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            <ReviewsSlider />
        </div>
    );
};

export default HomePage;
