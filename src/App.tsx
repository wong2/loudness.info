import React, { useCallback, useState } from 'react'
import FileInput from './components/FileInput'
import { measure } from './measure'

function App() {
  const [state, setState] = useState<'idle' | 'measuring' | 'measured' | 'failed'>('idle')
  const [filename, setFilename] = useState<string>()
  const [loudness, setLoudness] = useState<string>()

  const onFileSelected = useCallback(async (file: File) => {
    setFilename(file.name)
    setState('measuring')
    try {
      const lufs = await measure(file)
      setLoudness(lufs.toFixed(1))
      setState('measured')
    } catch (err) {
      setState('failed')
    }
  }, [])

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">loudness.info</h1>
          <p className="mb-5">Measure loudness of your music or podcast</p>
          {state === 'idle' ? (
            <FileInput accept="audio/*" onSelect={onFileSelected}>
              <button className="btn btn-secondary btn-outline">select file</button>
            </FileInput>
          ) : (
            <div className="stats shadow mt-5">
              <div className="stat">
                <div className="stat-title">Loudness of {filename}</div>
                {state === 'measured' ? (
                  <div className="stat-value text-secondary">{loudness} LUFS</div>
                ) : state === 'failed' ? (
                  <div className="stat-desc text-error">failed</div>
                ) : (
                  <div className="stat-desc text-secondary blinking">measuring...</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
