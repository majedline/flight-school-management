import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import api from '../util/api'
import axios from 'axios';

const StandardImageList = () => {

  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(api.getFiles);
        setItemData(response.data.files);
      } catch (error) {
        console.error('Failed to fetch images:', error.message);
      }
    };

    fetchImages();
  }, []);


  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {(itemData != null) ? (
        <>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              {console.log(item)}
              <img
                src={`${item.data.data}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.data.data}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </>
      ) : (<></>)}

    </ImageList>
  );
}

export default StandardImageList;


