import { Button } from "@mui/material"
import "./Login.css"

import { auth, provider } from '../../config/firebase'
import { signInWithPopup } from 'firebase/auth'

import { useStateValue } from '../../config/StateProvider'
import { actionTypes } from '../../config/reducer'

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      })
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div className='login'>
      <Button type='submit' onClick={signIn}>
        Sign In
      </Button>
      <div className='login__logo'>  
          {/* <img
            src="https://hindubabynames.info/wp-content/themes/hbn_download/download/social-media/whatsapp-logo.png"
            alt="Facbook Text Logo"
          /> */}
          <h3>ChatApp</h3>
      </div>
    </div>
  )
}

export default Login