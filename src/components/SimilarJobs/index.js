import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {HiMail} from 'react-icons/hi'

import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    title,
    companyLogoUrl,
    rating,
    location,
    jobDescription,
    employmentType,
  } = eachItem

  return (
    <li className="each-similar-job">
      <div className="logo-title-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
