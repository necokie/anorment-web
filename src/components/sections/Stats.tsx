export const Stats = () => {
  const stats = [
    { label: 'Hamkor klublar', value: '25+' },
    { label: 'Band qilingan soatlar', value: '15K+' },
    { label: 'QR kod tizimi', value: 'Yagona' },
    { label: 'Texnik yordam', value: '24/7' },
  ]

  return (
    <section className="border-y border-white/5 bg-white/[0.01]">
      <div className="wrapper py-10 grid grid-cols-2 md:grid-cols-4 items-center">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`px-8 py-4 flex flex-col items-center md:items-start ${i !== stats.length - 1 ? 'md:border-r border-white/5' : ''}`}>
            <span className="text-3xl font-heading font-black text-primary-light">{stat.value}</span>
            <span className="text-[11px] text-text-muted uppercase tracking-widest mt-1 text-center md:text-left">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
