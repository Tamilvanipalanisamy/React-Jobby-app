import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {IoMdMail} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <>
      <div className="mobile-header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
            onClick={onClickLogo}
          />
        </Link>
        <nav>
          <Link to="/">
            <AiFillHome className="header-icon" />
          </Link>
          <Link to="/jobs">
            <IoMdMail className="header-icon" />
          </Link>
          <FiLogOut className="header-icon" onClick={onClickLogoutButton} />
        </nav>
      </div>
      <div className="desktop-header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
          onClick={onClickLogo}
        />
        <nav>
          <ul className="header-list">
            <Link to="/">
              <li className="nav-text">Home</li>
            </Link>
            <Link to="/jobs">
              <li className="nav-text">Jobs</li>
            </Link>
          </ul>
        </nav>
        <li className="logout-list-btn">
          <button
            type="button"
            className="logout-btn"
            onClick={onClickLogoutButton}
          >
            Logout
          </button>
        </li>
      </div>
    </>
  )
}

export default withRouter(Header)
