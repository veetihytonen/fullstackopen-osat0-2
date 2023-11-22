const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Part = ({ part }) => (
  <p>
      {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => {
  const components = parts.map(part => <Part part={part} key={part.id} />)

  return (
    <>
      {components}
    </>
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
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <TotalExercises parts={course.parts} />
  </>
)

export default Course
