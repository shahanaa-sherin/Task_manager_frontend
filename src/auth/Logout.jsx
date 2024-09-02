import { GoogleLogout } from "react-google-login"

const clientId = '347906447841-1cc48enl9m5ntpqbda5t75ai05subqod.apps.googleusercontent.com'


function Logout() {

    const onSuccess = (res) => {    
       console.log("Logout Successful", res);
       
    }
  return (
    <div id="signOutButton">
<GoogleLogout 
clientId={clientId}
buttonText={"Logout"}
onLogoutSuccess={onSuccess}
/>
    </div>
  )
}

export default Logout