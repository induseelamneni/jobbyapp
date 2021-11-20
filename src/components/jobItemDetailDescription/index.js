import './index.css'
import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import {RiShareBoxLine} from 'react-icons/ri'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Headers from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const jobStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class jobItemDetailDescription extends Component {
  state = {
    jobDetailsStatus: jobStatusConstants.initial,
    jobDetailsArray: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetailsInformation()
  }

  getFormattedData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    title: data.title,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,

    skills: data.skills.map(each => ({
      url: each.image_url,
      name: each.name,
    })),

    lifeAtCompanyDescription: data.life_at_company.description,
    lifeAtCompanyUrl: data.life_at_company.image_url,
  })

  getJobItemDetailsInformation = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      jobDetailsStatus: jobStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const jobData = await response.json()
      console.log(jobData)
      const updatedJobData = this.getFormattedData(jobData.job_details)
      console.log(updatedJobData)
      const similarJobArray = jobData.similar_jobs.map(data => ({
        id: data.id,
        companyLogoUrl: data.company_logo_url,
        title: data.title,
        employmentType: data.employment_type,
        jobDescription: data.job_description,
        location: data.location,

        rating: data.rating,
      }))

      this.setState({
        jobDetailsStatus: jobStatusConstants.success,
        jobDetailsArray: updatedJobData,
        similarJobs: similarJobArray,
      })
    }

    if (response.status === 404) {
      this.setState({
        jobDetailsStatus: jobStatusConstants.failure,
      })
    }
  }

  renderSuccessCard = () => {
    const {jobDetailsArray, similarJobs} = this.state
    console.log(jobDetailsArray)

    const {
      companyLogoUrl,
      title,
      rating,
      location,
      packagePerAnnum,
      jobDescription,
      employmentType,
      skills,

      lifeAtCompanyDescription,
      lifeAtCompanyUrl,
    } = jobDetailsArray
    console.log(lifeAtCompanyDescription)

    return (
      <>
        <div className="job-detail-description-card">
          <div className="logo-job-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-title-container">
              <p className="title">{title}</p>
              <p className="title">
                <AiFillStar className="icon" />
                {rating}
              </p>
            </div>
          </div>
          <div className="location-salary-type-container">
            <div className="location-type-container">
              <p className="location">
                <MdLocationOn className="location-icon" />
                {location}
              </p>
              <p className="location">
                <MdBusinessCenter className="business-icon" />
                {employmentType}
              </p>
            </div>
            <div>
              <h1 className="description">{packagePerAnnum}</h1>
            </div>
          </div>
          <hr className="line1" />
          <div>
            <div className="description-share-container">
              <h1 className="description">Description</h1>
              <a href="company_website_url">
                <button type="button" className="share-btn">
                  Visit <RiShareBoxLine />
                </button>
              </a>
            </div>
            <p className="description-detail">{jobDescription}</p>
            <div>
              <h1 className="description">Skills</h1>
              <ul className="skill-list">
                {skills.map(skill => (
                  <li className="skill-data">
                    <img
                      src={skill.url}
                      alt={skill.name}
                      className="skill-img"
                    />
                    <p className="skill-name">{skill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="description">Life at Company</p>
              <div className="life-at-company-container">
                <div className="life-at-company-description">
                  <h1 className="description-detail">
                    {lifeAtCompanyDescription}
                  </h1>
                </div>
                <div>
                  <img
                    src={lifeAtCompanyUrl}
                    alt="life at company"
                    className="life-at-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="description">Similar Jobs</h1>
          <ul className="similar-job-ul">
            {similarJobs.map(each => (
              <SimilarJobItem similarJobData={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onRetry = () => {
    this.getJobItemDetailsInformation()
  }

  renderFailureCard = () => (
    <div className="failure-card-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  loaderView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderEachJobCard = () => {
    const {jobDetailsStatus} = this.state

    switch (jobDetailsStatus) {
      case jobStatusConstants.success:
        return this.renderSuccessCard()

      case jobStatusConstants.failure:
        return this.renderFailureCard()

      case jobStatusConstants.inProgress:
        return this.loaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Headers />
        <div className="job-detail-description-bg">
          {this.renderEachJobCard()}
        </div>
      </>
    )
  }
}

export default jobItemDetailDescription
