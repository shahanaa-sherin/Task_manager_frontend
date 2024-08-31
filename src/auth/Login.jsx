/* eslint-disable react/no-unescaped-entities */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    }, 400);
  };

  return (
      <div className="max-h-screen mt-2 flex flex-col justify-center items-center bg-gray-100 overflow-hidden">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-3 text-center">
            <p>Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">
                Signup
              </a>
            </p>
            <button
              className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={() => console.log('Google Sign-In')}
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
  );
};

export default Login;
