const Notification = ({ notification }) => {
  if (!notification) return null

  return (
    <div className={`notice ${notification.type}`} role={notification.type === 'error' ? 'alert' : 'status'}>
      {notification.message}
    </div>
  )
}

export default Notification
