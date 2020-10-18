import React from 'react';
import Button from '../components/Button';

function ChooseView(props) {
  return (
    <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
      <div className= "flex justify-center">
        <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
          <h1>Feeling good?</h1>
          <Button onClick={() => props.changeView('addView')}>
            Write some inspiration
            </Button>
        </div>
        <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
          <h1>Feeling Down?</h1>
          <Button onClick={() => props.changeView('pickView')}>
            Help me out
            </Button>

        </div>
      </div>
       
    </div>
  );
}

export default ChooseView;