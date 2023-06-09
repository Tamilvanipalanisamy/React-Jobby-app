import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const clickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="bg-container">
        <h1 className="home-heading">Find the Job that Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-btn" onClick={clickFindJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
