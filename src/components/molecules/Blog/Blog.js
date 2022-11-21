import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import Button from '../../atoms/Button'
import Img from '../../atoms/Img/Img'
import LikeButton from '../../atoms/LikeButton/LikeButton'

export default function Blog({blog}) {
  let contextData = useContext( AuthContext )
  
  const updateLikes = async (updatedLikes) => {
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {   likes: updatedLikes }
      )
    })
    let data = await res.json();
    console.log(data)

  }

  let [isLiked, setIsLiked] = useState( blog.likes.filter( like => like == sessionStorage.getItem( "user-id" ) ).length ? true : false )
 
  const likeBlog = () =>{

    console.log("clicked")
    let arr
    if( isLiked ) {
      setIsLiked( false )
      arr = blog.likes.filter( like => { return like != sessionStorage.getItem( "user-id" ) }  )
    } else {
      setIsLiked( true )
      arr= blog.likes 
      arr.push( parseInt(sessionStorage.getItem("user-id"))) 
    }

    function removeDuplicates(arr) {  return [...new Set(arr)];    }
    
    updateLikes(removeDuplicates(arr)) 
  }
  
  return (
    <div className=' border my-4 border-black flex justify-between'>
        <div className='w-3/4 min-h-40 m-3'>
        <div>{blog.title}</div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} className="postDiv">
      </div>
       
        <div>{blog.date_created}</div>
        
        <div>
          {
            blog.category.map( cat => <span>{cat}</span> )
          }
        </div>
        <div className='flex gap-4'>
          <LikeButton liked={isLiked} onClickHandler={likeBlog} disabled={!contextData.loggedIn}>Like</LikeButton>
        <Button disabled={!contextData.loggedIn}>Comment</Button></div>
        </div>
        <div className='m-3'>

          <Img src={blog.blog_img} alt={blog.title}  width='200px'/>
        </div>
      
    </div>
  )
}
