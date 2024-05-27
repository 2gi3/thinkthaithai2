// How to pre-fill calendly forms:
//  https://help.calendly.com/hc/en-us/articles/226766767-Pre-populate-invitee-information-on-the-scheduling-page

import { useEffect } from "react";
import { CalendarProps } from "@/types";
import { useDispatch } from "react-redux";
import { increment } from "@/redux/slices/counterSlice";

declare global {
  interface Window {
    Calendly: any;
  }
}

function Calendar({ label, eventURL, email, name, className, studentId }: CalendarProps) {
  const dispatch = useDispatch();

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
        },
        onClose: function () {
          dispatch(increment())
        }
      });
    }
  };


  return (
    <div style={{ margin: 0 }}>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <button className={className} onClick={handleScheduleClick}>{label}</button>
    </div>
  );

}

export default Calendar;


