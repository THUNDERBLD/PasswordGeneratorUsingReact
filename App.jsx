import { useCallback, useState, useEffect, useRef } from 'react'





// important note u can make the project without using useCallback because it just optimize the code nothing else it will do.
// u ust need to copy the code from useCallback(let str = "") and paste it useEffect(function) then also code will run the same.



function App() {
  let [Len, setLen] = useState(8)
  let [number, setnumber] = useState(false)
  let [symbol, setsymbol] = useState(false)
  let [password, setpassword] = useState()
  
  let pasRef = useRef(null)
  // this is used for copying the the text
  let copyPaste = useCallback(()=>{
    pasRef.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  let passGen = useCallback(()=>{
    let str = "";
    let pas = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number){
      pas += "0123456789"
    }
    if(symbol){
      pas += "!@#$%^&*(){}<>?"
    } 
    for(let i=0; i<=Len - 1; i++) {
      let cal = Math.floor(Math.random()*pas.length);
      str += pas.charAt(cal)
    }
    setpassword(str)
  },[number, symbol, Len])


  useEffect(()=>{
    passGen()
  },[Len,number,symbol])
  return (
    <>
      <h1 className='max-w-lg m-auto text-3xl text-white text-center'>Password Generator</h1>
    <div className='flex max-w-lg m-auto'>
      <input className='w-full rounded-s-xl px-2' type="text" value={password} ref={pasRef} placeholder='Password'/>
      <button onClick={copyPaste} className='bg-blue-600 p-2 rounded-e-xl font-semibold text-white'>Copy</button>
    </div>
    <div className='flex max-w-lg m-auto px-4'>
      <input type="range" value={Len} onChange={(e)=>{setLen(e.target.value)}} min={6} max={100} />
      <label htmlFor="" className='text-white'>Legnth : {Len}</label>
      <input className='px-2' type="checkbox" onChange={()=>setnumber((lastVal)=>!lastVal)} />
      <label className='px-2 text-white'>Numbers </label>
      <input type="checkbox" onChange={()=>setsymbol((lastVal)=>!lastVal)}/>
      <label htmlFor="" className=' text-white'>Symbols </label>
    </div>
    </>
  )
}

export default App
