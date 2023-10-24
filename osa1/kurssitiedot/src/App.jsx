const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => {
  const components = props.course.parts.map(part => <Part part={part} />)
  return (
    <div>
      {components}
    </div>
  )
}

const Total = (props) => {
  const e1 = props.course.parts[0].exercises
  const e2 = props.course.parts[1].exercises
  const e3 = props.course.parts[2].exercises

  return (
  <>
    <p>Number of exercises {e1 + e2 + e3}</p>
  </>
  )}

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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App