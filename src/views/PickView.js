import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { getMemos } from '../firebase';
// import { render } from 'react-dom';
import { useSpring, useSprings, animated, interpolate } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
// import { useGesture } from 'react-use-gesture';
import './Stack.css';

const AnimatedCard = animated(Card);

// const cards = [
//   'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
//   'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
//   'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
//   'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
//   'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
//   'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
// ];

// // These two are just helpers, they curate spring data, values that are later being interpolated into css
// const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
// const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// // This is being used down there in the view, it interpolates rotation and scale into a css transform
// const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

// function Deck() {
//   console.log("HI");
//   const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
//   const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
//   // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
//   const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
//     const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
//     const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
//     if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
//     set(i => {
//       if (index !== i) return // We're only interested in changing spring-data for the current spring
//       const isGone = gone.has(index)
//       const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
//       const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
//       const scale = down ? 1.1 : 1 // Active cards lift up a bit
//       return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
//     })
//     if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
//   })
//   // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
//   return props.map(({ x, y, rot, scale }, i) => (
//     <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
//       {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
//       <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }}>TEST TEXT</animated.div>
//     </animated.div>
//   ))
// }

function PickView(props) {
  const [memos, setMemos] = useState([]);
  const [memo, setMemo] = useState({
    date: "June 9, 1969",
    note: "I booled hard today."
  });

  useEffect(() => {
    getMemos(props.currentUser).then(res => {
      setMemos(res);
      // setMemos(res.map(memoObj => { return {
      //     date: memoObj.date.toDate().toISOString().substring(0, 10),
      //     note: memoObj.note,
      //     name: memoObj.name
      //   };
      // }));
      fetchMemo();
    });
  }, []);
  
  const fetchMemo = () => {
    if (memos.length === 0) {
      setMemo({
        date: "June 9, 1969",
        note: "I booled hard today."
      });
    } else {
      const memoObj = memos[Math.floor(Math.random() * memos.length)];
      console.log(memoObj);
      setMemo({
        date: memoObj.date.toDate().toISOString().substring(0, 10),
        note: memoObj.note,
        name: memoObj.name
      });
    }
  };

  // const to = i => ({ x: 0, y: i * -400, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
  // const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

  // const [springs, set] = useSprings(memos.length, i => ({ ...to(i), from: from(i) }));
  //   const bruhprops = useSpring({
  //     x: 1000,
  //     from: { x: 0 },
  //   })

  return (
    <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
      <h1>Here is a thought from your past self.</h1>

      <div class="max-w-xs rounded overflow-hidden shadow-lg my-2">
        <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"></img>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{memo.date}</div>
          <p class="text-grey-darker text-base">
            {memo.note}
          </p>
          <p>From, {memo.name}</p>
        </div>
        
        <div class="px-6 py-4">
          <Button onClick={() => fetchMemo()}>Give me another one</Button>
        </div>
      </div>
      {/* <Spring
  from={{ opacity: 0 }}
  to={{ opacity: 1 }}>
  {props => <div style={props}>hello</div>}
</Spring> */}
      {/* { springs.map(({ x, y, rot, scale }, i) => {
          console.log(x, y, rot, i);
          return <animated.div key={i} style={{ overflow: 'hidden', transform: interpolate([y, rot], (y, rot) => `rotateZ(${rot}deg) translate3d(0,${y}px,0)`) }}>

            <div class="bg-blue max-w-xs rounded overflow-hidden shadow-lg my-2">
              <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"></img>
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{memos[i].date}</div>
                <p class="text-grey-darker text-base">
                  {memos[i].note}
                </p>
                <p>From, {memos[i].name}</p>
              </div>
              
              <div class="px-6 py-4">
                <Button>Give me another one</Button>
              </div>
            </div>
          </animated.div> 
          // return <AnimatedCard key={i} memo={memos[i]} class="card" style={{bruhprops}} />
          // return <AnimatedCard key={i} memo={memos[i]} class="card" style={{ transform: interpolate([x, y, rot], (x, y, rot) => `translate3d(${x}px,${y}py,0) rotateZ(${rot}deg)`) }} />
        })
      } */}
    </div>
  );
}

export default PickView;