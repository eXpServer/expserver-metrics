import "./Resource.css";

export default function Resource({ cpus }) {
  const cpuss = Array.from({ length: cpus }, (_, index) => (
    <CPU key={index} thread={index} val={43} />
  ));

  const cpuRows = [];
  for (let i = 0; i < cpus; i += 4) {
    cpuRows.push(cpuss.slice(i, i + 4));
  }
  return (
    <div className="resource-container">
      <div className="resource-content">
        <span className="sub-heading">CPU</span>
        <div className="resource-cpus">
          {cpuRows.map((row, index) => (
            <div key={index} className="cpu-row">
              {row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CPU({ thread, val }) {
  const bars = Array.from({ length: 25 }, (_, index) => {
    let color;
    if (index < 10) {
      color = val >= (index + 1) * 4 ? "var(--green)" : "var(--grey)";
    } else if (index < 20) {
      color = val >= (index + 1) * 4 ? "var(--yellow)" : "var(--grey)";
    } else {
      color = val >= (index + 1) * 4 ? "var(--red)" : "var(--grey)";
    }
    return <Bar key={index} color={color} />;
  });

  return (
    <div className="resource-CPU">
      <span className="resource-thread">{thread}</span>
      <div className="resource-bars">
        {bars.map((bar, index) => (
          <div key={index}>{bar}</div>
        ))}
      </div>
      <span className="resource-grey">{val}%</span>
    </div>
  );
}

function Bar({ color }) {
  return (
    <div className="resource-bar" style={{ backgroundColor: color }}></div>
  );
}
