import { useEffect, useRef, useState } from "react";
import styles from "./resource.module.css";

export function RAM({ value }) {
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width / 2);
    }
  }, [value]);
  return (
    <div className={styles.ramContainer} ref={containerRef}>
      {containerWidth != null ? (
        <Resource value={value} length={containerWidth} showValue={false} />
      ) : null}
    </div>
  );
}

export function CPUS({ values }) {
  const cpus = values.map((value, index) => (
    <Resource key={index} thread={index} value={value} length={25} />
  ));

  const cpuRows = [];
  for (let i = 0; i < cpus.length; i += 4) {
    cpuRows.push(cpus.slice(i, i + 4));
  }

  return (
    <div className={styles.cpusContainer}>
      {cpuRows.map((row, index) => (
        <div key={index} className={styles.cpuRow}>
          {row}
        </div>
      ))}
    </div>
  );
}

function Resource({ thread = null, value, length, showValue = true }) {
  const bars = Array.from({ length }, (_, index) => {
    let color;
    if (index < length * 0.4) {
      color = value >= (index + 1) * 4 ? "var(--green)" : "rgba(0,0,0,0.1)";
    } else if (index < length * 0.8) {
      color = value >= (index + 1) * 4 ? "var(--yellow)" : "rgba(0,0,0,0.1)";
    } else {
      color = value >= (index + 1) * 4 ? "var(--red)" : "rgba(0,0,0,0.1)";
    }
    return <Bar key={index} color={color} />;
  });

  return (
    <div className={styles.cpu}>
      {thread != null ? <span className={styles.thread}>{thread}</span> : null}
      <div className={styles.bars}>
        {bars.map((bar, index) => (
          <div key={index}>{bar}</div>
        ))}
      </div>
      {showValue ? <span className={styles.value}>{value}%</span> : null}
    </div>
  );
}

function Bar({ color }) {
  return <div className={styles.bar} style={{ backgroundColor: color }}></div>;
}
