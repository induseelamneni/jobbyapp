import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {HiHome} from 'react-icons/hi'
import {MdBusinessCenter} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <div className="display-lg">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <ul className="home-jobs-container">
          <Link to="/" className="nav-link">
            <li className="home">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="home">Jobs</li>
          </Link>
        </ul>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <div className="display-mobile">
        <div className="mobile-content">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-mobile"
            />
          </Link>

          <ul className="icon-container">
            <Link to="/" className="nav-link">
              <li>
                <HiHome className="home-icon" />
              </li>
            </Link>
            <Link to="/" className="nav-link">
              <li>
                <MdBusinessCenter className="home-icon" />
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <FiLogOut className="home-icon" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
