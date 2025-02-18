import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { ToastContainer, Zoom } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './Todays_List.css';
import withAuthorization from '../Components/WithAuthorization';
import dayjs from 'dayjs';
import present from '../assets/absent.png';

// Dummy data
const dummyData = [
  { id: 1, name: 'Rohit', rollNumber: '12345', studentType: 'Hostel', department: 'Computer Science and Engineering' },
  { id: 2, name: 'Gokul', rollNumber: '67890', studentType: 'Day Scholar', department: 'Electrical and Electronics Engineering' },
  // Add more dummy entries as needed
];

const UserGroupSelector = ({ setSelectedUserGroup }) => {
  const [selectedUserGroup, setSelectedUserGroupState] = useState('Student');

  const handleUserGroupChange = (event) => {
    const userGroup = event.target.value;
    setSelectedUserGroupState(userGroup);
    setSelectedUserGroup(userGroup);
  };

  return (
    <div>
      <select id="userGroupSelect" className='status-yr' onChange={handleUserGroupChange} value={selectedUserGroup} required>
        <option value="Student">Student</option>
        <option value="Staff">Staff</option>
      </select>
    </div>
  );
};

const DepartmentSelector = ({ setSelectedDepartment }) => {
  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
  };

  return (
    <div>
      <select id="departmentSelect" className='status-yr' onChange={handleDepartmentChange} required>
        <option value="">Select Department</option>
        <option value="All">All</option>
        <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Computer Science and Business Systems">Computer Science and Business Systems</option>
        <option value="Computer Science and Design">Computer Science and Design</option>
        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
        <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
        <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
        <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
      </select>
    </div>
  );
};

const TypeSelector = ({ setSelectedType }) => {
  const [selectedType, setSelectedTypeState] = useState('All');

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedTypeState(type);
    setSelectedType(type);
  };

  return (
    <div>
      <select id="typeSelect" className='status-yr' onChange={handleTypeChange} value={selectedType} required>
        <option value="All">All</option>
        <option value="Hostel">Hostel</option>
        <option value="Day Scholar">Day Scholar</option>
      </select>
    </div>
  );
};

const Todays_List = () => {
  const [selectedUserGroup, setSelectedUserGroup] = useState('Student');
  const [data, setData] = useState(dummyData);
  const [attributeNames, setAttributeNames] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [name, setName] = useState('');
  const todayDate = dayjs().format('DD-MM-YYYY');

  useEffect(() => {
    if (selectedUserGroup) {
      setData(dummyData); // Use dummy data directly
      const keys = extractAttributeNames(dummyData[0]);
      setAttributeNames(keys);
      setName(dummyData.length > 0 ? '' : 'No Absentees Today');
    }
  }, [selectedUserGroup, selectedDepartment, selectedType]);

  const extractAttributeNames = (object) => {
    return Object.keys(object);
  };

  return (
    <div>
      <div className='holder'>
        <UserGroupSelector setSelectedUserGroup={setSelectedUserGroup} />
        {selectedUserGroup === "Student" && (
          <TypeSelector setSelectedType={setSelectedType} />
        )}
        <DepartmentSelector setSelectedDepartment={setSelectedDepartment} />
      </div>
      {name && 
        <div className='image'>
          <img src={present} width="60%" height="80%"/>
        </div>}
      {data.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              {attributeNames.map((attribute, index) => (
                 <th key={index}>{attribute.replace(/_/g, ' ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedUserGroup === "Student" && data.filter(item => selectedType === "All" || item.studentType === selectedType).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {attributeNames.map((attribute, idx) => (
                  <td key={idx}>{item[attribute]}</td>
                ))}
              </tr>
            ))}
            {selectedUserGroup !== "Student" && data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {attributeNames.map((attribute, idx) => (
                  <td key={idx}>{item[attribute]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ToastContainer transition={Zoom} />
    </div>
  );
};

export default withAuthorization(['hod', 'Principal', 'VC', 'Dean', 'Attendance Manager'])(Todays_List);
