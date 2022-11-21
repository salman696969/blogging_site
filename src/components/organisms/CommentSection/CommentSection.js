import React, { useEffect, useState } from 'react'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input/Input'
import UserComment from '../../molecules/UserComment/UserComment'
import {useParams} from 'react-router-dom';

export default function CommentSection({comments}) {
    console.log(comments)
    let {id} = useParams()
    let [displayComments, setDisplayComments] = useState([])
    useEffect(()=>{
        setDisplayComments(comments)
    },[comments])
    const postComment = async(commentArray) => {
        console.log( )
        let res = await fetch(`http://localhost:3000/blog_details/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {   comments: commentArray }
        )
        })
        let data = await res.json();
        console.log(data)
        setDisplayComments(data.comments)
    }

    let [comment, setComment] = useState("")
    
    let commentArray = comments
    // setNewComments(comments)
    const addComment = () => {
        let newComment = {
            userId : parseInt(sessionStorage.getItem("user-id")),
            content : comment,
            date_posted : new Date()
        }
        commentArray.push( newComment )
        console.log( commentArray )
        postComment(commentArray)
    }


  return (
    <div>
        <div className='flex items-center'>
            <textarea className='border m-2 border-black' onChange={(e)=>{setComment(e.target.value)}}/>
            <div>
                <Button onClickHandler={addComment}>Post</Button>
            </div>
            
        </div>
        {
            displayComments?.map( comment => {
                return (
                    <UserComment comment={comment}/>
                )
            } )
        }
    </div>
  )
}
