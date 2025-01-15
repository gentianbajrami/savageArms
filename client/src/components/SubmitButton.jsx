import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitButton = ({ formBtn }) => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state == 'submitting';
    return (
        <button type='submit' className={`btn btn-block ${formBtn && 'form-btn'}`}>
            {isSubmitting ? 'submitting...' : 'submit'}</button>
    )
}

export default SubmitButton