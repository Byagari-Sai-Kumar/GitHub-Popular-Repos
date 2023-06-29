import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

// eslint-disable-next-line
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repository: [],
    apiStatus: apiStatusConstant.initial,
    activeLanguage: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositoryItem()
  }

  getRepositoryItem = async () => {
    const {activeLanguage} = this.state
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`,
    )
    const data = await response.json()
    const popularRepos = data.popular_repos

    if (response.ok === true) {
      const updatedData = popularRepos.map(eachItem => ({
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))

      this.setState({
        repository: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickActiveLangueButton = id => {
    this.setState({activeLanguage: id}, this.getRepositoryItem)
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {repository} = this.state
    return (
      <ul className="languagesUnorderedListContainer">
        {repository.map(eachItem => (
          <RepositoryItem respositoryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failureViewContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="failureMsg">Something Went Wrong</h1>
    </div>
  )

  renderCurrentView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguage} = this.state

    return (
      <div className="githubPopularReposBgContainer">
        <h1 className="popular">Popular</h1>
        <ul className="languageFilterUnorderedListContainer">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageDetails={eachItem}
              key={eachItem.id}
              onClickActiveLangueButton={this.onClickActiveLangueButton}
              isActive={eachItem.id === activeLanguage}
            />
          ))}
        </ul>
        {this.renderCurrentView()}
      </div>
    )
  }
}

export default GithubPopularRepos
