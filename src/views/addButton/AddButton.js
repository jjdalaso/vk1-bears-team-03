import React from 'react'
import { CButton } from '@coreui/react'
import { Route } from 'react-router-dom'

const Button = (props) => {
    const webPath = props.location
    return (
        <Route render={({ history}) => (
            <CButton size="md" color="primary" className="m-1 px-4 py-1"  onClick= {() => { history.push(webPath) }} >
                Create New
            </CButton>
        )} />
    )
}

export default Button