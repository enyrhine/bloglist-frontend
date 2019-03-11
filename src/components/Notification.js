import React from 'react'
import '../index.css'
import { connect } from 'react-redux'


const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  if (props.notification === 'Uusi blogi lisätty!' || props.notification === 'Kirjauduttu ulos.') {
    return (
      <div className="update">
        {props.notification}
      </div>
    )
  }
  return (
    <div className="error">
      {props.notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps)(Notification)