import { useState, useEffect } from "react";
import Interview_Modal from "./Interview_Modal";

function Interview_Schedules() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  // deleteinterview handler
  const deleteInterview = async (id) => {
    const res = await fetch(`http://localhost:5000/deleteInterview/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
  };

  useEffect(() => {
    getInterviews();
  }, []);

  return (
    <div className="interview-schedules w-full">
      {modalOpen ? (
        <Interview_Modal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          selectedInterview={selectedInterview}
        />
      ) : null}
      <h1 className="text-center text-4xl uppercase tracking-wider my-8">Interview Schedules</h1>
      <div className="flex justify-center w-full">
        <button
          className="bg-green-500 hover:bg-green-700 self-center text-white w-[200px] font-bold py-2 px-4 mb-6 rounded-[8px]"
          onClick={() => {
            setSelectedInterview(null);
            setModalOpen(true);
          }}
        >
          Add Interview
        </button>
      </div>
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
              <th className="py-3 pl-8 text-left text-xs font-medium text-white uppercase tracking-wider">
                Participants
              </th>
              <th className="py-3 pl-8 text-center text-xs font-medium text-white uppercase tracking-wider"></th>
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
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 self-center text-xs py-1 text-white  font-semibold mx-2 px-2 rounded-full"
                    onClick={() => {
                      setSelectedInterview(interview);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 self-center text-xs py-1 text-white font-semibold mx-2 px-2 rounded-full"
                    onClick={() => {
                      deleteInterview(interview.id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
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
