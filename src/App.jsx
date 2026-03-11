import { useState } from "react";
import StudentForm from "../src/components/studentForm";
import StudentTable from "../src/components/studentTable";
import studentsData from "../src/data/studentData";




function App() {

  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // filter students
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-4">
          Student Dashboard
        </h1>

        {loading && (
          <p className="text-blue-500 mb-4">
            Loading...
          </p>
        )}

        <StudentForm
          students={students}
          setStudents={setStudents}
          editStudent={editStudent}
          setEditStudent={setEditStudent}
          setLoading={setLoading}
        />

        <input
          placeholder="Search student..."
          className="border p-2 mt-6 mb-4 rounded w-64"
          onChange={(e) => setSearch(e.target.value)}
        />

        <StudentTable
          students={filteredStudents}
          setStudents={setStudents}
          setEditStudent={setEditStudent}
        />

      </div>

    </div>

  );
}

export default App;