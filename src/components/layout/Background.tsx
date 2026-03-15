export const Background = () => {
  return (
    <>
      <div className="bg-canvas">
        <div className="orb orb1 animate-pulse" style={{ width: '600px', height: '600px', background: '#3b82f6', top: '-10%;', left: '-10%', opacity: 0.12 }}></div>
        <div className="orb orb2 animate-pulse" style={{ width: '500px', height: '500px', background: '#6366f1', top: '30%', right: '-10%', opacity: 0.12, animationDelay: '1s' }}></div>
        <div className="orb orb3 animate-pulse" style={{ width: '400px', height: '400px', background: '#0ea5e9', bottom: '10%', left: '15%', opacity: 0.12, animationDelay: '2s' }}></div>
        <div className="orb orb4 animate-pulse" style={{ width: '300px', height: '300px', background: '#2563eb', top: '60%', right: '20%', opacity: 0.12, animationDelay: '3.5s' }}></div>
      </div>
      <div className="grid-lines"></div>
    </>
  )
}
