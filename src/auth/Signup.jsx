import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // Define the validation schema using Yup
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

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      navigate('/login');
    }, 400);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
      callback: handleGoogleResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" }  // Customize button as needed
    );
  }, []);

  const handleGoogleResponse = (response) => {
    console.log("Google User Info:", response);
    // Handle user info (e.g., send it to your backend)
    navigate('/dashboard');  // Redirect after successful signup
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
          <p>Or</p>
          <div id="google-signin-button" className="mt-2"></div>
        </div>
        <div className="mt-2 text-center">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
