import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appText: '',
    dateData: '',
    list: [],
    isCliked: false,
  }

  addButton = event => {
    event.preventDefault()

    const {appText, dateData} = this.state

    const newDate = format(new Date(dateData), 'dd MMMM yyyy, EEEE')

    const newAppointments = {
      id: uuidv4(),
      text: appText,
      dateFormat: newDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      list: [...prevState.list, newAppointments],
      appText: '',
      dateData: '',
    }))
  }

  onAppointmentText = event => {
    this.setState({appText: event.target.value})
  }

  onDateData = event => {
    this.setState({dateData: event.target.value})
  }

  updateStartButton = id => {
    this.setState(prevState => ({
      list: prevState.list.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  filterStarButton = () => {
    this.setState(prevState => ({
      isCliked: !prevState.isCliked,
    }))
  }

  render() {
    const {list, appText, isCliked, dateData} = this.state

    const afterClickedStartButton = list.filter(
      each => each.isFavorite === true,
    )

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-card">
            <div>
              <form className="form-container" onSubmit={this.addButton}>
                <h1 className="heading"> Add Appointment</h1>
                <label htmlFor="text">TITLE</label>
                <input
                  type="text"
                  value={appText}
                  id="text"
                  placeholder="Title"
                  className="text-date"
                  onChange={this.onAppointmentText}
                />
                <label htmlFor="date"> DATE</label>
                <input
                  type="date"
                  id="date"
                  value={dateData}
                  className="text-date"
                  onChange={this.onDateData}
                />
                <button type="submit" className="add-button">
                  {' '}
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-img"
              />
            </div>
          </div>
          <hr className="underline" />

          <div className="bottom-card">
            <div className="bottom-heading-button-card">
              <h1 className="bottom-card-heading"> Appointments</h1>
              {isCliked === true && (
                <button
                  type="button"
                  className=" stared-btn isClikedStarBtn"
                  onClick={this.filterStarButton}
                >
                  {' '}
                  Starred
                </button>
              )}
              {isCliked === false && (
                <button
                  type="button"
                  className="stared-btn"
                  onClick={this.filterStarButton}
                >
                  {' '}
                  Starred
                </button>
              )}
            </div>
            <ul className="appointment-container">
              {isCliked === false &&
                list.map(each => (
                  <AppointmentItem
                    key={each.id}
                    list={each}
                    updateStartButton={this.updateStartButton}
                  />
                ))}
              {isCliked === true &&
                afterClickedStartButton.map(each => (
                  <AppointmentItem
                    key={each.id}
                    list={each}
                    updateStartButton={this.updateStartButton}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
