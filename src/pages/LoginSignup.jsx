import {useState, useCallback}from 'react'

const LoginSignup = ({ setUser }) => {

  const [signupData, setSignupData] = useState({ userName: '', email: '', phone: '' });

  const handleSignupChange = useCallback((e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

 const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Creating account with:', signupData);
    setUser(signupData.userName); // Store username for navbar
    alert('Account created successfully!');
  };

  const LoginHeader = ({title, image_url}) => {
    return (
      <header className='login-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image_url})`}}>
        <h1>{title}</h1>
      </header>
    )
  }

  const LoginSection = () => {
    return (
      <div className='login-section'>
        <h2 className="subheading">Login Here</h2>
        <form action="">

          <div className="form-group">
            <label htmlFor="">Full Name:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="">Email Address:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="">Phone Number: (Optional)</label>
            <input type="text" />
          </div>

          <button>Log In</button>

        </form>

      </div>
    )
  }

   const SignupSection = () => {
    return (
      <div className='signup-section'>
        <h2 className='subheading'>Sign Up Here</h2>
        <form onSubmit={handleSignupSubmit}>
          <div className='form-group'>
            <label>Username:</label>
            <input type='text' name='userName' value={signupData.userName} onChange={handleSignupChange} required />
          </div>

          <div className='form-group'>
            <label>Email Address:</label>
            <input type='email' name='email' value={signupData.email} onChange={handleSignupChange} required />
          </div>

          <div className='form-group'>
            <label>Phone Number: (Optional)</label>
            <input type='text' name='phone' value={signupData.phone} onChange={handleSignupChange} />
          </div>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    );
  };

  return (
    <div className='login-page'>
      <LoginHeader title={'Log In / Sign Up'} image_url={'/bg-images/home-bg.webp'}/>
      <div className='login-signup-grid'>
      <LoginSection/>
      <SignupSection/>
      </div>
    </div>
  )
}

export default LoginSignup
