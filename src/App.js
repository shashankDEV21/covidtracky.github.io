import React, { useEffect,useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
//import CardColumns from 'react-bootstrap/CardColumns';
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form';


function App() {
  //const [latest,setlatest]=useState("") //useState is used to set value to latest variable and latest is initialized with empty string setlatest is use to update the value o latest
    const [latest,setlatest]=useState([])
    const [result,setresult]=useState([])
    const [searchcountry,setsearchcountry]=useState("")
  useEffect(()=>{
  //   axios.get("https://corona.lmao.ninja/v2/all").then(res=>{
  //     setlatest(res.data)
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // 
  //in order to add more than one API we need to have axios buffer
    axios.all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries")
    ]).then(resarr=>{
      setlatest(resarr[0].data)
      setresult(resarr[1].data)
    }).catch(err=>{
      console.log(err)
    })
  },[])
  const date=new Date(parseInt(latest.updated))
  const lastupd=date.toString()
  const filterCountry=result.filter(item=>{
    return searchcountry!==""?item.country.includes(searchcountry):item
  })
  const countries=filterCountry.map((data,i)=>{
    return (
      <Card 
      key={i}
      bg="light"
      text="dark"
      className="text-center"
      style={{margin:"10px"}}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
    <Card.Title>{data.country}</Card.Title>
    <Card.Text>Total Cases: {data.cases}</Card.Text>
    <Card.Text>Total Deaths: {data.deaths}</Card.Text>
    <Card.Text>Recovered: {data.recovered}</Card.Text>
    <Card.Text>Todays Cases: {data.todayCases}</Card.Text>
    <Card.Text>Todays Deaths: {data.todayDeaths}</Card.Text>
    <Card.Text>Active Cases: {data.active}</Card.Text>
    <Card.Text>Critical Cases: {data.critical}</Card.Text>
    <Card.Text>Total tests Done: {data.tests}</Card.Text>
        </Card.Body>

      </Card>
    )
  })
  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];
  return (
    <div>
      <br/>
      <h2 style={{textAlign:"center"}}>Corona Live Stats</h2>
      {/* <form action="/symptom"></form> */}
      <br></br>
      <CardDeck>
  <Card bg="secondary" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
      {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
  <small>Last updated {lastupd}</small>
    </Card.Footer>
  </Card>
  <Card bg="danger" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>
      {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
  <small>Last updated {lastupd}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text="white" className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>
      {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
  <small >Last updated {lastupd}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<br></br>
  <Form>
    <Form.Group controlId='formGroupSearch'>
      <Form.Control type="text" placeholder="Search a Country" onChange={e=>setsearchcountry(e.target.value )} onKeyPress={e=>{e.key==='Enter'&&e.preventDefault();}}></Form.Control>
    </Form.Group>

  </Form>
  <br></br>
  <Columns queries={queries}>{countries}</Columns>

    </div>
  );
}

export default App;
