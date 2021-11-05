import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

const SimilarJobItem = props => {
  const {similarJobData} = props
  const {
    companyLogoUrlSimilar,
    id,
    titleSimilar,
    ratingSimilar,
    jobDescriptionSimilar,
    locationSimilar,
    employmentTypeSimilar,
  } = similarJobData

  return (
    <li key={id} className="similar-job-card">
      <div className="logo-job-title-container">
        <img
          src={companyLogoUrlSimilar}
          alt={titleSimilar}
          className="company-logo"
        />
        <div className="job-title-container">
          <p className="title">{titleSimilar}</p>
          <p className="title">
            <AiFillStar className="icon" />
            {ratingSimilar}
          </p>
        </div>
      </div>
      <div>
        <h1 className="description">Description</h1>
        <p className="description-detail">{jobDescriptionSimilar}</p>
      </div>
      <div className="location-type-container">
        <p className="location">
          <MdLocationOn className="location-icon" />
          {locationSimilar}
        </p>
        <p className="location">
          <MdBusinessCenter className="business-icon" />
          {employmentTypeSimilar}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobItem
