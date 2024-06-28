import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { PieChart } from '@mui/x-charts/PieChart';
import './App.scss'



function App() {
  const [amount, setamount] = useState('')
  const [interestRate, setinterestRate] = useState('')
  const [time ,settime] = useState('');
  const [emi,setemi] = useState(0);
  const [totalAmount,settotalAmount] = useState(0);
  const [totalInterest,settotalInterest] = useState(0);
  const [Loading,setloading] = useState(false);
  // [P x R x (1+R)^N]/[(1+R)^N-1] 
  useEffect(() => {
    setemi(0);
    settotalAmount(0);
    settotalInterest(0);
    setloading(false);
    if(emi && totalAmount && totalInterest){
      setloading(false);
    }
    const  monthlyRate = interestRate/100/12;
    if(monthlyRate && amount && time){
      const emi =(amount*monthlyRate * Math.pow(1+monthlyRate,time*12))/(Math.pow(1 + monthlyRate,time*12)-1);
      setemi(Math.round(emi));
      settotalAmount(Math.round(emi*time*12));
      settotalInterest(Math.round(emi*time*12-amount));
      setloading(true)
    }
  }, [amount,interestRate,time])  
  const showdata =[
    {
      data: [
        { id: 0, value: totalAmount, label: 'Total Amount' },
        { id: 1, value: totalInterest, label: 'Total Interest' },
      ],
    },
  ]
  return (
    <>
    <div className='heading-main'>
      <div className='heading-secondary'>
        <h1 className='heading_1'>Mortgage Calculator</h1>
      </div>
      <form>
          <TextField
           label="Amount"
           variant="outlined"
           type='number' 
           value={amount}
           onChange={(e)=> setamount(e.target.value)}
           className='textinput'           
           />

          <TextField 
          label="Interest Rate" 
          type="number" 
          variant="outlined"   
          value={interestRate}
          onChange={(e)=> setinterestRate(e.target.value)} 
          className='textinput'
          />

          <TextField 
          label="Time" 
          type="number" 
          variant="outlined" 
          value={time}
          onChange={(e)=> settime(e.target.value)} 
          className='textinput'
          />
      </form>
      <div className='PieChat'>


        {(Loading)?<PieChart series={showdata} width={500} height={300} colors={['red', 'blue']} className='piechart'/> : "Please Enter the Details "}
      
      </div>
      <div className="emi">
        <h3 className='emichange'>EMI : ₹ {(emi)?emi+'/month':'0'}</h3>
        <h3 className='amtchange'>Total Amount : ₹ {(totalAmount)?totalAmount+'/-':'0'}</h3>
        <h3 className='intchange'>Total Interest : ₹ {(totalInterest)?totalInterest+'/-':'0'}</h3>
      </div>
    </div>

    <footer>
      <h3>Made By Vaibhav Bhatt 💕</h3>
    </footer>
    </>
  )
}

export default App
