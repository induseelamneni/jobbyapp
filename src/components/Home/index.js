import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="find-job-heading">Find The Job That Fits your life</h1>
          <p className="job-description">
            Millions of Peoples Searching for Jobs, salary information, company
            reviews.Find the job that first your abilities and potentials.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-job-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
