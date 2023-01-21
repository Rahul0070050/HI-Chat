import React, { MouseEvent } from 'react'
import { Paper, Typography } from '@mui/material'

import './style.scss'
import { AltRoute } from '@mui/icons-material'
function ChatListItem() {
  function openChatWindowHandler(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    alert('open chat')
  }

  function showUserProfileHandler(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    alert('profile')
    e.stopPropagation()
  }
  return (
    <Paper className='chat-list-item' onClick={(e) => openChatWindowHandler(e)}>
      <div className="image" onClick={(e) => showUserProfileHandler(e)}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACOCAMAAADQI8A6AAAAMFBMVEXk5ueutLfo6uu5vsGrsbTc3+C9wsXX2tvBxsjU19mxt7rKztDh4+TQ09XHy821u749Y1AiAAADHklEQVR4nO2a27KDMAhFlcTEaNT//9sTa+3l1BpAwT5kP3Q604eugZ0bUFVFRUVFRUVFRUVFRUVFRUWHBFcDrAKA2Hjv4/ztapbo28muMr2/MkzgXWdt/ZS1U9tcBARD94ryIHL+AiDw0wbMDah26hGC8QvMAjTo8jRbeXoFahVhIEeTeCY9HJ+DmdVFnYSBR8DM8YkqOA2KRitfsUPiJD/LpwtajHHuPOLrHQY8TeKRtg8QYBKOE6bZ24y3eLwoDnZVPWQk3UMNjnR4qDSi7qEtqzuP4OJyZJra9mLuiXQaSTOjTvIPSWWLcj68KEjhTBwa2wvhsKwjt9TJW/KiScjLuFvgp2RoqsCjsTI0nD254FyF81ve+TEr/9q+g39hvclJHeksHDsK0QDj9iX49mOu9EaGJnmZg9NJ0VQV48IjWDegP7NkH1qRjiNZ5AFDDo7cu6ZivCWsbIWHGB7Z4FRAXOvS5UraW8uKtycorxsrdno+REmXRiUXeiyPVWncYO1jg1LbBsUjX1ReBS7PoxabCuEf26l2INMjZw/ITsrtR9gxkK1lj4ZtIG/sFpGtnVJj7R8PBPcBZOvLGulzynrT1Y8pg3py4dppDIDoQ9861459aOL1UxhvupBj/ogh9GOKzawUnyE0C6IySkpRylC3emZx8WqgNqVNDQlSSNpu/vev+076pTODgpMAmtHskLxBTW2QBJpZcCjPMDkvtCcCDGb3oPoWo1FgK4I40llWorM36gMwN6DanVpV6Y/AnB2h/bsNmqg/w9RQmTNgZp7p+A2RW2rfBmqPvpERl3QKT3fEQYgZLzIQ/94K4WyY+sDMHP71S+Ph1RE4dUkcj/md2Nx46L1jQZo5PsR8ibj4hYfoZ2brCs9DW++8zhWFh1CMZ85+kITvnAgbZxFh+2FNopCFTJfY/vdP2JatDg2yeKjh40WosnMjvshXWcQY1qnXv4wQZwWoBQc14sjqBnNxxlx4RE/yD+VvPqxJArZy2Yo6O/Jd2YNU0zqIewZvrJSNkxlB0HVy9pYK/WQ0lb1lgK4yNEVFRUVFRb+qP9uTJh9dJFlVAAAAAElFTkSuQmCC" alt="" />
      </div>
      <div className="text">
        <Typography sx={{}}>name</Typography>
        <Typography sx={{ opacity: '0.7' }}>me: hi</Typography>
      </div>
    </Paper>
  )
}

export default ChatListItem