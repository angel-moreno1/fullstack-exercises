import React, { useState } from 'react'
const initialState = [
  {
    anecdote: 'If it hurts, do it more often',
    votes: 2
  },
  {
    anecdote:'Adding manpower to a late software project makes it later!',
    votes: 3
  },
  {
    anecdote:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 12
  },
  {
    anecdote:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 10
  },
  {
    anecdote:'Premature optimization is the root of all evil.',
    votes: 4
  },
  {
    anecdote:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 8
  },
]

const App = () => {
  const [anecdotes, setanecdotes] = useState(initialState)
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => void 
    setSelected(prev => (prev + 1) % anecdotes.length)
  
  const voteanecdote = () => {
    const newanecdotes = [...anecdotes]
    newanecdotes[selected].votes += 1
    setanecdotes(newanecdotes)
  }

  const majorAnecdoteVotes = () => {
    return anecdotes.reduce((major, anecdote) => {
      if(anecdote.votes > major.votes) {
        major = anecdote
        return major
      }
      return major
    }, {votes: 0})
  }
  const majorAnecdote = majorAnecdoteVotes()
  
  return (
    <div style={{ margin: "2rem" }}>
      <p>"{anecdotes[selected].anecdote}"</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <button onClick={voteanecdote} >vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>"{majorAnecdote.anecdote}"</p>
      <p>has {majorAnecdote.votes} votes</p>
    </div>
  )
}

export default App