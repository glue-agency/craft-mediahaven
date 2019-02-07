import React from 'react';

function SpinnerMore(props) {
  const { isLoading } = props;

  return (
    <div className={"centeralign " + (!isLoading ? 'hidden' : '')}>
      <div className="spinner loadingmore"></div>
    </div>
  );
}

SpinnerMore.defaultProps = {
  isLoading: true,
};

export default SpinnerMore;
