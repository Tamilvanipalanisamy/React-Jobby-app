import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {HiMail} from 'react-icons/hi'
import {RiShareBoxFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusForJobDetails = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    apiStatus: apiStatusForJobDetails.initial,
  }

  componentDidMount() {
    this.getJobItemDetailsResponse()
  }

  getJobItemDetailsResponse = async () => {
    this.setState({apiStatus: apiStatusForJobDetails.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      const updatedJobDetails = [data.job_details].map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        rating: eachItem.rating,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        jobDescription: eachItem.job_description,
        skills: eachItem.skills.map(eachSkills => ({
          name: eachSkills.name,
          imageUrl: eachSkills.image_url,
        })),
        employmentType: eachItem.employment_type,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        companyLogoUrl: eachItem.company_logo_url,
        rating: eachItem.rating,
        location: eachItem.location,
        jobDescription: eachItem.job_description,
        employmentType: eachItem.employment_type,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusForJobDetails.success,
      })
    } else {
      this.setState({apiStatus: apiStatusForJobDetails.failure})
    }
  }

  JobItemDetailsSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      skills,
      lifeAtCompany,
      jobDescription,
    } = jobDetails[0]
    return (
      <div className="jobDetails-bg-container">
        <div className="each-job">
          <div className="logo-title-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <p className="title">{title}</p>
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
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-text">
                Visit <RiShareBoxFill className="visit-icon" />
              </a>
            </div>
          </div>
          <p className="description">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skill-text">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachItem => (
                <li className="skill-item">
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skill-icon"
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="skill-text">Life at Company</h1>
            <div className="company-des-image-container">
              <p className="company-description">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="company-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-job-text">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobs.map(eachItem => (
              <SimilarJobs eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getJobItemDetailsResponse()
  }

  jobItemDetailsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  LoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusForJobDetails.success:
        return this.JobItemDetailsSuccessView()
      case apiStatusForJobDetails.failure:
        return this.jobItemDetailsFailureView()
      case apiStatusForJobDetails.inProgress:
        return this.LoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetailsView()}
      </>
    )
  }
}

export default JobItemDetails
