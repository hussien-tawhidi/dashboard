import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import { getGoals, reset } from "../app/goals/goalsSlice";
import GoalItem from "../components/GoalItem";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getGoals());

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user]);

  return (
    <main className='doshboard'>
      {isLoading && (
        <div className='spinner-border text-secondary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      )}
      <p className='doshboard-title'>
        Welcome <span>{user && user.name}</span>
      </p>
      <h4>Create your goal</h4>
      <div className='container'>
        <GoalForm />
        {goals.length > 0 ? (
          <div className='row'>
            {goals.map((goal) => (
              <div className='col-4' key={goal.name}>
                <GoalItem goal={goal} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className='not-goal'>you dont recore any goals yet !</h3>
        )}
      </div>
    </main>
  );
}
