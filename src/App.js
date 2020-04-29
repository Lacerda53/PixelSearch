import React, { useState, useEffect } from 'react';
import api from './services/api';
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import './App.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');

  async function loadImages() {
    setLoading(true);
    const response = await api.get(`search?query=${inputText}&per_page=25&page=${page}`);
    const result = await response.data;
    setImages(result.photos);
    setPage(1);
    setLoading(false);
  }

  async function loadMore() {
    setLoading(true);
    const response = await api.get(`search?query=${inputText}&per_page=15&page=${page}`);
    const result = await response.data;
    setImages([...images, ...result.photos]);
    setPage(page + 1);
    setLoading(false);
  }

  // useEffect(() => {
  //   loadImages();
  // }, []);

  return (
    <SimpleReactLightbox>
      <div>
        <div className="search">
          <input
            placeholder="Procure pela imagem que deseja..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? loadImages() : null}
            target="_black"
          >
            
          </input>
        </div>
        <div>
          <SRLWrapper>
            <div className="row">
              {images.map(item =>
                <div key={item.id} className="images" >
                  <a href={item.src.large2x}>
                    <img src={item.src.large2x} />
                  </a>
                </div>
              )}
            </div>
          </SRLWrapper>
        </div>
        {images.length !== 0 ?
        <div className="buttonDiv">
          <button className="button" onClick={() => loadMore()}>Carregar Mais</button>
        </div>
        :
        <h1>Image</h1>
        }
      </div>
    </SimpleReactLightbox>
  );
}
