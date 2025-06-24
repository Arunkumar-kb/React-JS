import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [toasts, setToast] = useState([]);
  const timeRef = useRef({})
  const handleShow = (msg, type) => {
    const id = new Date().getTime();
    const newToasts = [...toasts, {id, msg, type}]
    setToast(newToasts)
    timeRef.current[id] = setTimeout(() => {
      handleClose(id)
    }, 5000);
  }
  console.log(timeRef)
  const handleClose = (id) => {
    clearTimeout(timeRef.current[id]);
    delete timeRef.current[id];
    setToast((prevToast) => {
      const filterToast = prevToast.filter((toast) => toast.id !== id);
      return filterToast;
    })
  }
  return (
    <>
      <div className="container">
        <div className="toast-container">
          {
            toasts.map((toast) => (
              <div className={`toast ${toast.type}`} key={toast.id}>
                <span>{toast.msg}</span>
                <span className='cls-btn' onClick={() => handleClose(toast.id)}>&times;</span>
              </div>
            ))
          }
        </div>
        <div className="btn-container">
          <button className='success' onClick={() => handleShow('This is success message', 'success')}>success</button>
          <button className='warning' onClick={() => handleShow('This is warning message', 'warning')}>warning</button>
          <button className='info' onClick={() => handleShow('This is info message', 'info')}>info</button>
          <button className='danger' onClick={() => handleShow('This is danger message', 'danger')}>Danger</button>


        </div>
      </div>
    </>
  )
}

export default App
