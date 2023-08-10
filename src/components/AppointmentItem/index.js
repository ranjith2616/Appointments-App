import './index.css'

const AppointmentItem = props => {
  const {list, updateStartButton} = props
  const {text, dateFormat, id, isFavorite} = list

  const updateStar = () => {
    updateStartButton(id)
  }

  const starImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointmentItem-card">
      <div className="text-img">
        <p className="appointment-text">{text}</p>
        <button
          type="button"
          data-testid="star"
          className="starButton"
          onClick={updateStar}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>

      <p className="date-text"> {dateFormat}</p>
    </li>
  )
}

export default AppointmentItem
