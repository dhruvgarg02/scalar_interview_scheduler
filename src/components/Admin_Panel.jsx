import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import "./admin-panel.css";

function Admin_Panel({ selectedInterview }) {
  const [selectedUsers, setSelectedUsers] = useState(
    selectedInterview ? selectedInterview.participants : []
  );
  const [startTime, setStartTime] = useState(
    selectedInterview ? selectedInterview.start : ""
  );
  const [endTime, setEndTime] = useState(
    selectedInterview ? selectedInterview.end : ""
  );
  const [interviews, setInterviews] = useState([]);

  const getInterviews = async () => {
    const interview = await fetch("http://localhost:5000/allInterviews", {
      method: "GET",
    }).then((res) => res.json());
    setInterviews(interview);
  };

  const selectUserHandler = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUserHandler = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u !== user));
  };

  const convertToLocal = (utc) => {
    const date = new Date(utc);
    return date.toLocaleString();
  };

  const checkInvalidTime = (start, end) => {
    let invalid = false;
    const selectedStart = convertToLocal(start);
    const selectedEnd = convertToLocal(end);
    if (selectedStart >= selectedEnd) {
      invalid = true;
    }
    return invalid;
  };

  const AdminTimeClash = (start, end) => {
    let clash = false;
    const selectedStart = convertToLocal(start);
    const selectedEnd = convertToLocal(end);
    interviews.forEach((interview) => {
      if (interview.id !== selectedInterview.id) {
        const interviewStart = convertToLocal(interview.start);
        const interviewEnd = convertToLocal(interview.end);
        if (
          (selectedStart >= interviewStart && selectedStart < interviewEnd) ||
          (selectedEnd > interviewStart && selectedEnd <= interviewEnd) ||
          (selectedStart <= interviewStart && selectedEnd >= interviewEnd) ||
          (selectedStart >= interviewStart && selectedEnd <= interviewEnd)
        ) {
          clash = true;
        }
      }
    });
    return clash;
  };

  const checkClash = (start, end) => {
    let clash = false;
    const selectedStart = convertToLocal(start);
    const selectedEnd = convertToLocal(end);
    interviews.forEach((interview) => {
      if (interview.id !== selectedInterview.id) {
        const interviewStart = convertToLocal(interview.start);
        const interviewEnd = convertToLocal(interview.end);
        if (
          (selectedStart >= interviewStart && selectedStart < interviewEnd) ||
          (selectedEnd > interviewStart && selectedEnd <= interviewEnd) ||
          (selectedStart <= interviewStart && selectedEnd >= interviewEnd) ||
          (selectedStart >= interviewStart && selectedEnd <= interviewEnd)
        ) {
          interview.participants.forEach((participant) => {
            selectedUsers.forEach((selectedUser) => {
              if (participant.id === selectedUser.id) {
                clash = true;
              }
            });
          });
        }
      }
    });
    return clash;
  };

  const checkError = () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user!!");
      return true;
    } else if (startTime === null || endTime === null) {
      alert("Please select start and end time!!");
      return true;
    } else if (AdminTimeClash(startTime, endTime)) {
      alert("The selected time slot is already booked for You!!");
      return true;
    } else if (checkClash(startTime, endTime)) {
      alert(
        "The selected time slot is clashing with the participant's schedule!!"
      );
      return true;
    } else if (checkInvalidTime(startTime, endTime)) {
      alert("Start time must be before end time");
      return true;
    }
    return false;
  };

  const scheduleHandler = async () => {
    await fetch("http://localhost:5000/scheduleInterview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedUsers: selectedUsers,
        startTime: startTime,
        endTime: endTime,
      }),
    }).then((res) => res.json());
  };

  useEffect(() => {
    getInterviews();
  }, []);

  //update interview handler
  const updateInterviewHandler = async (interview) => {
    await fetch(`http://localhost:5000/updateInterview/${interview.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedUsers: selectedUsers,
        startTime: startTime,
        endTime: endTime,
      }),
    }).then((res) => res.json());
  };

  return (
    <div className="admin-panel">
      <div className="h-[40vh] flex flex-col w-full justify-evenly">
        <div className={"flex flex-row mt-[-15px] w-full bg-gray-500"}>
          <div
            className={
              "px-9 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
            }
          >
            <div className="start">
              <label htmlFor="Start">Start (date and time) : </label>
              <input
                className="text-black"
                type="datetime-local"
                id="Start"
                name="Start"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="px-9 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
            <div className="end">
              <label htmlFor="End">End (date and time) : </label>
              <input
                className="text-black"
                type="datetime-local"
                id="End"
                name="End"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <Dropdown selectUserHandler={selectUserHandler} />
        <div className="px-6 py-4 mx-20 h-[100px] flex self-start flex-wrap text-center whitespace-nowrap font-size: 0.75rem overflow-auto">
          {selectedUsers.map((user, index) => (
            <div
              key={index}
              className="mx-2 px-2 my-2 h-[20px] inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800 cursor-pointer"
              onClick={() => {
                removeUserHandler(user);
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 self-center text-white w-[200px] font-bold py-2 px-4 rounded-[8px]"
          onClick={() => {
            if (!checkError()) {
              if (selectedInterview !== null) {
                updateInterviewHandler(selectedInterview);
              } else {
                scheduleHandler();
              }
              window.location.reload();
            }
          }}
        >
          Schedule
        </button>
      </div>
    </div>
  );
}

export default Admin_Panel;
