import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryCodeContext from '../context/CountryCodeContext';


interface Article {
    source: {
      id: string,
      name: string
    },
    author?: string,
    title: string,
    description?: string,
    url: string,
    urlToImage?: string,
    publishedAt?: Date,
    content?: string
  }

const defaultImage = 'https://via.placeholder.com/718x376.94';

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);

  const apiKey = '68ed7f661295425eb0c50aa0d95473ba'; // Replace with your actual NewsAPI key

  const countryCodeContext = useContext(CountryCodeContext);

  useEffect(() => {
    if (countryCodeContext?.countryCode) 
    {
    fetch(`https://newsapi.org/v2/top-headlines?country=${countryCodeContext.countryCode}&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(data => setNewsData(data.articles))
      .catch(error => console.log(error));
    }
  },[countryCodeContext]);
console.log(countryCodeContext)
  const saveArticle = (article: Article) => {
    const currentDate = new Date();
    const articleWithDate = {
    ...article,
    savedAt: currentDate.toISOString()
  };
  console.log(articleWithDate);
    fetch('https://reactbackend-iaxc.onrender.com/api/auth/savenews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleWithDate),
    })
      .then(response => {
        if (response.ok) {
          alert('Article saved successfully');
        } else {
          alert('Already Added');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <>
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
              <Button variant="outline-primary" onClick={() => saveArticle(article)}>
                Save
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default News;
