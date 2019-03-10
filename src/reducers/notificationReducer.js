
const notificationReducer = (
  state = '',
  action
) => {
  switch (action.type) {
  case 'SET':
    console.log(
      'notin case setissä action.data on ',
      action.data
    )
    return action.data.content
  case 'UNSET':
    return ''
  default:
    return state
  }
}

export const setNotification = (
  content,
  timeout
) => {
  console.log(
    'setNotificationin content on ',
    content
  )
  console.log(
    'setNotissa timeout on ',
    timeout
  )
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: { content, timeout }
    })
    setTimeout(
      () =>
        dispatch({
          type: 'UNSET',
          data: {}
        }),
      timeout * 1000
    )
  }
}

/*const clearNotification = () => {
  return {
    type: 'UNSET',
    data: ''
  }
}*/

export const createNotification = content => {
  return {
    type: 'SET',
    data: {
      content
    }
  }
}

export const unsetMessage = () => {
  return {
    type: 'UNSET'
  }
}

export default notificationReducer
