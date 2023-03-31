import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import JobItem from '../JobItem/index'

import './index.css'

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

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobDetails: [],
    apiStatus: apiStatusConstants.initial,
    searchInputValue: '',
    employmentCategoriesList: [],
    salaryRange: salaryRangesList[0].salaryRangeId,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInputValue, employmentCategoriesList, salaryRange} = this.state
    const categoriesString = employmentCategoriesList.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${categoriesString}&minimum_package=${salaryRange}&search=${searchInputValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      console.log('failed')
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <ul className="job-details-container">
        {jobDetails.map(eachJob => (
          <JobItem jobItemDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-view"
      />
      <h2 className="job-details-failure-view-heading">
        Oops! Something Went Wrong
      </h2>
      <p className="job-details-failure-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetailsSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, shortBio, name} = profileDetails
    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h3 className="profile-name-heading">{name}</h3>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsDetails()
  }

  onClickCheckbox = event => {
    if (event.target.checked) {
      this.setState(prevState => ({
        employmentCategoriesList: [
          ...prevState.employmentCategoriesList,
          event.target.value,
        ],
      }))
    } else {
      this.setState(
        prevState => ({
          employmentCategoriesList: [
            ...prevState.employmentCategoriesList.filter(
              eachValue => eachValue !== event.target.value,
            ),
          ],
        }),
        this.getJobsDetails,
      )
    }
  }

  onClickRadioBox = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsDetails)
    console.log(event.target.value)
  }

  renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileDetailsFailureView = () => (
    <div className="retry-button-container">
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSearchInputContainer = () => {
    const {searchInputValue} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInputValue}
          placeholder="Search"
          className="user-input"
          onChange={this.onChangeSearchInput}
        />
        <button
          className="search-icon-container"
          type="button"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderEmploymentTypesContainer = () => (
    <div className="employment-types-container">
      <h4>Type of Employment</h4>
      {employmentTypesList.map(eachEmploymentType => (
        <div
          className="input-container"
          key={eachEmploymentType.employmentTypeId}
        >
          <input
            type="checkbox"
            value={eachEmploymentType.employmentTypeId}
            className="input-checkbox"
            id={eachEmploymentType.employmentTypeId}
            onClick={this.onClickCheckbox}
          />
          <label htmlFor={eachEmploymentType.employmentTypeId}>
            {eachEmploymentType.label}
          </label>
        </div>
      ))}
    </div>
  )

  renderSalaryRangeContainer = () => (
    <div className="salary-range-container">
      <h4>Salary Range</h4>
      {salaryRangesList.map(eachSalaryRange => (
        <div className="input-container" key={eachSalaryRange.salaryRangeId}>
          <input
            type="radio"
            className="radio-button"
            name="salary-range"
            value={eachSalaryRange.salaryRangeId}
            id={eachSalaryRange.salaryRangeId}
            onClick={this.onClickRadioBox}
          />
          <label htmlFor={eachSalaryRange.salaryRangeId}>
            {eachSalaryRange.label}
          </label>
        </div>
      ))}
    </div>
  )

  render() {
    // const {employmentCategoriesList} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-container-main-section">
          <div className="profile-and-category-section">
            {this.renderSearchInputContainer()}
            {this.renderProfileDetails()}
            {this.renderEmploymentTypesContainer()}
            {this.renderSalaryRangeContainer()}
          </div>
          <div className="job-details-container">{this.renderJobDetails()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
