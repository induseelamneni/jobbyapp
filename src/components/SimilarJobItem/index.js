import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

const SimilarJobItem = props => {
  const {similarJobData} = props
  const {
    id,
    companyLogoUrl,
    title,
    employmentType,
    jobDescription,
    location,

    rating,
  } = similarJobData

  return (
    <li key={id} className="similar-job-card">
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
      <div>
        <h1 className="description">Description</h1>
        <p className="description-detail">{jobDescription}</p>
      </div>
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
    </li>
  )
}

export default SimilarJobItem
