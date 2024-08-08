import { useState } from 'react';
import { Button, FormControl, FormLabel, Typography, OutlinedInput } from '@mui/material';
import './App.css';

function App() {
  const [formData, setFormData] = useState({});
  const [blueTokenData, setBlueTokenData] = useState([]);
  const [redTokenData, setRedTokenData] = useState([]);

  const handleFromInput = (e) => {
    setFormData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  const generateToken = (tokenCount, prefix, rowCount) => {
    let tokenOrder = [];
    let tokenPerRow = [];
    let count = 0;

    for (let index = 1; index <= Number(tokenCount); index++) {
      tokenPerRow.push(prefix + index);
      count++;
      if (count === Number(rowCount)) {
        tokenOrder.push(tokenPerRow);
        count = 0;
        tokenPerRow = [];
      }
    }
    if (tokenPerRow.length > 0) tokenOrder.push(tokenPerRow);
    return tokenOrder;
  }

  const handleFromSubmit = (e) => {
    e.preventDefault();
    if (formData.blueToken && formData.bluePrefix && formData.blueRow) {
      const data = generateToken(formData.blueToken, formData.bluePrefix, formData.blueRow);
      setBlueTokenData(data);
    }
    if (formData.redToken && formData.redPrefix && formData.redRow) {
      const data = generateToken(formData.redToken, formData.redPrefix, formData.redRow);
      setRedTokenData(data);
    }
  }

  const handleFromReset = () => {
    setFormData({});
    setBlueTokenData([]);
    setRedTokenData([]);
  }

  return (
    <div>
      <Typography align='center' variant='h4'>Token Generation Application</Typography>
      <div className='container'>
        <form onSubmit={handleFromSubmit} onReset={handleFromReset} autoComplete='off'>
          <FormControl className='row' sx={{ height: '4ch' }}>
            <FormLabel>Number of blue tokens</FormLabel>
            <OutlinedInput className='inputbox' name='blueToken' value={formData.blueToken || ''} onChange={handleFromInput} />
          </FormControl>
          <FormControl className='row' sx={{ height: '4ch' }}>
            <FormLabel>Prefix for blue tokens</FormLabel>
            <OutlinedInput className='inputbox' name='bluePrefix' value={formData.bluePrefix || ''} onChange={handleFromInput} />
          </FormControl>
          <FormControl className='row' sx={{ height: '4ch' }}>
            <FormLabel>Blue tokens per row</FormLabel>
            <OutlinedInput className='inputbox' name='blueRow' value={formData.blueRow || ''} onChange={handleFromInput} />
          </FormControl>
          <FormControl className='row' sx={{ height: '4ch' }}>
            <FormLabel>Number of red tokens</FormLabel>
            <OutlinedInput className='inputbox' name='redToken' value={formData.redToken || ''} onChange={handleFromInput} />
          </FormControl>
          <FormControl className='row' sx={{ height: '4ch' }}>
            <FormLabel>Prefix for red tokens</FormLabel>
            <OutlinedInput className='inputbox' name='redPrefix' value={formData.redPrefix || ''} onChange={handleFromInput} />
          </FormControl>
          <FormControl className='row' sx={{ height: '4ch' }}>
            <FormLabel>Red tokens per row</FormLabel>
            <OutlinedInput className='inputbox' name='redRow' value={formData.redRow || ''} onChange={handleFromInput} />
          </FormControl>
          <div className='row button-row'>
            <Button type='submit' variant="contained">Generate</Button>
            <Button type='reset' variant="contained">Clear</Button>
          </div>
        </form>
        <div className='token-container'>
          {blueTokenData.map(data =>
            <div className='token-row'>
              {data.map(data => <div className='token-content blue'>{data}</div>)}
            </div>
          )}
          {redTokenData.map(data =>
            <div className='token-row'>
              {data.map(data => <div className='token-content red'>{data}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;