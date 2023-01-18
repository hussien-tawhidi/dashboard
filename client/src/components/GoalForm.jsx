import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../app/goals/goalsSlice";

export default function GoalForm() {
  const [text, setText] = useState("");

    const dispatch=useDispatch()
    
  const onSubmit = (e) => {
      e.preventDefault();
      console.log(dispatch(createGoal({ text })));
    setText("");
    };
    // console.log(text)
  return (
    <div className='goal-form'>
      <form action='' onSubmit={onSubmit}>
        <div className='mb-3'>
          <textarea
            type='text'
            name='text'
            id='text'
            value={text}
            className='form-control'
            placeholder='write your text ...'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className='btn btn-dark register-btn' type='submit'>
          Add Goal
        </button>
      </form>
    </div>
  );
}
