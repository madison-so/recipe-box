import React, { useEffect, useRef, useState } from 'react';
/** A number input that lets you type freely and only reports valid values. */
export default function NumberField({ value, onValue, step = 'any', min = 0, ...rest }) {
  const [text, setText] = useState(String(value));
  const ref = useRef(null);
  useEffect(() => { if (document.activeElement !== ref.current) setText(String(value)); }, [value]);
  return (
    <input ref={ref} type="number" step={step} min={min} value={text} {...rest}
      onChange={e => { setText(e.target.value); const v = parseFloat(e.target.value); if (v > 0) onValue(v); }}
      onBlur={() => setText(String(value))} />
  );
}
