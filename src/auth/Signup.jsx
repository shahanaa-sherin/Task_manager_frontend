import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
const clientId = '347906447841-vkqr7ogvc61clidss6qo37bbvia2fcn9.apps.googleusercontent.com'
const Signup = () => {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("Signup Successful", res.profileObj);
    navigate('/dashboard'); // Redirect to dashboard after successful signup
  };

  const onFailure = (res) => {
    console.log("Signup Failed", res);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      navigate('/login');
    }, 400);
  };

  return (
    <div className="max-h-screen flex flex-col justify-center items-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md mx-2">
        <h2 className="text-2xl font-bold mb-3 text-center">Sign Up</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-2 text-center">
          <div id="google-signin-button" className="mt-2"></div>
        </div>
        <div className="mt-2 text-center">
          <p>Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
          <div className="mt-3">
           <GoogleLogin
           clientId={clientId}
           buttonText="Sign Up with Google"
           onSuccess={onSuccess}
           onFailure={onFailure}
           cookiePolicy={'single_host_origin'}
           isSignedIn={true}
           />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
