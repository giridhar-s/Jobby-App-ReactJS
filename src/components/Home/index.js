import {withRouter} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-container-content">
          <h1 className="home-content-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-content-paragraph">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button
            type="button"
            className="find-jobs-button"
            onClick={onClickJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(Home)
