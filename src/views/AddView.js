import React, { useState, useContext } from 'react';
import Button from '../components/Button';
import DisabledButton from '../components/DisabledButton';
import {addMemo} from '../firebase';

function AddView(props) {
  const [memoText, setMemoText] = useState('');
  const handleChange = (event) => {
    setMemoText(event.target.value);
  };

  const pushMemo = () => {
    detectSentiment(memoText);
    addMemo(props.currentUser, { date: new Date(), note: memoText });
    setMemoText('');
  };

  return (
    <div className="flex flex-col h-screen w-3/4 mx-auto my-12 items-center">
      <textarea value={memoText} onChange={handleChange} className="box-border h-64 w-full p-4 border border-green-500 bg-gray-200 placeholder-green-500" placeholder="Enter your happy memory here!"></textarea>
      { !memoText ? <DisabledButton>Add Memo to Well</DisabledButton> : <Button onClick={() => pushMemo()}> Add Memo to Well </Button> }
    </div>
  );
}

//const language = require('@google-cloud/language');
// const client = new language.LanguageServiceClient()
const detectSentiment = async (text) => {
  var requestUrl = [
    'https://language.googleapis.com/v1/documents:analyzeSentiment?key=',
    ##################  ].join(""); // API Key goes here
  var data = {
    "document": {
      "language": "en-us",
      "type": "PLAIN_TEXT",
      "content": text
    },
    "encodingType": "UTF8"
  };
  var options = {
    method : "POST",
    contentType: "application/json",
    payload : JSON.stringify(data)
  };

  var response = await fetch(requestUrl, options).then(response => response.json())
  .then(data => console.log(data));

  // var data = JSON.parse(response);

  //console.log(response);

};
export default AddView;
