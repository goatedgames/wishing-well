import React from 'react';
import { Router } from "@reach/router";
import SignIn from "../services/SignIn";
import SignUp from "../services/SignUp";

function LoginView(props) {
  return (
    // <div class="flex flex-col flex-1 items-center h-screen bg-gradient-to-b from-teal-400 to-blue-500">
    <div class="h-screen bg-gradient-to-b from-teal-400 to-blue-500">
      {/* <h1 class="text-center text-4xl font-thin">Welcome to Your Well</h1> */}
      <div>
        <Router>
          <SignUp path="signUp" />
          <SignIn changeView={props.changeView} path="/" />
        </Router>
      </div>
      <div class="w-1/2 mx-auto my-12 px-2 flex items-center">
        <div class="flex -mx-2">
          <div class="w-1/3 px-2">
            <div class="bg-gray-200 p-4 h-auto rounded-lg">
              <b>1. Contribute positive memories to your personal well</b>
              <p>Whether a big accomplishment like graduating or something simple like walking your dog, leave a warm memory for your future self.</p>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <div class="bg-gray-300 p-4 h-auto rounded-lg">
              <b>2. Draw from your well of positivity in tough times.</b>
              <p>It's nice to remember something positive while you're feeling down. Your well shows you what made you feel good in the past.</p>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <div class="bg-gray-400 p-4 h-auto rounded-lg">
              <b>3. Automatically get encouragement from your past self during busy times</b>
              <p>Whenever you feel overwhelmed because your schedule is crammed, your well has your back. After all, your well never runs dry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
