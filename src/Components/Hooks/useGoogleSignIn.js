import { useEffect, useState } from 'react';

export const useGoogleSignIn = (onSuccess) => {
  const [loaded, setLoaded] = useState(false);
  const client_id =  '347906447841-1cc48enl9m5ntpqbda5t75ai05subqod.apps.googleusercontent.com'

  useEffect(() => {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id:{client_id}, // Replace with your actual Google Client ID
        callback: onSuccess,
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );
      setLoaded(true);
    }
  }, [onSuccess]);

  const signIn = () => {
    if (loaded) {
      google.accounts.id.prompt();
    }
  };

  return { signIn };
};
