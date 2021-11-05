import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {v4 as uuidv4} from 'uuid'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
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
    jobDetails: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetailsInformation()
  }

  getJobItemDetailsInformation = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

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
      const eachData = jobData.job_details
      const skillDataUpdate = jobData.job_details.skills

      const updatedJobData = {
        id: eachData.id,
        companyLogoUrl: eachData.company_logo_url,
        title: eachData.title,
        employmentType: eachData.employment_type,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        lifeAtCompany: eachData.life_at_company,
        skill: skillDataUpdate.map(eachSkill => ({
          name: eachSkill.name,
          url: eachSkill.image_url,
        })),
      }

      const similarJobArray = jobData.similar_jobs

      const updatedSimilarJobs = similarJobArray.map(each => ({
        id: each.id,
        companyLogoUrlSimilar: each.company_logo_url,
        employmentTypeSimilar: each.employment_type,
        jobDescriptionSimilar: each.job_description,
        locationSimilar: each.location,
        ratingSimilar: each.rating,
        titleSimilar: each.title,
      }))

      this.setState({
        jobDetailsStatus: jobStatusConstants.success,
        jobDetails: updatedJobData,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({jobDetailsStatus: jobStatusConstants.failure})
    }
  }

  render() {
    const {jobDetails, similarJobs} = this.state

    const {
      companyLogoUrl,
      title,
      rating,
      location,
      packagePerAnnum,
      jobDescription,
      employmentType,
      skill,
    } = jobDetails

    console.log(skill)

    return (
      <>
        <Headers />
        <div className="job-detail-description-bg">
          <div className="job-detail-description-card">
            <div className="logo-job-title-container">
              <img src={companyLogoUrl} alt={title} className="company-logo" />
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
                <button type="button" className="share-btn">
                  Visit <RiShareBoxLine />
                </button>
              </div>
              <p className="description-detail">{jobDescription}</p>
              <div>
                <h1 className="description">Skills</h1>
              </div>
              <ul>
                {skill.map(each => (
                  <li>{each.name}</li>
                ))}
              </ul>
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
        </div>
      </>
    )
  }
}

export default jobItemDetailDescription
