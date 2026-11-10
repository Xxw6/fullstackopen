import { useState } from 'react'
import React from 'react'

// Omat ohjelmointiaiheiset esimerkkitekstit.
const anecdotes = [
  'The bug went on holiday as soon as I opened the debugger.',
  'A green test is a small victory worth committing.',
  'My estimate was accurate until somebody asked for another feature.',
  'The easiest code to maintain is the code you never needed.',
  'A useful error message is a letter from your past self.',
  'The demo worked perfectly for everyone except the audience.',
  'A clear variable name saves a conversation with tomorrow.',
  'Before rewriting everything, check which directory your terminal is in.'
]

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = Math.max(...votes)
  const mostVoted = votes.indexOf(mostVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={vote} text="vote" />
      <Button onClick={nextAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App
