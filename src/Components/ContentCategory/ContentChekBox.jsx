import React from 'react';

const ContentChekBox = ({isComplete, handleCompleteTask, id}) => {
    return (
        <div className={` content__circle ${isComplete ? 'active' : ''}`} onClick={() => handleCompleteTask(id)} />
    );
};

export default ContentChekBox;