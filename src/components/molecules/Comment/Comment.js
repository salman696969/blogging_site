import React, { useContext } from 'react'
import Button from '../../atoms/Button/Button';
import AppContext from '../../../context/AppContext';
import AuthContext from '../../../context/AuthContext';

export default function Comment({blog}) {
    let contextData = useContext( AuthContext )
  return (
    <Button disabled={!contextData.loggedIn}>Comment</Button>
  )
}
