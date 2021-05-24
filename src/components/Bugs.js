import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUnresolvedBugs, loadBugs, resolveBug } from '../store/bugs'
function Bugs() {
  const dispatch = useDispatch()
  //   const store = useSelector((state) => state.bugs)
  const bugs = useSelector(getUnresolvedBugs)
  console.log(bugs)
  useEffect(() => {
    dispatch(loadBugs())
  }, [])
  return (
    <ul>
      {bugs.map((bug) => (
        <>
          <li key={bug.id}>
            {bug.description}
            <button onClick={() => dispatch(resolveBug(bug.id))}>
              Resolve
            </button>
          </li>
        </>
      ))}
    </ul>
  )
}

export default Bugs
