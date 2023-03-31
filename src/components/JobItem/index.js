import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {FaSuitcase} from 'react-icons/fa'

import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    employmentType,
    companyLogoUrl,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobItemDetails
  return (
    <li className="job-item-container">
      <Link className="link" to={`/jobs/${id}`}>
        <div className="job-item-header">
          <img src="company logo" alt="job item" className="job-item-image" />
          <div className="job-item-header-content">
            <h3>{title}</h3>
            <p className="rating-section">
              <AiFillStar className="star-icon" /> {rating}
            </p>
          </div>
        </div>
        <div className="salary-and-location-section">
          <p className="location-section">
            <MdLocationOn className="icon" />
            {location}
          </p>
          <p className="job-type-section">
            <FaSuitcase className="icon" />
            {employmentType}
          </p>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <div className="description-section">
          <h4 className="description-heading">Description</h4>
          <p className="description-paragraph">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
