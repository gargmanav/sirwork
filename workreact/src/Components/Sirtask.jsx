import React, { useEffect, useState } from 'react';

const Sirtask = () => {
  const [gender, setGender] = useState("male");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sedata, setSedata] = useState("");

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    selectgen();
  }, [gender]);

  useEffect(() => {
    search();
  }, [sedata]);

  const getdata = async () => {
    const res = await fetch("https://randomuser.me/api/?results=100");
    const last = await res.json();
    setData(last.results);
    setFilteredData(last.results);
  };

  function selectgen() {
    const result = data.filter((ele) => {
      return ele.gender === gender;
    });
    setFilteredData(result);
  }

  const search = () => {
    const filteredData = data.filter((ele) => {
      return ele.name.first.toLowerCase().startsWith(sedata.toLowerCase());
    });
    setFilteredData(filteredData);
  };

  return (
    <div>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="text" onChange={(e) => setSedata(e.target.value)}></input>
      <div>
        {filteredData.map((ele) => (
          <div className="resultdiv" style={{ display:"flex",justifyContent:"space-evenly" }}>
            <h1>{ele.name.first} {ele.name.last}</h1>
            <h1>{ele.gender}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sirtask;


