import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => { 
    setAll(prev => prev + 1)
    setGood(prev => prev + 1) 
  }
  const handleNeutralClick = () => { 
    setAll(prev => prev + 1)
    setNeutral(prev => prev + 1) 
  }
  const handleBadClick = () => { 
    setAll(prev => prev + 1)
    setBad(prev => prev + 1) 
  }

  return (
    <div style={{ marginLeft: '1rem' }}>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={handleGoodClick}>good</button>  
        <button onClick={handleNeutralClick}>neutral</button>  
        <button onClick={handleBadClick}>bad</button>  
      </div>
      <h2>Statistics</h2>
      {
        good || neutral || bad 
          ? <Statistics 
            good={good} 
            neutral={neutral} 
            bad={bad}
            all={all}
            />
          : <h4>No feedback given</h4>
      }
    </div>
  )
}

const Statistics = props => {
  const {good, neutral, bad, all} = props

  const average = quantity => (good + neutral + bad) / quantity

  const positive = () => {
    const percentage = Number((good / (bad + good + neutral)) * 100)
    return percentage ? percentage + '%' : '0'
  }

  return (
    <>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="all" value={all}/>
          <Statistic text="average" value={average(3)}/>
          <Statistic text="positive" value={positive()}/>
        </tbody>
      </table>
    </>
  )
}

const Statistic = props => {
  const { text, value } = props
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App