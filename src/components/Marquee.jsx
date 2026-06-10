
export default function Marquee() {
  const items = ["Korean BBQ","Sushi","Ramen","Dumplings","Cócteles","Nigiris","Tteokbokki","Kimchi","Bibimbap","Soju"]
  // Quadruple the items so the seamless loop works at any screen width
  const repeated = [...items, ...items, ...items, ...items]
  return (
    <div className="marquee-wrap" aria-hidden="true">
      {/* Two identical tracks stacked via CSS animation offset so
          one always covers the gap while the other resets */}
      <div className="marquee-inner">
        <div className="marquee-track mq-a">
          {repeated.map((t, i) => (
            <span key={i} className="mq-item">{t}<b> ·</b></span>
          ))}
        </div>
        <div className="marquee-track mq-b" aria-hidden="true">
          {repeated.map((t, i) => (
            <span key={i} className="mq-item">{t}<b> ·</b></span>
          ))}
        </div>
      </div>
    </div>
  )
}
