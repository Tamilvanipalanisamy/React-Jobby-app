import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {HiMail} from 'react-icons/hi'

import './index.css'

const JobItem = props => {
  const {eachItem} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
  } = eachItem

  return (
    <Link to={`jobs/${id}`} className="job-item-link">
      <li className="each-job" key={id}>
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="start-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-emp-type-container">
            <div className="location-container">
              <ImLocation className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="emp-type-container">
              <HiMail className="location-icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
