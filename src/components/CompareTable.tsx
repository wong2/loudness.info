import React from 'react'

function compare(value: number, standard: number, tolerance: number = 0): string {
  if (value >= standard - tolerance && value <= standard + tolerance) {
    return 'perfect'
  }
  if (value < standard - tolerance) {
    return 'too quite'
  }
  return 'too loud'
}

const CompareTable: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="alert alert-info w-1/2">
        <div className="flex-1">
          <label>
            <a href="https://en.wikipedia.org/wiki/LUFS" target="_blank">
              LUFS is a standard loudness measurement unit used for audio normalization in broadcast
              television systems and other video and music streaming services.
            </a>
            <p className="mt-2">
              Here is a table comparing loudness standard of online streaming service with loudness
              of your audio:
            </p>
          </label>
        </div>
      </div>
      <table className="table my-5 w-1/2">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Standard</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Spotify</td>
            <td>–14 LUFS</td>
            <td>{compare(value, -14)}</td>
          </tr>
          <tr>
            <td>Apple Music</td>
            <td>–16 (±1) LUFS</td>
            <td>{compare(value, -16, 1)}</td>
          </tr>
          <tr>
            <td>Apple Podcast</td>
            <td>–16 (±1) LUFS</td>
            <td>{compare(value, -16, 1)}</td>
          </tr>
          <tr>
            <td>Amazon Music</td>
            <td>–14 LUFS</td>
            <td>{compare(value, -14)}</td>
          </tr>
          <tr>
            <td>Youtube</td>
            <td>–14 LUFS</td>
            <td>{compare(value, -14)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CompareTable
