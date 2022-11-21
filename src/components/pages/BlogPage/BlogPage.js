import React, { useContext, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import AppContext from '../../../context/AppContext';
import Img from '../../atoms/Img/Img';
import Like from '../../molecules/Like/Like';

export default function BlogPage() {
    let {id}=useParams();
    let contextData=useContext(AppContext)
    let loaded=false
    
    const getData = async () => {
        let res = await fetch(`http://localhost:3000/blogs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
         
        })
    
        
       let blog = await res.json();
    // contextData.setBlog(blog)
        // console.log(data)
        // alert(data)
    
    
        let res1 = await fetch(`http://localhost:3000/blog_details/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        
        })
    
        
        let blogDetails = await res1.json();
        // await contextData.setBlogDetails(data1)
        let fullBlog=Object.assign(blog,blogDetails)
      contextData.setBlog(fullBlog)
        // console.log(data1)
        // alert(data1)
    
      }
      let a
      useEffect(() => {
        getData()
      console.log(contextData.blog)

      },[])
console.log(a)

      
  return (
    <div>
        <div>{contextData.blog.title}</div>
        <div>{contextData.blog.likes?.length}</div>
       {contextData.blog.likes? <Like blog={contextData.blog}></Like>:""}
        <Img src={contextData.blog.blog_img} />
        {/* <div>{contextData.blog.content}</div> */}
        <div dangerouslySetInnerHTML={{ __html: contextData.blog.content }}></div>
      
    </div>
  )
}
