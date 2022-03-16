import { useState, useEffect } from "react";
import "./interview-schedules.css";

function Interview_Schedules() {
  const [interviews, setInterviews] = useState([]);

  const getInterviews = async () => {
    const interview = await fetch("http://localhost:5000/allInterviews", {
      method: "GET",
    }).then((res) => res.json());
    sortInterviews(interview);
    setInterviews(interview);
  };

  const convertToLocal = (utc) => {
    const date = new Date(utc);
    return date.toLocaleString();
  };

  const sortInterviews = (interviews) => {
    return interviews.sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    });
  };

  useEffect(() => {
    getInterviews();
  }, []);

  return (
    <div className="interview-schedules w-full">
      <h1>Interview Schedules</h1>
      <div className="tableContainer w-screen flex justify-center items-center">
        <table className="divide-y divide-white mt-4 w-[70%]">
          <thead className={"bg-gray-500"}>
            <tr>
              <th className="text-left py-3 pl-8 text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th className="text-left py-3 pl-24 text-xs font-medium text-white uppercase tracking-wider">
                Start
              </th>
              <th className="text-left py-3 pl-24 text-xs font-medium text-white uppercase tracking-wider">
                End
              </th>
              <th className="py-3 pl-8 text-center text-xs font-medium text-white uppercase tracking-wider">
                Participants
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interviews?.map((interview, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {interview.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {convertToLocal(interview.start)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {convertToLocal(interview.end)}
                  </div>
                </td>
                <td
                  key={index}
                  className="px-6 py-4 flex flex-wrap text-center whitespace-nowrap"
                >
                  {interview?.participants?.map((user, index) => (
                    <span
                      key={index}
                      className="mx-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      {user.name}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Interview_Schedules;
