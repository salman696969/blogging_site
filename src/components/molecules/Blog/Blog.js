import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import Button from '../../atoms/Button'
import Img from '../../atoms/Img/Img'
import LikeButton from '../../atoms/LikeButton/LikeButton'
import {Link, useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {getAllBlogs} from '../../../redux/actions/blogs.action';
import Like from '../Like/Like'

export default function Blog({blog}) {
  let contextData = useContext( AuthContext )
  let {id}=useParams()
  let dispatch=useDispatch()
  console.log(id)
  let userId=parseInt(sessionStorage.getItem("user-id"))
  
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
  let arr
  let [isLiked, setIsLiked] = useState( blog.likes.filter( like => like == sessionStorage.getItem( "user-id" ) ).length ? true : false )
 
  const deleteBlog=async()=>{
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
     
    })
    let data = await res.json();
    console.log(data)


    let res1 = await fetch(`http://localhost:3000/blog_details/${blog.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
     
    })
    let data1 = await res1.json();
    console.log(data1)

    dispatch(getAllBlogs("allBlogs",userId))
    dispatch(getAllBlogs("myBlogs",userId))


  }

  const likeBlog = () =>{

    console.log("clicked")
   
    if( isLiked ) {
      setIsLiked( false )
      arr = blog.likes.filter( like => { return like != sessionStorage.getItem( "user-id" ) }  )
    } else {
      setIsLiked( true )
      arr= blog.likes 
      arr.push( parseInt(sessionStorage.getItem("user-id"))) 
    }

    function removeDuplicates(arr) {  return [...new Set(arr)];    }
    // function removeDuplicates(blog.likes) {  return [...new Set(blog.likes)];    }
    blog.likes=removeDuplicates(arr)
    updateLikes(removeDuplicates(arr)) 
  }
  // function removeDuplicates(blog.likes) {  return [...new Set(arr)];    }
  console.log(blog.likes)
  
  return (
    
    <div className=' border my-4 border-black flex justify-between'>
        <div className='w-3/4 min-h-40 m-3'>
        <Link to={"/blog/"+blog.id}>
        <div>{blog.title}</div>
        </Link>
        <div>{blog.id}</div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} className="postDiv">
      </div>
       
        <div>{blog.date_created}</div>
        
        <div>
          {
            blog.category.map( cat => <span>{cat}</span> )
          }
        </div>
    
        <div className='flex gap-4'>
          {/* <LikeButton liked={isLiked} onClickHandler={likeBlog} disabled={!contextData.loggedIn}>Like</LikeButton> */}
          <Like blog={blog}></Like>
        <Button disabled={!contextData.loggedIn}>Comment</Button>

        {id==="myBlogs"?<Button onClickHandler={deleteBlog} disabled={!contextData.loggedIn}>delete</Button>:""}
        </div>
        </div>
        <div className='m-3'>

          <Img src={blog.blog_img} alt={blog.title}  width='200px'/>
        </div>
      
    </div>

  )
}