import React from 'react';
import NotFoundImage from '../../assets/images/writer.svg';
import './error_page.scss';

const ErrorPage = ({ error, resetErrorBoundary }) => {
    console.log('Error occured', error);
    return (
      <div className='error-page'>
        <img src={NotFoundImage} alt='Page not found' />
        <p className='error-msg'>
          Something went wrong. Try clicking the refresh page button to reload the
          application.{' '}
          <button className='btn' onClick={resetErrorBoundary}>
            Refresh page
          </button>
        </p>
      </div>
    );
};

export default ErrorPage;