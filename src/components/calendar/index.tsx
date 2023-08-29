// How to pre-fill calendly forms:
//  https://help.calendly.com/hc/en-us/articles/226766767-Pre-populate-invitee-information-on-the-scheduling-page

import { useEffect } from "react";
import Price from "../Currency/Price";


declare global {
  interface Window {
    Calendly: any;
  }
}

function Calendar({ label, eventURL, email, name, className, studentId }: { label: string, eventURL: string, email: string, name: string, className?: string, studentId?: string }) {



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);


    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const handleScheduleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: eventURL,
        prefill: {
          email: email,
          name: name
        },
        utm: {
          utmSource: studentId,
        }
      });
    }
  };


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


