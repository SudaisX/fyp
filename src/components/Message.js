import React from 'react';
// import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
    // return <Alert variant={variant}>{children}</Alert>;
    return (
        <>
            <div className={'alert alert-dismissible fade show alert-' + variant} role='alert'>
                {children}
                <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='alert'
                    aria-label='Close'></button>
            </div>
        </>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
