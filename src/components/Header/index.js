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
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="display-lg">
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
        <HiHome className="home-icon" />
        <MdBusinessCenter className="home-icon" />
        <button
          type="button"
          className="nav-mobile-btn"
          onClick={onClickLogout}
        >
          <FiLogOut className="home-icon" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
