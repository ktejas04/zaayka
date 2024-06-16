import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = (token, redirectURL = "/", delay = 1000) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (!token) {
      // Token not available, show error message
      setShowMessage(true);

      //start the delay function. after delay=1000ms, set showMessage false and show animation
      timer = setTimeout(() => {
        setShowMessage(false);
        setShowSpinner(true);

        //after 1200ms, navigate to redirectURL
        setTimeout(() => {
          setShowSpinner(false);
          navigate(redirectURL);
        }, 1200);
      }, delay);
    }
    else {
      setShowMessage(false);
      setShowSpinner(false);
    }

    return () => clearTimeout(timer);
  }, [token, navigate, redirectURL, delay]);

  return { showMessage, showSpinner };
};

export default useAuthRedirect;
