import React from 'react';

const Email = (props) => {
  const { emailChange } = props;
  return(
    <div className="your-email">
      <h3>Your email</h3>
      <input onChange={() => emailChange} maxLength="60" placeholder="Why did you like the product or not?" />
      <h5><i>For authentication reasons, you will not be emailed</i></h5>
    </div>
  )
};

export default Email;
