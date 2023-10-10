import React from 'react'

function LowerHalf() {
  return (
    <div className="lower-half">
      <div className="login-box">
        Want to join? <span id="link" data-bs-toggle="modal" data-bs-target="#testModal">Log in</span> or <span id="link">sign up</span> in seconds. |
      </div>
      <div class="modal fade" id="testModal" tabindex="-1" aria-labelledby="testModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="testModalLabel">Login</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Login to your account now! NOW!
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LowerHalf
