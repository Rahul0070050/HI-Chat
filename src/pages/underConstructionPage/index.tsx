import React from 'react'
import { Typography } from '@mui/material';

import pageIsUnderConstruction from '../../images/page-is-under-construction.svg'

import './style.scss'

function PageNotFound() {
  return (
    <div className='page-not-found'>
      <img src={pageIsUnderConstruction} alt="" />
      <Typography>page is under construction</Typography>
    </div>
  )
}

export default PageNotFound;