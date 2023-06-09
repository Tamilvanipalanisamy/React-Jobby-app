import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const apiStatusForProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusForJob = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkboxInput: [],
    radioInput: '',
    searchInput: '',
    apiStatusProfile: apiStatusForProfile.initial,
    apiStatusJob: apiStatusForJob.initial,
  }

  componentDidMount() {
    this.onGetProfileResponse()
    this.onGetJobsResponse()
  }

  onGetProfileResponse = async () => {
    this.setState({apiStatusProfile: apiStatusForProfile.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = [await response.json()]
      console.log(data)
      const updatedProfileData = data.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedProfileData,
        apiStatusProfile: apiStatusForProfile.success,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusForProfile.failure})
    }
  }

  onGetJobsResponse = async () => {
    const {checkboxInput, radioInput, searchInput} = this.state
    this.setState({apiStatusJob: apiStatusForJob.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${checkboxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedJobsData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        rating: eachItem.rating,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
      }))

      this.setState({
        apiStatusJob: apiStatusForJob.success,
        jobsData: updatedJobsData,
      })
    } else {
      this.setState({apiStatusJob: apiStatusForJob.failure})
    }
  }

  jobsSuccessView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    ) : (
      <ul className="jobs-list-container">
        {jobsData.map(eachItem => (
          <JobItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onClickRetryButton = () => {
    this.onGetJobsResponse()
  }

  jobFailureView = () => (
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

  renderJobsViews = () => {
    const {apiStatusJob} = this.state
    switch (apiStatusJob) {
      case apiStatusForJob.success:
        return this.jobsSuccessView()
      case apiStatusForJob.failure:
        return this.jobFailureView()
      case apiStatusForJob.inProgress:
        return this.LoaderView()
      default:
        return null
    }
  }

  profileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData[0]

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.onGetProfileResponse()
  }

  profileFailureView = () => (
    <button
      type="button"
      className="profile-retry"
      onClick={this.onClickRetryButton}
    >
      Retry
    </button>
  )

  LoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileViews = () => {
    const {apiStatusProfile} = this.state

    switch (apiStatusProfile) {
      case apiStatusForProfile.success:
        return this.profileSuccessView()
      case apiStatusForProfile.failure:
        return this.profileFailureView()
      case apiStatusForProfile.inProgress:
        return this.LoaderView()
      default:
        return null
    }
  }

  onChangeCheckboxInput = event => {
    const {checkboxInput} = this.state
    const inputNotInList = checkboxInput.filter(
      eachItem => eachItem === event.target.id,
    )

    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInput: [...prevState.checkboxInput, event.target.id],
        }),
        this.onGetJobsResponse,
      )
    } else {
      const filteredData = checkboxInput.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        prevState => ({checkboxInput: filteredData}),
        this.onGetJobsResponse,
      )
    }
  }

  onGetCheckboxView = () => {
    const {checkboxInput} = this.state
    return (
      <ul className="employment-list">
        {employmentTypesList.map(eachItem => (
          <li className="each-type" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              className="checkbox-input"
              value={checkboxInput}
              onChange={this.onChangeCheckboxInput}
            />
            <label htmlFor={eachItem.employmentTypeId} className="label-text">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  onChangeRadioButton = event => {
    this.setState({radioInput: event.target.id}, this.onGetJobsResponse)
  }

  onGetSalaryRange = () => {
    const {radioInput} = this.state

    return (
      <ul className="employment-list">
        {salaryRangesList.map(eachItem => (
          <li className="each-type" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              id={eachItem.salaryRangeId}
              className="checkbox-input"
              name="option"
              value={radioInput}
              onChange={this.onChangeRadioButton}
            />
            <label htmlFor={eachItem.salaryRangeId} className="label-text">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.onGetJobsResponse)
  }

  onClickSearchButton = () => {
    this.onGetJobsResponse()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="side-bar-container">
            <div>{this.renderProfileViews()}</div>
            <hr className="line" />
            <div className="employment-container">
              <h1 className="employment-text">Type of Employment</h1>
              {this.onGetCheckboxView()}
              <hr className="line" />
            </div>
            <div className="salary-range-container">
              <h1 className="employment-text">Salary Range</h1>
              {this.onGetSalaryRange()}
            </div>
          </div>

          <div className="search-jobs-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onClickSearchButton}
              >
                <BiSearchAlt2 className="search-icon" />
              </button>
            </div>
            {this.renderJobsViews()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
