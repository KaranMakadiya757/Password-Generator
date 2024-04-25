import React, { useState } from 'react'
import "./App.css"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FaClipboard } from "react-icons/fa";

const App = () => {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(26)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const numbers = '0123456789'
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é"

  const COPY_SUCCESS = "Password successfully copied to clipboard"
  const COPY_Fail = "Password successfully copied to clipboard"

  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("To generate password you must select atleast one checkbox", true)
    }
    else {
      let characterList = ""
      if (includeNumbers) {
        characterList = characterList + numbers
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("Password is generated successfully", false)
    }


  }
  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }
  const copyToClipboard = (password) => {

    navigator.clipboard.writeText(password)
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(COPY_Fail, true)
    }
    else {
      copyToClipboard(password)
      notify(COPY_SUCCESS)
    }

  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div >
        <div className='rounded-xl shadow-lg p-8 bg-gradient-to-br from-teal-400 to-yellow-100'>
          <h2 className='text-center text-emerald-900 mb-5 text-xl'>
            Password Generator
          </h2>
          <div className='bg-green-600 py-3 px-2 text-white mb-4 h-11 flex justify-between'>
            <h3 >{password}</h3>
            <button className='text-white bg-green-600 border-none cursor-pointer'>
              <i onClick={handleCopyPassword} className="far fa-clipboard"><FaClipboard /></i>
            </button>
          </div>
          <div className='flex justify-between text-gray-700 mb-4'>
            <label htmlFor="password-strength">Password length</label>
            <input
              className="pw"
              defaultValue={passwordLength}
              type="number"
              id="password-stregth"
              name="password-strength"
              max="26"
              min="8"
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className='flex justify-between text-gray-700 mb-4'>
            <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
            />
          </div>
          <div className='flex justify-between text-gray-700 mb-4'>
            <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
            />
          </div>
          <div className='flex justify-between text-gray-700 mb-4'>
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
          </div>
          <div className='flex justify-between text-gray-700 mb-4'>
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
          </div>
          <button onClick={handleGeneratePassword} className='bg-green-600 border-none mt-3 p-3 text-white rounded-3xl w-full text-base cursor-pointer'>
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>  
    </div>
  )
}

export default App