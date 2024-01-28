import React, { useState, useEffect } from 'react';
import emptyTrashcan from '../images/empty-trashcan.png';
import crumpledPaper from '../images/crumpled-paper.png';

const TrashcanPage = () => {
  const [fillLevel, setFillLevel] = useState(0);
  useEffect(() =>{
    const intervalId = setInterval(fetchFillLevel, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchFillLevel = async () =>{
    try{
      const response = await fetch('https://wastemanagement-back.onrender.com/api/fillLevel/AB15620266');
      if (!response){
        throw new Error('failed to fetch fill level');
      }
      const data = await response.json();
      setFillLevel(data.fillLevel);
    }catch(error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Trashcan System</h1>
      <div style={{ position: 'relative', width: '200px', height: '300px', overflow: 'hidden' }}>
        <img src={emptyTrashcan} alt="Empty Trashcan" style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', zIndex: '1' }} />
        {Array.from({ length: fillLevel}).map((_, index) => (
          <img
            key={index}
            src={crumpledPaper}
            alt="Crumpled Paper"
            style={{
              position: 'absolute',
              width: '50%',
              height: 'auto',
              top: `${99 - (Math.floor(index / 3) + 1) * 20}%`,
              left: `${(index % 3) * 22}%`,
              transform: 'translate(7%, -50%)',
              opacity: 5,
              zIndex: '0',
            }}
          />
        ))}
      </div>      
    </div>
  );
};

export default TrashcanPage;
