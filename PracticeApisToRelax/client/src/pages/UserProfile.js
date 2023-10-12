import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";

function UserProfileComponent() {
  const initialValues = {
    email: "",
  };

  let navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
  });

  const userId = 4;
  const handleSubmit = (values) => {
    // Make an API call to update the email
    axios
      .patch(`http://localhost:8080/api/users/email/${userId}`, {
        email: values.email,
      })
      .then((response) => {
        console.log("Email updated:", values.email);
        navigate("/userpage");
        // Handle success (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Error updating email:", error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border p-4">
              {" "}
              {/* Added border and padding */}
              <h1 className="mb-4">Update Email</h1> {/* Added margin bottom */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      New Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="user@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Update Email
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileComponent;