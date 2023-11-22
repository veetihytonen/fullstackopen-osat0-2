const Header = ({ name }) => (
  <>
    <h1>{name}</h1>
  </>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => {
  const components = parts.map(part => <Part part={part} key={part.id} />)
  
  return (
    <div>
      {components}
    </div>
  )
}

const TotalExercises = ({ parts }) => {
  const total = parts.reduce(
    (sum, part) => sum + part.exercises, 
    0
  ) 
  
  return (
    <b> <p>total of {total} exercises</p> </b>
  )
}

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <TotalExercises parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App