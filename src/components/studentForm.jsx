import { useState, useEffect } from "react";

function StudentForm({
  students,
  setStudents,
  editStudent,
  setEditStudent,
  setLoading
}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {

    if (editStudent) {
      setName(editStudent.name);
      setEmail(editStudent.email);
      setAge(editStudent.age);
    }

  }, [editStudent]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !age) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {

      if (editStudent) {

        const updatedStudents = students.map((student) =>

          student.id === editStudent.id
            ? { id: student.id, name, email, age }
            : student
        );

        setStudents(updatedStudents);
        setEditStudent(null);

      } else {

        const newStudent = {
          id: Date.now(),
          name,
          email,
          age
        };

        setStudents([...students, newStudent]);
      }

      setName("");
      setEmail("");
      setAge("");

      setLoading(false);

    }, 800);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-3 gap-3"
    >

      <input
        className="border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Age"
        value={age}
        onChange={(e)=>setAge(e.target.value)}
      />

      <button
        className="col-span-3 bg-blue-500 text-white p-2 rounded"
      >
        {editStudent ? "Update Student" : "Add Student"}
      </button>

    </form>

  );
}

export default StudentForm;