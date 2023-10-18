import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";

function UserProfilePassword(userId) {
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border p-4">
              {" "}
              <h1 className="mb-4">Update Password</h1>
              <Formik>
                <Form>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      old password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="your old password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      new password
                    </label>
                    <Field
                      type="password"
                      name="newPassword"
                      className="form-control"
                      id="newPassword"
                      placeholder="your new password"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      confirm password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="your new password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Update Password
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

export default UserProfilePassword;
