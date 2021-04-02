import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content 
        part1={course.parts[0].name}
        exercises1={course.parts[0].exercises}
        part2={course.parts[1].name}
        exercises2={course.parts[1].exercises}
        part3={course.parts[2].name}
        exercises3={course.parts[2].exercises}
      />
      <Total 
      exercises1={course.parts[0].exercises}
      exercises2={course.parts[1].exercises}
      exercises3={course.parts[2].exercises}
      />
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({
  part1,
  exercises1,
  part2,
  exercises2,
  part3,
  exercises3
}) => {
  return (
    <>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </>
  )
}
const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Total = ({exercises1, exercises2, exercises3}) => {
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  
}

ReactDOM.render(<App />, document.getElementById('root'))