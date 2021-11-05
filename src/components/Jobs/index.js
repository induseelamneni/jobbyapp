import './index.css'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import JobDetails from '../JobDetails'

import JobsItemDetails from '../JobsItemDetail'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const profileStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileInformation: [],
    profileDataFetchStatus: profileStatusConstants.initial,
    jobDetailsStatus: apiStatusConstants.initial,
    jobDetails: [],
    searchInput: '',
    employment: '',
    salary: '',
    isChecked: false,
  }

  componentDidMount() {
    this.getProfileInformation()
    this.getJobDetailsInformation()
  }

  getProfileInformation = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const profileData = await response.json()

      const profileDetails = profileData.profile_details
      const updatedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileInformation: updatedProfileData,
        profileDataFetchStatus: profileStatusConstants.success,
      })
    } else {
      this.setState({profileDataFetchStatus: profileStatusConstants.failure})
    }
  }

  successProfileInformation = () => {
    const {profileInformation} = this.state

    return (
      <div className="profile-container">
        <div className="profile-job-details-container">
          <img
            src={profileInformation.profileImageUrl}
            alt={profileInformation.name}
            className="profile-pic"
          />
          <h1 className="person-name">{profileInformation.name}</h1>
          <p className="person-job-description">
            {profileInformation.shortBio}
          </p>
        </div>
      </div>
    )
  }

  retryProfileInformation = () => (
    <div className="profile-container-retry-data">
      <button type="button">Retry</button>
    </div>
  )

  getJobDetailsInformation = async () => {
    const {searchInput, employment, salary} = this.state
    console.log(searchInput)
    console.log(employment)
    console.log(salary)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const jobData = await response.json()

      const updatedJobData = jobData.jobs.map(eachData => ({
        id: eachData.id,
        companyLogoUrl: eachData.company_logo_url,
        title: eachData.title,
        employmentType: eachData.employment_type,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
      }))

      this.setState({
        jobDetailsStatus: apiStatusConstants.success,
        jobDetails: updatedJobData,
      })
    } else {
      this.setState({jobDetailsStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessJobDetails = () => {
    const {jobDetails} = this.state

    return (
      <ul>
        {jobDetails.map(data => (
          <JobsItemDetails jobDetailsData={data} key={data.id} />
        ))}
      </ul>
    )
  }

  renderFailureJobDetails = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p> we cannot find the page you are looking for</p>
      <button className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingJobDetails = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileInformation = () => {
    const {profileDataFetchStatus} = this.state

    switch (profileDataFetchStatus) {
      case profileStatusConstants.success:
        return this.successProfileInformation()
      case profileStatusConstants.failure:
        return this.retryProfileInformation()

      default:
        return null
    }
  }

  renderJobDetails = () => {
    const {jobDetailsStatus} = this.state

    switch (jobDetailsStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingJobDetails()

      default:
        return null
    }
  }

  onClickCheckbox = event => {
    console.log(event.target.value)
    const {isChecked} = this.state
    this.setState({isChecked: !isChecked})
  }

  renderJobDetail = () => {
    const {isChecked} = this.state

    return (
      <>
        <div className="job-details-bg">
          <h1 className="types-of-employment">Types of Employment</h1>
          <ul className="checkbox-ul">
            {employmentTypesList.map(eachData => (
              <li key={eachData.employmentTypeId} className="checkbox-li">
                <input
                  type="checkbox"
                  id={eachData.employmentTypeId}
                  onChange={this.onClickCheckbox}
                  value={isChecked}
                />
                <label
                  htmlFor={eachData.employmentTypeId}
                  className="types-of-employment"
                >
                  {eachData.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="line-container">
          <hr className="line" />
        </div>
        <div className="job-details-bg">
          <h1 className="types-of-employment">Salary Ranges</h1>
          <ul className="checkbox-ul">
            {salaryRangesList.map(eachData => (
              <li key={eachData.employmentTypeId} className="checkbox-li">
                <input
                  type="radio"
                  id={eachData.employmentTypeId}
                  value={eachData.employmentTypeId}
                />
                <label
                  htmlFor={eachData.employmentTypeId}
                  className="types-of-employment"
                >
                  {eachData.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = event => {
    if (event.key === 'Enter') {
      this.getJobDetailsInformation()
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />

        <div className="job-container">
          <div className="profile-top-container">
            <div className="search-for-sm-devises-container">
              <input
                type="search"
                className="search-for-sm-devises"
                placeholder="Search Input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <BsSearch className="search-icon" onClick={this.onClickSearch} />
            </div>
            {this.renderProfileInformation()}
            <div className="line-container">
              <hr className="line" />
            </div>
            {this.renderJobDetail()}
          </div>

          <div>
            <div className="search-for-lg-devises-container">
              <input
                type="search"
                className="search-for-lg-devises"
                placeholder="Search Input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
                onKeyDown={this.onEnterSearchInput}
              />

              <BsSearch className="search-icon" onClick={this.onClickSearch} />
            </div>

            {this.renderJobDetails()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
