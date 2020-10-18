import React from 'react';
import Button from './Button';

export default function Card(props) {
  return (
    <div style={props.style} class="max-w-xs rounded overflow-hidden shadow-lg my-2">
      <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"></img>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{props.memo.date}</div>
        <p class="text-grey-darker text-base">
          {props.memo.note}
        </p>
        <p>From, {props.memo.name}</p>
      </div>
      
      <div class="px-6 py-4">
        <Button>Give me another one</Button>
      </div>
    </div>
  );
};