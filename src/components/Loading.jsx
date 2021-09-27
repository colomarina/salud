import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color, className }) => (
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} className={className} />
);
 
export default Loading;