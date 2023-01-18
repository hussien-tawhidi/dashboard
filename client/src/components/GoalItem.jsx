import { useDispatch } from "react-redux";
import { deleteGoal } from "../app/goals/goalsSlice";

export default function GoalItem({ goal }) {
    const dispatch=useDispatch()
  return (
    <div className='goal'>
      <span className='close' onClick={()=>dispatch(deleteGoal(goal._id))}>
        <i className='bi bi-x-lg'></i>
      </span>
      <p className='date-created'>
        {new Date(goal.createdAt).toLocaleString("en-EN")}
      </p>
      <h5 className="goal-text">{goal.text}</h5>
    </div>
  );
}
