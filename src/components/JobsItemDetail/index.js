import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

const JobsItemDetails = props => {
  const {jobDetailsData} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    packagePerAnnum,
    jobDescription,
    employmentType,
    id,
  } = jobDetailsData

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-detail-card">
        <div className="job-card">
          <div className="logo-job-title-container">
            <img src={companyLogoUrl} alt={title} className="company-logo" />
            <div className="job-title-container">
              <h1 className="title">{title}</h1>
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
              <p className="description">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line1" />
          <div>
            <h1 className="description">Description</h1>
            <p className="description-detail">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobsItemDetails
