import './index.css'

const RepositoryItem = props => {
  const {respositoryDetails} = props
  const {
    avatarUrl,
    name,
    starsCount,
    forksCount,
    issuesCount,
  } = respositoryDetails

  return (
    <li className="repositoryListItem">
      <img src={avatarUrl} alt={name} className="avatarImage" />
      <h1 className="title">{name}</h1>
      <div className="featuresContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p className="features">{starsCount} stars</p>
      </div>
      <div className="featuresContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p className="features">{forksCount} forks</p>
      </div>
      <div className="featuresContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p className="features">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
