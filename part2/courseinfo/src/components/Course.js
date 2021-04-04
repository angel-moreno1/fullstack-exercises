const Course = props => {
    const { course } = props
    
    return (
        <>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </>
    )
}

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}

const Content = ({ course }) => {
  return (
    <div>
        {
          course.parts.map(part => <Part key={part.name} part={part} />)  
        }
    </div>
  )
}
const Total = ({ course: { parts } }) => {
    const sum = parts.reduce((sum, { exercises }) => sum + exercises, 0)
    return <h4>total of {sum} exercises</h4>
}
  
const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}

export default Course