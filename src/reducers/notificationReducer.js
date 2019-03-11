const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return action.data.content
  case 'HIDE_NOTIFICATION':
    action.data.content = null
    return action.data.content
  default:
    return state
  }
}

export const createNotification = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { content }
    })
    setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION', data: { content } }), timeout * 1000)
  }
}

export default notificationReducer