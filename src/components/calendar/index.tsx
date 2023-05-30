import { useState, useEffect } from "react";
import Price from "../Currency/Price";


declare global {
  interface Window {
    Calendly: any;
  }
}

function Calendar({ label, eventURL }: { label: string, eventURL: string }) {

  // Trial lesson: https://calendly.com/thinkthaithai/trial-lesson?hide_event_type_details=1
  //  Regular lesson: https://calendly.com/thinkthaithai/50min?hide_event_type_details=1

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // const handleScheduleClick = () => {
  //   if (window.Calendly) {
  //     window.Calendly.initPopupWidget({ url: 'https://calendly.com/thinkthaithai/trial-lesson' });
  //   }
  // };
  const handleScheduleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: eventURL });
    }
  };


  // if (eventURL === 'https://calendly.com/thinkthaithai/trial-lesson?hide_event_type_details=1') {
  //   return (
  //     <div>
  //       <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
  //       <button onClick={handleScheduleClick}>Trial Lesson <Price USD={5} /></button>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div
  //       className="calendly-inline-widget"
  //       data-url={eventURL}
  //       style={{ minWidth: "320px", height: "630px" }}
  //     ></div>
  //   )
  // }
  return (
    <div>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <button onClick={handleScheduleClick}>{label}{
        label === 'Trial Lesson' && <Price USD={5} />
      }</button>
    </div>
  );

}

export default Calendar;