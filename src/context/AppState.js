import AppContext from "./AppContext";
import React, { useState } from "react";

export default function AppState(props) {
  let [myBlogs, setMyBlogs] = useState(false);
  let [allBlog, setAllBlogs] = useState(true);
  let [liked, setLiked] = useState( false )
  let [blog, setBlog] = useState( {} )
  // let [blogDetails, setBlogDetails] = useState( {} )
//   let [user, setUser] = useState(true)
  return (
    <AppContext.Provider
      value={{ myBlogs, setMyBlogs,allBlog, setAllBlogs, liked, setLiked ,blog, setBlog}}
    >
      {props.children}
    </AppContext.Provider>
  );

}