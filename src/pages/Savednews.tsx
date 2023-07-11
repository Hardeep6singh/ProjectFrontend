import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string,
  savedAt:string
};
const defaultImage = 'https://via.placeholder.com/718x376.94';
const Savednews: React.FC = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const token = localStorage.getItem('token');
  const [newsData, setNewsData] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchData();
    } else {
      navigate('/Login');
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://reactbackend-iaxc.onrender.com/api/auth/news', {
        headers: {
          Authorization: token
        }
      });
      setNewsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Container>
    {newsData?.map((article, index) => (
      <Row key={index} className="px-4 my-5">
        <Col sm={7}>
          <Image src={article.urlToImage || defaultImage} fluid rounded className="" />
        </Col>
        <Col sm={5}>
          <h2 className="font-weight-light">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h2>
          <p className="mt-4">{article.description}</p>
          <p>Saved At : <b>{article.savedAt}</b></p>
        </Col>
      </Row>
    ))}
  </Container>
  );
};

export default Savednews;
