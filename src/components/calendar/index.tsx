// How to pre-fill calendly forms:
//  https://help.calendly.com/hc/en-us/articles/226766767-Pre-populate-invitee-information-on-the-scheduling-page

import { useEffect } from "react";
import Price from "../Currency/Price";


declare global {
  interface Window {
    Calendly: any;
  }
}

function Calendar({ label, eventURL, email, name, className }: { label: string, eventURL: string, email: string, name: string, className?: string }) {

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
      window.Calendly.initPopupWidget({
        url: eventURL,
        prefill: {
          email: email,
          name: name
        },
      });
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
    <div style={{ margin: 0 }}>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <button className={className} onClick={handleScheduleClick}>{label}{
        label === 'Trial Lesson' && <><Price USD={5} />
          <p>50 minutes</p>
          <p>No commitment</p></>
      }</button>
    </div>
  );

}

export default Calendar;


