import React, { useState, useEffect } from 'react'
// use effect is used whenver
// componenet needs to interact w exteriro world
// example apis, fetch, etc

const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null,
}
const App = () => {
    // in use state does not have to be an object
    const [count, setCount] = useState(0)
    const [isOn, setIsOn] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: null, y: null})
    // const [location, setLocation] = useState(initialLocationState)
    // can destructure
    const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState)
    let mounted = true;
    // navigator api
    const [status, setStatus] = useState(navigator.onLine)
    // we have access to updater function
    // setCount is a function
    // default state of 0

    useEffect(() => {
        // exec after every render, like after state change, use effect is called we can specify what needs to be done
        document.title = `You have clicked ${count} times`
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('online', handleOnlineStatus)
        window.addEventListener('offline', handleOfflineStatus)
        navigator.geolocation.getCurrentPosition(handleGeolocation)
        const watchId = navigator.geolocation.watchPosition(handleGeolocation)
        // runs AFTER every render

        //clean up listener
        // cleans up upon component unmounting
        //componentWillUnmount
        // return is a callback function
        return () => {// clean up function
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('online', handleOnlineStatus)
            window.removeEventListener('offline', handleOfflineStatus)
            mounted = false; // clean this up
            navigator.geolocation.clearWatch(watchId);//removes listener
        }

    }, [count])// what if we want this to run less often?
    // empty array only runs on component mount and unmount

    const handleGeolocation = (event) => {
        // the api has no way of unmounting or removing listener
        // we can then instead tie it to a boolean
        // if mounted then update state, otherwise dont
        if (mounted) {
            setLocation({
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
                speed: event.coords.speed
            })
        }
        
    }
const handleOnlineStatus = () => {
    setStatus(true)
}
const handleOfflineStatus = () => {
    setStatus(false)
}
const handleMouseMove = (event) => {
    setMousePosition({
        x: event.pageX,
        y: event.pageY,
    })
}
const incrementCount = () => {
    setCount(prevCount => prevCount + 1)
}
const toggleLight = () => {
    //setIsOn(!isOn)
    // ensure correct value always returned
    // use updater
    setIsOn(prevIsOn => !prevIsOn )
}
    return (
        <React.Fragment>
        <h1>Counter:</h1>

        <button onClick={incrementCount}>
        I was clicked {count} times hooks </button>
        <h2>Toggle Light:</h2>
        <img
        alt="flashlight"
        src={
            isOn
            ? 'http://placebear.com/150/150'
            : 'http://placekitten.com/g/150/150'
        }
        style={{
            borderRadius: 10,
            height: '150px',
            width: '150px',
        }}
        onClick={toggleLight}
        />
        <h2>Mouse Position:</h2>
        {JSON.stringify(mousePosition, null, 2)}
        <br />

        <h2>Network Status:</h2>
        <p> You are <strong>{status ? 'online' : 'offline'}</strong> </p>


        <h2>Geolocation:</h2>
        <p> Latitude is {latitude}</p>
        <p> Longitude is {longitude}</p>

        <p> Your speed  is {speed ? speed : '0 speed'}</p>


        </React.Fragment>
    )
}


export default App;