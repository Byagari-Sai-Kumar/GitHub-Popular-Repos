import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickActiveLangueButton, isActive} = props
  const {id, language} = languageDetails

  const highLight = isActive ? 'buttonHighlight' : ''

  const onClickLanguageButton = () => {
    onClickActiveLangueButton(id)
  }

  return (
    <li className="languageFilterList">
      <button
        type="button"
        className={`languageFilterButton ${highLight}`}
        onClick={onClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
