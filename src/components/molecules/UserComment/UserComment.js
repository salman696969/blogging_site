import React from 'react'

export default function UserComment({comment}) {
    console.log(comment)
  return (
    <div>{comment?.content}</div>
  )
}
