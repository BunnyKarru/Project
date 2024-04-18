import React, { useState } from "react";

export default function Project() {
  
  const [project,setProject]=useState([])
  const [projectNames, setProjectNames] = useState('');
  const [discription ,setDiscription]=useState('')
  const [showPopup, setShowPopup] = useState(false);

  

  function addProject() {
    setShowPopup(true);
  }

  function handleSubmit() {
    setProject([...project,{projectName:projectNames,discription:discription}])
    
    setShowPopup(false);
  }

  function deleteProject(index) {
    const updatedProjects = [...project];
    updatedProjects.splice(index, 1);
    setProject(updatedProjects);
  }

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-violet-600">Projects</h2>
        <button
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          onClick={addProject}
        >
          Add
        </button>

       

        </div>
        
      <hr/>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <label className="block mb-2">Project Name:</label>
            <input
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
              value={projectNames}
              onChange={(e)=>{setProjectNames(e.target.value)}}
            />
            <label className="block mb-2">Discription:</label>
            <input
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
              value={discription}
              onChange={(e)=>{setDiscription(e.target.value)}}
            />
            <div className="text-right">
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
      <ul className="divide-y divide-gray-200">
  {project.map((proj, index) => (
    <li key={index} className="flex items-center justify-between py-4">
      <div className="flex flex-col">
        <span className="text-violet-600 font-bold text-xl">{proj.projectName}</span>
        <p className="text-gray-700">{proj.discription}</p>
      </div>
      <button
        className="text-red-500 font-bold hover:text-red-700 focus:outline-none"
        onClick={() => deleteProject(index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-9.414L14.414 10 10 14.414 5.586 10 10 5.586 9.414 5 5 9.414 9.414 13 10 13.586 10.586 13 14 9.586 14.414 10 10 14.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  ))}
</ul>

</div>
    </div>
 
  );
}
