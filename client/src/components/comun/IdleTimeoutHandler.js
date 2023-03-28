import { useEffect, useState } from "react"
import dayjs from "dayjs"
import IdleTimeoutModal from "./IdleTimeoutModal"

const SECONDS = 1000
const MINUTES = 60 * SECONDS
const DEFAULT_TIMEOUT = 15 * MINUTES

const IdleTimeoutHandler = ({onLogout, timeOutInterval}) => {
    let timer = undefined
    const [isLogout, setIsLogout] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const events = ['click', 'scroll', 'load', 'keydown']
    
    function eventHandler(eventType) {
        localStorage.setItem('lastInteractionTime', dayjs())
        if (timer) {
            startTimer()
        }
    }

    useEffect(() => {
        addEvents()

        return (() => {
            removeEvents()
            clearTimeout(timer)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function startTimer() {
        if (timer) {
            clearTimeout(timer)
        }

        const interval = (timeOutInterval ? timeOutInterval : DEFAULT_TIMEOUT)
        timer = setTimeout(() => {
            const lastInteractionTime = localStorage.getItem('lastInteractionTime')
            const diff = dayjs().diff(dayjs(lastInteractionTime))

            if (isLogout) {
                clearTimeout(timer)
            } else {
                if (diff.milliseconds < interval) {
                    startTimer()
                    // onActive()
                } else {
                    // onIdle()
                    setShowModal(true)
                }
            }
        }, interval)
    }

    function addEvents() {
        events.forEach(eventName => {
            window.addEventListener(eventName, eventHandler)
        })

        startTimer()
    }

    function removeEvents() {
        events.forEach(eventName => {
            window.removeEventListener(eventName, eventHandler)
        })
    }

    function handleContinueSession() {
        setShowModal(false)
        setIsLogout(false)
    }

    function handleLogout() {
        setShowModal(false)
        removeEvents()
        clearTimeout(timer)
        setIsLogout(true)
        onLogout()
    }

    return (
        <IdleTimeoutModal showModal={showModal} handleContinue={handleContinueSession} handleLogout={handleLogout} />
    )
}

export default IdleTimeoutHandler
