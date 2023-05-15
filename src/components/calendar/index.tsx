import { useState, useEffect } from "react";

function Calendly() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/gippolito/45min_call?hide_event_type_details=1"
        style={{ minWidth: "320px", height: "630px" }}
      ></div>
    </>
  );
}

export default Calendly;