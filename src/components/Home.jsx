import customerData from '../ApiData.json'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Chart as ChartJs , defaults} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'
defaults.responsive = true;
defaults.maintainAspectRatio = false;
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
ChartJs
function Home() {
const [searched,setSearchd] = useState()
//search function
function search (term){
  let customerTable = document.querySelector('.main-table')
  let searchedTable = document.querySelector('.searched')
  customerData[0].customers?.map((teket)=>{
    if(teket?.name.toLowerCase().includes(term.toLowerCase()) === true){
      setSearchd(teket)
      if(teket == null){
        searchedTable.classList.replace('d-block','d-none')
      }
      searchedTable.classList.replace('d-none','d-block')
      customerTable.classList.replace('d-block','d-none')
      
    }
}
)
  
   }
function searchByAmount (term){
  let customerTable = document.querySelector('.main-table')
  let searchedTable = document.querySelector('.searched')
  console.log(term);
  customerData[0].transactions?.map((teket)=>{
    console.log(teket.amount);
    if(teket.amount == term){
      setSearchd(teket)
      searchedTable.classList.replace('d-none','d-block')
      customerTable.classList.replace('d-block','d-none')
      
    }
  })
  
  
  
   }

function getallcustomers(){
  let customerTable = document.querySelector('.main-table')
  let searchedTable = document.querySelector('.searched')
  customerTable.classList.replace('d-none','d-block')
  searchedTable.classList.replace('d-block','d-none')
}
//welcom 
function welcom(){
  Swal.fire({
    icon: "success",
    text: "welcom  again",
    showConfirmButton:false,
    toast:true,
   showLoaderOnConfirm:true,
    timer:2000
  })
}


useEffect(()=>{
  AOS.init();
  welcom()
},[])
  return <section className='mt-5'>
    <Helmet>
  <meta charSet="utf-8" />
    <title>   Home</title>
  </Helmet>

    <h2 data-aos="zoom-in-down" data-aos-duration="1500" 
    className='text-success fw-bold'> Customers Details</h2>

    <button onClick={getallcustomers} className='btn btn-outline-secondary mt-2 mb-2 mx-4 py-1'>all customers</button>
    
    <div className=' mb-3 w-75 m-auto text-center d-flex flex-column justify-content-between  ' data-aos="zoom-in-down" data-aos-duration="2000">
      <input onInput={(e)=>search(e.target.value)} type="text" className='form-control w-50 m-auto mb-3 ' placeholder='search by name..' />
      <input onInput={(e)=>searchByAmount(e.target.value)} type="number" className='form-control w-50 m-auto  ' placeholder='search by amount..' />
    </div>

    <div data-aos="zoom-in-down" data-aos-duration="1500"  className="searched d-none w-75 m-auto"> 
    <table  className='table   border text-center m-auto mt-4 w-75 mt-5'>
    <thead>
      <tr>
          <th>Customer Id</th>
          <th>Customer Name</th>
          <th>Transactions</th>
        </tr>
      </thead>
      <tbody>
    <tr>
            <td>{searched?.id}</td>
            <td>{searched?.name}</td>
            <td className='text-center  d-flex   '>

            {customerData[0].transactions.map((trans)=><tr   key={trans._id}>

          {trans.customer_id===searched?.id? <p className='text-danger text-start'>amount:{trans.amount}</p>:null}
          {trans.customer_id===searched?.id? <h5 className='text-success text-start'>Date:{trans.date}</h5>:null}
          {trans.customer_id===searched?.id?<h5 className='text-muted text-start'> Customer Name:{searched.name}</h5> :null}
          
            </tr>)}
        <div className="chart w-75 ">
        <Doughnut
        data={{
        labels:customerData[0].transactions.map((trans)=>trans.amount) 
        , datasets: [{
        label: 'custumer amount',
        data:customerData[0].transactions.map((trans)=>trans.id),
        backgroundColor: [
          'rgba(43,63,229,0.8)',
          'rgba(250,192,19,0.8)',
          'rgba(253,135,135,0.8)',
        ],
        borderColor: [
          'rgba(43,63,229,0.8)',
          'rgba(250,192,19,0.8)',
          'rgba(253,135,135,0.8)',
        ],
        

        }]

        }}  />
        </div>
        </td>
        </tr>
        
          
        
    </tbody>
</table></div>


<div data-aos="zoom-in-down" data-aos-duration="1500"  className="main-table d-block">   
  <table   className=' table  border text-center m-auto w-75 mt-5  '>
   
    <thead>
    <tr>
        <th>Customer Id</th>
        <th >Customer Name</th>
        <th >Transactions</th>
      </tr>
    </thead>
  
    <tbody>
    {customerData[0].customers?.map((customer)=><tr data-aos="zoom-in-down" data-aos-duration="1500"  key={customer._id}>
          <td>{customer.id}</td>
          <td>{customer.name}</td>
          <td className=' d-flex  '>
          {customerData[0].transactions.map((trans)=><tr className=' m-auto'  key={trans._id}>

        {trans.customer_id===customer.id? <p className='text-danger text-start'>amount:{trans.amount}</p>:null}
        {trans.customer_id===customer.id? <h5 className='text-success text-start'>Date:{trans.date}</h5>:null}
        {trans.customer_id===customer.id?<h5 className='text-muted text-start'> Customer Name:{customer.name}</h5> :null}
      
          </tr>)}
          <div className="chart">

              <Doughnut
          data={{
            labels:customerData[0].transactions.map((trans)=>trans.amount) 
            , datasets: [{
              label: 'custumer amount',
              data:customerData[0].transactions.map((trans)=>trans.id),
              backgroundColor: [
                'rgba(43,63,229,0.8)',
                'rgba(250,192,19,0.8)',
                'rgba(253,135,135,0.8)',
              ],
              borderColor: [
                'rgba(43,63,229,0.8)',
                'rgba(250,192,19,0.8)',
                'rgba(253,135,135,0.8)',
              ],
              borderRadius:5,
            
            }]
              
          }}  />
          </div>
        
          
        


        </td>
        </tr>)}
    
        
      
  </tbody>
    
   
  </table></div>


  
  </section>
}

export default Home
